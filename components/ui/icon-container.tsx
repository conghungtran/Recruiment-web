import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconContainerProps {
  icon: LucideIcon
  variant?: 'primary' | 'secondary' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square'
  className?: string
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
}

const iconSizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

const variantClasses = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-gray-100 text-gray-600',
  neutral: 'border border-gray-200 text-gray-600',
}

const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-lg',
}

export function IconContainer({ 
  icon: Icon, 
  variant = 'primary',
  size = 'md',
  shape = 'circle',
  className 
}: IconContainerProps) {
  return (
    <div 
      className={cn(
        'inline-flex items-center justify-center',
        sizeClasses[size],
        variantClasses[variant],
        shapeClasses[shape],
        className
      )}
    >
      <Icon 
        className={iconSizeClasses[size]} 
        strokeWidth={size === 'lg' ? 1.5 : 2} 
      />
    </div>
  )
}

// Preset variants for common use cases
export function PrimaryIconContainer({ icon, size = 'md', className }: Omit<IconContainerProps, 'variant' | 'shape'>) {
  return <IconContainer icon={icon} variant="primary" shape="circle" size={size} className={className} />
}

export function SecondaryIconContainer({ icon, size = 'md', className }: Omit<IconContainerProps, 'variant' | 'shape'>) {
  return <IconContainer icon={icon} variant="secondary" shape="circle" size={size} className={className} />
}

export function BorderedIconContainer({ icon, size = 'md', className }: Omit<IconContainerProps, 'variant' | 'shape'>) {
  return <IconContainer icon={icon} variant="neutral" shape="square" size={size} className={className} />
}

