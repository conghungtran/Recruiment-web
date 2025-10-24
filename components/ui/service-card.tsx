import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ServiceCardProps {
  title: string
  description: string
  category?: string
  image?: string
  href: string
  icon?: LucideIcon
}

export function ServiceCard({ 
  title, 
  description, 
  category, 
  image, 
  href,
  icon: Icon 
}: ServiceCardProps) {
  return (
    <Card className="card-underline text-primary">
      {/* Image or Icon Container */}
      {image ? (
        <div className="h-48 relative overflow-hidden bg-gray-100 w-full">
          <Image 
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : Icon ? (
        <CardContent className="pt-6">
          <div className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>
        </CardContent>
      ) : null}
      
      <CardContent className={`${image ? 'p-6' : Icon ? 'px-6 pb-6' : 'p-6'} space-y-4`}>
        {/* Category Badge */}
        {category && (
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
        
        {/* Link */}
        <Link 
          href={href} 
          className="inline-flex items-center text-sm font-medium text-primary"
        >
          Learn More
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
