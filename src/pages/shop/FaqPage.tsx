import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Search, ArrowLeft, MessageCircle } from 'lucide-react'
import { faqs, faqCategories } from '@/data/faqs'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'

export function FaqPage() {
  const [category, setCategory] = useState<string>('shipping')
  const [search, setSearch] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const setChatOpen = useShopStore((s) => s.setChatOpen)

  const filtered = faqs.filter((f) => {
    if (search) {
      const q = search.toLowerCase()
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    }
    return f.category === category
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/support" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-black mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to Support
      </Link>

      <h1 className="text-4xl md:text-5xl font-black tracking-tighter">FAQ</h1>
      <p className="text-neutral-500 mt-2 mb-6">Find quick answers to the most common questions.</p>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search FAQs…"
          className="w-full rounded-full border border-neutral-200 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black"
        />
      </div>

      {!search && (
        <div className="flex gap-2 mb-6 overflow-x-auto scroll-x-snap pb-1">
          {faqCategories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                category === c.value
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            No results for "{search}". Try a different keyword or contact support.
          </div>
        ) : (
          filtered.map((f) => (
            <div key={f.id} className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
              <button
                onClick={() => setOpenId(openId === f.id ? null : f.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-neutral-50"
              >
                <span className="font-bold">{f.question}</span>
                <ChevronDown
                  className={cn('h-4 w-4 shrink-0 transition-transform', openId === f.id && 'rotate-180')}
                />
              </button>
              {openId === f.id && (
                <div className="px-5 pb-4 text-sm text-neutral-700 leading-relaxed">{f.answer}</div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-10 rounded-3xl bg-neutral-50 border border-neutral-200 p-8 text-center">
        <h2 className="text-2xl font-black tracking-tighter">Didn't find what you need?</h2>
        <p className="text-neutral-500 mt-1">Our team is one click away.</p>
        <div className="mt-4 flex justify-center gap-2 flex-wrap">
          <button onClick={() => setChatOpen(true)} className="rounded-full bg-black text-white px-5 py-3 text-sm font-bold flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Start chat
          </button>
          <Link to="/support/contact" className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-bold">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
