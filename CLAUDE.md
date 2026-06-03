# CLAUDE.md — Cabin Crew Academy

Bu fayl AI yordamchilar (Claude, Cursor) uchun loyiha konteksti. Yangi sessiyada avval shu faylni o'qing.

## Loyiha nima?

**Cabin Crew Academy** — Etihad Airways kabina ekipajiga ishga kirish uchun shaxsiy tayyorgarlik platformasi.

- Maqsad: foydalanuvchini noldan Assessment Day / intervyuga tayyorlash
- Til: UI o'zbek + ingliz (`react-i18next`, headerda/sidebarda toggle)
- Auth: **yo'q** — login/parol kerak emas, mahalliy rejim
- Deploy: **Netlify** (GitHub: `Elmun-Technologies/cabincrewacademy`)
- Rasmiy Etihad o'quv materiallari emas — faqat public ma'lumotlar asosida

## Tez boshlash

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # dist/ — Netlify uchun
npm run preview      # production buildni lokal ko'rish
```

Env (ixtiyoriy Supabase):
```bash
cp .env.example .env
# VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
```
Supabase sozlanmasa ham ishlaydi — barcha ma'lumot `localStorage` da.

---

## Texnologik stack

| Qatlam | Texnologiya |
|--------|-------------|
| Frontend | Vite 8 + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | react-router-dom v7 |
| State | Zustand + persist (localStorage) |
| i18n | i18next + react-i18next |
| PWA | vite-plugin-pwa (skipWaiting + clientsClaim) |
| Backend (ixtiyoriy) | Supabase (Auth, DB, Storage) |
| Deploy | Netlify (`netlify.toml`) |

Path alias: `@/` → `src/` (`vite.config.ts`, `tsconfig.app.json`)

---

## Papka strukturasi

```
src/
├── App.tsx                 # Routing, ErrorBoundary
├── main.tsx                # Bootstrap + store init
├── pages/                  # Har bir route — bitta page (cockpit theme)
├── components/
│   ├── layout/AppLayout.tsx    # Left sidebar (desktop) + drawer (mobile)
│   ├── lesson/LessonPlayer.tsx # Dars o'ynatgich (barcha block turlari)
│   ├── gamification/           # XPBar, JourneyMap, Streak
│   ├── daily/DailyChallenge.tsx # Kunlik mini-o'yinlar + Test Arena o'yinlari
│   ├── ui/                     # ⭐ DESIGN SYSTEM
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── page-hero.tsx       # ⭐ Gradient hero (7 variant)
│   │   ├── section-header.tsx  # ⭐ Icon + uppercase title + optional CTA
│   │   ├── stat-tile.tsx       # ⭐ Animatsiyali stat (count-up)
│   │   ├── tab-nav.tsx         # ⭐ Tab buttons
│   │   └── animated-number.tsx # ⭐ useCountUp hook + AnimatedNumber
│   └── ErrorBoundary.tsx
├── content/phases/         # ⭐ O'QUV KONTENTI — kod emas, data
│   ├── index.ts            # phases[], glossary, speakingPrompts, sjtQuestions
│   ├── phase-0.ts … phase-7-12.ts
├── stores/app-store.ts     # ⭐ Markaziy state (XP, progress, badges, …)
├── lib/
│   ├── xp-engine.ts        # XP, levels, badges definitions
│   ├── daily-plan.ts       # Kunlik 2 soatlik reja generatori
│   ├── readiness.ts        # Etihad Readiness Score (0-100)
│   ├── i18n.ts             # Til sozlash
│   ├── supabase.ts         # Supabase client (optional)
│   └── utils.ts            # cn(), getLocalizedText(), todayISO()
├── locales/uz.json, en.json  # UI matnlari (nav, dashboard, badges, …)
└── types/index.ts          # Barcha TypeScript interfeyslar

supabase/migrations/001_initial_schema.sql  # Kelajakda cloud sync uchun
```

---

## ⭐ DESIGN SYSTEM (yangi)

Hamma sahifa bir xil **"pilot cockpit"** uslubida. Yangi sahifa qo'shganda quyidagini ishlatibg:

### 1. `PageHero` — har sahifa boshida
```tsx
<PageHero
  variant="cockpit"    // cockpit | sunset | ocean | emerald | purple | gold | etihad
  icon={<Map className="h-6 w-6" />}
  eyebrow="NAV LABEL"
  title="Page Title"
  subtitle="Page tagline"
  decorIcon={<Plane className="h-12 w-12 text-etihad-gold" />}
>
  {/* Optional children (progress bar, badges, etc.) */}
</PageHero>
```

### 2. `SectionHeader` — bo'limlar boshida
```tsx
<SectionHeader
  icon={<Target className="h-4 w-4" />}
  title={t('section.label')}
  action={{ label: t('viewAll'), to: '/somewhere' }}
/>
```

### 3. `StatTile` — animatsiyali raqamlar
```tsx
<StatTile
  icon={<Zap className="h-4 w-4" />}
  label={t('label')}
  value={123}                    // number → count-up animation
  gradient="gold"                // gold | ocean | purple | fire | emerald | sunset | etihad
  delay="delay-1"                // delay-1 … delay-6
/>
```

### 4. `TabNav` — sahifa ichi tabs
```tsx
<TabNav
  options={[
    { key: 'cv', label: t('cv'), icon: <FileSignature /> },
    { key: 'vault', label: t('vault'), icon: <Folder /> },
  ]}
  value={tab}
  onChange={setTab}
/>
```

### Gradient sinflari (`src/index.css`)
- `gradient-cockpit` — qora-ko'k radial (asosiy)
- `gradient-sunset` — ko'k → siyohrang → to'q sariq
- `gradient-ocean` — ko'k → cyan
- `gradient-gold` — oltin
- `gradient-fire` — qizil → to'q sariq
- `gradient-purple` → siyohrang
- `gradient-emerald` → yashil
- `gradient-etihad` — Etihad ko'k

### Animatsiya utility'lari
- `slide-in-up` (`delay-1` … `delay-6`)
- `slide-in-left`, `scale-in`, `float-slow`, `float-fast`, `float-plane`
- `pulse-ring`, `shimmer`, `badge-glow`, `streak-fire`, `rotate-slow`
- `hover-lift`, `card-glow`, `clouds-bg`, `ring-progress`

---

## Routing (`src/App.tsx`)

| Path | Page | Vazifa |
|------|------|--------|
| `/` | DashboardPage | Cockpit hero, gauges, stats, missions, achievements |
| `/journey` | JourneyPage | 13 bosqichli yo'l + stats |
| `/lesson/:phaseId/:lessonId` | LessonPage | Bitta dars (hero + LessonPlayer) |
| `/daily` | DailyPage | Kunlik 2 soatlik reja (5 gradient blok) |
| `/english` | EnglishPage | IPA, flashcards, glossary, speaking (TabNav) |
| `/documents` | DocumentsPage | CV builder, vault, checklist (TabNav) |
| `/assessment` | AssessmentPage | Mock Assessment Day simulyatsiyasi (5 bosqich) |
| `/games` | GamesPage | Memory, Reaction, Pattern, SJT (gradient kartalar) |
| `/profile` | ProfilePage | Statistika, badges, flight logs |
| `/onboarding` | OnboardingPage | Ixtiyoriy — ism, yosh, bo'y, talablar |
| `/auth` | → redirect `/` | Eski route, ishlatilmaydi |

**Muhim:** Login yo'q. Dashboard to'g'ridan-to'g'ri ochiladi. Onboarding majburiy emas.

---

## Layout (`AppLayout.tsx`)

Yangi: **chap tarafda sidebar** (eski bottom-nav o'rniga)

- **Desktop (≥ md):** 240px fixed sidebar (cockpit gradient) — logo + nav + til toggle
- **Mobile (< md):** sticky header + hamburger → slide-in drawer chapdan
- Faol marshrut: chapda 4px oltin chiziq + oltin ikonka
- `main` konteyner: `md:ml-60` bilan siljitilgan, `max-w-6xl`

---

## State boshqaruvi (`src/stores/app-store.ts`)

Zustand store, persist kaliti: **`cabin-crew-academy-v2`**

Asosiy state va actionlar:
- `profile`, `xp`, `progress[]`, `badges[]`, `dailySessions[]`, `flightLogs[]`, `documents[]`, `cvData`
- `readiness` (4-toifa breakdown), `gameScores[]`, `mockAssessmentScore`
- `completeLesson()`, `addXp()`, `ensureTodaySession()`, `recalculateReadiness()`, `checkAndAwardBadges()`

**DIQQAT — xatolardan saqlaning:**
1. Render paytida `set()` chaqirmang
2. `ensureTodaySession()` faqat `useEffect` ichida (`DailyPage`)
3. localStorage buzilsa — ErrorBoundary "Qayta boshlash" tugmasi `cabin-crew-academy-v2` ni o'chiradi

---

## O'quv kontenti (audit yangilangan)

| Phase | Lessons | Status |
|-------|---------|--------|
| 0 — Readiness Check | 2 | ✅ Complete |
| 1 — Aviation Basics | 3 | ✅ Complete |
| 2 — Etihad Knowledge | 3 | ✅ Complete |
| 3 — Grooming & Image | 2 | ✅ Complete |
| 4 — Customer Service | 3 | ✅ Complete |
| 5 — SEP Safety | 3 | ✅ Complete |
| 6 — First Aid | 5 | ✅ Kengaytirilgan (CPR/AED, Choking, Anaphylaxis) |
| 7 — Aviation English | 5 | ✅ Complete (IPA, flashcards, STAR quiz) |
| 8 — Interview Prep | 3 | ✅ Kengaytirilgan (8 ta savol-javob, scenario) |
| 9 — Assessment Day | 3 | ✅ Kengaytirilgan (overview, group, reach test) |
| 10 — Documents | 3 | ✅ Kengaytirilgan (apply, photo, visa) |
| 11 — Gamified Tests | 3 | ✅ Kengaytirilgan (SJT deep-dive, strategy) |
| 12 — Final Mock | 1 (12 savol) | ✅ Complete |

### Yangi dars qo'shish

1. Tegishli `phase-X.ts` faylini oching
2. `lessons` arrayiga yangi `Lesson` qo'shing
3. `content.blocks` ichida block turlaridan foydalaning:

| Block type | Qachon ishlatiladi |
|------------|-------------------|
| `heading`, `paragraph`, `list` | Matn darslar |
| `quiz` | Test (questions[], passingScore) |
| `checklist` | Grooming/talablar ro'yxati |
| `scenario` | Branching role-play (nodes, choices) |
| `ipa` | Ingliz talaffuz (sounds[]) |
| `flashcards` | Lug'at kartochkalari |
| `dragdrop` | Termin juftlash |

4. Barcha matnlar `{ uz: "...", en: "..." }` formatida
5. UI tarjimalari uchun `src/locales/uz.json` va `en.json` ga kalit qo'shing

---

## Gamifikatsiya

**XP** (`lib/xp-engine.ts`):
- Dars: 50 XP, quiz perfect: +25, daily challenge: 40, streak bonus: 25

**Darajalar:** Cabin Trainee → Junior Crew → Senior Prep → Etihad Ready

**Badges:** `BADGE_DEFINITIONS` — `checkAndAwardBadges()` avtomatik tekshiradi

**Readiness Score (0-100):**
- English 25% + Aviation 25% + Soft Skills 25% + Documents 25%
- 85%+ → "Ariza berishga tayyor" (Dashboard'da yashil banner paydo bo'ladi)
- Hisoblash: `lib/readiness.ts` + `recalculateReadiness()`

**Journey unlock:** Oldingi phase progress ≥ 80% → keyingisi ochiq

---

## PWA (yangi sozlamalar)

`vite.config.ts` → `workbox`:
- `clientsClaim: true` — yangi SW darhol nazoratni egallaydi
- `skipWaiting: true` — eski versiyani kutmaydi
- `cleanupOutdatedCaches: true` — eski kesh tozalanadi

Foydalanuvchi har deploy'dan keyin **bir marta** refresh qilsa yetadi.

---

## UI / Dizayn

- **Ranglar:** `#002F6C` (Etihad ko'k), `#BD8B13` (oltin), accent: sky/sunset/night
- **CSS:** `src/index.css` — `@theme` da `--color-etihad-*` + 8 gradient utility + 12 animatsiya keyframe
- **Layout:** Mobile-first, sidebar (desktop) / drawer (mobile)
- **Komponentlar:** `cn()` (`lib/utils.ts`), `components/ui/` (design system)

Yangi sahifa **albatta** PageHero + StatTile/SectionHeader bilan boshlanishi kerak — UI bir xilligi uchun.

---

## i18n

- UI matnlar: `src/locales/uz.json`, `en.json` — `t('nav.dashboard')` kabi
- Dars kontenti: `{ uz, en }` obyektlar — `getLocalizedText(text, lang)`
- Phase nomlari: `t('phases.0.title')`

Yangi UI matn qo'shganda **ikkala locale** faylini yangilang. JSON sintaksisini `node -e "JSON.parse(require('fs').readFileSync('...'))"` bilan tekshiring.

---

## Deploy (Netlify)

```
Build: npm run build
Publish: dist
Node: 20
SPA redirect: /* → /index.html (netlify.toml da)
```

GitHub repo: https://github.com/Elmun-Technologies/cabincrewacademy

---

## Ma'lum muammolar va yechimlar

| Muammo | Yechim |
|--------|--------|
| Bo'sh oq sahifa | localStorage o'chiring (`cabin-crew-academy-v2`), hard refresh |
| Eski UI ko'rinmoqda | Hard refresh (`Ctrl/Cmd+Shift+R`) — PWA cache yangilanadi |
| React hooks xatosi | Renderda `useAppStore.getState().set()` chaqirmang |
| Bundle > 500 kB ogohlantirish | Hozircha xavfsiz, kelajakda dynamic import qo'llash mumkin |

---

## Kod yozish qoidalari

1. **Kontent ≠ kod** — dars matnlari `content/phases/` da, hardcode qilmang
2. **Design system** — yangi sahifa qo'shsangiz, `PageHero` + `SectionHeader` + `StatTile` dan boshlang
3. **Ikki til** — har doim uz + en
4. **State side-effect** — faqat actionlar yoki `useEffect` da
5. **Animatsiya** — `slide-in-up delay-N` ni bo'limlarga qo'shing, `hover-lift` interaktiv kartalarga
6. **Build oldidan** — `npm run build` ishlatishni unutmang, TS errorlari bo'lmasligi kerak
7. **Commit** — faqat foydalanuvchi so'raganda; `.env` commit qilmang

---

## Foydali fayllar (tez havola)

| Vazifa | Fayl |
|--------|------|
| Route qo'shish | `src/App.tsx` |
| Sidebar item qo'shish | `src/components/layout/AppLayout.tsx` (`navItems`) |
| Store o'zgartirish | `src/stores/app-store.ts` |
| Dars qo'shish | `src/content/phases/phase-*.ts` |
| Dars ko'rsatish | `src/components/lesson/LessonPlayer.tsx` |
| XP/badges | `src/lib/xp-engine.ts` |
| Kunlik reja | `src/lib/daily-plan.ts` |
| UI tarjima | `src/locales/uz.json`, `en.json` |
| Tiplar | `src/types/index.ts` |
| Gradient/animatsiya | `src/index.css` |
| Design system | `src/components/ui/{page-hero,section-header,stat-tile,tab-nav,animated-number}.tsx` |
| Deploy | `netlify.toml` |

---

## Loyiha maqsadi (eslatma)

Foydalanuvchi kuniga **2 soat** o'qiydi, ~16-18 haftada Etihad Assessment Day ga tayyor bo'ladi.
Platforma **Readiness Score 85%+** va hujjatlar tayyor bo'lganda ariza berishni tavsiya qiladi.

Rasmiy Etihad brendini copy qilmang — faqat premium aviation estetikasi.
