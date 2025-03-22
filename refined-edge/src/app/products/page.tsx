"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Loader2 } from 'lucide-react';
import { products } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'razors', name: 'Razors' },
  { id: 'blades', name: 'Blades' },
  { id: 'shaving-care', name: 'Shaving Care' },
  { id: 'grooming', name: 'Grooming' },
  { id: 'gift-sets', name: 'Gift Sets' }
];

// Utility function to render star ratings
const renderRatingStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-accent text-accent" />);
  }

  if (halfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className="h-4 w-4 text-muted-foreground" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="h-4 w-4 fill-accent text-accent" />
        </div>
      </div>
    );
  }

  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />);
  }

  return stars;
};

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  const filterProducts = useCallback(() => {
    setIsLoading(true);
    const categoryParam = searchParams.get('category');

    let filtered = [...products];

    if (categoryParam && categoryParam !== 'all') {
      filtered = filtered.filter(product => product.categories.includes(categoryParam));
    }

    setFilteredProducts(filtered);
    setIsLoading(false);
  }, [searchParams]);

  // Run filtering when params change
  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  // Simulate loading state for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: typeof products[0], event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setAddingToCart(product.slug);

    // Simulate a small delay for better UX
    setTimeout(() => {
      addToCart({
        id: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0]
      }, 1);

      setAddingToCart(null);
    }, 300);
  };

  const activeCategory = searchParams.get('category') || 'all';

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-semibold mb-4">Premium Grooming Products</h1>
      <p className="text-muted-foreground max-w-3xl mb-8">
        Discover our collection of luxury grooming products designed for the modern gentleman. Each product is crafted with precision and premium materials.
      </p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Link
            key={category.id}
            href={category.id === 'all' ? '/products' : `/products?category=${category.id}`}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ${
              activeCategory === category.id
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                : 'border border-input bg-background hover:bg-accent/10'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
        </div>
      ) : filteredProducts.length === 0 ? (
        // No products found
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find any products matching your selected criteria.
          </p>
          <Link href="/products">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              View All Products
            </Button>
          </Link>
        </div>
      ) : (
        // Products Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.slug} className="overflow-hidden bg-card border-border hover:border-accent/50 transition-colors">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative h-64 bg-secondary/20">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {renderRatingStars(product.rating)}
                    <span className="text-muted-foreground text-xs ml-1">({product.reviewCount})</span>
                  </div>
                  <p className="font-semibold">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="px-5 py-4 border-t border-border">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={addingToCart === product.slug}
                  >
                    {addingToCart === product.slug ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ShoppingCart className="h-4 w-4 mr-2" />
                    )}
                    Add to Cart
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
