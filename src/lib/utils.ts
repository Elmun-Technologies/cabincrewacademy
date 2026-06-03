import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalizedText(
  text: { uz: string; en: string },
  lang: string
): string {
  return lang === 'uz' ? text.uz : text.en
}

export function formatDate(date: string, lang: string): string {
  const d = new Date(date)
  return d.toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

export function generateId(): string {
  return crypto.randomUUID()
}
