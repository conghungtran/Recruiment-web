# Counter Component

An animated counter component that counts up from a start value to an end value with a smooth easing animation. The animation triggers when the counter enters the viewport (using Intersection Observer).

## Features

- ✅ Smooth counting animation with easing
- ✅ Automatic viewport detection (only animates when visible)
- ✅ Customizable duration and decimal places
- ✅ Support for prefix and suffix (like "+", "%", "$", etc.)
- ✅ TypeScript support

## Usage

```tsx
import { Counter } from "@/components/ui/counter"

// Basic usage
<Counter end={500} />

// With suffix
<Counter end={500} suffix="+" />

// With prefix
<Counter end={1200} prefix="$" />

// With custom duration
<Counter end={98} duration={3000} suffix="%" />

// With decimals
<Counter end={4.5} decimals={1} suffix=" stars" />

// Full example
<Counter 
  start={0}
  end={1200}
  duration={2500}
  decimals={0}
  suffix="+"
  prefix=""
  className="text-4xl font-bold"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `end` | `number` | *required* | The final value to count to |
| `start` | `number` | `0` | The starting value |
| `duration` | `number` | `2000` | Animation duration in milliseconds |
| `decimals` | `number` | `0` | Number of decimal places to show |
| `suffix` | `string` | `""` | Text to append after the number (e.g., "+", "%") |
| `prefix` | `string` | `""` | Text to prepend before the number (e.g., "$") |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

### Stats Section
```tsx
<div className="grid grid-cols-3 gap-8">
  <div className="text-center">
    <div className="text-4xl font-bold">
      <Counter end={500} suffix="+" />
    </div>
    <div className="text-sm text-muted-foreground">Happy Clients</div>
  </div>
  
  <div className="text-center">
    <div className="text-4xl font-bold">
      <Counter end={1200} suffix="+" />
    </div>
    <div className="text-sm text-muted-foreground">Projects Completed</div>
  </div>
  
  <div className="text-center">
    <div className="text-4xl font-bold">
      <Counter end={15} suffix="+" />
    </div>
    <div className="text-sm text-muted-foreground">Years Experience</div>
  </div>
</div>
```

### With Dynamic Data
```tsx
import { companyStats } from "@/data/company"

<Counter end={companyStats.projects} duration={2500} suffix="+" />
```

## How It Works

1. **Viewport Detection**: Uses Intersection Observer API to detect when the counter enters the viewport
2. **Animation Start**: Once visible, starts counting from `start` to `end`
3. **Easing Function**: Uses `easeOutQuart` easing for smooth deceleration
4. **Frame-by-Frame**: Uses `requestAnimationFrame` for smooth 60fps animation
5. **One-time Animation**: Animates only once per page load (when first visible)

## Customization

You can customize the easing function in the `use-counter.tsx` hook:

```tsx
// Current: easeOutQuart
const easeOutQuart = 1 - Math.pow(1 - progress, 4)

// Alternative easing functions:
// Linear
const linear = progress

// easeInOut
const easeInOut = progress < 0.5 
  ? 2 * progress * progress 
  : 1 - Math.pow(-2 * progress + 2, 2) / 2
```

## Performance

- Uses `IntersectionObserver` for efficient viewport detection
- Uses `requestAnimationFrame` for optimal animation performance
- Minimal re-renders with proper React hooks usage
- Cleans up observers on component unmount

