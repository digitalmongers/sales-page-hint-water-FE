"use client";

import { useEffect, useState } from "react";
import { ProductDetails } from "@/components/product/product-details";
import Image from "next/image";
import { RelatedProducts } from "@/components/product/related-products";
import { FAQSection } from "@/components/product/faq-section";
import { ReviewSection } from "@/components/product/review-section";
import { NutritionSection } from "@/components/product/nutrition-section";
import { Footer } from "@/components/layout/footer";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingBag01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { LoginModal, type UserProfile } from "@/components/auth/login-modal";
import { LogoutModal } from "@/components/auth/logout-modal";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white">
      {/* Slide-in Header (Visible on Scroll) */}
      <header
        aria-hidden={!isScrolled}
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-xs transition-all duration-300 ease-in-out ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-950 transition-colors">Water</a>
            <a href="#" className="hover:text-blue-950 transition-colors">Our story</a>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <a
              href="#"
              aria-label="Hint home"
              className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight"
            >
              Hint Water
            </a>
          </div>

          <div className="ml-auto flex items-center gap-3 sm:gap-4 text-sm font-medium text-gray-700">
            <Button
              id="sticky-cart-btn"
              variant="ghost"
              size="icon"
              aria-label="Shopping cart"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 hover:text-blue-950 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={ShoppingBag01Icon} className="size-6" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-blue-950 text-[10px] font-bold text-white ring-2 ring-white">
                1
              </span>
            </Button>
            {user ? (
              <button
                id="sticky-user-avatar-btn"
                type="button"
                onClick={() => setIsLogoutOpen(true)}
                className="group relative flex items-center gap-2 rounded-full p-0.5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                title={`${user.name} — Log out`}
                aria-label={`${user.name} profile, click to log out`}
              >
                <Avatar className="size-8 ring-2 ring-blue-950/20 group-hover:ring-blue-950 transition-all shadow-xs">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-blue-950 text-white font-medium text-xs">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            ) : (
              <Button
                id="sticky-login-btn"
                variant="link"
                onClick={() => setIsLoginOpen(true)}
                className="text-sm font-medium text-blue-950 hover:text-blue-900"
              >
                Login
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Static Default Header (Normal flow, non-sticky) */}
      <header className="w-full border-b border-gray-100 bg-white">
        {/* Announcement bar */}
        <div className="bg-blue-950 text-white flex items-center justify-center py-2 px-4 text-xs font-bold text-center">
          <p>Hint Water is Now LIVE!</p>
        </div>

        {/* Main Navigation */}
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Left Group (visible on medium screens and up) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-950 transition-colors">Water</a>
            <a href="#" className="hover:text-blue-950 transition-colors">Our story</a>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <a
              href="#"
              aria-label="Hint home"
              className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight"
            >
              Hint Water
            </a>
          </div>

          {/* Right Group */}
          <div className="ml-auto flex items-center gap-3 sm:gap-4 text-sm font-medium text-gray-700">
            <Button
              id="header-cart-btn"
              aria-label="Shopping cart"
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 hover:text-blue-950 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={ShoppingBag01Icon} className="size-6" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-blue-950 text-[10px] font-bold text-white ring-2 ring-white">
                1
              </span>
            </Button>
            {user ? (
              <button
                id="header-user-avatar-btn"
                type="button"
                onClick={() => setIsLogoutOpen(true)}
                className="group relative flex items-center gap-2 rounded-full p-0.5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                title={`${user.name} — Log out`}
                aria-label={`${user.name} profile, click to log out`}
              >
                <Avatar className="size-8 ring-2 ring-blue-950/20 group-hover:ring-blue-950 transition-all shadow-xs">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="bg-blue-950 text-white font-medium text-xs">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            ) : (
              <Button
                id="header-login-btn"
                variant="link"
                onClick={() => setIsLoginOpen(true)}
                className="text-sm font-medium text-blue-950 hover:text-blue-900"
              >
                Login
              </Button>
            )}
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
      <NutritionSection />
      <ReviewSection />
      <FAQSection />
      <Footer />

      <LoginModal
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onLoginSuccess={setUser}
      />

      <LogoutModal
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        user={user}
        onConfirmLogout={() => {
          setUser(null);
          toast.success("Logged out successfully");
        }}
      />

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </main>
  );
}
