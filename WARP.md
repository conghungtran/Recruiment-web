# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a corporate website for VTech, an IT solutions provider, built with **Next.js 15** and **React 19** using the App Router architecture. The site showcases services like software development, cloud solutions, IT consulting, and cybersecurity.

## Development Commands

### Essential Commands
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Package Management
- **Package manager**: pnpm (lock file: `pnpm-lock.yaml`)
- **Install dependencies**: `pnpm install`

### Testing & Development
- No test suite currently configured
- ESLint and TypeScript errors are ignored during builds (`ignoreDuringBuilds: true`, `ignoreBuildErrors: true`)

## Architecture & Structure

### Framework & Tech Stack
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** (new CSS-first architecture)
- **shadcn/ui** components with Radix UI primitives
- **Framer Motion** for animations
- **Geist Font** (Sans & Mono)
- **Vercel Analytics** integration

### Directory Architecture

```
app/                    # Next.js App Router pages
├── globals.css        # Global styles & CSS variables
├── layout.tsx         # Root layout with Header/Footer
├── page.tsx          # Homepage
├── about/page.tsx    # About page
├── careers/page.tsx  # Careers page
├── contact/page.tsx  # Contact page
├── services/page.tsx # Services page
└── solutions/page.tsx # Solutions page

components/            # React components
├── ui/               # shadcn/ui component library
├── header.tsx        # Site header with navigation
├── footer.tsx        # Site footer
└── theme-provider.tsx # Dark/light theme provider

data/                 # Static data files
└── careersData.ts    # Job listings data

lib/                  # Utility libraries
└── utils.ts          # Tailwind class merging utilities

hooks/                # Custom React hooks
├── use-mobile.ts     # Mobile detection
└── use-toast.ts      # Toast notifications
```

### UI Component System
- **Design System**: shadcn/ui with "new-york" style variant
- **Base Color**: Neutral with CSS variables for theming
- **Icons**: Lucide React
- **Component Path Aliases**:
  - `@/components` → `./components`
  - `@/lib` → `./lib` 
  - `@/hooks` → `./hooks`

### Styling Architecture
- **Tailwind CSS v4** with new CSS-first configuration
- **Custom CSS Variables**: VTech corporate theme (deep blue primary)
- **Dark Mode**: Supported via CSS variables in `:root` and `.dark`
- **Color Scheme**: OKLCH color space for better contrast
- **Animations**: `tw-animate-css` plugin for enhanced animations

### Content & Data Management
- **Static Content**: Hardcoded in components (services, advantages, clients)
- **Career Data**: Centralized in `data/careersData.ts`
- **Images**: Stored in `public/` directory with placeholder assets

## Key Features & Patterns

### Navigation Structure
The site follows a standard corporate website structure:
- Home → About → Services → Solutions → Careers → Contact
- Mobile-responsive navigation with hamburger menu
- Fixed header with backdrop blur effect

### Animation Patterns
- **Framer Motion**: Used extensively for scroll-triggered animations
- **Pattern**: `whileInView` with `viewport={{ once: true }}` for performance
- **Staggered Animations**: Sequential delays for list items

### Component Patterns
- Client-side components use `"use client"` directive
- Consistent use of shadcn/ui Card components for content sections
- Icon + title + description pattern for feature showcases

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Grid layouts that adapt: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Flexible spacing: `py-16 lg:py-24` pattern throughout

## Development Guidelines

### File Naming Conventions
- Pages: `page.tsx` in route directories
- Components: `kebab-case.tsx` (e.g., `theme-provider.tsx`)
- Data files: `camelCase.ts` (e.g., `careersData.ts`)

### Component Development
- Use TypeScript interfaces for props
- Implement proper accessibility attributes
- Follow shadcn/ui component patterns for consistency
- Utilize the `cn()` utility for conditional classes

### Adding New Pages
1. Create new directory in `app/`
2. Add `page.tsx` with default export function
3. Update navigation in `components/header.tsx` and `components/footer.tsx`
4. Follow existing animation and layout patterns

### Adding New Components
1. Place reusable components in `components/`
2. UI primitives go in `components/ui/`
3. Use proper path aliases (`@/components`, etc.)
4. Follow existing prop patterns and TypeScript usage

### Styling Guidelines
- Use CSS variables for theme values
- Maintain consistent spacing scale (`py-16 lg:py-24`)
- Follow mobile-first responsive patterns
- Keep animations performance-focused with `once: true`
