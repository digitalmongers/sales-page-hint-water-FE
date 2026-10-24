
"use client";

import { Button } from "@/components/ui/button";

export function FAQSection() {
  return (
    <section
      id="faq"
      className="flex justify-center px-4 py-8"
    >
      <Button
        className="rounded-full bg-blue-950 px-6 text-white hover:bg-blue-900"
        onClick={() => {
          document.getElementById("faq")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        FAQ
      </Button>
    </section>
  );
}
