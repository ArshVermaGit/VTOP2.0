# Contributing to CampusHub

Welcome! We are building the next generation of university governance. To ensure the project remains scalable and 100% bug-free, please adhere to the following standards.

## Architectural Pattern: "Sections & Features"

CampusHub uses a modular section-based architecture.

- **Pages** (`src/app/`): Dashboard pages should be thin wrappers (server components) that fetch data and pass it to modular sections.
- **Sections** (`src/sections/[portal]/`): All UI logic must be encapsulated in domain-specific sections (e.g., `FacultyMetrics`, `StudentPipeline`).
- **Configuration** (`src/config/`): Menus, site names, and global constants must be decoupled from the UI.

### Folder Structure Example

```text
src/
├── app/dashboard/page.tsx      # Entry point (Fetch only)
└── sections/faculty/
    ├── FacultyMetrics.tsx      # Isolated UI Section
    └── ProctorAudit.tsx        # Isolated UI Section
```

## Coding Standards

### 1. Type Safety

- **Zero `any` Policy**: Use of `any` is strictly prohibited. All data must be typed using the Prisma-aligned domain types in `src/types/`.
- **Strict Null Checks**: Always handle null/undefined states for profile data.

### 2. UI & Aesthetics

- **Responsive-First**: All modals and dashboards must be tested on mobile (`lg:col-span` etc).
- **Lucide Icons**: Use standard Lucide icons for consistency.
- **Framer Motion**: Use `AnimatePresence` for smooth transitions. Avoid heavy CSS animations.

### 3. Image Optimization

- Never use generic `<img>` tags. Always use `next/image` for automatic optimization and LCP performance.

## Pull Request Process

1. **Lint Check**: Run `npm run lint` before submitting. PRs with warnings will be rejected.
2. **Build Check**: Ensure `npm run build` succeeds locally.
3. **Documentation**: If adding a new feature, update the relevant section in `README.md`.

---

Build with 🖤 for the ecosystem.
