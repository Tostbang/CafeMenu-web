# Project Overview

This project is a web application that allows restaurant-cafe owners to manage their menu and show their menu to their customer by reading qr code. It is frontend project that count on an isolated .net backend built using Next.js and React. The whole content would be in Turkish.


## Folder Structure

- `/app`: Contains the source code for all the pages.
- `/app/admin`: This for admin pages.
- `/app/dash`: This for regular user pages.
- `/lib`: Contains the codes that is used globally like zustand store and types, etc.
- `/components`: Contains reusable components including form components and UI elements.

## Libraries and Frameworks

- Next.js and Tailwind CSS.
- Shadcn as the UI library - all of its components are in `/components/ui/*`

- React Hook Form with Zod for form validation
- TanStack Query for data fetching


## Coding Standards

- Use function-based components in React.
- Use `useQueryOp` and `useMuationOp` from `/lib/Fetch.ts` these are react query rapper that comes with types safetly by openapi the types they are using is comming form `/lib/types/api.d.ts` here all the endpoints types.
- Use `useForm`, `zod`, `zodResolver` like in the login form for all forms.
- **Forms**: Always use `FormInput` component from `/components/FormInput.tsx` instead of raw `Input` components.
- **Boolean Controls**: Use `Switch` component from `/components/ui/switch.tsx` instead of checkboxes for boolean toggles.
- Form validation should use Zod schemas with proper error messages in Turkish.

## UI Guidelines

- Application should have a modern and clean design.
- The design must have one identity that all pages share common elements.
- All user-facing text must be in Turkish.

- Use consistent spacing and styling across pages.
- Forms should use the FormInput component for consistency and built-in validation display.
