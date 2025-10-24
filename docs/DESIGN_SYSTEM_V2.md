# 🎨 VTech Design System V2.0
## Tối Giản | Hiện Đại | Chuyên Nghiệp

> **Philosophy:** Less is More - Mọi element phải có mục đích rõ ràng, không trang trí thừa.

---

## 📐 I. DESIGN PRINCIPLES

### 1. Tối Giản (Minimalism)
- **Whitespace is King:** Tối thiểu 24-32px spacing giữa các sections
- **Simplified Elements:** Loại bỏ decorative gradients, orbs, patterns phức tạp
- **Clean Layouts:** Grid-based, alignment nghiêm ngặt
- **Focused Content:** Mỗi section chỉ truyền tải 1 message chính

### 2. Hiện Đại (Modern)
- **Subtle Animations:** Smooth transitions (300-500ms), không bounce/elastic
- **Contemporary Typography:** Sans-serif clean, line-height 1.6-1.8
- **Refined Interactions:** Hover states nhẹ nhàng, không dramatic
- **Progressive Disclosure:** Thông tin hiện dần, không overwhelm

### 3. Đồng Bộ (Consistency)
- **Color Consistency:** Chỉ 1 màu primary, 1 màu accent
- **Icon System:** Chỉ dùng lucide-react, size & stroke thống nhất
- **Component Reusability:** Same card style, button style across pages
- **Spacing System:** Sử dụng multiples của 4 (4, 8, 12, 16, 24, 32, 48, 64)

---

## 🎨 II. COLOR SYSTEM

### A. Color Palette (SIMPLIFIED)

```css
:root {
  /* ===== LIGHT MODE ===== */
  
  /* Primary - Blue Monochromatic */
  --color-primary-50: #eff6ff;     /* Lightest backgrounds */
  --color-primary-100: #dbeafe;    /* Hover states */
  --color-primary-200: #bfdbfe;    /* Disabled states */
  --color-primary-500: #3b82f6;    /* PRIMARY COLOR - Main actions, links */
  --color-primary-600: #2563eb;    /* Hover on primary */
  --color-primary-700: #1d4ed8;    /* Active states */
  
  /* Neutral - Gray Scale (Only shades of gray) */
  --color-gray-50: #fafafa;        /* Page background */
  --color-gray-100: #f5f5f5;       /* Section backgrounds */
  --color-gray-200: #e5e5e5;       /* Borders, dividers */
  --color-gray-400: #a3a3a3;       /* Placeholder text */
  --color-gray-600: #525252;       /* Secondary text */
  --color-gray-900: #171717;       /* Primary text */
  
  /* Accent - Indigo (Used sparingly) */
  --color-accent-500: #6366f1;     /* ACCENT COLOR - Badges, highlights */
  --color-accent-600: #4f46e5;     /* Hover on accent */
  
  /* Semantic Colors (Minimal use) */
  --color-success: #22c55e;        /* Success states only */
  --color-error: #ef4444;          /* Error states only */
  
  /* Functional Colors */
  --color-background: var(--color-gray-50);
  --color-foreground: var(--color-gray-900);
  --color-muted-bg: var(--color-gray-100);
  --color-muted-fg: var(--color-gray-600);
  --color-border: var(--color-gray-200);
}

.dark {
  /* ===== DARK MODE ===== */
  
  --color-primary-500: #60a5fa;    /* Lighter blue for dark mode */
  
  --color-gray-50: #18181b;        /* Dark background */
  --color-gray-100: #27272a;       /* Section backgrounds */
  --color-gray-200: #3f3f46;       /* Borders */
  --color-gray-400: #a1a1aa;       /* Placeholder */
  --color-gray-600: #d4d4d8;       /* Secondary text */
  --color-gray-900: #fafafa;       /* Primary text */
  
  --color-background: var(--color-gray-50);
  --color-foreground: var(--color-gray-900);
}
```

### B. Color Usage Rules

| Element | Color | Usage |
|---------|-------|-------|
| **Primary CTA Buttons** | `primary-500` | Main actions (Get Started, Submit, etc.) |
| **Secondary Buttons** | `gray-900` outline | Less important actions |
| **Links** | `primary-500` | Text links, navigation |
| **Icons (primary)** | `primary-500` | Icon buttons, feature icons |
| **Icons (neutral)** | `gray-600` | Informational icons |
| **Badges** | `accent-500` | Highlights, new items |
| **Headings** | `gray-900` | All headings h1-h6 |
| **Body Text** | `gray-600` | Paragraphs, descriptions |
| **Borders** | `gray-200` | Cards, dividers, inputs |

### C. Color Don'ts ❌

- ❌ **NO Multi-color Gradients** (e.g., `from-primary via-blue-600 to-purple-600`)
- ❌ **NO Colored Backgrounds** on large sections (except hero with subtle overlay)
- ❌ **NO Decorative Glowing Orbs** or gradient blobs
- ❌ **NO Rainbow Icon Colors** (red, green, yellow, purple all together)
- ❌ **NO Color for Hierarchy** (use size & weight instead)

---

## ✍️ III. TYPOGRAPHY

### A. Font Stack

```css
--font-sans: 'Inter', -apple-system, system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Recommendation:** Sử dụng **Inter** (clean, professional) thay vì Geist Sans

### B. Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **Hero H1** | 48-72px (3xl-6xl) | 700 | 1.1 | -0.02em |
| **Page H1** | 36-48px (2xl-3xl) | 700 | 1.2 | -0.01em |
| **Section H2** | 30-36px (xl-2xl) | 700 | 1.3 | 0 |
| **Card H3** | 20-24px (lg-xl) | 600 | 1.4 | 0 |
| **Body Large** | 18px (lg) | 400 | 1.7 | 0 |
| **Body Regular** | 16px (base) | 400 | 1.6 | 0 |
| **Body Small** | 14px (sm) | 400 | 1.5 | 0 |
| **Caption** | 12px (xs) | 500 | 1.4 | 0.02em |

### C. Typography Rules

```tsx
// ✅ GOOD - Clean hierarchy
<h1 className="text-5xl font-bold text-gray-900">
  Simple Headline
</h1>
<p className="text-lg text-gray-600 mt-4">
  Clear description text
</p>

// ❌ BAD - Too many styles
<h1 className="text-4xl lg:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-purple-600">
  Overdesigned Headline
</h1>
```

### D. Typography Don'ts ❌

- ❌ **NO Gradient Text** (`bg-clip-text text-transparent`)
- ❌ **NO All Caps Headings** (except small labels)
- ❌ **NO Thin Fonts** (font-weight < 400)
- ❌ **NO Tight Line Height** on body text (< 1.5)
- ❌ **NO Excessive Font Sizes** (keep readable, not billboard)

---

## 🔲 IV. SPACING SYSTEM

### A. Spacing Scale (Multiples of 4)

```css
/* Tailwind Classes */
spacing-1  = 4px   /* Tight elements */
spacing-2  = 8px   /* Icon gaps */
spacing-3  = 12px  /* Small gaps */
spacing-4  = 16px  /* Default gap */
spacing-6  = 24px  /* Medium gap */
spacing-8  = 32px  /* Large gap */
spacing-12 = 48px  /* Section padding (small) */
spacing-16 = 64px  /* Section padding (large) */
spacing-24 = 96px  /* Hero sections */
```

### B. Layout Spacing Rules

| Context | Spacing |
|---------|---------|
| **Between Sections** | `py-16 lg:py-24` (64-96px) |
| **Container Padding** | `px-4 lg:px-8` (16-32px) |
| **Card Padding** | `p-6` (24px) |
| **Element Gap (grid)** | `gap-6` (24px) |
| **Icon → Text** | `gap-2` (8px) |
| **Button → Button** | `gap-3` (12px) |
| **Heading → Text** | `mt-4` (16px) |

### C. Whitespace Philosophy

> **"Whitespace makes content breathe"**

- Sections should feel **spacious**, not cramped
- Each card/component should have **generous padding**
- **Avoid** dense layouts with < 16px gaps
- Hero sections should be **min-h-[600px]** for breathing room

---

## 🎯 V. ICON SYSTEM (lucide-react)

### A. Icon Guidelines

```tsx
import { ArrowRight, User, Mail, Star, Check } from 'lucide-react'

// ✅ GOOD - Consistent size & stroke
<ArrowRight className="w-5 h-5 text-primary" strokeWidth={2} />

// ❌ BAD - Inconsistent sizing
<ArrowRight className="w-4 h-6 text-blue-500" strokeWidth={3} />
```

### B. Icon Size Standards

| Context | Size | Stroke Width | Class |
|---------|------|--------------|-------|
| **Button Icon** | 16px (w-4 h-4) | 2 | `w-4 h-4` |
| **Navigation Icon** | 20px (w-5 h-5) | 2 | `w-5 h-5` |
| **Feature Icon** | 24px (w-6 h-6) | 2 | `w-6 h-6` |
| **Hero Icon** | 32px (w-8 h-8) | 1.5 | `w-8 h-8` |
| **Large Feature** | 48px (w-12 h-12) | 1.5 | `w-12 h-12` |

### C. Icon Colors

```tsx
// Primary action icons
<Check className="w-5 h-5 text-primary" />

// Neutral informational icons
<Mail className="w-5 h-5 text-gray-600" />

// Icon in muted context
<User className="w-4 h-4 text-muted-foreground" />
```

### D. Icon Container Patterns

```tsx
// ✅ Pattern 1: Subtle Circle Background
<div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-primary/10">
  <Star className="w-6 h-6 text-primary" />
</div>

// ✅ Pattern 2: Bordered Square
<div className="inline-flex w-12 h-12 items-center justify-center rounded-lg border border-gray-200">
  <Mail className="w-6 h-6 text-gray-600" />
</div>

// ❌ BAD: Gradient background, large size, rotate animation
<div className="inline-flex w-20 h-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 shadow-2xl group-hover:scale-150 group-hover:rotate-12">
  <Star className="w-10 h-10 text-white" />
</div>
```

### E. Icon Don'ts ❌

- ❌ **NO Colored Icon Backgrounds** (except `bg-primary/10` subtle tint)
- ❌ **NO Multiple Colors** in same icon set
- ❌ **NO Heavy Shadows** on icon containers
- ❌ **NO Rotational Animations** on hover
- ❌ **NO Inconsistent Sizes** across similar contexts

---

## 🧱 VI. COMPONENT LIBRARY

### A. Buttons

```tsx
// ✅ PRIMARY BUTTON - Main actions
<Button className="bg-primary hover:bg-primary-600 text-white px-6 py-2.5">
  Get Started
  <ArrowRight className="ml-2 w-4 h-4" />
</Button>

// ✅ SECONDARY BUTTON - Less important
<Button variant="outline" className="border-gray-300 text-gray-900 px-6 py-2.5">
  Learn More
</Button>

// ✅ GHOST BUTTON - Tertiary actions
<Button variant="ghost" className="text-gray-600 hover:text-gray-900">
  Cancel
</Button>

// ❌ BAD - Over-styled
<Button className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-white/20 hover:scale-110 px-10 py-6 text-xl rounded-2xl">
  Too Much
</Button>
```

**Button Rules:**
- Primary = 1 per screen section max
- Height: `h-10` (40px) or `h-11` (44px) for large
- Padding: `px-6` (24px horizontal)
- Border Radius: `rounded-md` (6px)
- NO gradients, NO large shadows

### B. Cards

```tsx
// ✅ CLEAN CARD - Minimalist style
<Card className="border border-gray-200 hover:shadow-md transition-shadow">
  <CardContent className="p-6 space-y-4">
    <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-primary/10">
      <Star className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900">
      Card Title
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      Card description goes here
    </p>
  </CardContent>
</Card>

// ❌ BAD - Over-styled card
<Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 hover:-translate-y-4 hover:scale-110 rounded-3xl">
  {/* Too many effects */}
</Card>
```

**Card Rules:**
- Border: `border border-gray-200`
- Shadow: Default none, `hover:shadow-md` on interactive cards
- Padding: `p-6` (24px)
- Radius: `rounded-lg` (8px)
- NO border-0, NO gradient backgrounds, NO dramatic hover effects

### C. Badges

```tsx
// ✅ PRIMARY BADGE
<Badge className="bg-primary text-white px-3 py-1 text-xs font-medium rounded-full">
  Featured
</Badge>

// ✅ SECONDARY BADGE
<Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium rounded-full">
  Category
</Badge>

// ✅ ACCENT BADGE (sparingly)
<Badge className="bg-accent text-white px-3 py-1 text-xs font-medium rounded-full">
  New
</Badge>

// ❌ BAD - Rainbow badges
<Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl">
  Too Flashy
</Badge>
```

**Badge Rules:**
- Size: `text-xs` (12px)
- Padding: `px-3 py-1`
- Radius: `rounded-full`
- Colors: Only primary, secondary, or accent
- NO gradients, NO shadows

### D. Input Fields

```tsx
// ✅ CLEAN INPUT
<Input 
  type="text"
  placeholder="Enter email..."
  className="h-10 px-4 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-md"
/>

// ✅ INPUT WITH ICON
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <Input 
    type="text"
    placeholder="Search..."
    className="h-10 pl-10 pr-4"
  />
</div>
```

**Input Rules:**
- Height: `h-10` (40px) or `h-12` (48px) for prominent
- Border: `border-gray-200`
- Focus: `focus:border-primary focus:ring-2 focus:ring-primary/20`
- NO heavy shadows, NO colored backgrounds

---

## 📱 VII. RESPONSIVE DESIGN

### A. Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### B. Responsive Patterns

```tsx
// ✅ Typography Scaling
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

// ✅ Grid Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>

// ✅ Padding Responsive
<section className="py-12 md:py-16 lg:py-24">
  {/* Content */}
</section>

// ✅ Container Responsive
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  {/* Content */}
</div>
```

### C. Mobile Optimizations

- **Touch Targets:** Min 44px × 44px for buttons
- **Font Size:** Never below 14px on mobile
- **Spacing:** Reduce section padding by 33% on mobile
- **Navigation:** Hamburger menu below lg breakpoint
- **Images:** Aspect ratios maintained, lazy loading

---

## 🎬 VIII. ANIMATIONS & TRANSITIONS

### A. Animation Philosophy

> **"Animations should feel invisible - smooth and purposeful, not distracting"**

### B. Standard Transitions

```tsx
// ✅ Hover Effects (300ms)
className="transition-colors duration-300 hover:text-primary"
className="transition-shadow duration-300 hover:shadow-md"
className="transition-transform duration-300 hover:scale-105"

// ✅ Page Entrance (Framer Motion)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>

// ❌ BAD - Excessive animations
className="hover:scale-150 hover:rotate-12 transition-all duration-700 ease-bounce"
```

### C. Animation Guidelines

| Type | Duration | Easing | Use Case |
|------|----------|--------|----------|
| **Micro** | 150-200ms | ease-out | Button hover, icon hover |
| **Standard** | 300-400ms | ease-out | Card hover, link hover |
| **Entrance** | 500-600ms | ease-out | Page load animations |
| **Complex** | 700ms max | ease-in-out | Layout changes |

### D. Animation Don'ts ❌

- ❌ **NO Bounce/Elastic** easing (looks unprofessional)
- ❌ **NO Scale > 1.1** on hover (too dramatic)
- ❌ **NO Rotation** animations (unless icons indicating state)
- ❌ **NO Multiple Animations** simultaneously (e.g., scale + rotate + color)
- ❌ **NO Long Durations** (> 700ms feels slow)

---

## 📄 IX. PAGE-BY-PAGE REDESIGN

### 🏠 A. HOME PAGE

#### Layout Structure
```
[Hero Section]           <- Min 600px height, clean
[Services Grid]          <- 4 columns, equal height cards
[Client Logos]           <- Grayscale, infinite scroll
[Why Choose Us]          <- 3 columns, icon + text
[News Highlights]        <- 3 cards, image + excerpt
[Testimonials]           <- 3 cards, quote + avatar
[Stats Bar]              <- Inline stats with dividers
[CTA Section]            <- Clean call-to-action
```

#### Hero Section Redesign
```tsx
// ✅ MINIMALIST HERO
<section className="min-h-[600px] flex items-center border-b bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4 lg:px-8 py-24">
    <div className="max-w-3xl mx-auto text-center space-y-8">
      {/* Badge */}
      <Badge className="bg-primary/10 text-primary border-primary/20">
        <Star className="w-3 h-3 mr-1" />
        Trusted by 500+ Companies
      </Badge>
      
      {/* Headline */}
      <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
        Transform Your Business with Technology
      </h1>
      
      {/* Subheading */}
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        We deliver enterprise-grade IT solutions that drive growth and innovation
      </p>
      
      {/* CTA */}
      <div className="flex gap-4 justify-center">
        <Button size="lg" className="bg-primary hover:bg-primary-600">
          Get Started
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <Button size="lg" variant="outline">
          View Our Work
        </Button>
      </div>
    </div>
  </div>
</section>

// ❌ BAD - Current over-styled hero
<section className="relative min-h-[700px] bg-gradient-to-br from-primary via-blue-600 to-purple-600">
  {/* Decorative orbs, complex gradients */}
</section>
```

#### Services Section
```tsx
// ✅ CLEAN SERVICE CARDS
<section className="py-16 lg:py-24 bg-white">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Our Services
      </h2>
      <p className="text-lg text-gray-600">
        Comprehensive solutions for your business needs
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map(service => (
        <Card className="border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6 space-y-4">
            {/* Icon */}
            <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-primary/10">
              <service.icon className="w-6 h-6 text-primary" />
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900">
              {service.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {service.description}
            </p>
            
            {/* Link */}
            <Link href={service.href} className="inline-flex items-center text-sm font-medium text-primary">
              Learn More
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
```

---

### 📖 B. ABOUT PAGE

#### Layout Structure
```
[Hero]                   <- Company intro, stats
[Mission & Vision]       <- 2 cards side by side
[Timeline]               <- Vertical timeline, minimal
[Team Grid]              <- Photo + name + role (no complex overlays)
[Values]                 <- 4 values, icon + text
[CTA]                    <- Contact prompt
```

#### Team Cards Redesign
```tsx
// ✅ SIMPLE TEAM CARDS
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {team.map(member => (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow text-center">
      <CardContent className="p-6 space-y-4">
        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto">
          <Image 
            src={member.image}
            alt={member.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        
        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.role}</p>
        </div>
        
        {/* Social Links (optional) */}
        <div className="flex gap-2 justify-center">
          <Link href={member.linkedin} className="text-gray-400 hover:text-primary">
            <Linkedin className="w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

// ❌ BAD - Current complex overlays
<Card className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 group">
  {/* Complex gradient overlays, animated quote reveals */}
</Card>
```

---

### 💼 C. SERVICES PAGE

#### Layout Structure
```
[Hero]                   <- Service intro, search bar
[Category Filter]        <- Horizontal pills
[Service Grid]           <- 3 columns, consistent cards
[Process Timeline]       <- 4 steps, minimal icons
[CTA]                    <- Get consultation
```

#### Service Card Design
```tsx
// ✅ UNIFORM SERVICE CARDS
<Card className="border border-gray-200 hover:shadow-md transition-shadow group">
  <div className="aspect-video relative overflow-hidden bg-gray-100">
    <Image 
      src={service.image}
      alt={service.title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  
  <CardContent className="p-6 space-y-4">
    {/* Category Badge */}
    <Badge variant="secondary" className="text-xs">
      {service.category}
    </Badge>
    
    {/* Title */}
    <h3 className="text-xl font-semibold text-gray-900">
      {service.title}
    </h3>
    
    {/* Description */}
    <p className="text-sm text-gray-600">
      {service.description}
    </p>
    
    {/* Link */}
    <Link href={`/services/${service.slug}`} className="inline-flex items-center text-sm font-medium text-primary">
      View Details
      <ArrowRight className="ml-1 w-4 h-4" />
    </Link>
  </CardContent>
</Card>
```

---

### 💼 D. CAREER PAGE

#### Layout Structure
```
[Hero]                   <- Hiring message, stats
[Filter Bar]             <- Department, location dropdowns
[Job Listings]           <- 2 columns, card-based
[Benefits Grid]          <- 4 columns, icon + text
[Culture Section]        <- Photos + values
[Application CTA]        <- Join us prompt
```

#### Job Card Design
```tsx
// ✅ CLEAN JOB CARDS
<Card className="border border-gray-200 hover:shadow-md transition-shadow">
  <CardContent className="p-6 space-y-4">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-primary/10">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.department}</p>
        </div>
      </div>
      {job.featured && (
        <Badge className="bg-accent text-white">Hot</Badge>
      )}
    </div>
    
    {/* Meta */}
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <span className="flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        {job.location}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        {job.type}
      </span>
    </div>
    
    {/* Description */}
    <p className="text-sm text-gray-600">
      {job.shortDescription}
    </p>
    
    {/* Actions */}
    <div className="flex gap-3 pt-2 border-t">
      <Button size="sm" className="flex-1">
        Apply Now
      </Button>
      <Button size="sm" variant="outline">
        Details
      </Button>
    </div>
  </CardContent>
</Card>
```

---

### 📰 E. NEWS PAGE

#### Layout Structure
```
[Hero]                   <- Latest news heading
[Featured Article]       <- Large card, top news
[News Grid]              <- 3 columns, consistent
[Pagination]             <- Simple numbered
[Newsletter CTA]         <- Subscribe form
```

#### News Card Design
```tsx
// ✅ MINIMAL NEWS CARDS
<Card className="border border-gray-200 hover:shadow-md transition-shadow group">
  <Link href={`/news/${article.slug}`}>
    <div className="aspect-video relative overflow-hidden bg-gray-100">
      <Image 
        src={article.image}
        alt={article.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    
    <CardContent className="p-6 space-y-3">
      {/* Meta */}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Badge variant="secondary">{article.category}</Badge>
        <span>•</span>
        <time>{article.date}</time>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
        {article.title}
      </h3>
      
      {/* Excerpt */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {article.excerpt}
      </p>
      
      {/* Read More */}
      <div className="flex items-center text-sm font-medium text-primary pt-2">
        Read More
        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </CardContent>
  </Link>
</Card>
```

---

### 📞 F. CONTACT PAGE

#### Layout Structure
```
[Hero]                   <- Get in touch heading
[Contact Methods]        <- Email, phone, location cards
[Contact Form]           <- Clean form, left-aligned
[Map Embed]              <- Office location
[FAQ Section]            <- Common questions
```

#### Contact Form Design
```tsx
// ✅ CLEAN CONTACT FORM
<form className="space-y-6 max-w-2xl">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">
        First Name
      </label>
      <Input 
        type="text"
        placeholder="John"
        className="h-10"
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">
        Last Name
      </label>
      <Input 
        type="text"
        placeholder="Doe"
        className="h-10"
      />
    </div>
  </div>
  
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-900">
      Email
    </label>
    <Input 
      type="email"
      placeholder="john@example.com"
      className="h-10"
    />
  </div>
  
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-900">
      Message
    </label>
    <Textarea 
      placeholder="Tell us about your project..."
      rows={6}
      className="resize-none"
    />
  </div>
  
  <Button type="submit" className="w-full md:w-auto px-8">
    Send Message
    <Send className="ml-2 w-4 h-4" />
  </Button>
</form>
```

---

## 🎯 X. DARK MODE STRATEGY

### A. Dark Mode Toggle

```tsx
// ✅ Subtle toggle in header
<Button 
  variant="ghost" 
  size="icon"
  onClick={toggleDarkMode}
  className="w-10 h-10"
>
  {isDark ? (
    <Sun className="w-5 h-5" />
  ) : (
    <Moon className="w-5 h-5" />
  )}
</Button>
```

### B. Dark Mode Color Adjustments

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| **Background** | `gray-50` | `gray-900` |
| **Card Background** | `white` | `gray-800` |
| **Text Primary** | `gray-900` | `gray-50` |
| **Text Secondary** | `gray-600` | `gray-400` |
| **Border** | `gray-200` | `gray-700` |
| **Primary Color** | `blue-500` | `blue-400` (lighter) |

### C. Dark Mode Best Practices

- **Automatic Detection:** Respect `prefers-color-scheme`
- **Persistent:** Save preference in localStorage
- **Smooth Transition:** Use `transition-colors duration-300` on mode switch
- **Contrast:** Ensure WCAG AA compliance in both modes
- **Images:** Use `mix-blend-mode: luminosity` on photos in dark mode if needed

---

## ✅ XI. IMPLEMENTATION CHECKLIST

### Phase 1: Foundation (Week 1)
- [ ] Update `globals.css` with new color system
- [ ] Replace font to Inter
- [ ] Create reusable component library (Button, Card, Badge variants)
- [ ] Implement spacing system classes
- [ ] Setup dark mode toggle

### Phase 2: Components (Week 2)
- [ ] Redesign Header component (simpler navigation)
- [ ] Create Footer component (minimal design)
- [ ] Build new Card variants (service, news, team, job)
- [ ] Create Icon wrapper components
- [ ] Build Form components (Input, Textarea, Select - clean style)

### Phase 3: Pages (Week 3-4)
- [ ] Redesign Home page
- [ ] Redesign About page
- [ ] Redesign Services page
- [ ] Redesign Career page
- [ ] Redesign News page
- [ ] Redesign Contact page

### Phase 4: Polish (Week 5)
- [ ] Optimize animations (reduce to essentials)
- [ ] Remove all gradient backgrounds and decorative orbs
- [ ] Ensure consistent icon sizes across all pages
- [ ] Test dark mode on all pages
- [ ] Mobile responsive testing
- [ ] Accessibility audit (WCAG AA)

### Phase 5: Performance (Week 6)
- [ ] Image optimization (WebP, lazy loading)
- [ ] Remove unused CSS
- [ ] Lighthouse audit (aim for 90+ scores)
- [ ] SEO optimization

---

## 📊 XII. BEFORE & AFTER COMPARISON

### Current Design Issues ❌

| Issue | Example | Problem |
|-------|---------|---------|
| **Over-styled Heroes** | `bg-gradient-to-br from-primary via-blue-600 to-purple-600` | Too flashy, unprofessional |
| **Decorative Orbs** | Floating gradient circles | Distracting, dated |
| **Gradient Text** | `bg-clip-text text-transparent` | Hard to read, gimmicky |
| **Excessive Animations** | `hover:scale-150 hover:rotate-12` | Overwhelming, slow |
| **Inconsistent Icons** | Mixed sizes and colors | Lacks cohesion |
| **Heavy Shadows** | `shadow-2xl hover:shadow-3xl` | Too dramatic |

### New Design Solutions ✅

| Solution | Implementation | Benefit |
|----------|----------------|---------|
| **Clean Backgrounds** | Solid `bg-gray-50` or subtle `bg-gradient-to-b from-gray-50 to-white` | Professional, timeless |
| **No Decorations** | Remove all orbs and patterns | Focused on content |
| **Solid Text Colors** | `text-gray-900` for headings | Clear, readable |
| **Subtle Animations** | `hover:shadow-md` only | Smooth, unobtrusive |
| **Uniform Icons** | `w-6 h-6 text-primary` everywhere | Consistent brand |
| **Light Shadows** | `shadow-sm hover:shadow-md` | Subtle depth |

---

## 🎓 XIII. DESIGN PHILOSOPHY QUOTES

> **"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."**  
> — Antoine de Saint-Exupéry

> **"Less, but better."**  
> — Dieter Rams

> **"Design is not just what it looks like and feels like. Design is how it works."**  
> — Steve Jobs

> **"Content precedes design. Design in the absence of content is not design, it's decoration."**  
> — Jeffrey Zeldman

---

## 📚 XIV. RESOURCES & REFERENCES

### Design Inspiration
- **Stripe:** https://stripe.com (Minimalist, clean)
- **Linear:** https://linear.app (Modern, subtle)
- **Vercel:** https://vercel.com (Professional, restrained)
- **Notion:** https://notion.so (Simple, functional)

### Icon Library
- **Lucide React:** https://lucide.dev
- Browse all icons: https://lucide.dev/icons/

### Typography
- **Inter Font:** https://rsms.me/inter/
- **Type Scale Calculator:** https://type-scale.com/

### Color Tools
- **Coolors:** https://coolors.co (Generate monochromatic palettes)
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/

### Accessibility
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **A11y Project:** https://www.a11yproject.com/

---

## 🚀 XV. NEXT STEPS

1. **Review & Approve** this design system document
2. **Create** a design prototype in Figma (optional but recommended)
3. **Start Implementation** with Phase 1 (Foundation)
4. **Iterate** based on feedback
5. **Test** with real users
6. **Launch** the redesigned website

---

**Document Version:** 2.0  
**Last Updated:** 2025-10-18  
**Author:** UX/UI Design Team  
**Status:** 📋 Ready for Implementation

---

**Questions or Feedback?**  
Contact the design team or open a GitHub discussion.

