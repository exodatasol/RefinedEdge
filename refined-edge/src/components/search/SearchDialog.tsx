"use client";

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/data';
import { debounce } from '@/lib/utils';
import Image from 'next/image';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const router = useRouter();

  // Debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      // Search through products
      const results = products.filter(product => {
        const lowerQuery = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          product.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
        );
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsSearching(true);
    debouncedSearch(query);
  };

  const handleProductSelect = (slug: string) => {
    setOpen(false);
    router.push(`/products/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="flex items-center border-b border-border">
          <Search className="ml-4 h-5 w-5 text-muted-foreground" />
          <Input
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-6"
            placeholder="Search for products, categories..."
            value={searchQuery}
            onChange={handleSearch}
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto p-4">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : searchQuery.trim() === '' ? (
            <div className="text-center py-8 text-muted-foreground">
              Type to start searching...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-medium">No results found</p>
              <p className="text-muted-foreground mt-1">
                We couldn't find any products matching "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </h3>

              <div className="space-y-2">
                {searchResults.map((product) => (
                  <div
                    key={product.slug}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleProductSelect(product.slug)}
                  >
                    <div className="relative w-12 h-12 bg-secondary rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{product.name}</h4>
                      <p className="text-muted-foreground text-sm truncate">
                        {product.description.substring(0, 60)}...
                      </p>
                    </div>

                    <div className="flex-shrink-0 font-semibold">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
