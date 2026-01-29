# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RankFi Web Frontend is a Next.js-based cryptocurrency exchange comparison platform. Currently in Phase 1 (Foundation Building) with a one-page comparison site. The architecture is designed to scale to hundreds of blog pages and multiple comparison pages.

## Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript 5
- **Styling**: Tailwind CSS v4 with custom design tokens in `app/globals.css`
- **Tables**: TanStack React Table for sorting, filtering, pagination, column pinning
- **UI Libraries**: Headless UI and Radix UI for accessible, unstyled components
- **Icons**: Lucide React, Tabler Icons
- **Animations**: Motion library

## Architecture

### Routing
File-based routing using Next.js App Router. Each folder with `page.tsx` = a URL route.
- `/` redirects to `/best-crypto-exchanges`
- `/best-crypto-exchanges` - Main comparison page
- `/dev`, `/styleguide`, `/typography-test` - Development pages

### Key Directories

```
app/
├── best-crypto-exchanges/page.tsx   # Main page
├── components/                       # Reusable UI components
│   ├── ComparisonTable/             # Core table with sorting, filtering, pagination
│   │   ├── index.tsx                # Main component with TanStack Table
│   │   └── constants.ts             # Column definitions, regions, filters
│   ├── Header.tsx, Footer.tsx       # Layout components
│   └── ui/                          # shadcn/ui components
├── config/filterButtons.ts          # Filter button configuration
├── data/exchanges.ts                # Static exchange data (~25 records)
├── types/exchange.ts                # Exchange TypeScript interface
├── utils/
│   ├── tableHelpers.ts              # Cell formatting, sorting, fee calculations
│   ├── dataValidation.ts            # Validation utilities
│   └── index.ts                     # cn() utility for Tailwind class merging
└── globals.css                       # Design tokens (--rankfi-* variables)

hooks/                                # Custom React hooks
├── useHorizontalScroll.ts           # Scroll detection for sticky columns
└── use-controlled-state.tsx
```

### State Management
Local component state only (useState). No global state library. ComparisonTable manages sorting, pagination, visibility, row selection, and column pinning states.

### Data Flow
Static data (`app/data/exchanges.ts`) → TypeScript types (`app/types/exchange.ts`) → Components → Utilities (`tableHelpers.ts` for formatting/sorting) → Rendered UI

## Design System

All design tokens are CSS variables in `app/globals.css`. Use Tailwind classes like `bg-rankfi-teal`, `text-rankfi-dark`.

**Key tokens:**
- `--rankfi-teal: #00a38f` - Primary brand color
- `--rankfi-dark: #0a0a0a` - Header/footer backgrounds
- `--rankfi-gray: #2d2d2d` - Table headers, active buttons
- `--rankfi-light-gray: #f0f0f0` - Inactive buttons, hover states
- `--rankfi-border: #eaeaea` - Borders

**Fonts**: Inter (configured in `app/layout.tsx`)

## Component Patterns

- Use Headless UI/Radix UI for complex components (dropdowns, modals, tabs)
- Style all library components with Tailwind to match brand
- Use `cn()` from `app/utils` for conditional class merging
- Use class-variance-authority for component variants

## Path Aliases

`@/*` maps to the project root (configured in tsconfig.json)
