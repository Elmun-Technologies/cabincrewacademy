import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Sparkles, Headset } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'
import type { SupportMessage } from '@/types/shop'

function botReply(userText: string): string {
  const t = userText.toLowerCase()
  if (t.includes('track') || t.includes('order') || t.includes('where')) {
    return 'You can track your order on the Track Order page using your order number and email. Want me to take you there?'
  }
  if (t.includes('size') || t.includes('fit')) {
    return 'For sneakers, we recommend your usual running shoe size. Apparel follows standard XS–XXL. Need help choosing a specific style?'
  }
  if (t.includes('return') || t.includes('refund') || t.includes('exchange')) {
    return 'Returns are free within 60 days for unworn items in original packaging. Customized shoes are final sale. Want me to start a return for you?'
  }
  if (t.includes('shipping') || t.includes('delivery') || t.includes('arrive')) {
    return 'Standard shipping is 3–5 business days and FREE over $75. Express is 1–2 days. Where are you shipping to?'
  }
  if (t.includes('studio') || t.includes('custom') || t.includes('color')) {
    return 'PULSE Studio lets you customize every panel — upper, swoosh, sole, laces, and inner lining. Plus add your initials. Try it from any product page marked "Customize."'
  }
  if (t.includes('hello') || t.includes('hi ') || t.length < 4) {
    return 'Hey! I\'m Ava, your PULSE assistant. I can help with orders, sizing, returns, or Studio. What\'s on your mind?'
  }
  if (t.includes('thanks') || t.includes('thank')) {
    return 'You\'re welcome! Anything else I can help with?'
  }
  return 'I can connect you with a human teammate. Try the Contact form, or describe your issue in a few words and I will route you to the right person.'
}

export function SupportChat() {
  const { t } = useTranslation()
  const open = useShopStore((s) => s.chatOpen)
  const setOpen = useShopStore((s) => s.setChatOpen)
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: '1',
      from: 'agent',
      text: t('chat.welcome'),
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const quickReplies = [
    t('chat.quick1'),
    t('chat.quick2'),
    t('chat.quick3'),
    t('chat.quick4'),
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg: SupportMessage = {
      id: Math.random().toString(36).slice(2),
      from: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        {
          id: Math.random().toString(36).slice(2),
          from: 'agent',
          text: botReply(text),
          timestamp: new Date().toISOString(),
        },
      ])
    }, 900 + Math.random() * 600)
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-black px-5 py-3.5 text-white shadow-2xl hover:scale-105 transition-transform pulse-glow"
          aria-label="Open support chat"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-semibold text-sm hidden sm:inline">{t('chat.openLabel')}</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-6 sm:right-6 z-30 sm:w-[380px] sm:h-[560px] h-[80vh] flex flex-col bg-white border border-neutral-200 sm:rounded-2xl shadow-2xl overflow-hidden scale-in">
          <div className="flex items-center justify-between bg-black text-white px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-black" />
              </div>
              <div>
                <div className="text-sm font-bold leading-tight">{t('chat.title')}</div>
                <div className="text-[10px] text-neutral-400 uppercase tracking-wider">{t('chat.online')}</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-neutral-50 px-4 py-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    m.from === 'user'
                      ? 'bg-black text-white rounded-br-sm'
                      : 'bg-white text-neutral-900 border border-neutral-200 rounded-bl-sm',
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" />
                  <span className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-neutral-50 border-t border-neutral-200">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs bg-white border border-neutral-200 rounded-full px-3 py-1.5 hover:border-black hover:bg-black hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="border-t border-neutral-200 bg-white px-3 py-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.placeholder')}
              className="flex-1 rounded-full bg-neutral-100 px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <Link
            to="/support"
            onClick={() => setOpen(false)}
            className="bg-neutral-100 border-t border-neutral-200 px-4 py-2.5 text-xs font-semibold text-center hover:bg-neutral-200 flex items-center justify-center gap-2"
          >
            <Headset className="h-3.5 w-3.5" />
            {t('chat.fullCenter')}
          </Link>
        </div>
      )}
    </>
  )
}
