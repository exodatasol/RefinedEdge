"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Minus, Plus, Star, Truck } from 'lucide-react';
import { products } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';

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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart } = useCart();

  // Find the product based on slug
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return notFound();
  }

  // Find related products
  const relatedProductsData = product.relatedProducts
    .map(slug => products.find(p => p.slug === slug))
    .filter(Boolean);

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0]
    }, quantity);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <div className="container mx-auto py-12">
      {/* Breadcrumb navigation */}
      <div className="mb-8">
        <Link href="/products" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product images */}
        <div className="space-y-4">
          <div className="relative h-[400px] bg-card rounded-lg overflow-hidden">
            <Image
              src={product.images[activeImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-24 h-24 bg-card rounded-md overflow-hidden border-2 transition-colors ${activeImageIndex === index ? 'border-accent' : 'border-border'}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {renderRatingStars(product.rating)}
            </div>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Features list */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="min-w-5 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping note */}
          <div className="flex items-center gap-2 bg-primary/5 text-primary p-4 rounded-lg mb-8">
            <Truck className="h-5 w-5" />
            <span>Free shipping on orders over $100</span>
          </div>

          {/* Add to cart controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-none"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center min-w-10 px-4">
                <span className="text-lg font-medium">{quantity}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-none"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1 h-12 text-base"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>

          {/* Stock status */}
          <p className={`mb-4 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.categories.map(category => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
              >
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProductsData.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProductsData.map((product) => (
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
                  <div className="p-5">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-1 mb-3">
                      {renderRatingStars(product.rating)}
                    </div>
                    <p className="font-semibold">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
