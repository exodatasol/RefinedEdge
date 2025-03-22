import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] container mx-auto py-12 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
