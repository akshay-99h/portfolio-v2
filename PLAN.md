# Portfolio Development Plan

## Project Overview

Building a minimal yet developer-focused portfolio website for Akshay Prabhat Mishra, combining clean design with technical aesthetics (terminal elements, code snippets, developer-centric details).

**Current Status:** Phase 1 - Foundation & Data Setup (In Progress)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Email Service:** Resend
- **Content:** Markdown with gray-matter

---

## Completed Items ✓

### Data & Types
- [x] TypeScript types and interfaces (resume, project, blog)
- [x] Resume data converted to TypeScript (updated to 2+ years experience)
- [x] Projects data with 8 placeholder projects and gradient color pairs
- [x] Tech stack categorized data with terminal command styling
- [x] Utility function (cn helper for classnames)
- [x] Installed dependencies: clsx, tailwind-merge

---

## Current Working Items 🔨

### Styling Foundation
- [x] Extend globals.css with developer theme variables
  - Terminal colors (bg, text, border)
  - Code snippet colors
  - Syntax highlighting colors
  - Custom scrollbar
  - Selection styles
  - Smooth scroll behavior

---

## Upcoming Tasks 📋

### Phase 1: Foundation & MVP (Remaining)

#### Base UI Components
- [x] Button component (variants: primary, secondary, outline)
- [x] Card component (for projects and blog posts)
- [x] Badge component (tech stack tags)
- [x] SectionContainer component (max-width wrapper)

#### Specialized Components
- [x] ProjectThumbnail component (CSS gradient patterns)
- [x] FilterBar component (category tabs + tech tag filters)
- [x] Terminal component (terminal window chrome)
- [x] CodeBlock component (syntax highlighting)

#### Layout Components
- [x] Header (sticky navigation with anchor links)
- [x] Footer (social links, location, copyright)
- [x] Navigation (mobile/desktop responsive)

#### Main Sections
- [x] Hero section
  - Name with gradient effect
  - Typewriter animation for title
  - Summary and CTAs
  - Social icons
- [x] TechStack section
  - Terminal-style category headers
  - Tech items displayed as terminal output
- [x] Projects section
  - Responsive grid (2-3 columns)
  - Dual filtering (category tabs + tech tags)
  - Project cards with gradient thumbnails
  - Code snippet previews
- [x] Contact section (layout only)
  - Form structure (no submission yet)
  - Social links display
  - Location info

#### Integration
- [x] Update root layout.tsx metadata
- [x] Assemble main page.tsx with all sections
- [ ] Test responsiveness across breakpoints
- [ ] Test dark mode functionality

**Phase 1 Deliverable:** Functional single-page portfolio with static content

---

### Phase 2: Contact Form & Blog

#### Contact Form Setup
- [x] Install Resend: `pnpm add resend`
- [ ] Set up environment variables (.env.local)
- [x] Create `/api/contact/route.ts` API endpoint
- [x] Implement form validation (client-side)
- [x] Add loading/success/error states
- [ ] Test email sending functionality

#### Blog System
- [x] Install gray-matter: `pnpm add gray-matter`
- [x] Create blog content directory structure
- [x] Implement blog post reader utilities (`src/lib/blog/posts.ts`)
- [x] Build BlogCard component
- [x] Build MarkdownRenderer component
- [x] Create `/blog/page.tsx` listing page
- [x] Create `/blog/[slug]/page.tsx` individual post page
- [x] Implement BlogPreview section on homepage
- [x] Write 3-5 real-looking technical blog posts with code examples:
  1. "Building Scalable Backend Systems with NestJS"
  2. "Mastering TypeScript: Advanced Patterns"
  3. "Deploying Node.js to AWS with Docker"
  4. "Real-Time Features with WebSockets and Redis"
  5. "From Idea to Production: Case Study"

**Phase 2 Deliverable:** Working contact form and blog system with realistic content

---

### Phase 3: Developer Polish

#### Enhanced Components
- [x] Add code snippet previews to project cards
- [x] Implement terminal-style section headers
- [x] Add typewriter effect to hero title
- [x] Implement cursor blink animation
- [x] Add smooth scroll with active section highlighting
- [x] Refine hover states and micro-interactions
- [x] Add copy-to-clipboard for code blocks
- [x] Ensure all animations respect `prefers-reduced-motion`

**Phase 3 Deliverable:** Polished developer aesthetic throughout

---

### Phase 4: Content & Launch

#### Content Population
- [ ] Populate actual project data (replace placeholders)
- [ ] Write 3-5 real blog posts
- [ ] Refine all copy and content

#### SEO & Metadata
- [ ] Update metadata for SEO (title, description)
- [ ] Add Open Graph tags
- [ ] Create Open Graph images
- [ ] Create `robots.txt`
- [ ] Generate `sitemap.xml`

#### Testing & Optimization
- [ ] Run Lighthouse audit (target: 95+)
- [ ] Test on multiple devices and browsers
- [ ] Optimize images and assets
- [ ] Test all links and forms

#### Deployment
- [ ] Deploy to Vercel
- [ ] Test production environment
- [ ] Configure custom domain (optional)
- [ ] Set up analytics (optional)

**Phase 4 Deliverable:** Production-ready portfolio

---

## Design Specifications

### Color Palette
```css
/* Light Mode */
--terminal-bg: #1a1a1a
--terminal-text: #00ff00
--code-bg: #0d1117
--accent: #0066cc
--border: #e5e7eb

/* Dark Mode */
--terminal-bg: #000000
--accent: #3b82f6
--border: #262626
```

### Typography
- **UI Text:** Geist Sans
- **Code/Technical:** Geist Mono
- **Headings:** 3xl-5xl, tight tracking
- **Body:** Line-height 1.6-1.8

### Spacing
- Section padding: py-20, px-6
- Max-width: 1200px
- Grid gaps: 6-8 (1.5rem-2rem)

---

## Key Features

### Terminal Aesthetics
- Terminal window chrome with colored dots
- Command-style section headers: `$ cd ~/portfolio/projects`
- Monospace for all technical content
- Terminal green accent color (#00ff00)

### Project Filtering
- **Category Tabs:** All, Backend, Frontend, Full-Stack, AI/ML
- **Tech Tags:** Clickable badges filter by technology
- **Both filters work together** (AND logic)
- Clear all filters button

### Code Snippets
- Always dark background (even in light mode)
- Syntax highlighting with subtle colors
- Copy-to-clipboard button
- Language badge in top-right
- Line numbers (optional)

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx ✓
│   ├── page.tsx (pending)
│   ├── globals.css (in progress)
│   ├── api/contact/route.ts (pending)
│   └── blog/
│       ├── page.tsx (pending)
│       └── [slug]/page.tsx (pending)
├── components/
│   ├── layout/ (pending)
│   ├── sections/ (pending)
│   ├── ui/ (pending)
│   └── blog/ (pending)
├── lib/
│   ├── data/
│   │   ├── resume.ts ✓
│   │   ├── projects.ts ✓
│   │   └── tech-stack.ts ✓
│   ├── utils/
│   │   └── cn.ts ✓
│   └── blog/
│       └── posts.ts (pending)
├── types/
│   ├── resume.ts ✓
│   ├── project.ts ✓
│   └── blog.ts ✓
└── content/
    └── blog/
        └── *.md (pending)
```

---

## Environment Variables Required

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=akshayprabhatmishra@gmail.com
```

---

## Commands Reference

```bash
# Development
pnpm dev

# Build
pnpm build

# Production
pnpm start

# Linting
pnpm lint

# Formatting
pnpm format
```

---

## Timeline Estimate

- **Phase 1:** 3-4 days (60% complete)
- **Phase 2:** 2 days
- **Phase 3:** 1-2 days
- **Phase 4:** 1-2 days

**Total:** 8-10 days from start to production

---

## Notes

- Experience level updated from "1+ year" to "2+ years" per user request
- Using CSS gradient patterns for project thumbnails (no placeholder images)
- Blog posts should have real technical content with code examples
- Dual filtering system (tabs + tags) for projects section
- All animations must respect `prefers-reduced-motion`

---

## Next Immediate Steps

1. Complete globals.css developer theme extension
2. Build base UI components (Button, Card, Badge, SectionContainer)
3. Build specialized components (ProjectThumbnail, FilterBar)
4. Implement Header and Footer
5. Build Hero section with typewriter effect
