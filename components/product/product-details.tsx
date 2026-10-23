"use client";

import { useState } from "react";
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



export function ProductDetails() {

    const flavors = [
        { id: "peach-raspberry", name: "Raspberry" },
        { id: "watermelon", name: "Watermelon" },
        { id: "black-berry", name: "Black Berry" },
        { id: "coconut", name: "Coconut" },
        { id: "pineapple", name: "Pineapple" },

    ];

    const [selectedFlavor, setSelectedFlavor] = useState(flavors[0].id);
    const [purchaseType, setPurchaseType] = useState("one-time");
    const [quantity, setQuantity] = useState(1);
    const price = purchaseType === "subscribe" ? 18.99 : 22.99;

    const productTitle =
        flavors.find((item) => item.id === selectedFlavor)?.name ?? "Hint Water";

    const totalPrice = (price * quantity).toFixed(2);
    const [deliveryFrequency, setDeliveryFrequency] = useState("30");

    const items = [
        { label: "Delivery frequency", value: null },
        { label: "15 Days", value: "15" },
        { label: "30 Days", value: "30" },
        { label: "45 Days", value: "45" },
        { label: "60 Days", value: "60" },
    ]



    return (
        <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-blue-950">
                {productTitle} Hint Water
            </h1>
            <p className="mt-2 flex gap-3">
                <span className="font-semibold text-sm">
                    ⭐⭐⭐⭐⭐ 4.9
                </span>
                <span className="text-gray-600 text-sm">
                    6729 Reviews
                </span>
            </p>

            <div className="mt-5">
                <p className="text-2xl font-semibold text-blue-950">
                    ${price.toFixed(2)}
                </p>

                {purchaseType === "subscribe" && (
                    <p className="mt-1 text-sm text-green-700">
                        Subscription savings applied
                    </p>
                )}
            </div>

            <div className="mt-8">
                <h2 className="mb-3 font-bold">Choose your flavor</h2>

                <div className="flex flex-wrap gap-2">
                    {flavors.map((item) => (
                        <Button
                            size="sm"
                            key={item.id}
                            variant={selectedFlavor === item.id ? "default" : "outline"}
                            onClick={() => setSelectedFlavor(item.id)}
                        >
                            {item.name}
                        </Button>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="mb-3 font-bold">Purchase options</h2>

                    <RadioGroup
                        value={purchaseType}
                        onValueChange={(value) => setPurchaseType(value as string)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                        <Label
                            htmlFor="purchase-one-time"
                            className={`flex w-full cursor-pointer items-start justify-between rounded-lg border p-4 transition-colors ${purchaseType === "one-time"
                                ? "border-blue-950 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <RadioGroupItem value="one-time" id="purchase-one-time" className="mt-0.5" />
                                <div>
                                    <span className="font-medium text-sm sm:text-base text-gray-900">
                                        One Time Purchase
                                    </span>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                $22.99
                            </span>
                        </Label>

                        <Label
                            htmlFor="purchase-subscribe"
                            className={`flex w-full cursor-pointer items-start justify-between rounded-lg border p-4 transition-colors ${purchaseType === "subscribe"
                                ? "border-blue-950 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <RadioGroupItem value="subscribe" id="purchase-subscribe" className="mt-0.5" />
                                <div>
                                    <span className="font-medium text-sm sm:text-base text-gray-900">
                                        Subscribe & Save
                                    </span>
                                    <span className="block text-xs text-green-700">
                                        Save ~17% on deliveries
                                    </span>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                $18.99
                            </span>
                        </Label>
                    </RadioGroup>


                    {purchaseType === "subscribe" && (
                        <div className="mt-4">
                            <label
                                htmlFor="delivery-frequency"
                                className="mb-2 block text-sm font-medium text-blue-950"
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

                            <p className="mt-2 text-xs text-gray-500">
                                No commitment. Cancel anytime.
                            </p>
                        </div>
                    )}


                    <div className="mt-8">
                        <h2 className="mb-3 font-semibold">Quantity</h2>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center rounded-lg border">
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

                                <span className="min-w-10 text-center font-medium">{quantity}</span>

                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => setQuantity((current) => current + 1)}
                                    aria-label="Increase quantity"
                                >
                                    <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
                                </Button>
                            </div>
                            <span className="text-sm text-gray-600">
                                {quantity} item{quantity > 1 ? "s" : ""}
                            </span>
                        </div>
                        <Button
                            className="mt-6 w-full bg-blue-950 py-6 text-base hover:bg-blue-900"
                            onClick={() => {
                                alert(
                                    `Selected: ${selectedFlavor}\nPurchase: ${purchaseType}\nQuantity: ${quantity}`
                                );
                            }}
                        >
                            <span className="flex items-center gap-3">
                                <HugeiconsIcon
                                    className="size-5"
                                    icon={ShoppingBasket01Icon} />
                                Buy Now — ${totalPrice}
                                {/* <HugeiconsIcon
                                    role="status"
                                    aria-label="Loading"
                                    className="size-5 animate-spin"
                                    icon={Loading01Icon}
                                /> */}
                            </span>
                        </Button>
                        {/* Add to cart button */}
                        <div className="mt-4">
                            <Button
                                size="lg"
                                className="w-full py-6 font-bold text-lg"
                            >
                                <span className="flex items-center gap-3">
                                    <HugeiconsIcon className="size-5" icon={ShoppingBasketSecure02Icon} />
                                    Add to Cart
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}