"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Define types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('refinedEdgeCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('refinedEdgeCart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        toast.success(`Updated ${item.name} quantity in your cart`);
        return updatedCart;
      } else {
        // Item doesn't exist, add new item
        toast.success(`Added ${item.name} to your cart`);
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === itemId);
      if (item) {
        toast.success(`Removed ${item.name} from your cart`);
      }
      return prevCart.filter(item => item.id !== itemId);
    });
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  // Calculate total price
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total number of items
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
