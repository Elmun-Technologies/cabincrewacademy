import { Link } from 'react-router-dom'
import { ArrowRight, Recycle, Heart, Zap, Globe } from 'lucide-react'

export function AboutPage() {
  return (
    <div>
      <section className="gradient-pulse-radial text-white noise-overlay">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] border border-white/15">
            About PULSE
          </div>
          <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tighter">
            Built for those who <span className="text-gradient-fire">move</span>.
          </h1>
          <p className="mt-5 text-neutral-300 max-w-2xl mx-auto text-lg">
            We started PULSE in a Brooklyn garage in 2019 with one idea: design gear for the runners,
            lifters, skaters, and dreamers who don't fit a single label. Today we ship to 80+ countries.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 grid gap-6 md:grid-cols-4">
        {[
          { icon: <Zap className="h-6 w-6" />, stat: '5 years', label: 'Building gear' },
          { icon: <Globe className="h-6 w-6" />, stat: '80+', label: 'Countries shipped' },
          { icon: <Heart className="h-6 w-6" />, stat: '2.3M', label: 'Active members' },
          { icon: <Recycle className="h-6 w-6" />, stat: '78%', label: 'Recycled materials' },
        ].map((s, i) => (
          <div key={s.label} className={`rounded-2xl border border-neutral-200 p-6 slide-in-up delay-${i + 1}`}>
            <div className="text-neutral-500 mb-2">{s.icon}</div>
            <div className="text-3xl font-black tracking-tighter">{s.stat}</div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 mt-2">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 space-y-12">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-500 mb-2">Our promise</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">Performance you can feel. Style you can own.</h2>
          <p className="text-neutral-700 leading-relaxed">
            Every PULSE silhouette is engineered with athletes from the start. We test prototypes on
            actual tracks, skate parks, and gyms before they hit the site. Then we hand the design to
            you in our Studio — because a great product becomes great gear when it is yours.
          </p>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600 mb-2">Sustainability</div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">Made with the next 100 years in mind.</h2>
          <p className="text-neutral-700 leading-relaxed">
            78% of our materials are recycled or regenerated. We power our New Jersey atelier with 100%
            renewable energy, and every order ships in paper-only packaging. By 2027 we commit to a fully
            circular supply chain.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="rounded-3xl bg-black text-white p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Move beyond limits.</h2>
          <p className="mt-2 text-neutral-300 max-w-md mx-auto">Ready to find your next favorite pair?</p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3.5 text-sm font-bold"
          >
            Shop the latest <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
