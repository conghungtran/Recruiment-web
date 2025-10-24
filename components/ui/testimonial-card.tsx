import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  position: string
  testimonial: string
  rating: number
  initials?: string
}

export function TestimonialCard({
  name,
  position,
  testimonial,
  rating,
  initials
}: TestimonialCardProps) {
  const displayInitials = initials || name.split(' ').map(n => n[0]).join('')

  return (
    <Card className="card-underline text-primary h-full">
      <CardHeader>
        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden />
          ))}
          <span className="sr-only">{rating} out of 5 stars</span>
        </div>
      </CardHeader>

      <CardContent>
        <blockquote className="text-sm text-muted-foreground leading-relaxed">
          &ldquo;{testimonial}&rdquo;
        </blockquote>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-3 w-full">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {displayInitials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{name}</div>
            <div className="text-xs text-muted-foreground truncate">{position}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

