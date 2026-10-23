"use client";

import { ProductDetails } from "@/components/product/product-details";
import Image from "next/image";
import { RelatedProducts } from "@/components/product/related-products";

export default function Page() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      <header className="w-full border-b border-gray-100">
        {/* Announcement bar */}
        <div className="bg-blue-950 text-white flex items-center justify-center py-2 px-4 text-xs font-bold text-center">
          <p>Hint Water is Now LIVE!</p>
        </div>

        {/* Main Navigation */}
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Left Group (visible on medium screens and up) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-950 transition-colors">Water</a>
            <a href="#" className="hover:text-blue-950 transition-colors">Subscribe to save</a>
            <a href="#" className="hover:text-blue-950 transition-colors">Our story</a>
          </div>

          {/* Logo */}
          <a
            href="#"
            aria-label="Hint home"
            className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight"
          >
            Hint Water
          </a>

          {/* Right Group */}
          <div className="flex items-center gap-4 sm:gap-5 text-sm font-medium text-gray-700">
            <a href="#" className="hidden sm:inline-block hover:text-blue-950 transition-colors">Find a store</a>
            <a href="#" className="hidden sm:inline-block hover:text-blue-950 transition-colors">Rewards</a>
            <a href="#" className="hover:text-blue-950 transition-colors">Account</a>
          </div>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-7xl grid grid-cols-1 gap-8 md:gap-10 px-4 sm:px-6 py-6 md:py-10 md:grid-cols-2 items-center">
        <div className="w-full min-w-0 flex min-h-[350px] md:min-h-[500px] items-center justify-center bg-white">
          <Image
            src="/images/peachRaspberry.svg"
            alt="Peach Raspberry Hint® Water"
            width={400}
            height={600}
            priority
            className="max-w-full max-h-[500px] h-[350px] sm:h-[420px] md:h-[500px] w-auto object-contain"
          />
        </div>

        <div>
          {/* product details goes here */}
          <ProductDetails />
        </div>
      </section>
      <RelatedProducts />
    </main>
  );
}
