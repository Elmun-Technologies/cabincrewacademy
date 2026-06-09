# PULSE — Lokalda ishga tushirish

## 1. Talablar
- **Node.js 20+** (https://nodejs.org)
- **npm** (Node bilan birga keladi)

## 2. Boshlash (3 buyruq)

```bash
# 1. Loyiha papkasiga kiring
cd cabincrewacademy

# 2. Dependencies (paketlar) o'rnatish
npm install

# 3. Dev server ishga tushirish
npm run dev
```

Brauzeringizda oching: **http://localhost:5173**

## 3. Production build (ixtiyoriy)

```bash
npm run build         # dist/ papkasiga build qiladi
npm run preview       # http://localhost:4173 da preview
```

## 4. Agar ishlamasa

### Bo'sh oq sahifa?
Sizda eski PWA cache qolgan bo'lishi mumkin:
- Chrome DevTools → Application → Storage → "Clear site data"
- Yoki: brauzerda Ctrl+Shift+R (hard refresh)

### `npm install` xato bermoqda?
Node versiyangizni tekshiring: `node -v` — 20.x.x bo'lishi kerak.

### Port band?
Boshqa portda ishga tushirish: `npm run dev -- --port 3000`

### Rasmlar yuklanmayapti?
Unsplash CDN ishlatiladi — internet ulanishi kerak.

## 5. Loyiha tuzilishi

```
src/
├── App.tsx                 # 21 ta route
├── main.tsx                # Bootstrap
├── index.css               # Tailwind v4 + custom utility'lar
├── pages/shop/             # 17 ta sahifa
├── components/shop/        # 7 ta komponent (Header, ProductCard, SupportChat, ...)
├── stores/shop-store.ts    # Zustand state (cart, wishlist, orders)
├── data/                   # products.ts, faqs.ts
└── types/shop.ts           # TypeScript turlari
```

## 6. Asosiy sahifalar

| URL | Sahifa |
|-----|--------|
| `/` | Bosh sahifa (hero, marquee, kolleksiyalar) |
| `/shop` | Katalog (filter + sort + search) |
| `/product/pulse-air-vortex-x` | Mahsulot sahifasi |
| `/customize/p1` | ⭐ **PULSE Studio** customizer |
| `/cart` → `/checkout` → `/order/success` | Buyurtma jarayoni |
| `/support` | Support markazi (FAQ, contact, track) |
| `/account` | Foydalanuvchi kabineti |
| `/login`, `/signup` | Auth |

## 7. Stack

React 19 · Vite 8 · TypeScript · Tailwind v4 · Zustand (persist localStorage) · React Router v7
