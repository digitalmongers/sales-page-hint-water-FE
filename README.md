# Hint® Water — D2C E-Commerce Sales Page (Frontend)

A high-converting, modern Direct-to-Consumer (D2C) e-commerce product landing page and sales funnel inspired by Hint® Water. Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Base UI / shadcn/ui**.

---

## ✨ Features & User Flows

### 1. Interactive Product Customizer
- **Dynamic Flavor Switching**: Real-time asset and theme transitions across 5 signature flavors (Peach Raspberry, Watermelon, Blackberry, Coconut, Pineapple).
- **Pack Sizing**: 12-pack, 24-pack, and 36-pack volume selections with per-bottle unit pricing calculations.
- **Purchase Mode Toggle**:
  - **One-Time Purchase**: Standard checkout rate.
  - **Subscribe & Save (15% OFF)**: Flexible delivery frequency selector (every 30, 45, or 60 days) with automated subscription badge indicators.
- **Sticky Navigation Bar**: Smart header that triggers a sticky mini-CTA bar when the user scrolls past the main buy-box.

### 2. Slide-out Cart Drawer
- **Persistent State**: Reactive cart state powered by `useCart` hook.
- **Dynamic Free Shipping Meter**: Interactive visual progress bar unlocking free shipping at the `$40.00` threshold.
- **Cart Actions**: Increment, decrement, individual item removal, and auto-subtotal updates.

### 3. Express Checkout Modal
- **One-Click Instant Checkout**: One-click quick-pay triggers for **Shop Pay**, **Apple Pay**, and **Google Pay**.
- **Full Credit Card Checkout**: Form inputs for contact info, address, delivery options, and payment details.
- **Dynamic Shipping Methods**: Standard Ground (Free over $40 / $4.99) vs. Priority 1-Day Air ($9.99).
- **Promo Code Engine**: Discount validation supporting codes like `HINT10`, `SAVE10`, and `WELCOME`.
- **Order Confirmation View**: Post-purchase confirmation modal with generated order ID (`HINT-XXXXXX`), one-click copy, delivery progress steps, and itemized receipts.
- **Mobile Optimized**: Custom responsive dialog with zero horizontal scroll across devices from 320px up to 4K displays.

### 4. Customer Account & Authentication UI
- **Authentication Modals**: Support for Email and Social Sign-In states.
- **User Avatar Dropdown**: Displays authenticated customer state with direct profile access and logout flows.

### 5. Social Proof & Educational Sections
- **Nutrition Facts Table**: Highlights 0 calories, 0 sugar, 0 diet sweeteners, and vegan certification.
- **Customer Reviews & Ratings**: 4.8/5-star rating breakdown with customer review filtering and verification badges.
- **Accordion FAQs**: Collapsible answers addressing shipping, ingredients, and subscription management.
- **Cross-Sell Showcase**: Related product carousel promoting flavor discoveries.

### 6. Theming & Design
- **Dark & Light Mode**: Seamless theme switching using `next-themes` and CSS variables.
- **Micro-Interactions**: Smooth physics-based spring transitions powered by `motion/react`.
- **Toast Notifications**: Interactive toast alerts via `sonner`.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, React Server & Client Components) |
| **Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) built on [@base-ui/react](https://base-ui.com/) |
| **Motion & Animation** | [Motion (v14)](https://motion.dev/) |
| **Iconography** | [@hugeicons/react](https://hugeicons.com/) & [@hugeicons/core-free-icons](https://hugeicons.com/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Type Safety** | TypeScript 5 |
| **Code Formatting** | Prettier with `prettier-plugin-tailwindcss` & ESLint |

---

## 📂 Project Structure

```text
sales-page/
├── app/
│   ├── favicon.ico             # App icon
│   ├── globals.css             # Tailwind v4 theme definitions and CSS variables
│   ├── layout.tsx              # Root HTML wrapper, metadata, ThemeProvider, Toaster
│   └── page.tsx                # Main storefront landing page and section compositions
├── components/
│   ├── auth/                   # Login and logout modal dialogs
│   │   ├── login-modal.tsx
│   │   └── logout-modal.tsx
│   ├── cart/                   # Slide-out cart drawer
│   │   └── cart-drawer.tsx
│   ├── checkout/               # Express checkout dialog & order confirmation
│   │   └── express-checkout-modal.tsx
│   ├── layout/                 # Site footer and navigation layouts
│   │   └── footer.tsx
│   ├── product/                # Modular product landing page sections
│   │   ├── faq-section.tsx
│   │   ├── nutrition-section.tsx
│   │   ├── product-details.tsx
│   │   ├── related-products.tsx
│   │   └── review-section.tsx
│   ├── theme-provider.tsx      # Dark/light theme context provider
│   ├── theme-toggle.tsx        # Navbar theme toggle button
│   └── ui/                     # Base UI / shadcn primitives (Button, Dialog, Card, etc.)
├── hooks/
│   └── use-cart.tsx            # Global cart state store & checkout event dispatcher
├── public/
│   └── images/                 # Optimized product bottle renders and flavor assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher recommended
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/digitalmongers/sales-page-hint-water-FE.git
   cd sales-page-hint-water-FE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **`npm run dev`** | `next dev` | Launches local development server at `http://localhost:3000` |
| **`npm run build`** | `next build` | Compiles optimized production bundle |
| **`npm run start`** | `next start` | Runs the compiled production server |
| **`npm run typecheck`** | `tsc --noEmit` | Validates TypeScript types across the entire project |
| **`npm run lint`** | `eslint` | Runs ESLint to check for syntax and style issues |
| **`npm run format`** | `prettier --write "**/*.{ts,tsx}"` | Formats all source files with Prettier |

---

## 🔌 Connecting to a Backend API

This repository represents the **standalone frontend interface**. When your backend API repository is ready, the frontend is architectured for straightforward integration:

1. **Environment Variables**: Configure your backend URL in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
2. **Checkout Integration Point**:
   - Locate `handlePlaceOrder()` in [components/checkout/express-checkout-modal.tsx](file:///c:/Projects/Landing%20page%20ecom/sales-page/components/checkout/express-checkout-modal.tsx).
   - Replace simulated timeouts with your backend endpoint (e.g. `POST /api/orders` or `POST /api/checkout/create-intent`).
3. **Cart Synchronization**:
   - Locate `checkoutItems` in [hooks/use-cart.tsx](file:///c:/Projects/Landing%20page%20ecom/sales-page/hooks/use-cart.tsx) to attach customer session IDs or sync with backend carts.
