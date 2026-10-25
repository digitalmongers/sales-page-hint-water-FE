import Image from "next/image";
import { CheckmarkBadge03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const nutritionFacts = [
  { label: "Serving Size", value: "1 bottle (473 mL)" },
  { label: "Calories", value: "50" },
  { label: "Total Fat", value: "5 g" },
  { label: "Sodium", value: "10 mg" },
  { label: "Total Carbohydrate", value: "1 g" },
  { label: "Total Sugars", value: "1 g" },
  { label: "Protein", value: "1 g" },
];

const benefits = [
  "Vegan Free",
  "Gluten Free",
  "Sugar Free",
  "Zero Calories",
  "No Artificial Sweeteners",
  "Non-GMO",
];

export function NutritionSection() {
  return (
    <section className="relative overflow-hidden bg-blue-950 px-5 pt-20 pb-20 text-white sm:px-8 sm:pt-28 sm:pb-28 md:pt-32 md:pb-32">
      {/* Top wavy divider */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-10 w-full text-white dark:text-background sm:h-16 md:h-20 lg:h-24"
        >
          {/* Subtle semi-transparent wave layer */}
          <path
            d="M0,0 L1440,0 L1440,54 C1240,90 1020,32 720,68 C450,100 200,42 0,74 Z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          {/* Main solid wave matching the white section above */}
          <path
            d="M0,0 L1440,0 L1440,32 C1180,75 980,18 720,50 C460,82 220,25 0,58 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Subtle background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden md:justify-start md:pl-12"
      >
        <Image
          src="/images/blackberry-nobg.png"
          alt=""
          width={432}
          height={577}
          className="h-[70%] sm:h-[80%] max-h-[600px] w-auto select-none object-contain opacity-10"
        />
      </div>

      {/* Bottom wavy divider */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-10 w-full text-white dark:text-background sm:h-16 md:h-20 lg:h-24"
        >
          {/* Subtle semi-transparent wave layer */}
          <path
            d="M0,96 L1440,96 L1440,42 C1240,6 1020,64 720,28 C450,-4 200,54 0,22 Z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          {/* Main solid wave matching the white section below */}
          <path
            d="M0,96 L1440,96 L1440,64 C1180,21 980,78 720,46 C460,14 220,71 0,38 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
            Simple ingredients
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Water with a Hint of Fruit
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
            Refreshing fruit-infused water without the sugar, sweeteners,
            or calories.
          </p>
        </div>

        {/* Product information and nutrition facts */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-2xl font-semibold">
              Peach Raspberry Hint® Water
            </h3>

            <p className="mt-4 leading-7 text-blue-100">
              Enjoy a light, refreshing blend of fruit flavor and water.
              A simple way to make hydration more enjoyable.
            </p>

            <div className="mt-10 md:mt-20 grid grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 border-b border-white/20 py-3"
                >
                  <HugeiconsIcon
                    icon={CheckmarkBadge03Icon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />

                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white dark:bg-card p-5 text-slate-900 dark:text-card-foreground border border-transparent dark:border-gray-800 sm:p-7 shadow-sm">
            <h3 className="border-b-4 border-slate-900 dark:border-slate-100 pb-3 text-2xl font-extrabold">
              Nutrition Facts
            </h3>

            <p className="border-b border-slate-300 dark:border-slate-700 py-2 text-sm">
              Serving Size: 1 bottle (473 mL)
            </p>

            <div className="border-b-4 border-slate-900 dark:border-slate-100 py-3">
              <p className="text-xs font-semibold">Amount per serving</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xl font-bold">Calories</span>
                <span className="text-3xl font-extrabold">0</span>
              </div>
            </div>

            <p className="border-b border-slate-300 dark:border-slate-700 py-2 text-right text-xs font-semibold">
              % Daily Value*
            </p>

            {nutritionFacts.slice(2).map((fact) => (
              <div
                key={fact.label}
                className="flex justify-between gap-4 border-b border-slate-200 dark:border-slate-800 py-2 text-sm"
              >
                <span>{fact.label}</span>
                <span className="font-semibold">{fact.value}</span>
              </div>
            ))}

            <p className="mt-4 text-xs leading-5 text-slate-600 dark:text-slate-400">
              *Daily Values are based on a 2,000 calorie diet.
              Nutrition information should be verified against the
              actual product label before publishing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
