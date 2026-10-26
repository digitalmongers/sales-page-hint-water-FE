import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Noto_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/hooks/use-cart";
import { ProductSchema } from "@/components/seo/product-schema";

const notoSansHeading = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hintwater.com"),
  title: {
    default: "Hint® Water | Pure Crisp Fruit-Infused Water with 0 Sugar & 0 Calories",
    template: "%s | Hint® Water",
  },
  description:
    "Shop Hint® Water — delicious, pure crisp water infused with real fruit essences. 0 sugar, 0 diet sweeteners, 0 calories, and non-GMO. Subscribe & save 15% with free delivery.",
  keywords: [
    "hint water",
    "fruit infused water",
    "zero sugar flavored water",
    "zero calorie water",
    "natural flavored water",
    "healthy hydration",
    "peach raspberry water",
    "watermelon water",
    "blackberry water",
    "subscribe and save drinks",
  ],
  authors: [{ name: "Hint Water, Inc." }],
  creator: "Hint Water",
  publisher: "Hint Water",
  category: "Beverages",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hint® Water | Pure Crisp Fruit-Infused Water with 0 Sugar & 0 Calories",
    description:
      "Delicious purified water infused with real fruit essences. No sugar, no diet sweeteners, no preservatives, and 0 calories. Discover our signature flavors today!",
    url: "https://hintwater.com",
    siteName: "Hint Water",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/peachRaspberry.svg",
        width: 1200,
        height: 630,
        alt: "Hint® Peach Raspberry Fruit Infused Water Bottle",
      },
      {
        url: "/images/watermelon.webp",
        width: 1200,
        height: 630,
        alt: "Hint® Watermelon Fruit Infused Water Bottle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hint® Water | Pure Crisp Fruit-Infused Water",
    description:
      "0 Sugar, 0 Diet Sweeteners, 0 Calories. Crisp pure water infused with natural fruit essences.",
    creator: "@hintwater",
    images: ["/images/peachRaspberry.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        notoSansHeading.variable
      )}
    >
      <head>
        <ProductSchema />
      </head>
      <body>
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
        <Toaster position="bottom-left" />
        <SpeedInsights />
      </body>
    </html>
  );
}
