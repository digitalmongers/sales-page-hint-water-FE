"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon, Mail01Icon } from "@hugeicons/core-free-icons";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "item-1",
    question: "What makes Hint Water different from regular water or seltzers?",
    answer:
      "Hint is ultra-purified water infused strictly with true fruit essences. Unlike sparkling waters and diet beverages, Hint has zero carbonation, zero sugars, zero diet sweeteners (no stevia, sucralose, or erythritol), zero calories, and zero preservatives. It delivers the genuine, crisp taste of real fruit without any artificial aftertaste.",
  },
  {
    id: "item-2",
    question: "Does Hint Water contain any sweeteners or artificial additives?",
    answer:
      "Never! Hint is 100% free of sugar, high-fructose corn syrup, artificial sweeteners, and sugar substitutes. Our flavors are derived entirely from non-GMO plant and fruit essences extracted at the peak of freshness.",
  },
  {
    id: "item-3",
    question: "Is Hint Water safe for kids, pregnancy, and individuals with diabetes?",
    answer:
      "Yes, absolutely. Because Hint contains zero sugar, zero carbohydrates, zero sodium, and zero artificial sweeteners, it has a glycemic index of zero. It is diabetic-friendly, keto-friendly, vegan, kosher, and gluten-free, making it ideal for the entire family.",
  },
  {
    id: "item-4",
    question: "How does the subscription plan work? Can I cancel anytime?",
    answer:
      "With Hint subscriptions, you save over 17% on every case ($18.99 per 12-pack case instead of $22.99). You can customize your delivery frequency to every 15, 30, 45, or 60 days. There is zero lock-in—you can change flavors, pause, skip shipments, or cancel anytime with one click in your account portal.",
  },
  {
    id: "item-5",
    question: "How does shipping work, and how can I get free shipping?",
    answer:
      "We provide FREE Standard Shipping on all orders over $40 (or 2+ cases). Orders are carefully packaged in temperature-controlled facilities and dispatched within 24 business hours. Typical delivery takes 3 to 5 business days. Priority 1-Day Air is also selectable during checkout for urgent orders.",
  },
  {
    id: "item-6",
    question: "What is your 30-Day Happiness Guarantee?",
    answer:
      "We stand behind the quality of every bottle. If you aren't completely delighted with your first case of Hint Water, simply contact our care team within 30 days of delivery. We will gladly send you a different flavor to try or issue a full refund—no hassle, no questions asked.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="w-full bg-background py-16 sm:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 dark:text-white tracking-tight mt-2">
            Everything You Need to Know About Hint<sup className="text-sm">®</sup>
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
            Clear answers about our fruit-infused waters, clean ingredients, subscriptions, and shipping.
          </p>
        </div>

        {/* Shadcn Accordion */}
        <Card className="border border-border bg-card/60 backdrop-blur-xs p-6 sm:p-8 rounded-2xl shadow-sm">
          <Accordion
            defaultValue={["item-1"]}
            className="w-full divide-y divide-border"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="py-1 first:pt-0 last:pb-0 border-none not-last:border-b not-last:border-border"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-bold text-blue-950 dark:text-white hover:no-underline py-5 group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base leading-relaxed text-muted-foreground pb-5 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Support & Contact Card */}
        <Card className="mt-10 border border-border bg-muted/40 rounded-2xl p-6 sm:p-8 text-center">
          <CardContent className="p-0 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div>
              <h3 className="text-lg font-bold text-blue-950 dark:text-white">
                Still have questions?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-md">
                Can&apos;t find what you&apos;re looking for? Chat with our hydration specialists directly via WhatsApp or email.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919897266808"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline" }) + " gap-2 bg-background hover:bg-muted text-foreground border-border cursor-pointer shadow-xs"}
              >
                <HugeiconsIcon icon={WhatsappIcon} className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp Chat</span>
              </a>

              <a
                href="mailto:support@hintwater.com"
                className={buttonVariants({ variant: "default" }) + " gap-2 bg-blue-950 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white cursor-pointer shadow-xs"}
              >
                <HugeiconsIcon icon={Mail01Icon} className="size-4" />
                <span>Email Support</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
