# Copilot instructions for board-client

## Big picture
- Next.js App Router with route groups for auth, dashboard, and public org pages. See [src/app](src/app) and layouts like [src/app/(dashboard)/layout.tsx](src/app/(dashboard)/layout.tsx).
- UI is composed from a local component library built on Radix + Tailwind (see [src/components/ui](src/components/ui)).
- Feature-first structure: each domain (auth, organizations, board, posts, comments, tags, status) owns `components/`, `hooks/`, `mutations/`, `schemas/` under [src/features](src/features).

## Data access + state
- HTTP uses a shared Axios client with `NEXT_PUBLIC_API_BASE_URL` in [src/lib/axios.ts](src/lib/axios.ts). Prefer `apiClient` for all network calls.
- Server state uses TanStack Query. Hooks live in `features/**/hooks` and `features/**/mutations` and use query keys like `['organization-boards']` or `['post', postId]` (examples: [src/features/organizations/hooks/use-organization-info.ts](src/features/organizations/hooks/use-organization-info.ts), [src/features/posts/hooks/use-post-info.ts](src/features/posts/hooks/use-post-info.ts)).
- Mutations generally invalidate/reset related queries and show toasts (example: [src/features/board/mutations/use-manage-board-settings-mutation.ts](src/features/board/mutations/use-manage-board-settings-mutation.ts)).

## Forms + validation
- Forms are built with `react-hook-form` + `zod` schemas. Inputs are typed from schema `CreateXInput` and wired with `zodResolver` (example: [src/features/organizations/components/create-organization.tsx](src/features/organizations/components/create-organization.tsx)).

## Routing + layouts
- Root layout injects providers and the parallel `@modal` slot (see [src/app/layout.tsx](src/app/layout.tsx) and [src/app/@modal](src/app/@modal)). Use the `Modal` component to close via router back ([src/components/ui/modal.tsx](src/components/ui/modal.tsx)).
- Dashboard layout wraps pages with the sidebar provider and navigation ([src/app/(dashboard)/layout.tsx](src/app/(dashboard)/layout.tsx), [src/components/app-sidebar](src/components/app-sidebar)).

## Auth + middleware
- Auth gating is done in Next middleware, verifying/refreshing JWT cookies via `lib/auth` (see [src/middleware.ts](src/middleware.ts) and [src/lib/auth.ts](src/lib/auth.ts)). Public routes are `/login` and `/register`.

## Providers + UI utilities
- Global providers include React Query, Next Themes, and Toaster in [src/providers/index.tsx](src/providers/index.tsx).
- Use `useToast()` for user feedback; Toast UI lives in [src/components/ui/toast.tsx](src/components/ui/toast.tsx).

## Developer workflows
- Dev server: `pnpm dev` (Turbopack). Build: `pnpm build`. Lint: `pnpm lint`. Format: `pnpm format` (Prettier + Tailwind plugin) from [package.json](package.json).

## Conventions to follow
- Keep feature code in the relevant `src/features/<domain>` folder; reuse shared UI from `src/components/ui`.
- Prefer query hooks + mutations per domain rather than calling `apiClient` directly inside page components.