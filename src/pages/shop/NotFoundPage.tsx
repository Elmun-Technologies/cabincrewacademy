import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="text-[12rem] font-black tracking-tighter leading-none text-gradient-fire">404</div>
      <h1 className="mt-2 text-3xl font-black tracking-tighter">Page off the track</h1>
      <p className="mt-2 text-neutral-500">
        The page you are looking for has moved or never existed. Let's get you back on the path.
      </p>
      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        <Link to="/" className="rounded-full bg-black text-white px-6 py-3.5 text-sm font-bold flex items-center gap-2">
          Back to home <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/shop" className="rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-bold">
          Shop everything
        </Link>
      </div>
    </div>
  )
}
