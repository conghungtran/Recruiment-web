import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface NewsCardProps {
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  slug: string
  featured?: boolean
}

export function NewsCard({ 
  title, 
  excerpt, 
  category, 
  date, 
  image, 
  slug,
  featured = false
}: NewsCardProps) {
  return (
    <Card className="card-underline text-primary">
      <Link href={`/news/${slug}`}>
        {/* Image */}
        <div className={`${featured ? 'h-96' : 'h-48'} relative overflow-hidden bg-gray-100 w-full`}>
          <Image 
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          {featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-accent text-white">Featured</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-6 space-y-3">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Badge variant="secondary">{category}</Badge>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time>{date}</time>
            </div>
          </div>
          
          {/* Title */}
          <h3 className={`${featured ? 'text-2xl' : 'text-lg'} font-semibold text-gray-900 line-clamp-2`}>
            {title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          
          {/* Read More */}
          <div className="flex items-center text-sm font-medium text-primary pt-2">
            Read More
            <ArrowRight className="ml-1 w-4 h-4" />
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
