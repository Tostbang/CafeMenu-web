# Project Overview

This repository contains two main projects:

## `/mini-pazar`

The main project under active development.  
It is a no-code / low-code mini e-commerce builder that allows non-technical users to create their own online store, manage products, and instantly publish a shareable storefront website.

## `/CafeMenu-web`

A reference project used for UI/UX and structural inspiration only.  
It represents a café menu system and is used as a design and architecture benchmark. The goal is to adapt and improve its patterns for the mini e-commerce system in `/mini-pazar`.

---

# Folder Structure

Inside `/mini-pazar`:

- `/app` → All application pages and routes (Next.js App Router)
- `/app/admin` → Admin dashboard (store owner management)
- `/app/dashboard` → User dashboard (store setup, products, settings)
- `/lib` → Global utilities, Zustand stores, API helpers, shared logic
- `/components` → Reusable UI components
- `/components/ui` → Shadcn UI components (do not modify core structure unless necessary)
- `/types` → Shared TypeScript types (if needed)

---

# Libraries and Frameworks

- Next.js (App Router)
- React
- Tailwind CSS
- Shadcn UI (components located in `/components/ui`)
- React Hook Form + Zod (form handling and validation)
- TanStack Query (data fetching and caching)

Custom API layer:

- `useQueryOp`
- `useMutationOp`

Located in `/lib/Fetch.ts`  
Uses OpenAPI-generated types from `/lib/types/api.d.ts`

---

# Coding Standards

- Use **function components only** (no class components)
- Always use:
  - `useQueryOp` for queries
  - `useMutationOp` for mutations

- All forms must use:
  - `useForm`
  - `zod`
  - `zodResolver`

- Always use `FormInput` from:
  - `/components/FormInput.tsx`

- For boolean inputs:
  - Use `Switch` from `/components/ui/switch.tsx` (never checkboxes)

- All validation messages must be written in **Turkish**

- All API calls must remain fully typed using `/lib/types/api.d.ts`

---

# UI Guidelines

- The UI must be modern, clean, and consistent across all pages
- Maintain a single design identity across dashboard and public storefronts
- All user-facing text must be in **Turkish**
- Use `/CafeMenu-web` as a **reference only**
- Adapt and improve its UX for e-commerce use cases (products, cart, checkout, etc.)

---

# Architectural Rules

- `/CafeMenu-web` is **read-only reference**
  - Do not copy blindly
  - Use only as inspiration for UI/UX patterns

- `/mini-pazar` is the only active development target
  - All new features must be implemented here
  - Focused on e-commerce / mini store builder logic

---

# Important Principles

- Keep components reusable and domain-agnostic where possible
- Prefer consistency over one-off UI variations
- Optimize for non-technical users creating stores
- Ensure fast, minimal, and mobile-friendly UX
