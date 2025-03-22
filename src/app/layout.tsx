import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Refined Edge | Premium Men's Grooming",
  description: "Experience the luxury of premium men's grooming products. Crafted for the modern gentleman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
