"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { MinusSignIcon, PlusSignIcon, ShoppingBasket01Icon, ShoppingBasketSecure02Icon } from "@hugeicons/core-free-icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AnimateNumber } from "@/components/ui/animate-number";
import { ScrambleText } from "@/components/ui/scramble-text";
import { toast } from "@/components/ui/sonner";
import { motion, type Variants } from "motion/react";
import { useCart } from "@/hooks/use-cart";

const dummyReviewers = [
    { name: "Sarah M.", location: "Austin, TX", stars: 5, comment: "Love the fresh peach raspberry taste!" },
    { name: "David L.", location: "Seattle, WA", stars: 5, comment: "Crisp and clean, perfect for everyday hydration." },
    { name: "Emily R.", location: "Denver, CO", stars: 5, comment: "No sugar, no calories, tastes like real fruit!" },
    { name: "Michael K.", location: "Chicago, IL", stars: 5, comment: "Zero artificial aftertaste. My whole family loves it." },
    { name: "Jessica B.", location: "San Diego, CA", stars: 5, comment: "Replaced all sugary drinks with Hint. 10/10!" },
    { name: "Alex P.", location: "Miami, FL", stars: 5, comment: "Super refreshing after workouts!" },
    { name: "Chloe H.", location: "Portland, OR", stars: 5, comment: "Hands down the best flavored water on the market." },
    { name: "James T.", location: "Boston, MA", stars: 5, comment: "Crisp flavor without any weird sweetness." },
];

const buttonHoverVariants: Variants = {
    initial: { scale: 1, y: 0 },
    hover: {
        scale: 1.015,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    tap: {
        scale: 0.985,
        y: 0,
        transition: { type: "spring", stiffness: 500, damping: 20 },
    },
};

const buyIconVariants: Variants = {
    initial: { y: 0, scale: 1 },
    hover: {
        y: [-2, -5, -2],
        scale: 1.15,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

const cartIconVariants: Variants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
        rotate: [-8, 8, -4, 4, 0],
        scale: 1.15,
        transition: { duration: 0.45, ease: "easeInOut" },
    },
};

const shimmerVariants: Variants = {
    initial: { x: "-150%", skewX: -20 },
    hover: {
        x: "250%",
        transition: { duration: 0.75, ease: "easeInOut" },
    },
};

export interface ProductDetailsProps {
    selectedFlavor?: string;
    onSelectFlavor?: (id: string) => void;
}

export function ProductDetails({
    selectedFlavor: selectedFlavorProp,
    onSelectFlavor,
}: ProductDetailsProps = {}) {
    const { addToCart, triggerBuyNow } = useCart();

    const flavors = [
        { id: "peach-raspberry", name: "Raspberry", image: "/images/peachRaspberry.svg" },
        { id: "watermelon", name: "Watermelon", image: "/images/watermelon.webp" },
        { id: "black-berry", name: "Black Berry", image: "/images/blackberry.webp" },
        { id: "coconut", name: "Coconut", image: "/images/coconut.webp" },
        { id: "pineapple", name: "Pineapple", image: "/images/pineapple.webp" },
    ];

    const [internalFlavor, setInternalFlavor] = useState(flavors[0].id);
    const selectedFlavor = selectedFlavorProp ?? internalFlavor;

    const handleFlavorSelect = (id: string) => {
        setInternalFlavor(id);
        onSelectFlavor?.(id);
    };

    const [purchaseType, setPurchaseType] = useState("one-time");
    const [quantity, setQuantity] = useState(1);
    const price = purchaseType === "subscribe" ? 18.99 : 22.99;

    const productTitle =
        flavors.find((item) => item.id === selectedFlavor)?.name ?? "Hint Water";

    const totalPrice = (price * quantity).toFixed(2);
    const [deliveryFrequency, setDeliveryFrequency] = useState("30");
    const [reviewCount, setReviewCount] = useState(6729);

    const handleAddToCart = () => {
        const currentFlavor = flavors.find((item) => item.id === selectedFlavor);
        addToCart({
            id: `hint-${selectedFlavor}-${purchaseType}`,
            name: `${productTitle} Hint Water`,
            flavor: `${productTitle} (12-pack)${
                purchaseType === "subscribe" ? ` • Delivery every ${deliveryFrequency || "30"} days` : ""
            }`,
            price,
            quantity,
            image: currentFlavor?.image || "/images/peachRaspberry.svg",
            isSubscription: purchaseType === "subscribe",
        });
    };

    const handleBuyNow = () => {
        const currentFlavor = flavors.find((item) => item.id === selectedFlavor);
        triggerBuyNow({
            id: `hint-${selectedFlavor}-${purchaseType}`,
            name: `${productTitle} Hint Water`,
            flavor: `${productTitle} (12-pack)${
                purchaseType === "subscribe" ? ` • Delivery every ${deliveryFrequency || "30"} days` : ""
            }`,
            price,
            quantity,
            image: currentFlavor?.image || "/images/peachRaspberry.svg",
            isSubscription: purchaseType === "subscribe",
        });
    };

    const lastReviewerIndexRef = useRef(-1);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        const getRandomReviewer = () => {
            let nextIndex: number;
            do {
                nextIndex = Math.floor(Math.random() * dummyReviewers.length);
            } while (
                nextIndex === lastReviewerIndexRef.current &&
                dummyReviewers.length > 1
            );
            lastReviewerIndexRef.current = nextIndex;
            return dummyReviewers[nextIndex];
        };

        const triggerReview = () => {
            const reviewer = getRandomReviewer();

            setReviewCount((prev) => prev + 1);

            toast.custom(
                () => (
                    <div className="flex w-full items-start gap-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-card p-3.5 shadow-lg">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-950 dark:bg-blue-600 font-bold text-xs text-white">
                            {reviewer.name.slice(0, 1)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                                <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">
                                    {reviewer.name}
                                </p>
                                <span className="text-[10px] text-gray-400">{reviewer.location}</span>
                            </div>
                            <div className="my-0.5 flex text-xs text-amber-400">
                                {"★".repeat(reviewer.stars)}
                            </div>
                            <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-300">
                                "{reviewer.comment}"
                            </p>
                            <div className="mt-1 flex items-center justify-between text-[10px]">
                                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                    ✓ Verified Customer Review
                                </span>
                                <span className="text-gray-400">Just now</span>
                            </div>
                        </div>
                    </div>
                ),
                { duration: 5000 }
            );

            // Schedule next review with natural organic delay (between 50s and 75s)
            const nextDelay = Math.floor(Math.random() * 25000) + 50000;
            timerId = setTimeout(triggerReview, nextDelay);
        };

        // First review pops up after 6 seconds
        timerId = setTimeout(triggerReview, 6000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    const items = [
        { label: "Delivery frequency", value: null },
        { label: "15 Days", value: "15" },
        { label: "30 Days", value: "30" },
        { label: "45 Days", value: "45" },
        { label: "60 Days", value: "60" },
    ]

    return (
        <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-blue-950 dark:text-white">
                <ScrambleText text={productTitle} /> Hint Water
            </h1>
            <p className="mt-2 flex items-center gap-3">
                <span className="font-semibold text-sm">
                    ⭐⭐⭐⭐⭐ 4.9
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                    <AnimateNumber>{reviewCount}</AnimateNumber> Reviews
                </span>
            </p>

            <div className="mt-5">
                <p className="text-2xl font-semibold text-blue-950 dark:text-blue-400">
                    ${price.toFixed(2)}
                </p>

                {purchaseType === "subscribe" && (
                    <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                        Subscription savings applied
                    </p>
                )}
            </div>

            <div className="mt-8">
                <h2 className="mb-3 font-bold text-gray-900 dark:text-gray-100">Choose your flavor</h2>

                <div className="flex flex-wrap gap-2">
                    {flavors.map((item) => {
                        const isSelected = selectedFlavor === item.id;
                        return (
                            <Button
                                size="sm"
                                key={item.id}
                                variant={isSelected ? "default" : "outline"}
                                className={
                                    isSelected
                                        ? "bg-blue-950 text-white border-blue-950 hover:bg-blue-900 dark:bg-blue-600 dark:border-blue-500 dark:hover:bg-blue-500 shadow-xs font-semibold"
                                        : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                                }
                                onClick={() => handleFlavorSelect(item.id)}
                            >
                                {item.name}
                            </Button>
                        );
                    })}
                </div>

                <div className="mt-8">
                    <h2 className="mb-3 font-bold text-gray-900 dark:text-gray-100">Purchase options</h2>

                    <RadioGroup
                        value={purchaseType}
                        onValueChange={(value) => setPurchaseType(value as string)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                        <Label
                            htmlFor="purchase-one-time"
                            className={`flex w-full cursor-pointer items-start justify-between rounded-lg border p-4 transition-colors ${purchaseType === "one-time"
                                ? "border-blue-950 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40"
                                : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:bg-card dark:hover:border-gray-700"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <RadioGroupItem value="one-time" id="purchase-one-time" className="mt-0.5" />
                                <div>
                                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                                        One Time Purchase
                                    </span>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                $22.99
                            </span>
                        </Label>

                        <Label
                            htmlFor="purchase-subscribe"
                            className={`flex w-full cursor-pointer items-start justify-between rounded-lg border p-4 transition-colors ${purchaseType === "subscribe"
                                ? "border-blue-950 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40"
                                : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:bg-card dark:hover:border-gray-700"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <RadioGroupItem value="subscribe" id="purchase-subscribe" className="mt-0.5" />
                                <div>
                                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                                        Subscribe & Save
                                    </span>
                                    <span className="block text-xs text-green-700 dark:text-green-400">
                                        Save ~17% on deliveries
                                    </span>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                $18.99
                            </span>
                        </Label>
                    </RadioGroup>


                    {purchaseType === "subscribe" && (
                        <div className="mt-4">
                            <label
                                htmlFor="delivery-frequency"
                                className="mb-2 block text-sm font-medium text-blue-950 dark:text-gray-200"
                            >
                                Deliver every
                            </label>

                            <Select items={items}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Frequency</SelectLabel>
                                        {items.map((item) => (
                                             <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                No commitment. Cancel anytime.
                            </p>
                        </div>
                    )}


                    <div className="mt-8">
                        <h2 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Quantity</h2>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() =>
                                        setQuantity((current) => Math.max(1, current - 1))
                                    }
                                    disabled={quantity === 1}
                                    aria-label="Decrease quantity"
                                >
                                    <HugeiconsIcon icon={MinusSignIcon} className="size-4" />
                                </Button>

                                <span className="min-w-10 text-center font-medium text-sm">
                                    <AnimateNumber>{quantity}</AnimateNumber>
                                </span>

                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => setQuantity((current) => current + 1)}
                                    aria-label="Increase quantity"
                                >
                                    <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                                </Button>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {quantity} item{quantity > 1 ? "s" : ""}
                            </span>
                        </div>
                        <motion.div
                            variants={buttonHoverVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className="relative mt-6 overflow-hidden rounded-md"
                        >
                            {/* Shimmer light sweep beam */}
                            <motion.div
                                aria-hidden="true"
                                variants={shimmerVariants}
                                className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
                            />

                            <Button
                                id="product-buy-now-btn"
                                className="w-full bg-blue-950 dark:bg-blue-600 text-white py-6 text-base shadow-sm transition-colors hover:bg-blue-900 dark:hover:bg-blue-500 cursor-pointer"
                                onClick={handleBuyNow}
                            >
                                <span className="flex items-center gap-3">
                                    <motion.span
                                        variants={buyIconVariants}
                                        className="inline-flex"
                                    >
                                        <HugeiconsIcon
                                            className="size-5"
                                            icon={ShoppingBasket01Icon}
                                        />
                                    </motion.span>
                                    Buy Now — ${totalPrice}
                                </span>
                            </Button>
                        </motion.div>

                        {/* Add to cart button */}
                        <div className="mt-4">
                            <motion.div
                                variants={buttonHoverVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                className="rounded-md"
                            >
                                <Button
                                    id="product-add-to-cart-btn"
                                    size="lg"
                                    onClick={handleAddToCart}
                                    className="w-full py-6 font-bold text-lg shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-white cursor-pointer"
                                >
                                    <span className="flex items-center gap-3">
                                        <motion.span
                                            variants={cartIconVariants}
                                            className="inline-flex"
                                        >
                                            <HugeiconsIcon
                                                className="size-5"
                                                icon={ShoppingBasketSecure02Icon}
                                            />
                                        </motion.span>
                                        Add to Cart
                                    </span>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}