import { cn } from '@/lib/utils'

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

/**
 * VisuallyHidden component for screen reader only text
 * 
 * Use this component to provide additional context for screen readers
 * without showing the text visually on the page.
 * 
 * @example
 * // Icon-only button
 * <Button>
 *   <Search className="w-5 h-5" />
 *   <VisuallyHidden>Search</VisuallyHidden>
 * </Button>
 * 
 * @example
 * // Additional context
 * <a href="/contact">
 *   Contact Us
 *   <VisuallyHidden>(Opens contact form)</VisuallyHidden>
 * </a>
 */
export function VisuallyHidden({ children, className, ...props }: VisuallyHiddenProps) {
  return (
    <span
      className={cn(
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
        '[clip:rect(0,0,0,0)]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Alias for common usage (matches Tailwind's sr-only)
export const ScreenReaderOnly = VisuallyHidden

