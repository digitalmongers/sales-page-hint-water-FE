## Backend Development & Security

When implementing or modifying backend functionality, follow the `d2c-backend-engineer` skill located at `.agent/skills/d2c-backend-engineer/SKILL.md`, provided it is supported by the current Antigravity environment.

### Technology Stack

The intended backend stack is:

- Next.js 16 App Router and Route Handlers
- TypeScript
- PostgreSQL hosted on Supabase
- Prisma ORM
- Zod for input validation
- Stripe for payments and subscriptions
- Resend for transactional emails
- Inngest for durable background jobs when required

Verify the installed versions, compatibility, and existing implementation before making changes. Use Prisma ORM, not Drizzle ORM.

### Secure Backend Requirements

Build security into every backend feature from the beginning. Assess and implement the controls appropriate to the application's architecture, data, threat model, and deployment environment.

#### 1. Authentication and Authorization
- Use a maintained authentication solution when customer accounts or administrative access are required.
- Enforce server-side authentication and resource-level authorization on every protected operation.
- Prevent users from accessing or modifying other customers' orders, addresses, subscriptions, or personal information.
- Apply role-based permissions to administrative operations.
- Never trust user IDs, roles, or permissions supplied by the browser.
- Use secure session handling, appropriate cookie settings, session expiration, and safe logout behavior.
- Do not introduce authentication complexity if the feature genuinely does not require accounts; protect guest checkout and order access through appropriate mechanisms.

#### 2. Input Validation and API Security
- Validate all request bodies, query parameters, route parameters, headers, and uploaded data where applicable using Zod or equivalent schemas.
- Reject malformed, unexpected, oversized, or invalid input.
- Use appropriate HTTP methods and status codes.
- Implement consistent error handling without exposing stack traces, database errors, secrets, or internal implementation details.
- Apply rate limiting to authentication, checkout, promotion validation, newsletter signup, and other abuse-prone endpoints.
- Configure CORS only when cross-origin access is necessary, using explicit allowed origins.
- Apply CSRF and origin protections appropriate to the authentication and request architecture.
- Prevent mass assignment, injection, broken access control, and insecure direct object references.
- Set request size limits and timeouts where appropriate.

#### 3. Database Security and Integrity
- Access the database through Prisma from trusted server-side code only.
- Never expose privileged database credentials to the browser.
- Use least-privilege database credentials and separate development and production environments.
- Apply foreign keys, unique constraints, indexes, and appropriate transaction boundaries.
- Validate data before writing it to the database.
- Protect inventory, promotion redemption, order creation, and payment processing against concurrency problems and duplicate operations.
- Use transactions or atomic database operations wherever business consistency requires them.
- Review Supabase connection pooling and database access policies for the selected connection architecture.
- Enable and test Row Level Security where appropriate for any client-accessible Supabase tables; do not assume RLS replaces server-side authorization.
- Never run destructive migrations or modify production data without explicit approval and a recovery plan.

#### 4. Payments and Financial Integrity
- Keep Stripe secret keys and webhook secrets server-side.
- Recalculate product prices, discounts, shipping, and applicable taxes on the server.
- Never trust browser-submitted totals or payment status.
- Verify Stripe webhook signatures using the raw request body.
- Enforce webhook idempotency and safely handle duplicate or out-of-order events.
- Define valid order and payment state transitions.
- Prevent duplicate orders, duplicate fulfillment, and unauthorized refunds.
- Never store raw payment-card numbers or CVV values.
- Use Stripe test mode for development and testing.
- Do not perform real charges, issue refunds, or modify live payment configuration without explicit approval.

#### 5. Secrets and Environment Configuration
- Store secrets in environment variables or an appropriate secrets manager.
- Keep `.env` files containing real credentials out of Git.
- Maintain an `.env.example` containing placeholder values only.
- Never hardcode API keys, passwords, access tokens, private keys, or webhook secrets.
- Never expose secret environment variables through `NEXT_PUBLIC_` variables.
- Validate required environment variables during server initialization where appropriate.
- Redact sensitive information from logs and error reports.
- Rotate compromised credentials and document the required recovery steps.

#### 6. Payments, Orders, and Customer Data
- Enforce ownership checks for orders, addresses, and subscriptions.
- Return only the information needed by the requesting user.
- Avoid leaking whether another user's account or order exists.
- Use secure guest-order access mechanisms where guest checkout is supported.
- Define retention, deletion, and access procedures for personal data according to applicable requirements.
- Never store payment credentials or unnecessary personal information.
- Use idempotency and reconciliation mechanisms for payment and fulfillment workflows.

#### 7. Dependencies and Supply-Chain Security
- Inspect existing dependencies before installing new packages.
- Prefer maintained libraries with compatible versions.
- Avoid unnecessary dependencies and deprecated APIs.
- Review dependency advisories and run available security audit tools.
- Do not automatically apply breaking dependency updates to production code.
- Keep the lockfile consistent with `package.json`.
- Never execute untrusted scripts or downloaded code without review.

#### 8. Logging, Monitoring, and Abuse Prevention
- Record meaningful security and operational events without exposing secrets or sensitive customer data.
- Log authentication failures, authorization denials, payment-processing failures, and unexpected backend errors as appropriate.
- Use safe error messages for clients and detailed, redacted diagnostics for authorized operators.
- Add monitoring and alerts appropriate to the application's production needs.
- Prevent log injection and avoid recording full payment payloads or unnecessary personal information.
- Make background jobs retryable and idempotent where applicable.

#### 9. Security Testing
- Test invalid inputs, unauthorized requests, and cross-user access attempts.
- Test rate limits and abuse-prone endpoints.
- Test webhook signature verification and duplicate event handling.
- Test financial calculations, discount limits, inventory consistency, and duplicate checkout prevention.
- Test authentication and authorization boundaries.
- Run available type checks, lint checks, automated tests, dependency audits, and production builds.
- Fix security vulnerabilities introduced by the implementation before considering the task complete.
- Never claim a security check passed unless it was actually executed and its result was observed.
- Document tests that could not be run and any remaining security risks.

### Development Workflow

For every backend task:

1. Inspect existing code, dependencies, configuration, and documentation.
2. Identify security, privacy, data-integrity, and operational risks.
3. Present an implementation plan for substantial changes.
4. Implement the smallest complete and maintainable solution.
5. Run relevant checks and tests.
6. Update affected documentation, including architecture, APIs, environment variables, database migrations, security controls, and known limitations.
7. Report modified files, validation results, unresolved risks, and required developer actions.

### Operational Boundaries

- Preserve the existing frontend and design system unless changes are explicitly requested.
- Do not rebuild the application unnecessarily.
- Do not introduce additional infrastructure without a justified need.
- Never fabricate successful tests or external service responses.
- Never deploy to production, perform destructive database operations, or change live payment settings without explicit approval.
- Ask for developer action when external credentials, account configuration, or business decisions are required.

## 10. Mandatory Phased Development Roadmap

All backend development MUST follow the phases below. Never attempt to implement the entire backend in a single task.

A phase is complete only when its acceptance criteria have been met, relevant checks have been run, documentation has been updated, and outstanding issues have been reported.

Do not automatically begin the next phase. Wait for the developer's explicit approval.

### Phase 1 — Repository Audit and Architecture
- Inspect the existing Next.js application, dependencies, documentation, and configuration.
- Identify existing UI-only functionality and backend requirements.
- Propose the minimal database schema, API contracts, and architecture.
- Identify external accounts, credentials, and environment variables required.
- Document security requirements and acceptance criteria.
- Do not modify application code or install packages during the initial audit.

**Exit criteria:** The developer has reviewed and approved the architecture and implementation plan.

### Phase 2 — Database Foundation
- Configure PostgreSQL and Prisma ORM.
- Define the minimum required database models, relationships, indexes, and constraints.
- Configure environment variables safely.
- Create and validate development migrations.
- Configure Prisma Client for the existing Next.js application.
- Add seed data only where appropriate.

**Exit criteria:** Prisma schema validation, client generation, and database migration checks pass in the development environment.

### Phase 3 — Product Catalog APIs
- Implement product and variant retrieval.
- Validate product identifiers and quantities.
- Use server-side pricing and availability data.
- Add pagination or filtering only where needed.
- Add appropriate error handling and tests.

**Exit criteria:** The storefront can retrieve real product data through tested APIs.

### Phase 4 — Cart, Pricing, and Promotions
- Implement server-side cart validation and price calculation.
- Add basic promotional-code validation.
- Define shipping-charge calculation rules.
- Protect against invalid quantities, forged prices, and concurrent promotion-limit violations.

**Exit criteria:** Valid and invalid cart scenarios are tested, and totals are calculated authoritatively on the server.

### Phase 5 — One-Time Checkout and Orders
- Integrate Stripe in test mode.
- Implement checkout creation and required order records.
- Implement verified webhook handling and idempotency.
- Handle payment success, failure, cancellation, and duplicate events.
- Prevent duplicate orders and invalid state transitions.

**Exit criteria:** End-to-end test payments produce the correct order states without duplicate orders or unverified payment success.

### Phase 6 — Transactional Emails
- Integrate Resend.
- Implement appropriate order-confirmation emails.
- Handle provider errors and safe retries.
- Avoid duplicate emails caused by webhook retries where possible.

**Exit criteria:** Test email flows work, and failures are handled and documented.

### Phase 7 — Security and Reliability
- Review authentication and authorization requirements.
- Implement appropriate rate limiting, input validation, access control, and secret management.
- Test cross-user access restrictions wherever user accounts or protected resources exist.
- Review payment integrity, webhook security, database transactions, and dependency vulnerabilities.
- Run applicable type checks, linting, tests, and production builds.

**Exit criteria:** Relevant security tests pass, and remaining risks or unavailable checks are documented. Do not claim complete security based solely on automated tests.

### Phase 8 — Basic Admin Panel
- Implement a secure owner/admin access mechanism.
- Add product and variant management.
- Add order listing and appropriate order-detail views.
- Add basic sales summaries where useful.
- Protect every administrative API with server-side authorization.

**Exit criteria:** Authorized administrators can manage the required store operations, and unauthorized access is tested and rejected.

### Phase 9 — Optional Enhancements
Implement only when required:
- Recurring subscriptions and their lifecycle.
- Inventory tracking beyond basic availability.
- Customer accounts and subscription management.
- Advanced shipping integrations.
- Background jobs and reconciliation.
- Multi-staff roles or multi-tenant architecture.

**Exit criteria:** Each enhancement has its own scope, tests, documentation, and explicit approval.

### Phase Control Rules
1. Work only on the phase explicitly authorized by the developer.
2. Do not silently skip phases or combine major phases into one large change.
3. Do not proceed merely because code has been generated.
4. Report acceptance criteria, tests, and unresolved issues at the end of each phase.
5. Request approval before beginning the next phase.
6. Keep the existing frontend functional throughout development.
7. Update project documentation and changelog after meaningful changes.
8. Never use production credentials or perform destructive production operations without explicit approval.
9. If a prerequisite fails, stop dependent work and report the issue.
10. If a phase reveals a necessary architectural change, explain the impact and request approval before making broad changes.

Every API must include its HTTP method, endpoint, request schema, response format, authentication and authorization requirements, error responses, and tests. Implement and verify the API before connecting it to the frontend. Never use mock data where a real backend integration is required, and never claim an API works unless it has been tested.

**Final rule:** Security is a mandatory part of every backend implementation, not a separate task to postpone until launch. Implement controls appropriate to each feature, verify them where possible, and clearly document anything that remains incomplete or unverified.