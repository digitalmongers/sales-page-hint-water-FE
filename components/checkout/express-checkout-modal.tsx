"use client";

import { useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SecurityCheckIcon,
  DeliveryBox01Icon,
  Ticket01Icon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "../ui/badge";
import {
  validateEmail,
  validateName,
  validateAddress,
  validateCity,
  validateState,
  validateZip,
  validateCardNumber,
  validateExpiry,
  validateCvc,
  validatePromoCode,
  formatCardNumber,
  formatExpiry,
  formatZipCode,
  detectCardBrand,
  sanitizeDigits,
  type CardBrand,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 40.0;

/* Official Payment Brand SVGs */
function ApplePaySvg() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5 fill-current" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.88-.9.04-2 .6-2.65 1.35-.57.65-1.06 1.72-.93 2.76 1.01.08 1.95-.48 2.57-1.23Z" />
    </svg>
  );
}

function GooglePaySvg() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.5-5.2 3.5-9.1Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 8-3l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1C3.3 21.3 7.4 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.1c-.2-.7-.4-1.4-.4-2.1s.2-1.4.4-2.1V6.8H1.3C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5.2l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.3 2.7 1.3 6.8l4 3.1c.9-2.9 3.6-5.1 6.7-5.1Z"
      />
    </svg>
  );
}

function ShopPaySvg() {
  return (
    <span className="font-extrabold italic tracking-tight text-white text-sm">
      shop<span className="text-sky-300">Pay</span>
    </span>
  );
}

function VisaBadge({ active }: { active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-black italic transition-all ${
        active
          ? "border-blue-600 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 ring-2 ring-blue-500/30"
          : "border-blue-900/20 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700/60 dark:text-blue-400/60"
      }`}
    >
      VISA
    </span>
  );
}

function MastercardBadge({ active }: { active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[10px] font-bold transition-all ${
        active
          ? "border-amber-600 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 ring-2 ring-amber-500/30"
          : "border-amber-900/20 bg-amber-50/50 dark:bg-amber-950/40 text-amber-700/60 dark:text-amber-400/60"
      }`}
    >
      <span className="size-2 rounded-full bg-red-500 inline-block -mr-1"></span>
      <span className="size-2 rounded-full bg-amber-400 inline-block"></span>
    </span>
  );
}

function AmexBadge({ active }: { active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-extrabold transition-all ${
        active
          ? "border-sky-500 bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 ring-2 ring-sky-500/30"
          : "border-sky-900/20 bg-sky-50/50 dark:bg-sky-950/40 text-sky-700/60 dark:text-sky-400/60"
      }`}
    >
      AMEX
    </span>
  );
}

export function ExpressCheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutItems,
    clearCart,
  } = useCart();

  // Tab & Shipping states
  const [shippingMethod, setShippingMethod] = useState<"standard" | "priority">("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Promo Code State
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Form Fields & Validation State
  const [email, setEmail] = useState("alex.morgan@example.com");
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Morgan");
  const [address, setAddress] = useState("742 Evergreen Terrace");
  const [city, setCity] = useState("Springfield");
  const [state, setState] = useState("IL");
  const [zip, setZip] = useState("62704");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardBrand, setCardBrand] = useState<CardBrand>("visa");
  const [expiry, setExpiry] = useState("08/28");
  const [cvc, setCvc] = useState("888");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const itemsToBuy = checkoutItems.length > 0 ? checkoutItems : [];

  const rawSubtotal = itemsToBuy.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (rawSubtotal * appliedDiscount) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);

  const isFreeStandardShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const standardShippingCost = isFreeStandardShipping ? 0 : 4.99;
  const shippingCost = shippingMethod === "priority" ? 9.99 : standardShippingCost;

  const estimatedTax = subtotal * 0.06; // 6% tax estimate
  const total = subtotal > 0 ? subtotal + shippingCost + estimatedTax : 0;

  // Real-time Input Handlers
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handleFirstNameChange = (val: string) => {
    setFirstName(val);
    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
  };

  const handleLastNameChange = (val: string) => {
    setLastName(val);
    if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
  };

  const handleAddressChange = (val: string) => {
    setAddress(val);
    if (errors.address) setErrors((prev) => ({ ...prev, address: "" }));
  };

  const handleCityChange = (val: string) => {
    setCity(val);
    if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
  };

  const handleStateChange = (val: string) => {
    const formatted = val.toUpperCase().slice(0, 2);
    setState(formatted);
    if (errors.state) setErrors((prev) => ({ ...prev, state: "" }));
  };

  const handleZipChange = (val: string) => {
    const formatted = formatZipCode(val);
    setZip(formatted);
    if (errors.zip) setErrors((prev) => ({ ...prev, zip: "" }));
  };

  const handleCardNumberChange = (val: string) => {
    const formatted = formatCardNumber(val);
    setCardNumber(formatted);
    const brand = detectCardBrand(val);
    setCardBrand(brand);
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: "" }));
  };

  const handleExpiryChange = (val: string) => {
    const formatted = formatExpiry(val);
    setExpiry(formatted);
    if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: "" }));
  };

  const handleCvcChange = (val: string) => {
    const digits = sanitizeDigits(val).slice(0, 4);
    setCvc(digits);
    if (errors.cvc) setErrors((prev) => ({ ...prev, cvc: "" }));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const promoCheck = validatePromoCode(promoCode);
    if (!promoCheck.isValid) {
      toast.error(promoCheck.error || "Please enter a valid coupon code.");
      return;
    }
    const code = promoCheck.sanitizedValue || promoCode.trim().toUpperCase();
    if (code === "HINT10" || code === "SAVE10" || code === "WELCOME" || code === "HINT15") {
      setAppliedDiscount(10);
      toast.success(`Promo code ${code} applied (10% OFF)!`);
      setPromoCode(code);
    } else {
      toast.error("Invalid coupon code. Try 'HINT10' or 'SAVE10'");
    }
  };

  const handlePlaceOrder = (expressMethod?: string) => {
    if (!expressMethod) {
      // Validate all form fields using regex and rules
      const newErrors: Record<string, string> = {};

      const emailCheck = validateEmail(email);
      if (!emailCheck.isValid) newErrors.email = emailCheck.error!;

      const fnCheck = validateName(firstName, "First name");
      if (!fnCheck.isValid) newErrors.firstName = fnCheck.error!;

      const lnCheck = validateName(lastName, "Last name");
      if (!lnCheck.isValid) newErrors.lastName = lnCheck.error!;

      const addrCheck = validateAddress(address);
      if (!addrCheck.isValid) newErrors.address = addrCheck.error!;

      const cityCheck = validateCity(city);
      if (!cityCheck.isValid) newErrors.city = cityCheck.error!;

      const stateCheck = validateState(state);
      if (!stateCheck.isValid) newErrors.state = stateCheck.error!;

      const zipCheck = validateZip(zip);
      if (!zipCheck.isValid) newErrors.zip = zipCheck.error!;

      const cardCheck = validateCardNumber(cardNumber);
      if (!cardCheck.isValid) newErrors.cardNumber = cardCheck.error!;

      const expiryCheck = validateExpiry(expiry);
      if (!expiryCheck.isValid) newErrors.expiry = expiryCheck.error!;

      const cvcCheck = validateCvc(cvc, cardBrand);
      if (!cvcCheck.isValid) newErrors.cvc = cvcCheck.error!;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        const firstError = Object.values(newErrors)[0];
        toast.error(firstError);
        return;
      }
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderNum = `HINT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setIsSuccess(true);
      clearCart();
      toast.success(
        expressMethod
          ? `Instant checkout approved via ${expressMethod}!`
          : "Order placed successfully!"
      );
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={handleClose}>
      <DialogContent
        id="express-checkout-dialog"
        className="max-h-[92vh] overflow-y-auto overflow-x-hidden w-[calc(100%-1rem)] sm:w-full sm:max-w-4xl p-0 gap-0 bg-white dark:bg-card border border-border text-foreground shadow-2xl"
      >
        {isSuccess ? (
          /* ==================== SHADCN ORDER CONFIRMATION SCREEN ==================== */
          <div className="p-4 sm:p-12 flex flex-col items-center text-center w-full max-w-full overflow-x-hidden">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-5 ring-8 ring-emerald-500/5 shadow-inner"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-10 stroke-current stroke-[2.5] fill-none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </motion.div>

            <Badge variant="default">
              Order Confirmed
            </Badge>

            <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-white tracking-tight break-words">
              Thank You for Your Order!
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground max-w-md">
              We&apos;ve sent your order receipt and tracking link to{" "}
              <span className="font-semibold text-foreground break-all">{email}</span>.
            </DialogDescription>

            {/* Order Details Card */}
            <Card className="mt-6 w-full max-w-lg border-border bg-muted/40 p-4 sm:p-5 text-left gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold uppercase text-muted-foreground">Order Number</span>
                  <p className="text-sm font-extrabold text-blue-950 dark:text-white flex items-center gap-2 flex-wrap">
                    <span className="break-all">{orderNumber}</span>
                    <Button
                      variant="link"
                      size="xs"
                      onClick={() => {
                        navigator.clipboard?.writeText(orderNumber);
                        toast.success("Order number copied to clipboard");
                      }}
                      className="h-auto p-0 text-xs font-semibold text-blue-600 dark:text-blue-400"
                    >
                      Copy
                    </Button>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold uppercase text-muted-foreground">Total Charged</span>
                  <p className="text-sm font-extrabold text-blue-950 dark:text-blue-400">
                    ${total.toFixed(2)} USD
                  </p>
                </div>
              </div>

              {/* Delivery Progress Bar */}
              <div>
                <span className="text-[11px] font-semibold uppercase text-muted-foreground">Estimated Delivery</span>
                <p className="text-xs font-semibold text-foreground mt-0.5">
                  {shippingMethod === "priority" ? "1 – 2 Business Days via Express Air" : "3 – 5 Business Days via Standard Ground"}
                </p>
                <div className="mt-3">
                  <Progress value={50} className="h-1.5 bg-muted" />
                </div>
                <div className="grid grid-cols-4 text-[9px] sm:text-[10px] text-muted-foreground mt-1 font-medium text-center">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-left">Order Placed</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Processing</span>
                  <span>Shipped</span>
                  <span className="text-right">Delivered</span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="divide-y divide-border border-t border-border pt-3">
                {itemsToBuy.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative size-10 shrink-0 rounded-lg bg-card border border-border p-1 flex items-center justify-center">
                        <Image src={item.image} alt={item.name} width={36} height={36} className="size-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{item.flavor} • Qty {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-foreground shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Button
              id="checkout-continue-shopping-btn"
              size="lg"
              onClick={handleClose}
              className="mt-6 w-full max-w-lg bg-blue-950 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-6 text-sm rounded-xl cursor-pointer shadow-md transition-all duration-200"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          /* ==================== SHADCN CHECKOUT SCREEN ==================== */
          <div className="w-full max-w-full overflow-x-hidden">
            {/* Top Security Header */}
            <DialogHeader className="p-0">
              <div className="flex items-center justify-between pl-4 sm:pl-6 pr-12 sm:pr-14 py-3.5 sm:py-4 border-b border-border bg-card gap-2 min-w-0">
                <div className="flex items-center gap-2 min-w-0 shrink">
                  <DialogTitle className="text-base sm:text-lg font-black tracking-tight text-blue-950 dark:text-white shrink-0">
                    Hint<sup className="text-[10px]">®</sup>
                  </DialogTitle>
                  <span className="text-muted-foreground/40">|</span>
                  <DialogDescription className="text-xs font-semibold text-muted-foreground truncate">
                    Express Checkout
                  </DialogDescription>
                </div>

                <Badge className="gap-1 text-[11px] sm:text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 sm:px-3 py-1 rounded-full border border-emerald-200/80 dark:border-emerald-800/80 shrink-0">
                  <HugeiconsIcon icon={SecurityCheckIcon} className="size-3.5 sm:size-4" />
                  <span className="hidden sm:inline">256-Bit </span>SSL Encrypted
                </Badge>
              </div>
            </DialogHeader>

            {/* Split Columns Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border w-full max-w-full">
              {/* LEFT COLUMN: Checkout Form (7 cols) */}
              <div className="lg:col-span-7 p-4 sm:p-7 space-y-6 min-w-0">
                {/* 1. Express 1-Click Pay Options (Shopify / ShopPay Standard) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Express Checkout
                    </span>
                    <span className="text-[11px] text-muted-foreground">1-click instant order</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {/* Shop Pay */}
                    <Button
                      size="lg"
                      disabled={isSubmitting}
                      onClick={() => handlePlaceOrder("Shop Pay")}
                      className="bg-[#5A31F4] hover:bg-[#4924D6] text-white flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-98 min-w-0 px-1 sm:px-2.5"
                      title="Pay with Shop Pay"
                    >
                      <ShopPaySvg />
                    </Button>

                    {/* Apple Pay */}
                    <Button
                      size="lg"
                      disabled={isSubmitting}
                      onClick={() => handlePlaceOrder("Apple Pay")}
                      className="bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-white flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer shadow-xs transition-transform active:scale-98 min-w-0 px-1 sm:px-2.5"
                      title="Pay with Apple Pay"
                    >
                      <ApplePaySvg />
                      <span className="font-semibold text-xs">Pay</span>
                    </Button>

                    {/* Google Pay */}
                    <Button
                      size="lg"
                      disabled={isSubmitting}
                      onClick={() => handlePlaceOrder("Google Pay")}
                      variant="outline"
                      className="bg-white hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 border-border flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer shadow-xs transition-transform active:scale-98 min-w-0 px-1 sm:px-2.5"
                      title="Pay with Google Pay"
                    >
                      <GooglePaySvg />
                      <span className="font-semibold text-xs text-foreground">Pay</span>
                    </Button>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <Separator className="w-full bg-border" />
                  <span className="absolute bg-card px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Or Continue with card
                  </span>
                </div>

                {/* 2. Customer Contact */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="checkout-email" className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Contact Information <span className="text-rose-500">*</span>
                    </Label>
                    <span className="text-[11px] text-muted-foreground">Receipt will be sent here</span>
                  </div>
                  <Input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="name@example.com"
                    aria-invalid={!!errors.email}
                    className={cn(
                      "bg-background border-input",
                      errors.email && "border-rose-500 focus-visible:ring-rose-500/20"
                    )}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.email}</p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="opt-in-news"
                      defaultChecked
                      className="size-3.5 border-input text-primary focus:ring-ring dark:bg-background"
                    />
                    <Label htmlFor="opt-in-news" className="text-xs text-muted-foreground font-normal cursor-pointer">
                      Keep me updated with order tracking and exclusive flavor drops
                    </Label>
                  </div>
                </div>

                {/* 3. Shipping Address */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                    Shipping Address
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div className="min-w-0">
                        <Label htmlFor="first-name" className="text-[11px] text-muted-foreground">
                          First Name <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="first-name"
                          value={firstName}
                          onChange={(e) => handleFirstNameChange(e.target.value)}
                          placeholder="First Name"
                          aria-invalid={!!errors.firstName}
                          className={cn(
                            "mt-1 bg-background border-input text-xs sm:text-sm",
                            errors.firstName && "border-rose-500 focus-visible:ring-rose-500/20"
                          )}
                        />
                        {errors.firstName && (
                          <p className="text-[11px] text-rose-500 mt-0.5">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Label htmlFor="last-name" className="text-[11px] text-muted-foreground">
                          Last Name <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="last-name"
                          value={lastName}
                          onChange={(e) => handleLastNameChange(e.target.value)}
                          placeholder="Last Name"
                          aria-invalid={!!errors.lastName}
                          className={cn(
                            "mt-1 bg-background border-input text-xs sm:text-sm",
                            errors.lastName && "border-rose-500 focus-visible:ring-rose-500/20"
                          )}
                        />
                        {errors.lastName && (
                          <p className="text-[11px] text-rose-500 mt-0.5">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <Label htmlFor="address-line" className="text-[11px] text-muted-foreground">
                        Street Address <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        id="address-line"
                        value={address}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        placeholder="Street Address (e.g. 742 Evergreen Terrace)"
                        aria-invalid={!!errors.address}
                        className={cn(
                          "mt-1 bg-background border-input text-xs sm:text-sm",
                          errors.address && "border-rose-500 focus-visible:ring-rose-500/20"
                        )}
                      />
                      {errors.address && (
                        <p className="text-[11px] text-rose-500 mt-0.5">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      <div className="min-w-0">
                        <Label htmlFor="city-input" className="text-[11px] text-muted-foreground">
                          City <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="city-input"
                          value={city}
                          onChange={(e) => handleCityChange(e.target.value)}
                          placeholder="City"
                          aria-invalid={!!errors.city}
                          className={cn(
                            "mt-1 bg-background border-input text-xs sm:text-sm px-2 sm:px-2.5",
                            errors.city && "border-rose-500 focus-visible:ring-rose-500/20"
                          )}
                        />
                        {errors.city && (
                          <p className="text-[10px] text-rose-500 mt-0.5 truncate">{errors.city}</p>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Label htmlFor="state-input" className="text-[11px] text-muted-foreground">
                          State <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="state-input"
                          value={state}
                          onChange={(e) => handleStateChange(e.target.value)}
                          placeholder="IL"
                          maxLength={2}
                          aria-invalid={!!errors.state}
                          className={cn(
                            "mt-1 bg-background border-input text-xs sm:text-sm px-2 sm:px-2.5 uppercase font-medium",
                            errors.state && "border-rose-500 focus-visible:ring-rose-500/20"
                          )}
                        />
                        {errors.state && (
                          <p className="text-[10px] text-rose-500 mt-0.5 truncate">{errors.state}</p>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Label htmlFor="zip-input" className="text-[11px] text-muted-foreground">
                          ZIP <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="zip-input"
                          value={zip}
                          onChange={(e) => handleZipChange(e.target.value)}
                          placeholder="62704"
                          maxLength={10}
                          aria-invalid={!!errors.zip}
                          className={cn(
                            "mt-1 bg-background border-input text-xs sm:text-sm px-2 sm:px-2.5 font-mono",
                            errors.zip && "border-rose-500 focus-visible:ring-rose-500/20"
                          )}
                        />
                        {errors.zip && (
                          <p className="text-[10px] text-rose-500 mt-0.5 truncate">{errors.zip}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Shipping Method with Shadcn RadioGroup */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                    Shipping Method
                  </h3>
                  <RadioGroup
                    value={shippingMethod}
                    onValueChange={(val) => setShippingMethod(val as "standard" | "priority")}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                  >
                    {/* Standard */}
                    <Card
                      onClick={() => setShippingMethod("standard")}
                      className={`flex flex-row items-center justify-between p-3 cursor-pointer transition-all gap-0 ${
                        shippingMethod === "standard"
                          ? "border-blue-950 bg-blue-50/60 dark:border-blue-500 dark:bg-blue-950/30 ring-1 ring-blue-950 dark:ring-blue-500"
                          : "border-border bg-card hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <RadioGroupItem value="standard" id="shipping-standard" />
                        <div>
                          <Label htmlFor="shipping-standard" className="text-xs font-bold text-foreground cursor-pointer block">
                            Standard Delivery
                          </Label>
                          <p className="text-[11px] text-muted-foreground">3 – 5 business days</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {isFreeStandardShipping ? "FREE" : "$4.99"}
                      </span>
                    </Card>

                    {/* Priority */}
                    <Card
                      onClick={() => setShippingMethod("priority")}
                      className={`flex flex-row items-center justify-between p-3 cursor-pointer transition-all gap-0 ${
                        shippingMethod === "priority"
                          ? "border-blue-950 bg-blue-50/60 dark:border-blue-500 dark:bg-blue-950/30 ring-1 ring-blue-950 dark:ring-blue-500"
                          : "border-border bg-card hover:border-muted-foreground/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <RadioGroupItem value="priority" id="shipping-priority" />
                        <div>
                          <Label htmlFor="shipping-priority" className="text-xs font-bold text-foreground cursor-pointer block">
                            Priority 1-Day Air
                          </Label>
                          <p className="text-[11px] text-muted-foreground">Guaranteed next day</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-foreground">
                        $9.99
                      </span>
                    </Card>
                  </RadioGroup>
                </div>

                {/* 5. Payment Method & Credit Card Details */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Payment Details
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <VisaBadge active={cardBrand === "visa"} />
                      <MastercardBadge active={cardBrand === "mastercard"} />
                      <AmexBadge active={cardBrand === "amex"} />
                    </div>
                  </div>

                  <Card className="border-border bg-muted/40 p-4 space-y-3 gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="checkout-card-number" className="text-[11px] text-muted-foreground">
                          Card Number <span className="text-rose-500">*</span>
                        </Label>
                        <span className="text-[10px] text-muted-foreground uppercase font-mono">
                          {cardBrand !== "unknown" ? cardBrand : "Card"}
                        </span>
                      </div>
                      <Input
                        id="checkout-card-number"
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        aria-invalid={!!errors.cardNumber}
                        className={cn(
                          "mt-1 bg-background font-mono text-sm border-input",
                          errors.cardNumber && "border-rose-500 focus-visible:ring-rose-500/20"
                        )}
                      />
                      {errors.cardNumber && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="min-w-0">
                        <Label htmlFor="checkout-card-expiry" className="text-[11px] text-muted-foreground">
                          Expiration (MM/YY) <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="checkout-card-expiry"
                          value={expiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          aria-invalid={!!errors.expiry}
                          className={cn(
                            "mt-1 bg-background font-mono text-sm border-input",
                            errors.expiry && "border-rose-500 focus-visible:ring-rose-500/20"
                          )}
                        />
                        {errors.expiry && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.expiry}</p>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Label htmlFor="checkout-card-cvc" className="text-[11px] text-muted-foreground">
                          Security CVC <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          id="checkout-card-cvc"
                          value={cvc}
                          onChange={(e) => handleCvcChange(e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          aria-invalid={!!errors.cvc}
                          className={cn(
                            "mt-1 bg-background font-mono text-sm border-input",
                            errors.cvc && "border-rose-500 focus-visible:ring-rose-500/20"
                          )}
                        />
                        {errors.cvc && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.cvc}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* RIGHT COLUMN: Order Summary & Pay Action (5 cols) */}
              <div className="lg:col-span-5 p-4 sm:p-7 bg-muted/30 flex flex-col justify-between space-y-6 min-w-0">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <h3 className="text-sm font-bold text-blue-950 dark:text-white">
                      Order Summary
                    </h3>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {itemsToBuy.reduce((sum, i) => sum + i.quantity, 0)} items
                    </span>
                  </div>

                  {/* Items list with Shopify-style floating count badge */}
                  <div className="mt-4 space-y-3.5 max-h-56 overflow-y-auto pr-1">
                    {itemsToBuy.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3.5"
                      >
                        {/* Thumbnail with floating quantity badge */}
                        <div className="relative size-14 shrink-0 rounded-xl bg-card border border-border p-1 flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="size-full object-contain"
                          />
                          <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-blue-950 dark:bg-blue-600 text-[10px] font-bold text-white shadow-xs">
                            {item.quantity}
                          </span>
                        </div>

                        {/* Title and details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-foreground truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {item.flavor}
                          </p>
                          {item.isSubscription && (
                            <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              ✓ Auto-delivery applied
                            </span>
                          )}
                        </div>

                        {/* Line price */}
                        <span className="text-xs font-bold text-foreground shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="mt-5 flex gap-2">
                    <div className="relative flex-1 min-w-0">
                      <HugeiconsIcon
                        icon={Ticket01Icon}
                        className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                      />
                      <Input
                        type="text"
                        placeholder="Discount code (e.g. HINT10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-9 text-xs uppercase tracking-wider bg-background border-input min-w-0"
                      />
                    </div>
                    <Button
                      variant="secondary"
                      className="text-xs font-semibold px-3 sm:px-4 cursor-pointer shrink-0"
                    >
                      Apply
                    </Button>
                  </form>

                  {/* Price Calculations */}
                  <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-semibold text-foreground">
                        ${rawSubtotal.toFixed(2)}
                      </span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>Discount ({appliedDiscount}% OFF)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      {shippingCost === 0 ? (
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          FREE
                        </span>
                      ) : (
                        <span className="font-semibold text-foreground">
                          ${shippingCost.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>Estimated Taxes</span>
                      <span className="font-semibold text-foreground">
                        ${estimatedTax.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline pt-3 border-t border-border text-sm font-extrabold text-blue-950 dark:text-white">
                      <span>Total Due</span>
                      <span className="text-xl text-blue-950 dark:text-blue-400">
                        ${total.toFixed(2)}{" "}
                        <span className="text-xs font-normal text-muted-foreground">USD</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Final Order CTA */}
                <div className="space-y-3 pt-4">
                  <Button
                    id="checkout-place-order-btn"
                    size="lg"
                    disabled={isSubmitting || itemsToBuy.length === 0}
                    onClick={() => handlePlaceOrder()}
                    className="w-full bg-blue-950 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-6 text-sm rounded-xl cursor-pointer shadow-lg transition-transform active:scale-98"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Spinner className="size-4" />
                        Authorizing Secure Payment...
                      </span>
                    ) : (
                      <span>Complete Purchase • ${total.toFixed(2)}</span>
                    )}
                  </Button>

                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground pt-1 text-center">
                    <span>✓ 30-Day Guarantee</span>
                    <span className="hidden xs:inline sm:inline">•</span>
                    <span>✓ Free Returns</span>
                    <span className="hidden xs:inline sm:inline">•</span>
                    <span>✓ Instant Confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
