import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

// Compact card: reduced paddings and tighter spacing
export function CardCompact({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className={cn('gap-4 py-4 shadow-sm hover:shadow-md', className)}
    />
  )
}

// Highlight card: subtle emphasis, keeps minimal aesthetic
export function CardHighlight({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className={cn('ring-1 ring-primary/15 border-primary/20', className)}
    />
  )}

// Horizontal shell for media + content layouts
// Usage:
// <CardHorizontal>
//   <CardHorizontalMedia>...</CardHorizontalMedia>
//   <CardHorizontalBody>...</CardHorizontalBody>
// </CardHorizontal>
export function CardHorizontal({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-horizontal"
      className={cn('md:grid md:grid-cols-[168px_1fr] md:gap-6', className)}
      {...props}
    />
  )
}

export function CardHorizontalMedia({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-horizontal-media"
      className={cn('relative aspect-[16/10] overflow-hidden rounded-md bg-muted md:aspect-auto md:h-full', className)}
      {...props}
    />
  )
}

export function CardHorizontalBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-horizontal-body"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  )
}

