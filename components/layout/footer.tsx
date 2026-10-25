"use client";

import { useState } from "react";
import Link from "next/link";
import {
    WhatsappIcon,
    Linkedin02Icon,
    Globe02Icon,
    ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!email.trim()) {
            setMessage("Please enter your email address.");
            return;
        }

        setMessage("Thanks for your interest! Newsletter signup isn't connected yet.");
        setEmail("");
    }

    return (
        <footer className="bg-blue-950 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
                {/* Brand and newsletter */}
                <div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <Link
                            href="/"
                            className="inline-block text-3xl font-extrabold tracking-tight"
                        >
                            hint<span className="text-sky-300">®</span>
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100">
                            A little hint of fruit. A refreshing way to make
                            hydration part of your everyday routine.
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            <Link
                                href="https://wa.me/919897266808"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="WhatsApp"
                                className="rounded-full p-2 transition-colors hover:bg-white/10"
                            >
                                <HugeiconsIcon icon={WhatsappIcon} className="size-5" />
                            </Link>

                            <Link
                                href="https://www.linkedin.com/in/syed-shahnawaz-ali/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="rounded-full p-2 transition-colors hover:bg-white/10"
                            >
                                <HugeiconsIcon icon={Linkedin02Icon} className="size-5" />
                            </Link>

                            <Link
                                href="https://digitalmongers.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Website"
                                className="rounded-full p-2 transition-colors hover:bg-white/10"
                            >
                                <HugeiconsIcon icon={Globe02Icon} className="size-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">
                            A little refresh in your inbox
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-blue-100">
                            Sign up for product updates, new flavors, and more.
                        </p>

                        <form
                            onSubmit={handleSubscribe}
                            className="mt-5 flex flex-col gap-3 sm:flex-row"
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setMessage("");
                                }}
                                required
                                aria-label="Email address"
                                className="h-11 border-white/20 bg-white text-blue-950 placeholder:text-gray-500"
                            />

                            <Button
                                type="submit"
                                className="h-11 shrink-0 bg-sky-300 px-5 font-semibold text-blue-950 hover:bg-sky-200"
                            >
                                Subscribe
                                <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-4" />
                            </Button>
                        </form>

                        {message && (
                            <p
                                role="status"
                                className="mt-3 text-sm text-blue-100"
                            >
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer navigation */}
                <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-3">
                    <div>
                        <h3 className="font-semibold">Shop</h3>

                        <ul className="mt-4 space-y-3 text-sm text-blue-100">
                            <li>
                                <Link href="#product" className="hover:text-white">
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link href="#related-products" className="hover:text-white">
                                    Explore Flavors
                                </Link>
                            </li>
                            <li>
                                <Link href="#nutrition" className="hover:text-white">
                                    Nutrition
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">Customer Care</h3>

                        <ul className="mt-4 space-y-3 text-sm text-blue-100">
                            <li>
                                <Link href="#faq" className="hover:text-white">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="#reviews" className="hover:text-white">
                                    Customer Reviews
                                </Link>
                            </li>
                            <li>
                                <Link href="mailto:hello@example.com" className="hover:text-white">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <h3 className="font-semibold">Our Promise</h3>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-blue-100">
                            Simple ingredients, refreshing flavor, and a little
                            more joy in every sip.
                        </p>
                    </div>
                </div>

                <Separator className="bg-white/15" />

                {/* Copyright and legal */}
                <div className="flex flex-col gap-4 pt-6 text-sm text-blue-200 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} hint®. All rights reserved.
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        <Link href="/privacy-policy" className="hover:text-white">
                            Privacy Policy
                        </Link>

                        <Link href="/terms" className="hover:text-white">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
            <Separator className="bg-white/15" />

            <div className="text-center text-sm text-blue-200 py-3">
                Developed by{" "}
                <Link
                    href="https://digitalmongers.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white transition-colors hover:text-sky-300"
                >
                    Digital Mongers Softech
                </Link>
            </div>
        </footer>
    );
}