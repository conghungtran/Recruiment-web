# 🎴 Card Design System - VTech V2.0

**Version:** 1.0  
**Status:** Complete  
**Last Updated:** 2025-10-18

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Base Card Component](#base-card-component)
3. [Card Types](#card-types)
4. [Typography Hierarchy](#typography-hierarchy)
5. [Spacing Rules](#spacing-rules)
6. [Icon Standards](#icon-standards)
7. [Responsive Behavior](#responsive-behavior)
8. [Usage Examples](#usage-examples)
9. [Best Practices](#best-practices)

---

## Overview

### Design Philosophy

**Tối Giản (Minimalism):** Clean, uncluttered cards with clear information hierarchy.  
**Hiện Đại (Modern):** Subtle hover effects, smooth transitions, refined aesthetics.  
**Đồng Bộ (Consistency):** Unified spacing, typography, colors, and interactions across all card types.

### Key Principles

- ✅ **Single focus:** Each card communicates one main idea
- ✅ **Whitespace:** Generous padding and gutters for readability
- ✅ **Minimal ornamentation:** No heavy shadows, excessive gradients, or decorative elements
- ✅ **Accessible:** WCAG AA compliant, semantic HTML, proper contrast
- ✅ **Responsive:** Graceful scaling across all breakpoints
- ✅ **Interactive:** Subtle hover states (shadow, scale ≤ 1.03)

---

## Base Card Component

### CSS Classes

```tsx
// Base card wrapper
'bg-card text-card-foreground group flex flex-col gap-6 rounded-lg border py-6 shadow-sm transition-shadow hover:shadow-md'

// Hover state
- shadow-sm → shadow-md
- transition-shadow (smooth change)
```

### Structure

```tsx
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

### Default Spacing

| Element | Padding | Gap |
|---------|---------|-----|
| Card | `py-6` | `gap-6` |
| CardHeader | `px-6` | Flex column |
| CardContent | `px-6` | - |
| CardFooter | `px-6` | - |
| Section dividers | `pb-6` / `pt-6` | - |

---

## Card Types

### 1. Service Card

**Purpose:** Showcase services, features, or solutions.  
**Layout:** Icon/Image + Title + Description + CTA

#### Structure

```tsx
<ServiceCard
  title="Cloud Solutions"
  description="Enterprise-grade cloud infrastructure with 99.9% uptime"
  category="Infrastructure"
  icon={Cloud}
  href="/services/cloud"
/>
```

#### Components

| Element | Class | Notes |
|---------|-------|-------|
| Media | `aspect-video` | If image present |
| Icon | `w-5 h-5` | Neutral gray, no background |
| Category | Text | `text-xs text-muted-foreground` |
| Title | `CardTitle` | `text-lg font-semibold` |
| Description | `CardDescription` | `text-sm text-muted-foreground` |
| CTA | Link | `text-primary hover:underline` |

#### Responsive

- Mobile: Single column, stacked layout
- Tablet: 2 columns
- Desktop: 4 columns (on homepage)
- Image scale on hover: `1.03`

---

### 2. News Card

**Purpose:** Display blog articles, updates, announcements.  
**Layout:** Media (16:9 aspect) + Meta + Title + Excerpt + CTA

#### Structure

```tsx
<NewsCard
  title="New AI Integration Launch"
  excerpt="We've integrated cutting-edge AI tools into our platform..."
  category="Product"
  date="Oct 18, 2025"
  image="/images/article.jpg"
  slug="ai-integration"
  featured={false}
/>
```

#### Components

| Element | Class | Notes |
|---------|-------|-------|
| Media | `aspect-video lg:aspect-[21/9]` | Featured: wider ratio |
| Meta row | Flex | Category badge + • + Date |
| Title | `CardTitle` | Featured: `text-2xl` |
| Excerpt | `CardDescription` | `line-clamp-3` |
| CTA | Link | `text-primary hover:underline` |
| Featured badge | `Badge` | `variant="outline"` |

#### Responsive

- Mobile: `aspect-video`
- Desktop: Featured articles span 2 columns with `aspect-[21/9]`
- Default: 3 columns on desktop, 2 on tablet, 1 on mobile
- Image scale on hover: `1.03`

---

### 3. Job Card

**Purpose:** Display job listings with quick details.  
**Layout:** Header (Icon + Title + Dept) + Meta + Description + CTA Buttons

#### Structure

```tsx
<JobCard
  title="Senior React Developer"
  department="Engineering"
  location="Ho Chi Minh City"
  type="Full-time"
  description="We're looking for an experienced React developer..."
  slug="senior-react-dev"
  featured={false}
/>
```

#### Components

| Element | Class | Notes |
|---------|-------|-------|
| Icon | `w-5 h-5` | Briefcase, muted background |
| Title | `CardTitle` | Truncated on overflow |
| Department | `CardDescription` | Subtitle |
| Meta | Flex row | Location + Type with icons |
| Description | `text-sm` | `line-clamp-2` |
| Actions | Two buttons | Primary (Apply) + Outline (Details) |
| Featured badge | `Badge` | `variant="secondary"` (Hot) |

#### Responsive

- Mobile: Stacked layout
- Desktop: Side-by-side header with truncation
- Buttons: Stack on mobile, flex on desktop
- Border separator before actions

---

### 4. Team Card

**Purpose:** Display team members with social links.  
**Layout:** Avatar (centered) + Name + Role + Social Icons

#### Structure

```tsx
<TeamCard
  name="John Doe"
  role="Lead Designer"
  image="/images/john.jpg"
  linkedin="https://linkedin.com/in/johndoe"
  email="john@vtech.com"
/>
```

#### Components

| Element | Class | Notes |
|---------|-------|-------|
| Avatar | `h-24 w-24 rounded-full` | Image fill, centered |
| Name | `CardTitle` | Center aligned |
| Role | `CardDescription` | Subtitle |
| Social icons | `h-8 w-8 rounded-full` | Muted background |
| Hover | `bg-muted/80` | Neutral, no color change |

#### Responsive

- Mobile: Full width, centered
- Desktop: Grid layout (typically 3-4 columns)
- Avatar size: Consistent `h-24 w-24`
- Social buttons: Always centered below

---

### 5. Testimonial Card

**Purpose:** Display client testimonials with ratings.  
**Layout:** Stars + Quote + Author with initials

#### Structure

```tsx
<TestimonialCard
  name="Jane Smith"
  position="CEO, Tech Corp"
  testimonial="VTech exceeded our expectations..."
  rating={5}
/>
```

#### Components

| Element | Class | Notes |
|---------|-------|-------|
| Stars | `h-4 w-4 fill-primary` | Up to 5 stars |
| Quote | `text-sm` | Wrapped in quotation marks |
| Avatar | `h-10 w-10 rounded-full` | Initials on muted bg |
| Name | `text-sm font-semibold` | Truncate on overflow |
| Position | `text-xs text-muted-foreground` | Truncate |

#### Responsive

- Mobile: Full width
- Tablet: 2 columns
- Desktop: 3 columns
- All elements responsive to container width

---

## Typography Hierarchy

### Card Titles

```tsx
// Standard card title
className="text-lg font-semibold text-gray-900"

// Large card title (featured news)
className="text-2xl font-semibold"

// Subtle subtitle/label
className="text-xs text-muted-foreground"
```

### Card Descriptions

```tsx
// Standard description
className="text-sm text-muted-foreground"

// Large description (meta info)
className="text-sm text-gray-600"

// Truncation
className="line-clamp-2"  // 2 lines max
className="line-clamp-3"  // 3 lines max
```

### Call-to-Action

```tsx
// Link-style CTA
className="text-sm font-medium text-primary hover:underline"

// Button CTA
<Button size="sm">...</Button>
```

---

## Spacing Rules

### Consistent Scale

All spacing uses multiples of 4px (Tailwind's default):

```
gap-1 = 4px
gap-2 = 8px
gap-3 = 12px
gap-4 = 16px
gap-6 = 24px
gap-8 = 32px
```

### Card Internal Spacing

| Level | Property | Value | Purpose |
|-------|----------|-------|---------|
| Header | `gap` | `2` (8px) | Between elements |
| Content | `gap` | `3` (12px) | Between sections |
| Footer | `gap` | `3` (12px) | Between buttons |
| Card overall | `gap` | `6` (24px) | Between sections |

### Section Spacing (on pages using cards)

```tsx
// Section header
className="mb-16"  // 64px below heading

// Grid gap between cards
className="gap-6"  // 24px on all sides
className="gap-8"  // 32px on larger screens

// Card internal vertical spacing
py-6  // 24px vertical padding
```

---

## Icon Standards

### Sizing

```tsx
// Small icons (meta info, badges)
className="w-3 h-3"

// Standard icons (in headers, CTAs)
className="w-4 h-4"

// Medium icons (in card headers)
className="w-5 h-5"

// Large icons (in advantage boxes)
className="w-6 h-6"
```

### Stroke Width

```tsx
// Standard lucide-react default
strokeWidth={2}  // Most common

// Thinner icons (alternative)
strokeWidth={1.5}  // For less visual weight

// Don't use
strokeWidth={3}  // Too heavy
strokeWidth={1}  // Too thin
```

### Color

```tsx
// No tinted backgrounds - let icon inherit text color
<Icon className="w-5 h-5" />  // ✅ Good

// Not recommended
<Icon className="w-5 h-5 text-primary" />  // Use only for emphasis

// Background container
className="bg-muted"  // Neutral gray, not primary/10
```

### Library

- ✅ **Only lucide-react** for consistency
- ❌ Don't mix icon libraries
- ❌ Avoid custom SVGs without reason

---

## Responsive Behavior

### Breakpoints

```tsx
// Mobile first approach
sm:   640px   (phones, landscape)
md:   768px   (tablets)
lg:  1024px   (desktops)
xl:  1280px   (wide screens)
```

### Card Grid Layouts

#### Service Cards

```tsx
grid-cols-1           // Mobile
md:grid-cols-2        // Tablet (2 cols)
lg:grid-cols-4        // Desktop (4 cols)
gap-6                 // Consistent gap
```

#### News Cards

```tsx
grid-cols-1           // Mobile
md:grid-cols-2        // Tablet
lg:grid-cols-3        // Desktop
gap-6
```

#### Testimonial Cards

```tsx
grid-cols-1           // Mobile
md:grid-cols-2        // Tablet
lg:grid-cols-3        // Desktop
gap-8
```

#### Job Cards

```tsx
grid-cols-1           // Mobile (full width)
md:grid-cols-1        // Tablet (still single column)
lg:grid-cols-2        // Desktop (2 cols optional)
gap-6
```

### Image Aspect Ratios

| Card Type | Mobile | Desktop | Notes |
|-----------|--------|---------|-------|
| Service | Optional | Optional | 16:9 if present |
| News | 16:9 | 16:9 | Featured: 21:9 |
| Job | No image | No image | Icon only |
| Team | Avatar | Avatar | 1:1 ratio |

### Touch/Hover Areas

```tsx
// Minimum touch target: 44x44px
// Recommended: 48x48px

// Buttons
min-h-10  // 40px (adequate)
min-w-10

// Icon buttons
h-8 w-8   // 32px (adequate for secondary)
h-10 w-10 // 40px (primary)

// Card interactive areas
min-h-12  // 48px (good for cards)
```

---

## Usage Examples

### Example 1: Service Card on Homepage

```tsx
import { ServiceCard } from "@/components/ui/service-card"
import { Cloud } from "lucide-react"

export function ServicesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="text-lg text-gray-600">Comprehensive solutions</p>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            title="Cloud Solutions"
            description="Enterprise-grade infrastructure with 99.9% uptime"
            category="Infrastructure"
            icon={Cloud}
            href="/services/cloud"
          />
          {/* More cards... */}
        </div>
      </div>
    </section>
  )
}
```

### Example 2: News Card with Featured Variant

```tsx
import { NewsCard } from "@/components/ui/news-card"

export function NewsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Regular news cards */}
      <NewsCard
        title="New Update"
        excerpt="Discover our latest features..."
        category="Product"
        date="Oct 18, 2025"
        image="/news1.jpg"
        slug="new-update"
        featured={false}
      />

      {/* Featured news card (larger) */}
      <NewsCard
        title="Major Release Announcement"
        excerpt="We're excited to announce..."
        category="Announcement"
        date="Oct 15, 2025"
        image="/news-featured.jpg"
        slug="major-release"
        featured={true}
      />
    </div>
  )
}
```

### Example 3: Testimonial Cards Grid

```tsx
import { TestimonialCard } from "@/components/ui/testimonial-card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jane Smith",
      position: "CEO, Tech Corp",
      testimonial: "VTech transformed our business...",
      rating: 5
    },
    // More testimonials...
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Clients Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Example 4: Horizontal Card Layout

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CardHorizontal, CardHorizontalMedia, CardHorizontalBody } from "@/components/ui/card-variants"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function HorizontalCard() {
  return (
    <Card>
      <CardHorizontal>
        {/* Media on left (MD+) */}
        <CardHorizontalMedia>
          <Image
            src="/sample.jpg"
            alt="Example"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </CardHorizontalMedia>

        {/* Content on right */}
        <CardHorizontalBody>
          <CardHeader>
            <div className="text-xs text-muted-foreground">Category</div>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Description text that scales responsively.</CardDescription>
          </CardHeader>

          <CardFooter className="pt-0">
            <a href="#" className="text-sm font-medium text-primary hover:underline inline-flex gap-1">
              Learn more <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </CardFooter>
        </CardHorizontalBody>
      </CardHorizontal>
    </Card>
  )
}
```

---

## Best Practices

### ✅ DO

1. **Use semantic CardHeader/Content/Footer:**
   ```tsx
   <Card>
     <CardHeader><CardTitle>Title</CardTitle></CardHeader>
     <CardContent>Content</CardContent>
     <CardFooter>Action</CardFooter>
   </Card>
   ```

2. **Keep descriptions concise:**
   - Title: max 60 characters
   - Description: max 120 characters
   - Use line-clamp for overflow

3. **Consistent hover states:**
   - Shadow: sm → md
   - Scale: 1.0 → 1.03 (images only)
   - Duration: 300-500ms

4. **Provide accessible labels:**
   ```tsx
   <Icon aria-hidden />  // Decorative
   <Icon aria-label="Download" />  // Interactive
   ```

5. **Use proper color tokens:**
   ```tsx
   text-primary          // Main color
   text-muted-foreground // Secondary text
   bg-muted              // Backgrounds
   ```

### ❌ DON'T

1. **Heavy shadows:**
   ```tsx
   // ❌ Don't do this
   shadow-2xl hover:shadow-3xl

   // ✅ Do this
   shadow-sm hover:shadow-md
   ```

2. **Excessive scale:**
   ```tsx
   // ❌ Don't scale cards themselves
   hover:scale-150

   // ✅ Scale only images
   hover:scale-[1.03]
   ```

3. **Colored icon backgrounds:**
   ```tsx
   // ❌ Don't
   bg-primary/10

   // ✅ Do
   bg-muted
   ```

4. **Gradient text:**
   ```tsx
   // ❌ Don't
   bg-clip-text text-transparent bg-gradient-to-r

   // ✅ Use solid colors
   text-primary
   ```

5. **Inconsistent spacing:**
   ```tsx
   // ❌ Don't mix
   gap-5 gap-7 gap-11

   // ✅ Use scale
   gap-4 gap-6 gap-8
   ```

### Accessibility Checklist

- [ ] Cards have sufficient contrast (4.5:1 for text)
- [ ] Interactive elements are keyboard accessible
- [ ] Icons have aria-label or aria-hidden
- [ ] Links have visible focus state
- [ ] Cards work at 200% zoom
- [ ] Color is not the only means of identification
- [ ] Text is readable (line-height 1.5-1.8)

---

## Components Reference

### Imports

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ServiceCard } from "@/components/ui/service-card"
import { NewsCard } from "@/components/ui/news-card"
import { JobCard } from "@/components/ui/job-card"
import { TeamCard } from "@/components/ui/team-card"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { CardCompact, CardHighlight, CardHorizontal, CardHorizontalMedia, CardHorizontalBody } from "@/components/ui/card-variants"
```

### Props

#### ServiceCard

```tsx
interface ServiceCardProps {
  title: string
  description: string
  category?: string
  image?: string
  href: string
  icon?: LucideIcon
}
```

#### NewsCard

```tsx
interface NewsCardProps {
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  slug: string
  featured?: boolean
}
```

#### JobCard

```tsx
interface JobCardProps {
  title: string
  department: string
  location: string
  type: string
  description: string
  slug: string
  featured?: boolean
}
```

#### TeamCard

```tsx
interface TeamCardProps {
  name: string
  role: string
  image: string
  linkedin?: string
  email?: string
}
```

#### TestimonialCard

```tsx
interface TestimonialCardProps {
  name: string
  position: string
  testimonial: string
  rating: number
  initials?: string
}
```

---

## Migration Guide

### From Old Inline Cards to New Components

#### Before
```tsx
<Card className="border border-gray-200 hover:shadow-md">
  <CardContent className="p-6 space-y-4">
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary" />
      ))}
    </div>
    <blockquote className="text-sm text-gray-600">
      &ldquo;{testimonial}&rdquo;
    </blockquote>
    {/* ... */}
  </CardContent>
</Card>
```

#### After
```tsx
<TestimonialCard
  name={testimonial.name}
  position={testimonial.position}
  testimonial={testimonial.testimonial}
  rating={testimonial.rating}
/>
```

---

## Performance Considerations

1. **Image optimization:**
   - Use Next.js Image component with fill + object-cover
   - Lazy load with loading="lazy"
   - Provide width/height hints

2. **Animation performance:**
   - Use transform/opacity (GPU-accelerated)
   - Duration: 300-500ms (reduces jank)
   - Use will-change sparingly

3. **Bundle size:**
   - Lucide icons are tree-shakable
   - Import only used components
   - Leverage code splitting

---

## Conclusion

This Card Design System provides a **cohesive, scalable, and maintainable foundation** for all card-based UI patterns across VTech. By following these guidelines, teams ensure consistency, accessibility, and professional visual quality.

**Questions?** Refer back to specific card type sections or usage examples.

---

**Document Version:** 1.0  
**Status:** ✅ Complete  
**Last Updated:** 2025-10-18  
**Contact:** Design System Team

---

**🎴 Ready to build beautiful, consistent cards!**

