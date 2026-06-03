import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={cn(
          'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors',
          'focus:border-etihad-blue focus:outline-none focus:ring-2 focus:ring-etihad-blue/20',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        className={cn(
          'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors',
          'focus:border-etihad-blue focus:outline-none focus:ring-2 focus:ring-etihad-blue/20',
          className
        )}
        {...props}
      />
    </div>
  )
}
