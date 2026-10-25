# Master Instruction: Maintain and Automatically Update Project Documentation

You are responsible for maintaining comprehensive, accurate, and continuously updated documentation for this project throughout its entire development lifecycle.

## 1. Primary Objective

Document the complete project so that any developer or AI coding agent can understand:

- What the project does and how it works.
- How the project is structured.
- Which technologies, libraries, and architectural patterns are used.
- How every page, component, feature, API, and integration works.
- What has been completed, what is in progress, and what remains.
- Why important implementation decisions were made.
- What bugs, errors, limitations, and technical debt are known.

Documentation must always reflect the actual state of the codebase.

## 2. Documentation Files

Create a `/docs` directory in the project root if it does not already exist.

Maintain the following documentation files. Reuse and update existing documentation rather than creating duplicate files.

### `README.md`
The main project overview, including:
- Project purpose and features.
- Technology stack and versions.
- Installation and setup instructions.
- Environment configuration.
- Development and production commands.
- Build, testing, and deployment instructions.
- Links to detailed documentation.

### `docs/PROJECT_OVERVIEW.md`
Document:
- Project goals and target users.
- Current development stage.
- Major features and user flows.
- High-level application architecture.
- Current scope and known limitations.

### `docs/ARCHITECTURE.md`
Document:
- Application architecture and rendering strategy.
- Next.js App Router structure.
- Server Components versus Client Components.
- Data flow and state management.
- Component relationships and dependencies.
- API, database, authentication, and external service integrations, where applicable.
- Important design and architectural decisions.

Only document technologies and integrations that are actually present or explicitly planned.

### `docs/PROJECT_STRUCTURE.md`
Maintain an accurate directory and file structure.

Explain the purpose of important directories and files, including:
- `app/`
- `components/`
- `components/ui/`
- `public/`
- `lib/`
- `hooks/`
- `docs/`

Include other directories that actually exist in the repository.

Update this document whenever important files or directories are added, removed, or reorganized.

### `docs/COMPONENTS.md`
Document every important reusable component.

For each component, include:
- Component name and file path.
- Purpose and responsibilities.
- Props and TypeScript interfaces.
- Dependencies and imported UI components.
- State management and event handlers.
- Responsive behavior.
- Accessibility considerations.
- Interactions with other components.
- Current implementation status.
- Known limitations or future improvements.

Maintain a component inventory as the project grows.

### `docs/PAGES_AND_ROUTES.md`
Document every application route and page.

For each route, include:
- URL path.
- Page purpose.
- Main components used.
- Layout and navigation relationships.
- Data requirements.
- Interactive functionality.
- Loading, error, and empty states where applicable.
- SEO metadata and accessibility considerations.

### `docs/FEATURES.md`
Maintain a feature-by-feature implementation record.

For every feature, identify:
- What it does.
- Where it is implemented.
- How it works.
- Whether it is complete, partial, planned, or broken.
- Dependencies and configuration.
- Relevant testing performed.
- Known issues and remaining work.

Clearly distinguish functional implementations from visual prototypes and mock data.

### `docs/DESIGN_SYSTEM.md`
Document:
- Colors and design tokens.
- Typography and fonts.
- Spacing and layout conventions.
- Responsive breakpoints.
- Reusable visual patterns.
- Shadcn UI configuration and components.
- Icon library and icon usage conventions.
- Button, card, form, navigation, and footer styles.
- Accessibility and interaction guidelines.

Document the actual design system found in the codebase. Do not invent design tokens.

### `docs/DEPENDENCIES.md`
Document important project dependencies, their purpose, and relevant versions.

Include:
- Framework and runtime dependencies.
- UI libraries.
- Icon libraries.
- Styling tools.
- Form and validation libraries.
- Data-fetching and state-management libraries.
- Development tools.

Treat `package.json` and the lockfile as the source of truth for installed dependencies.

### `docs/ENVIRONMENT_AND_DEPLOYMENT.md`
Document:
- Required environment variables by name and purpose.
- Local development setup.
- Build and production commands.
- Hosting and deployment configuration.
- Required external services.
- Configuration differences between development and production.
- Common setup and deployment failures.

Never write actual API keys, passwords, access tokens, private credentials, or other secrets into documentation. Use placeholders and explain how to configure them securely.

### `docs/TESTING_AND_TROUBLESHOOTING.md`
Document:
- Available testing tools and commands.
- Build and lint checks.
- Important manual testing procedures.
- Responsive testing.
- Known bugs and reproducible errors.
- Root causes of resolved bugs when established.
- Fixes and regressions to watch for.

Never claim a test passed unless it was actually executed and its result was observed.

### `docs/CHANGELOG.md`
Maintain a chronological record of meaningful changes.

For each change, record:
- Date.
- Feature or component affected.
- Summary of modifications.
- Important files changed.
- Bugs fixed.
- Dependencies added or removed.
- Architectural or design decisions.
- Tests and validation performed.
- Any remaining concerns.

Keep entries concise but useful. Do not record every trivial formatting change.

### `docs/DEVELOPMENT_STATUS.md`
Maintain the current project status.

Include:
- Completed features.
- Features currently being developed.
- Upcoming tasks.
- Known bugs.
- Technical debt.
- Outstanding decisions.
- Recommended next steps.

Update this file after meaningful development work.

### `docs/DECISIONS.md`
Record significant technical and architectural decisions.

For each decision, include:
- Context and problem.
- Decision taken.
- Alternatives considered when known.
- Reasoning.
- Trade-offs and consequences.

Do not fabricate historical reasoning when it cannot be established from the codebase or conversation.

## 3. Mandatory Documentation Update Workflow

Documentation maintenance is part of every development task, not an optional final step.

Whenever you add a feature, modify existing functionality, fix a bug, refactor code, change dependencies, update styling, modify routing, or change configuration:

1. Inspect the relevant existing code and documentation.
2. Identify which documentation files are affected.
3. Implement the requested code change.
4. Run relevant checks when possible.
5. Update all affected documentation files in the same development task.
6. Record meaningful changes in `docs/CHANGELOG.md`.
7. Update `docs/DEVELOPMENT_STATUS.md` when project progress or remaining work changes.
8. Verify that documentation matches the resulting implementation.
9. Report both the code changes and documentation changes in your completion summary.

Do not wait for me to explicitly ask you to update documentation.

If a change is limited to a small visual adjustment, update only the relevant documentation if it materially affects the documented design system or component behavior. Avoid unnecessary documentation churn.

## 4. Accuracy Rules

These rules are mandatory:

- Inspect the actual repository before documenting existing functionality.
- Never assume a feature exists merely because it was discussed or planned.
- Never describe placeholder buttons as functional integrations.
- Clearly label mock data, demo alerts, simulated API responses, and incomplete workflows.
- Verify file paths, route names, package names, and configuration against the actual codebase.
- Do not overwrite useful existing documentation without preserving relevant information.
- Do not create duplicate documentation for the same subject.
- Keep terminology consistent across all documentation.
- Distinguish verified facts from assumptions and planned work.
- When something cannot be verified, explicitly mark it as unverified.
- Do not claim successful builds, tests, deployments, or integrations without evidence.

## 5. Code and Documentation Consistency

When changing code, check whether the change affects:
- Component props or public interfaces.
- Routes and navigation.
- Dependencies.
- Environment variables.
- Data models or API contracts.
- User flows.
- Accessibility.
- Responsive behavior.
- Security.
- Deployment.
- Testing procedures.

Update the relevant documentation whenever these areas change.

If documentation conflicts with the code, inspect the implementation and resolve the inconsistency. Do not blindly treat old documentation as authoritative.

## 6. Project Onboarding and Context Recovery

At the beginning of a new development session:

1. Read `README.md`.
2. Read `docs/DEVELOPMENT_STATUS.md`.
3. Read the relevant architecture, component, feature, and troubleshooting documentation for the task.
4. Inspect the actual source files involved.
5. Identify unfinished work and existing constraints before making changes.

Use documentation to recover project context between sessions, but verify relevant implementation details against the code.

## 7. Initial Documentation Audit

Before continuing normal development:

1. Inspect the entire repository, excluding generated files and dependency directories where appropriate.
2. Identify the actual framework, libraries, application routes, components, configuration, and existing features.
3. Inspect existing documentation and preserve useful content.
4. Create or update the documentation files listed above.
5. Document all existing important components and implemented features.
6. Identify mock implementations, unfinished features, known errors, and unverified behavior.
7. Establish the current development status and prioritized next steps.
8. Check that internal documentation links and file paths are correct.

Do not rewrite application code simply to make documentation easier. Document the existing implementation faithfully.

## 8. Completion Report

After each development task, provide a concise report containing:

**Implementation**
- What changed.
- Files added, modified, or removed.

**Documentation**
- Documentation files created or updated.
- What information was recorded.

**Validation**
- Commands or tests executed.
- Results observed.
- Any checks not performed.

**Remaining Work**
- Known issues.
- Incomplete functionality.
- Important follow-up tasks.

## 9. Important Operating Constraints

- Do not stop normal development to write excessive documentation for trivial changes.
- Do not create a separate document for every small task.
- Prefer updating the existing relevant documentation.
- Keep documentation readable, searchable, and useful to future developers.
- Never expose secrets or sensitive production information.
- Do not mark planned work as completed.
- Do not claim documentation is up to date unless you have checked the affected files.
- Treat documentation as a maintained part of the source code.

**Final instruction:** Begin by auditing the current repository and creating or updating the documentation system. After the initial audit, maintain it automatically during every subsequent development task. Before finishing each task, verify that all materially affected documentation has been updated.