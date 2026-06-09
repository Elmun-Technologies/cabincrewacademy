import { CheckCircle2, Info, XCircle, X } from 'lucide-react'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'

export function ToastStack() {
  const toasts = useShopStore((s) => s.toasts)
  const dismiss = useShopStore((s) => s.dismissToast)

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-card-lg min-w-[260px] max-w-sm slide-in-left',
            t.kind === 'success' && 'border-emerald-200',
            t.kind === 'info' && 'border-neutral-200',
            t.kind === 'error' && 'border-red-200',
          )}
        >
          {t.kind === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />}
          {t.kind === 'info' && <Info className="h-5 w-5 text-neutral-700 shrink-0" />}
          {t.kind === 'error' && <XCircle className="h-5 w-5 text-red-600 shrink-0" />}
          <span className="text-sm font-medium flex-1">{t.text}</span>
          <button onClick={() => dismiss(t.id)} className="text-neutral-400 hover:text-neutral-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
