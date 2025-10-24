# Component Usage Examples - VTech Design System V2.0

Quick reference for using components following the minimalist design system.

---

## 🔘 Buttons

### Primary Button (Main Actions)
```tsx
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// Default primary button
<Button>
  Get Started
  <ArrowRight className="ml-2 w-4 h-4" />
</Button>

// Large primary button
<Button size="lg">
  Start Free Trial
</Button>
```

### Secondary Button (Less Important Actions)
```tsx
<Button variant="outline">
  Learn More
</Button>

<Button variant="outline" size="lg">
  View Documentation
</Button>
```

### Ghost Button (Tertiary Actions)
```tsx
<Button variant="ghost">
  Cancel
</Button>
```

### Icon Button
```tsx
import { Search } from 'lucide-react'

<Button size="icon" variant="ghost">
  <Search className="w-5 h-5" />
</Button>
```

---

## 🎴 Cards

### Basic Card
```tsx
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

<Card className="border border-gray-200 hover:shadow-md transition-shadow">
  <CardContent className="p-6 space-y-4">
    {/* Icon Container */}
    <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-primary/10">
      <Star className="w-6 h-6 text-primary" />
    </div>
    
    {/* Title */}
    <h3 className="text-xl font-semibold text-gray-900">
      Card Title
    </h3>
    
    {/* Description */}
    <p className="text-sm text-gray-600 leading-relaxed">
      Clean description text that explains the feature or content.
    </p>
  </CardContent>
</Card>
```

### Service Card with Image
```tsx
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

<Card className="border border-gray-200 hover:shadow-md transition-shadow group">
  {/* Image */}
  <div className="aspect-video relative overflow-hidden bg-gray-100">
    <Image 
      src="/service-image.jpg"
      alt="Service name"
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  
  <CardContent className="p-6 space-y-4">
    {/* Badge */}
    <Badge variant="secondary" className="text-xs">
      Category
    </Badge>
    
    {/* Title */}
    <h3 className="text-xl font-semibold text-gray-900">
      Service Title
    </h3>
    
    {/* Description */}
    <p className="text-sm text-gray-600">
      Brief description of the service.
    </p>
    
    {/* Link */}
    <Link 
      href="/services/slug" 
      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-600"
    >
      View Details
      <ArrowRight className="ml-1 w-4 h-4" />
    </Link>
  </CardContent>
</Card>
```

---

## 🏷️ Badges

### Primary Badge
```tsx
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

<Badge className="bg-primary text-white">
  <Star className="w-3 h-3 mr-1" />
  Featured
</Badge>
```

### Secondary Badge
```tsx
<Badge variant="secondary">
  Category
</Badge>
```

### Accent Badge (Use Sparingly)
```tsx
<Badge className="bg-accent text-white">
  New
</Badge>
```

---

## 🎨 Icon Containers

### Subtle Circle Background (Primary)
```tsx
import { Star } from 'lucide-react'

<div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-primary/10">
  <Star className="w-6 h-6 text-primary" strokeWidth={2} />
</div>
```

### Bordered Square (Neutral)
```tsx
import { Mail } from 'lucide-react'

<div className="inline-flex w-12 h-12 items-center justify-center rounded-lg border border-gray-200">
  <Mail className="w-6 h-6 text-gray-600" strokeWidth={2} />
</div>
```

### Large Feature Icon
```tsx
import { Zap } from 'lucide-react'

<div className="inline-flex w-16 h-16 items-center justify-center rounded-full bg-primary/10">
  <Zap className="w-8 h-8 text-primary" strokeWidth={1.5} />
</div>
```

---

## 📝 Form Inputs

### Text Input
```tsx
import { Input } from '@/components/ui/input'

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
```

### Input with Icon
```tsx
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <Input 
    type="text"
    placeholder="Search..."
    className="h-10 pl-10 pr-4"
  />
</div>
```

### Textarea
```tsx
import { Textarea } from '@/components/ui/textarea'

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
```

---

## 🎭 Dark Mode Toggle

### Using the Theme Toggle
```tsx
import { ThemeToggle } from '@/components/ui/theme-toggle'

// In your header or navigation
<ThemeToggle />
```

---

## 🎬 Animations (Framer Motion)

### Page Entrance
```tsx
'use client'

import { motion } from 'framer-motion'

<motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="py-16 lg:py-24"
>
  {/* Content */}
</motion.section>
```

### Staggered Children
```tsx
'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.div
  variants={container}
  initial="hidden"
  animate="show"
  className="grid grid-cols-1 md:grid-cols-3 gap-6"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={item}>
      <Card>
        {/* Card content */}
      </Card>
    </motion.div>
  ))}
</motion.div>
```

---

## 📐 Layout Patterns

### Hero Section
```tsx
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
        Transform Your Business
      </h1>
      
      {/* Subheading */}
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Enterprise-grade solutions that drive growth
      </p>
      
      {/* CTAs */}
      <div className="flex gap-4 justify-center">
        <Button size="lg">
          Get Started
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>
    </div>
  </div>
</section>
```

### Content Section
```tsx
<section className="py-16 lg:py-24 bg-white">
  <div className="container mx-auto px-4 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Section Title
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Section description
      </p>
    </div>
    
    {/* Grid Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cards */}
    </div>
  </div>
</section>
```

### Stats Bar
```tsx
<section className="py-12 border-y bg-gray-50">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 🚫 Anti-Patterns (What NOT to Do)

### ❌ DON'T: Over-styled buttons
```tsx
// BAD - Too many effects
<Button className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 shadow-2xl hover:shadow-white/20 hover:scale-110">
  Too Much
</Button>
```

### ❌ DON'T: Gradient text
```tsx
// BAD - Hard to read
<h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
  Gradient Headline
</h1>
```

### ❌ DON'T: Heavy hover effects
```tsx
// BAD - Too dramatic
<Card className="hover:-translate-y-4 hover:scale-110 hover:rotate-2">
  {/* Content */}
</Card>
```

### ❌ DON'T: Multiple icon colors
```tsx
// BAD - Inconsistent
<div>
  <Star className="text-yellow-500" />
  <Heart className="text-red-500" />
  <Zap className="text-purple-500" />
</div>

// GOOD - Consistent
<div>
  <Star className="text-primary" />
  <Heart className="text-primary" />
  <Zap className="text-primary" />
</div>
```

---

## 📱 Responsive Patterns

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map((item) => (
    <Card key={item.id}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

### Responsive Typography
```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

<p className="text-base md:text-lg">
  Responsive paragraph
</p>
```

### Responsive Spacing
```tsx
<section className="py-12 md:py-16 lg:py-24">
  <div className="container mx-auto px-4 md:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

---

## ✅ Best Practices Checklist

- [ ] Use only `primary-500` for main actions and links
- [ ] Icons are `w-5 h-5` (20px) or `w-6 h-6` (24px) with `strokeWidth={2}`
- [ ] Cards have `border border-gray-200` and `hover:shadow-md`
- [ ] Buttons use `h-10` (default) or `h-11` (large) heights
- [ ] Badges are `rounded-full` with `px-3 py-1`
- [ ] Spacing between sections is `py-16 lg:py-24`
- [ ] Card padding is `p-6` (24px)
- [ ] Grid gaps are `gap-6` (24px)
- [ ] Animations are subtle: `duration-300` with `ease-out`
- [ ] Text colors: headings use `text-gray-900`, body uses `text-gray-600`

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-18  
**Status:** 📋 Ready for Use

