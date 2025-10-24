import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card'
import { Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface TeamCardProps {
  name: string
  role: string
  image: string
  linkedin?: string
  email?: string
}

export function TeamCard({ 
  name, 
  role, 
  image, 
  linkedin, 
  email 
}: TeamCardProps) {
  return (
    <Card className="card-underline text-primary text-center">
      <CardContent className="p-6 space-y-4">
        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto">
          <Image 
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100px, 96px"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        
        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
        
        {/* Social Links */}
        {(linkedin || email) && (
          <div className="flex gap-2 justify-center pt-2">
            {linkedin && (
              <Link 
                href={linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            )}
            {email && (
              <a 
                href={`mailto:${email}`}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
