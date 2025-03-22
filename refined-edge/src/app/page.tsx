"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, Star, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

// Featured products data
const featuredProducts = [
  {
    id: 'platinum-precision-razor',
    name: "Platinum Precision Razor",
    description: "Our signature 5-blade system with precision edge trimmer",
    price: 58.00,
    rating: 5,
    image: "https://img.freepik.com/premium-photo/closeup-razors-sleek-shaving-cream-bottle-clean-minimal-background_1264082-199502.jpg"
  },
  {
    id: 'elite-shaving-cream',
    name: "Elite Shaving Cream",
    description: "Luxurious shaving cream with sandalwood and cedarwood",
    price: 32.00,
    rating: 4.5,
    image: "https://i.ebayimg.com/images/g/emgAAOSwdu1mZRLS/s-l400.jpg"
  },
  {
    id: 'executive-trimmer',
    name: "Executive Trimmer",
    description: "Premium beard trimmer with 10 length settings",
    price: 96.00,
    rating: 4.8,
    image: "https://m.media-amazon.com/images/I/51oidj8gwKL.jpg"
  },
  {
    id: 'gentlemans-set',
    name: "Gentleman's Set",
    description: "Complete grooming set with razor, cream, and aftershave",
    price: 120.00,
    rating: 5,
    image: "https://m.media-amazon.com/images/I/71BbIGI1ZkS.jpg"
  }
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

export default function Home() {
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof featuredProducts[0], event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setAddingToCart(product.id);

    // Simulate a small delay for better UX
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }, 1);

      setAddingToCart(null);
    }, 300);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://dearbarber.co.uk/cdn/shop/files/6_b92517b7-8876-400e-8f66-92fd4a93d4f8_800x.png?v=1732540713"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-2xl leading-tight mb-4">
            Premium Grooming for the Modern Gentleman
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8">
            Experience the perfect shave with our precision-engineered razors and luxury grooming products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
                Shop Collection
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-3">Why Choose Refined Edge</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We craft exceptional grooming tools that combine artistry, precision engineering, and luxurious materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Materials</h3>
              <p className="text-muted-foreground">
                We use only the finest materials, from Swedish steel blades to ergonomic handles crafted from sustainable sources.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Craftsmanship</h3>
              <p className="text-muted-foreground">
                Each product is designed with meticulous attention to detail and crafted by artisans with decades of experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Superior Performance</h3>
              <p className="text-muted-foreground">
                Our products are rigorously tested to ensure they provide an exceptional grooming experience every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-semibold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our finest selection of premium grooming tools and products</p>
            </div>
            <Link href="/products">
              <Button variant="link" className="text-accent flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden bg-card border-border hover:border-accent/50 transition-colors">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative h-64 bg-secondary/20">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {renderRatingStars(product.rating)}
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 py-4 flex justify-between items-center border-t border-border">
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                    <Button
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={addingToCart === product.id}
                    >
                      {addingToCart === product.id ? (
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
        </div>
      </section>

      {/* Membership Banner */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="100%" height="100%" fill="none"/>
                <circle cx="20" cy="20" r="1" fill="currentColor" className="text-accent" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join The Refined Edge Club
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Subscribe today and get premium grooming products delivered to your door, plus exclusive member benefits and discounts.
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
              Join Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-2">What Our Customers Say</h2>
            <p className="text-muted-foreground">
              Hear from gentlemen who have elevated their grooming routine with Refined Edge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The attention to detail in these products is remarkable. The razor provides the smoothest shave I've ever experienced, and the craftsmanship is unparalleled."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-medium">JD</div>
                <div>
                  <h4 className="font-medium">James Davidson</h4>
                  <p className="text-sm text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Since switching to Refined Edge, my morning routine has been transformed. The products feel luxurious, and the results speak for themselves."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-medium">MT</div>
                <div>
                  <h4 className="font-medium">Michael Thompson</h4>
                  <p className="text-sm text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The quality of these products is exceptional. The razor handles are beautifully designed and weighted perfectly. Worth every penny."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-medium">RB</div>
                <div>
                  <h4 className="font-medium">Robert Bennett</h4>
                  <p className="text-sm text-muted-foreground">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
