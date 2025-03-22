"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="container mx-auto py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold mb-2">Stay Sharp</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter to receive exclusive offers, grooming tips, and early access to new products.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="min-w-[250px]"
            />
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/razors" className="text-muted-foreground hover:text-accent transition-colors">
                  Razors
                </Link>
              </li>
              <li>
                <Link href="/products/blades" className="text-muted-foreground hover:text-accent transition-colors">
                  Blades
                </Link>
              </li>
              <li>
                <Link href="/products/shaving-care" className="text-muted-foreground hover:text-accent transition-colors">
                  Shaving Care
                </Link>
              </li>
              <li>
                <Link href="/products/grooming" className="text-muted-foreground hover:text-accent transition-colors">
                  Grooming
                </Link>
              </li>
              <li>
                <Link href="/products/gift-sets" className="text-muted-foreground hover:text-accent transition-colors">
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-accent transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-accent transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-accent transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-accent" />
                <span>123 Fifth Avenue, New York, NY 10160</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-accent" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 text-accent" />
                <span>info@refinededge.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="inline-block">
              <h2 className="text-xl font-semibold tracking-wider">
                REFINED<span className="text-accent">EDGE</span>
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              © {new Date().getFullYear()} Refined Edge. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
