import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Briefcase, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

interface JobCardProps {
  title: string
  department: string
  location: string
  type: string
  description: string
  slug: string
  featured?: boolean
}

export function JobCard({ 
  title, 
  department, 
  location, 
  type, 
  description, 
  slug,
  featured = false
}: JobCardProps) {
  return (
    <Card className="card-underline text-primary">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Briefcase className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
              <p className="text-sm text-gray-600">{department}</p>
            </div>
          </div>
          {featured && (
            <Badge className="bg-accent text-white shrink-0">Hot</Badge>
          )}
        </div>
        
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {type}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t">
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/career/${slug}/apply`}>
              Apply Now
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/career/${slug}`}>
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
