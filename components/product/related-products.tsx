"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { AnimateNumber } from "@/components/ui/animate-number";
import { motion, type Variants } from "motion/react";
import { useCart } from "@/hooks/use-cart";

const shimmerVariants: Variants = {
  initial: { x: "-150%", skewX: -20 },
  hover: {
    x: "250%",
    transition: { duration: 0.75, ease: "easeInOut" },
  },
};

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: "watermelon",
    name: "Watermelon",
    price: 22.99,
    image: "/images/watermelon.webp",
  },
  {
    id: "blackberry",
    name: "Blackberry",
    price: 22.99,
    image: "/images/blackberry.webp",
  },
  {
    id: "pineapple",
    name: "Pineapple",
    price: 22.99,
    image: "/images/pineapple.webp",
  },
  {
    id: "coconut",
    name: "Coconut",
    price: 22.99,
    image: "/images/coconut.webp",
    isNew: true,
  },
];

export function RelatedProducts() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(products.map((product) => [product.id, 1]))
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="mb-8 text-center text-2xl font-bold text-blue-950 dark:text-white">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product) => {
          const qty = quantities[product.id] ?? 1;

          return (
            <Card
              key={product.id}
              className="group min-w-0 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-card gap-0 py-0 shadow-sm transition-all duration-200 hover:shadow-md dark:hover:border-gray-700"
            >
              <div className="relative flex aspect-square items-center justify-center bg-gray-50 dark:bg-gray-900/60">
                <Image
                  src={product.image}
                  alt={`${product.name} Hint Water`}
                  width={260}
                  height={260}
                  className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />

                {product.isNew && (
                  <span className="absolute left-3 top-3 rounded-full bg-blue-950 dark:bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-xs">
                    NEW
                  </span>
                )}
              </div>

              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold capitalize text-blue-950 dark:text-white">
                    {product.name}
                  </h3>

                  <span className="shrink-0 text-sm font-bold text-blue-950 dark:text-blue-400">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1 case of 12 bottles
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-blue-950 dark:hover:text-white"
                      onClick={() =>
                        setQuantities((current) => ({
                          ...current,
                          [product.id]: Math.max(1, (current[product.id] ?? 1) - 1),
                        }))
                      }
                      disabled={qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      <HugeiconsIcon icon={MinusSignIcon} className="size-3.5" />
                    </Button>

                    <span className="min-w-6 text-center text-xs font-semibold text-gray-800 dark:text-white">
                      <AnimateNumber>{qty}</AnimateNumber>
                    </span>

                    <Button
                      size="icon-xs"
                      variant="ghost"
                      className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-blue-950 dark:hover:text-white"
                      onClick={() =>
                        setQuantities((current) => ({
                          ...current,
                          [product.id]: (current[product.id] ?? 1) + 1,
                        }))
                      }
                      aria-label="Increase quantity"
                    >
                      <HugeiconsIcon icon={PlusSignIcon} className="size-3.5" />
                    </Button>
                  </div>

                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    className="relative flex-1 overflow-hidden rounded-md"
                  >
                    {/* Shimmer light sweep beam */}
                    <motion.div
                      aria-hidden="true"
                      variants={shimmerVariants}
                      className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
                    />

                    <Button
                      id={`related-add-${product.id}`}
                      size="sm"
                      className="h-7 w-full bg-blue-950 dark:bg-blue-600 text-xs font-semibold text-white hover:bg-blue-900 dark:hover:bg-blue-500 cursor-pointer"
                      onClick={() => {
                        addToCart({
                          id: `related-${product.id}`,
                          name: `${product.name} Hint Water`,
                          flavor: `${product.name} (12-pack)`,
                          price: product.price,
                          quantity: qty,
                          image: product.image,
                        });
                      }}
                    >
                      Add
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
