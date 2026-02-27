# AGENTS.md - Coding Guidelines for board-client

## Project Overview
Next.js 16 App Router application with TypeScript, Tailwind CSS v4, and feature-based architecture.

## Build/Lint/Format Commands

```bash
# Development server (Turbopack)
pnpm dev

# Production build
pnpm build

# Run ESLint
pnpm lint

# Format code with Prettier
pnpm format
```

**Note**: No test framework is currently configured. This project does not have tests.

## Code Style Guidelines

### Imports & Module Structure
- Use `@/*` path alias for all imports from `src/` (e.g., `@/lib/axios`, `@/components/ui/button`)
- Group imports: 1) React/Next, 2) Third-party libs, 3) Internal modules
- Prefer named exports for hooks and utility functions
- Use `type` keyword for type-only imports when possible

### Formatting
- Prettier with `printWidth: 120`
- Uses `prettier-plugin-tailwindcss` for class sorting
- No trailing commas preference detected
- Double quotes for strings

### TypeScript Conventions
- Strict mode enabled
- Use explicit function return types on exported functions
- Define types for API responses (e.g., `OrganizationInfoResponse`)
- Prefer `type` over `interface` for object shapes
- Use `Readonly<>` for props where appropriate
- Nullable parameters use `string | undefined` pattern

### Naming Conventions
- **Hooks**: `usePascalCase` (e.g., `useOrganizationInfo`, `useCreatePostMutation`)
- **Mutations**: `useActionMutation` pattern (e.g., `useCreateBoardMutation`)
- **Components**: PascalCase files, default exports for pages
- **Types/Interfaces**: PascalCase with descriptive names
- **Utilities**: camelCase, descriptive function names
- **Files**: Use kebab-case for feature folders and filenames (e.g., `use-organization-info.ts`)

### Error Handling
- Use `getErrorMessage()` utility from `@/lib/error-message` for consistent error messages
- Mutations should have `onError` handlers showing toast notifications
- API errors are handled via toast with `variant: "destructive"`
- Fallback error message in Portuguese: "Ocorreu um erro inesperado"

### Architecture Patterns

#### Feature-Based Organization
- Each domain under `src/features/<domain>/` contains:
  - `components/` - Feature-specific React components
  - `hooks/` - Query hooks (data fetching)
  - `mutations/` - TanStack Query mutations
  - `schemas/` - Zod validation schemas

#### Data Fetching
- Use TanStack Query for all server state
- Query keys follow pattern: `["entity", id]` or `["entity-list", filters]`
- Default `staleTime: 1000 * 60 * 5` (5 minutes) for organization data
- Always use `apiClient` from `@/lib/axios` - never use axios directly
- Mutations must invalidate/reset related queries on success

#### Forms & Validation
- Use `react-hook-form` with `zodResolver`
- Define input types from schema (e.g., `CreateXInput`)
- Form inputs typed from Zod schemas

### UI Components
- Base components from `src/components/ui/` (Radix + Tailwind)
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Toast notifications via `useToast()` hook
- Icons from `lucide-react`

### Styling
- Tailwind CSS v4 with `@tailwindcss/postcss`
- Use `class-variance-authority` for component variants
- Dark mode support via `next-themes`
- Color scheme: Default Tailwind palette

### Authentication
- JWT-based auth with cookie handling
- proxy at `src/proxy.ts` protects routes
- Public routes: `/login`, `/register`
- Auth utilities in `src/lib/auth.ts`

## Environment Variables
- `NEXT_PUBLIC_API_BASE_URL` - API endpoint base URL

## Key Conventions
1. Keep feature code in relevant `src/features/<domain>/` folder
2. Reuse shared UI from `src/components/ui`
3. Prefer query hooks + mutations over direct `apiClient` calls in components
4. All user-facing text is in Portuguese
5. Always handle mutation errors with toast notifications
