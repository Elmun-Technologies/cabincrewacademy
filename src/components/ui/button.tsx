import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-etihad-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-etihad-blue text-white hover:bg-etihad-dark shadow-soft hover:shadow-card',
        gold: 'bg-gradient-to-r from-etihad-gold to-amber-500 text-white hover:from-yellow-700 hover:to-amber-600 shadow-soft hover:shadow-card',
        outline: 'border border-gray-300 bg-white text-etihad-dark hover:border-etihad-blue hover:bg-etihad-blue/5',
        ghost: 'text-ink-muted hover:bg-gray-100 hover:text-etihad-dark',
        destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-soft',
      },
      size: {
        default: 'h-10 px-4 text-sm',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  ),
)
Button.displayName = 'Button'
