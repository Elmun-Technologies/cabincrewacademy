import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShoppingBag, RotateCw, Save, Share2, Sparkles, Layers } from 'lucide-react'
import { getProduct, products } from '@/data/products'
import { useShopStore } from '@/stores/shop-store'
import { cn } from '@/lib/utils'

type Panel = 'upper' | 'swoosh' | 'sole' | 'laces' | 'inside'

const panels: { key: Panel; label: string; description: string }[] = [
  { key: 'upper', label: 'Upper', description: 'Main body of the shoe' },
  { key: 'swoosh', label: 'Swoosh', description: 'Side stripe accent' },
  { key: 'sole', label: 'Sole', description: 'Outsole + midsole base' },
  { key: 'laces', label: 'Laces', description: 'Lace color' },
  { key: 'inside', label: 'Inside', description: 'Inner lining + tongue' },
]

const palette = [
  { name: 'Onyx', hex: '#0a0a0a' },
  { name: 'Cloud', hex: '#fafafa' },
  { name: 'Cream', hex: '#f5e6d3' },
  { name: 'Storm', hex: '#6b7280' },
  { name: 'Volt', hex: '#84cc16' },
  { name: 'Solar', hex: '#f59e0b' },
  { name: 'Fire', hex: '#ef4444' },
  { name: 'Rose', hex: '#f472b6' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Royal', hex: '#3b82f6' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Mint', hex: '#10b981' },
  { name: 'Forest', hex: '#15803d' },
  { name: 'Burgundy', hex: '#7f1d1d' },
  { name: 'Sand', hex: '#d4b896' },
  { name: 'Gold', hex: '#d4a017' },
]

const customizableProducts = products.filter((p) => p.customizable)

export function CustomizerPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = id ? getProduct(id) : undefined
  const addToCart = useShopStore((s) => s.addToCart)
  const toast = useShopStore((s) => s.toast)

  const [colors, setColors] = useState<Record<Panel, string>>({
    upper: '#fafafa',
    swoosh: '#ef4444',
    sole: '#0a0a0a',
    laces: '#0a0a0a',
    inside: '#f5e6d3',
  })
  const [activePanel, setActivePanel] = useState<Panel>('upper')
  const [size, setSize] = useState<string | null>(null)
  const [initials, setInitials] = useState('')
  const [view, setView] = useState<'side' | 'top' | 'back'>('side')

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="text-2xl font-black">Product not customizable</h1>
        <Link to="/shop" className="mt-4 inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-bold">
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!size) {
      toast('Please select a size', 'error')
      return
    }
    addToCart({
      productId: product.id,
      productName: `${product.name} · Studio`,
      productImage: product.heroImage,
      price: product.price + 30,
      size,
      colorName: 'Custom',
      colorHex: colors.upper,
      quantity: 1,
      customization: {
        upper: colors.upper,
        swoosh: colors.swoosh,
        sole: colors.sole,
        laces: colors.laces,
        inside: colors.inside,
        name: initials,
      },
    })
    navigate('/cart')
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 flex items-center justify-between">
          <Link to={`/product/${product.slug}`} className="flex items-center gap-2 text-sm font-semibold hover:opacity-80">
            <ArrowLeft className="h-4 w-4" />
            Back to {product.name}
          </Link>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold">
            <Sparkles className="h-3 w-3 text-amber-400" />
            PULSE Studio
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-white/10" aria-label="Save">
              <Save className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10" aria-label="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Preview */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden gradient-pulse-radial flex items-center justify-center noise-overlay">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <SneakerSVG colors={colors} initials={initials} view={view} activePanel={activePanel} onPanelClick={setActivePanel} />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex gap-1 bg-white/10 backdrop-blur rounded-full p-1">
                {(['side', 'top', 'back'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all',
                      view === v ? 'bg-white text-black' : 'text-white hover:bg-white/10',
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setColors({
                    upper: '#fafafa',
                    swoosh: '#ef4444',
                    sole: '#0a0a0a',
                    laces: '#0a0a0a',
                    inside: '#f5e6d3',
                  })
                }
                className="rounded-full bg-white/10 backdrop-blur p-2 text-white hover:bg-white/20"
                aria-label="Reset"
              >
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4" />
              <span className="text-sm font-bold">Tap a panel above or pick one below</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {panels.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setActivePanel(p.key)}
                  className={cn(
                    'rounded-xl border-2 p-3 transition-all',
                    activePanel === p.key
                      ? 'border-black bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-400',
                  )}
                >
                  <div
                    className="h-8 w-full rounded-lg border border-neutral-300"
                    style={{ background: colors[p.key] }}
                  />
                  <div className="text-[11px] font-bold mt-2">{p.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">Now editing</div>
            <h2 className="text-2xl font-black tracking-tighter">
              {panels.find((p) => p.key === activePanel)?.label}
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              {panels.find((p) => p.key === activePanel)?.description}
            </p>

            <div className="mt-4 grid grid-cols-8 gap-2">
              {palette.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColors({ ...colors, [activePanel]: c.hex })}
                  className={cn(
                    'aspect-square rounded-lg border-2 transition-all',
                    colors[activePanel] === c.hex
                      ? 'border-black scale-110 shadow-md'
                      : 'border-neutral-200 hover:scale-105',
                  )}
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
            </div>

            <div className="mt-4">
              <label className="text-xs font-bold uppercase tracking-wider">Custom HEX</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={colors[activePanel]}
                  onChange={(e) => setColors({ ...colors, [activePanel]: e.target.value })}
                  className="h-10 w-12 rounded-lg border border-neutral-200 cursor-pointer"
                />
                <input
                  value={colors[activePanel]}
                  onChange={(e) => setColors({ ...colors, [activePanel]: e.target.value })}
                  className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-mono focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <label className="text-xs font-bold uppercase tracking-wider">Personal initials (up to 4)</label>
            <input
              value={initials}
              onChange={(e) => setInitials(e.target.value.slice(0, 4).toUpperCase())}
              placeholder="e.g. PLS"
              className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-center font-bold tracking-[0.3em] uppercase focus:outline-none focus:border-black"
            />
            <p className="text-[11px] text-neutral-500 mt-2">
              Stitched onto the heel tab. Free of charge.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="text-xs font-bold uppercase tracking-wider mb-2">Select size</div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    'h-10 rounded-lg border text-sm font-semibold transition-all',
                    size === s ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-neutral-700',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-black text-white p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs uppercase tracking-wider opacity-60">Your custom {product.name}</div>
                <div className="text-2xl font-black">${product.price + 30}</div>
              </div>
              <div className="text-right text-xs opacity-70">
                Hand-finished
                <br />
                10-14 days
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full rounded-full bg-white text-black py-3.5 font-bold flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
            >
              <ShoppingBag className="h-4 w-4" />
              Add custom pair to bag
            </button>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        <h3 className="font-black text-2xl tracking-tighter mb-4">More to customize</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {customizableProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Link
                key={p.id}
                to={`/customize/${p.id}`}
                className="group rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-black transition-all"
              >
                <div className="aspect-square overflow-hidden bg-neutral-100">
                  <img src={p.heroImage} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-sm font-bold">{p.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

function SneakerSVG({
  colors,
  initials,
  view,
  activePanel,
  onPanelClick,
}: {
  colors: Record<Panel, string>
  initials: string
  view: 'side' | 'top' | 'back'
  activePanel: Panel
  onPanelClick: (p: Panel) => void
}) {
  const stroke = (p: Panel) => (activePanel === p ? '#000' : 'rgba(0,0,0,0.3)')
  const strokeW = (p: Panel) => (activePanel === p ? 2 : 1)

  if (view === 'top') {
    return (
      <svg viewBox="0 0 600 360" className="w-full max-w-[640px] drop-shadow-2xl">
        <ellipse cx="300" cy="320" rx="220" ry="18" fill="rgba(0,0,0,0.25)" />
        <path
          d="M120 200 Q120 110 200 95 Q300 80 400 100 Q480 115 480 200 L480 260 Q480 290 440 295 L160 295 Q120 290 120 260 Z"
          fill={colors.upper}
          stroke={stroke('upper')}
          strokeWidth={strokeW('upper')}
          onClick={() => onPanelClick('upper')}
          className="cursor-pointer"
        />
        <ellipse
          cx="300"
          cy="180"
          rx="120"
          ry="60"
          fill={colors.inside}
          opacity="0.7"
          onClick={() => onPanelClick('inside')}
          className="cursor-pointer"
        />
        <g onClick={() => onPanelClick('laces')} className="cursor-pointer">
          {[140, 180, 220, 260].map((y) => (
            <line key={y} x1="240" y1={y} x2="360" y2={y} stroke={colors.laces} strokeWidth="4" />
          ))}
        </g>
        <text x="300" y="335" textAnchor="middle" className="text-xs uppercase tracking-[0.18em] font-bold fill-white/40">Top view</text>
      </svg>
    )
  }

  if (view === 'back') {
    return (
      <svg viewBox="0 0 600 360" className="w-full max-w-[480px] drop-shadow-2xl">
        <ellipse cx="300" cy="330" rx="180" ry="14" fill="rgba(0,0,0,0.25)" />
        <path
          d="M170 280 L170 160 Q170 100 220 90 L380 90 Q430 100 430 160 L430 280 Z"
          fill={colors.upper}
          stroke={stroke('upper')}
          strokeWidth={strokeW('upper')}
          onClick={() => onPanelClick('upper')}
          className="cursor-pointer"
        />
        <path
          d="M210 100 Q210 130 240 130 L360 130 Q390 130 390 100 Z"
          fill={colors.inside}
          stroke={stroke('inside')}
          strokeWidth={strokeW('inside')}
          onClick={() => onPanelClick('inside')}
          className="cursor-pointer"
        />
        <rect
          x="170"
          y="280"
          width="260"
          height="40"
          rx="20"
          fill={colors.sole}
          stroke={stroke('sole')}
          strokeWidth={strokeW('sole')}
          onClick={() => onPanelClick('sole')}
          className="cursor-pointer"
        />
        {initials && (
          <text x="300" y="220" textAnchor="middle" fontSize="32" fontWeight="900" fill={readableText(colors.upper)}>
            {initials}
          </text>
        )}
        <text x="300" y="345" textAnchor="middle" className="text-xs uppercase tracking-[0.18em] font-bold fill-white/40">Back view</text>
      </svg>
    )
  }

  // Side view (default)
  return (
    <svg viewBox="0 0 640 320" className="w-full max-w-[640px] drop-shadow-2xl">
      <ellipse cx="320" cy="290" rx="280" ry="12" fill="rgba(0,0,0,0.25)" />

      {/* Sole */}
      <path
        d="M40 260 Q40 240 60 232 L580 220 Q610 220 620 240 L620 270 Q620 285 600 285 L60 285 Q40 285 40 270 Z"
        fill={colors.sole}
        stroke={stroke('sole')}
        strokeWidth={strokeW('sole')}
        onClick={() => onPanelClick('sole')}
        className="cursor-pointer transition-all"
      />
      <path
        d="M40 260 L620 245 L620 255 L40 270 Z"
        fill="rgba(255,255,255,0.15)"
        pointerEvents="none"
      />

      {/* Upper body */}
      <path
        d="M70 220 Q60 160 110 130 Q180 100 260 95 Q340 90 420 110 Q500 130 540 180 Q570 210 580 240 L60 240 Z"
        fill={colors.upper}
        stroke={stroke('upper')}
        strokeWidth={strokeW('upper')}
        onClick={() => onPanelClick('upper')}
        className="cursor-pointer transition-all"
      />

      {/* Inside collar */}
      <path
        d="M380 110 Q400 120 410 150 Q420 180 415 210 L370 215 Q350 195 350 165 Q350 130 380 110 Z"
        fill={colors.inside}
        stroke={stroke('inside')}
        strokeWidth={strokeW('inside')}
        onClick={() => onPanelClick('inside')}
        className="cursor-pointer transition-all"
      />

      {/* Tongue */}
      <path
        d="M280 120 Q300 100 340 100 L355 130 Q340 140 310 140 Q290 140 280 130 Z"
        fill={colors.inside}
        opacity="0.85"
        stroke={stroke('inside')}
        strokeWidth={strokeW('inside')}
        onClick={() => onPanelClick('inside')}
        className="cursor-pointer"
      />

      {/* Swoosh */}
      <path
        d="M150 195 Q220 150 380 140 Q450 138 510 175 L500 195 Q450 175 400 175 Q280 178 165 220 Z"
        fill={colors.swoosh}
        stroke={stroke('swoosh')}
        strokeWidth={strokeW('swoosh')}
        onClick={() => onPanelClick('swoosh')}
        className="cursor-pointer transition-all"
      />

      {/* Laces */}
      <g onClick={() => onPanelClick('laces')} className="cursor-pointer">
        {[
          { x: 280, y: 140 },
          { x: 305, y: 130 },
          { x: 328, y: 122 },
          { x: 350, y: 115 },
        ].map((p, i) => (
          <ellipse
            key={i}
            cx={p.x}
            cy={p.y}
            rx="20"
            ry="3.5"
            fill={colors.laces}
            stroke={stroke('laces')}
            strokeWidth={strokeW('laces')}
            transform={`rotate(${-8 - i * 2} ${p.x} ${p.y})`}
          />
        ))}
      </g>

      {/* Heel tab with initials */}
      <rect x="455" y="150" width="50" height="22" rx="4" fill={readableText(colors.upper) === '#fff' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.5)'} />
      {initials && (
        <text
          x="480"
          y="166"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill={readableText(colors.upper)}
          letterSpacing="0.1em"
        >
          {initials}
        </text>
      )}

      {/* PULSE branding */}
      <text x="225" y="207" fontSize="14" fontWeight="900" fill={readableText(colors.upper)} letterSpacing="-0.04em">
        PULSE
      </text>
    </svg>
  )
}

function readableText(bgHex: string): string {
  const c = bgHex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luma > 0.55 ? '#0a0a0a' : '#ffffff'
}
