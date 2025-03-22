"use client";

import React from 'react';
import Link from 'next/link';
import {
  User,
  Menu
} from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { CartSheet } from './cart/CartSheet';
import { SearchDialog } from './search/SearchDialog';

const Header = () => {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/products" className="text-lg font-medium hover:text-accent">
                  All Products
                </Link>
                <Link href="/products?category=razors" className="text-lg font-medium hover:text-accent">
                  Razors
                </Link>
                <Link href="/products?category=blades" className="text-lg font-medium hover:text-accent">
                  Blades
                </Link>
                <Link href="/products?category=shaving-care" className="text-lg font-medium hover:text-accent">
                  Shaving Care
                </Link>
                <Link href="/products?category=grooming" className="text-lg font-medium hover:text-accent">
                  Grooming
                </Link>
                <Link href="/products?category=gift-sets" className="text-lg font-medium hover:text-accent">
                  Gift Sets
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wider">
              REFINED<span className="text-accent">EDGE</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/products" className="text-sm font-medium hover:text-accent transition-colors">
            ALL PRODUCTS
          </Link>
          <Link href="/products?category=razors" className="text-sm font-medium hover:text-accent transition-colors">
            RAZORS
          </Link>
          <Link href="/products?category=blades" className="text-sm font-medium hover:text-accent transition-colors">
            BLADES
          </Link>
          <Link href="/products?category=shaving-care" className="text-sm font-medium hover:text-accent transition-colors">
            SHAVING CARE
          </Link>
          <Link href="/products?category=grooming" className="text-sm font-medium hover:text-accent transition-colors">
            GROOMING
          </Link>
          <Link href="/products?category=gift-sets" className="text-sm font-medium hover:text-accent transition-colors">
            GIFT SETS
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <SearchDialog />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <CartSheet />
        </div>
      </div>
    </header>
  );
};

export default Header;
