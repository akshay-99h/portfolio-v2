# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. The project uses the React Compiler for automatic optimization.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome

## Architecture

### Next.js App Router Structure
- Uses the App Router (`src/app/`) pattern introduced in Next.js 13+
- Route organization: Each folder under `src/app/` represents a route segment
- `layout.tsx` - Root layout that wraps all pages, includes font setup (Geist Sans and Geist Mono)
- `page.tsx` - Home page component
- `globals.css` - Global styles with Tailwind v4 and CSS theme variables

### TypeScript Configuration
- Path alias `@/*` maps to `./src/*` - use this for absolute imports
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler

### Styling
- Tailwind CSS v4 with PostCSS integration
- Custom theme variables defined in `globals.css` using `@theme inline`
- Dark mode support via `prefers-color-scheme` media query
- CSS custom properties for theming (`--background`, `--foreground`)

### Code Quality Tools
- **Biome** (not ESLint/Prettier) for linting and formatting
- Biome configuration includes Next.js and React recommended rules
- Auto-organize imports enabled
- Indentation: 2 spaces

### React Compiler
- React Compiler (babel-plugin-react-compiler) is enabled in `next.config.ts`
- Automatically optimizes React components - avoid manual memoization unless necessary
- The compiler handles most performance optimizations

## Key Technical Details

### Package Manager
- Uses `pnpm` with workspace configuration (`pnpm-workspace.yaml`)
- Always use `pnpm` commands, not npm or yarn

### Font Loading
- Geist Sans and Geist Mono loaded via `next/font/google`
- Font variables (`--font-geist-sans`, `--font-geist-mono`) available globally
- Fonts mapped to Tailwind custom font families in `globals.css`

### Image Optimization
- Uses Next.js `Image` component for automatic optimization
- Static assets in `/public` directory
