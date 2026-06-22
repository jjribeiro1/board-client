# AGENTS.md — board-client

Next.js 16 App Router (Turbopack), TypeScript strict, Tailwind CSS v4, feature-based architecture.

## Commands

```bash
pnpm dev        # dev server on port 4000 (next dev --turbopack --port 4000)
pnpm build      # production build
pnpm lint       # ESLint (flat config, next/core-web-vitals + prettier)
pnpm format     # Prettier (printWidth 120, tailwindcss plugin)
```

No test framework — project has no tests.

## Architecture

- **Feature-first** — each domain under `src/features/<domain>/` owns `components/`, `hooks/`, `mutations/`, `schemas/`. 10 domains: auth, board, comments, invites, notifications, organizations, posts, status, tags, users.
- **Route groups** — `(auth)`, `(dashboard)`, `(organizations)`. Parallel `@modal` slot for post detail modals.
- **Shared types** in `src/types/` (e.g. `Role`, `Organization`). UI components in `src/components/ui/` (shadcn-style Radix + Tailwind).
- **App providers** wrap everything in `src/providers/index.tsx`: React Query + next-themes (default dark) + Toaster.
- **Auth gating** is done by the file at `src/proxy.ts` (uses Next.js middleware config format but named `proxy.ts` instead of `middleware.ts` — will NOT be auto-picked up as middleware). JWT verification via `jose` in `src/lib/auth.ts`. Public routes: `/login`, `/register`, `/invite/*`.

## Data Patterns

- **API client:** `apiClient` from `@/lib/axios` (`withCredentials: true`). Never use axios directly.
- **Queries:** TanStack Query `useQuery` with `queryKey: ["entity", id]`, 5-min `staleTime`, `enabled` guard. Use `placeholderData: (prev) => prev` for list queries with filters.
- **Mutations:** `useMutation` with `"use client"`, `useToast()`, `getErrorMessage(err)` on error, `queryClient.invalidateQueries(...)` on success. All user-facing text in Portuguese.
- **Query params:** Use `useQueryParams` hook from `@/hooks/use-query-params` for search/filter/sort. Include query string in query key.
- **Forms:** `react-hook-form` + `zodResolver`. Input types inferred from Zod schemas.
- **Server actions** live under `features/<domain>/actions/`.

## Key Files & Utilities

| File                                                    | Purpose                                         |
| ------------------------------------------------------- | ----------------------------------------------- |
| `@/lib/axios`                                           | Shared Axios client                             |
| `@/lib/error-message`                                   | `getErrorMessage(err, fallback)`                |
| `@/lib/dayjs`                                           | dayjs with `pt-br` locale + relativeTime plugin |
| `@/lib/utils`                                           | `cn()` (clsx + tailwind-merge)                  |
| `@/hooks/use-toast`                                     | `useToast()` / `toast()`                        |
| `@/hooks/use-query-params`                              | URL search param CRUD                           |
| `@/hooks/use-user-permission`                           | Role-based access checks within an org          |
| `@/features/organizations/services/get-organization-id` | Reads `org-id` cookie (server-only)             |

## Conventions

- Named exports for hooks/utils, default exports for pages. Files in kebab-case. Feature folders in kebab-case.
- `type` keyword for type-only imports. Explicit return types on exported functions.
- All user-facing strings in Portuguese. Mutation error fallback: `"Ocorreu um erro inesperado"`.
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:4001/api` (in `.env` for dev).
- pnpm overrides `@types/react` and `@types/react-dom` to `19.2.10`.
