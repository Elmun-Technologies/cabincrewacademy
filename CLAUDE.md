# CLAUDE.md — Cabin Crew Academy

Bu fayl AI yordamchilar (Claude, Cursor) uchun loyiha konteksti. Yangi sessiyada avval shu faylni o'qing.

## Loyiha nima?

**Cabin Crew Academy** — Etihad Airways kabina ekipajiga ishga kirish uchun shaxsiy tayyorgarlik platformasi.

- Maqsad: foydalanuvchini noldan Assessment Day / intervyuga tayyorlash
- Til: UI o'zbek + ingliz (`react-i18next`, headerda toggle)
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
| PWA | vite-plugin-pwa |
| Backend (ixtiyoriy) | Supabase (Auth, DB, Storage) |
| Deploy | Netlify (`netlify.toml`) |

Path alias: `@/` → `src/` (`vite.config.ts`, `tsconfig.app.json`)

---

## Papka strukturasi

```
src/
├── App.tsx                 # Routing, ErrorBoundary
├── main.tsx                # Bootstrap + store init
├── pages/                  # Har bir route — bitta page
├── components/
│   ├── layout/AppLayout.tsx    # Header + bottom nav (8 tab)
│   ├── lesson/LessonPlayer.tsx # Dars o'ynatgich (barcha block turlari)
│   ├── gamification/           # XPBar, JourneyMap, Streak
│   ├── daily/DailyChallenge.tsx # Kunlik mini-o'yinlar + Test Arena o'yinlari
│   ├── ui/                     # Button, Card, Input, Progress, Badge
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

## Routing (`src/App.tsx`)

| Path | Page | Vazifa |
|------|------|--------|
| `/` | DashboardPage | XP, streak, readiness, tezkor havolalar |
| `/journey` | JourneyPage | 13 bosqichli yo'l xaritasi |
| `/lesson/:phaseId/:lessonId` | LessonPage | Bitta dars |
| `/daily` | DailyPage | Kunlik 2 soatlik reja |
| `/english` | EnglishPage | IPA, flashcards, glossary, speaking |
| `/documents` | DocumentsPage | CV builder, hujjatlar vault |
| `/assessment` | AssessmentPage | Mock Assessment Day simulyatsiyasi |
| `/games` | GamesPage | Memory, Reaction, Pattern, SJT |
| `/profile` | ProfilePage | Statistika, badges, flight logs |
| `/onboarding` | OnboardingPage | Ixtiyoriy — ism, yosh, bo'y, talablar |
| `/auth` | → redirect `/` | Eski route, ishlatilmaydi |

**Muhim:** Login yo'q. Dashboard to'g'ridan-to'g'ri ochiladi. Onboarding majburiy emas.

---

## State boshqaruvi (`src/stores/app-store.ts`)

Zustand store, persist kaliti: **`cabin-crew-academy-v2`**

Asosiy state:
- `profile` — foydalanuvchi (default: guest, `onboardingComplete: true`)
- `xp` — totalXp, streak, level
- `progress[]` — `{ phaseId, lessonId, status, score }`
- `badges[]`, `dailySessions[]`, `flightLogs[]`, `documents[]`, `cvData`
- `readiness` — `{ english, aviation, softSkills, documents, overall }`
- `gameScores[]`, `mockAssessmentScore`

Asosiy actionlar:
- `completeLesson(phaseId, lessonId, score)` — XP + progress
- `addXp(amount)` — streak bonus bilan
- `ensureTodaySession()` — kunlik reja yaratish (**renderda chaqirmang!**)
- `recalculateReadiness()` — 4 yo'nalish bo'yicha 0-100
- `checkAndAwardBadges()` — avtomatik badge berish
- `completeOnboarding(data)` — profil yangilash

**DIQQAT — xatolardan saqlaning:**
1. Render paytida `set()` chaqirmang (oldin bo'sh sahifaga sabab bo'lgan)
2. `ensureTodaySession()` faqat `useEffect` ichida (`DailyPage`)
3. localStorage buzilsa — ErrorBoundary "Qayta boshlash" tugmasi `cabin-crew-academy-v2` ni o'chiradi
4. Eski kalit `cabin-crew-academy` — endi ishlatilmaydi

---

## O'quv kontenti qo'shish

Kontent **TypeScript fayllarda**, `src/content/phases/` ichida.

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

### Yangi bosqich (phase) qo'shish

1. `phase-N.ts` yarating (`Phase` interfeysiga mos)
2. `src/content/phases/index.ts` dagi `phases[]` ga qo'shing
3. `src/locales/*.json` ga `phases.N.title` va `phases.N.desc` qo'shing
4. `unlockThreshold: 80` — oldingi bosqich 80%+ bo'lsa ochiladi (`lib/daily-plan.ts` → `isPhaseUnlocked`)

---

## Gamifikatsiya

**XP** (`lib/xp-engine.ts`):
- Dars: 50 XP, quiz perfect: +25, daily challenge: 40, streak bonus: 25

**Darajalar:** Cabin Trainee → Junior Crew → Senior Prep → Etihad Ready

**Badges:** `BADGE_DEFINITIONS` — `checkAndAwardBadges()` avtomatik tekshiradi

**Readiness Score (0-100):**
- English 25% + Aviation 25% + Soft Skills 25% + Documents 25%
- 85%+ → "Ariqa berishga tayyor" (`readiness.applyNow`)
- Hisoblash: `lib/readiness.ts` + `recalculateReadiness()`

**Journey unlock:** Oldingi phase progress ≥ 80% → keyingisi ochiq

---

## Kunlik 2 soatlik reja

`lib/daily-plan.ts` → `generateDailyPlan()`:

1. Daily Challenge (10 min) — rotatsiya: termMatch, sixtySecondPitch, scenarioSprint, pronunciationDrill, memoryFlight
2. Asosiy dars (30 min)
3. Ingliz moduli (30 min)
4. Amaliyot (25 min)
5. Review + Flight Log (15 min)

Challenge implementatsiyasi: `src/components/daily/DailyChallenge.tsx`

---

## UI / Dizayn

- **Ranglar:** Etihad ilhomlangan — `#002F6C` (ko'k), `#BD8B13` (oltin)
- **CSS:** `src/index.css` — `@theme` da `--color-etihad-blue`, `--color-etihad-gold`
- **Layout:** Mobile-first, pastda fixed bottom nav (8 item)
- **Komponentlar:** `cn()` (`lib/utils.ts`), shadcn-uslubida `components/ui/`

---

## i18n

- UI matnlar: `src/locales/uz.json`, `en.json` — `t('nav.dashboard')` kabi
- Dars kontenti: `{ uz, en }` obyektlar — `getLocalizedText(text, lang)`
- Phase nomlari: `t('phases.0.title')` — locales va content alohida

Yangi UI matn qo'shganda **ikkala locale** faylini yangilang.

---

## Supabase (kelajak, hozir ixtiyoriy)

- Client: `src/lib/supabase.ts` — `isSupabaseConfigured` tekshiradi
- Schema: `supabase/migrations/001_initial_schema.sql`
- Hozirgi MVP: faqat localStorage, Supabase ulanmagan
- Cloud sync qo'shishda: store actionlarini Supabase bilan sync qiling, RLS policies tayyor

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
| "Yuklanmoqda" da qotib qolish | `useAppHydration` olib tashlangan — qayta qo'shmang |
| React hooks xatosi | Renderda `useAppStore.getState().set()` chaqirmang |
| Eski login sahifasi | `/auth` endi `/` ga redirect |
| Build xato TS5101 | `tsconfig.app.json` da `"ignoreDeprecations": "6.0"` |

---

## Kelajakda nima qo'shish mumkin (prioritet bo'yicha)

1. **Kontent kengaytirish** — har phase uchun ko'proq darslar, 500+ aviation termin
2. **IPA audio** — haqiqiy audio fayllar + Web Speech API talaffuz
3. **Supabase sync** — progress bulutda saqlansin
4. **Spaced repetition** — flashcards uchun SM-2 algoritm
5. **Weekly progress chart** — readiness trendi
6. **Etihad Hub** — Open Day calendar, fleet explorer
7. **PDF CV export** — hozir faqat .txt export
8. **Code split** — bundle 500KB+, dynamic import pages

---

## Kod yozish qoidalari (ushbu loyiha uchun)

1. **Kontent ≠ kod** — dars matnlari `content/phases/` da, hardcode qilmang
2. **Minimal diff** — mavjud patternga mos yozing (Button, Card, store actionlar)
3. **Ikki til** — har doim uz + en
4. **State side-effect** — faqat actionlar yoki `useEffect` da
5. **Test** — hozir test framework yo'q; qo'shsangiz Vitest tanlang
6. **Commit** — faqat foydalanuvchi so'raganda; `.env` commit qilmang

---

## Foydali fayllar (tez havola)

| Vazifa | Fayl |
|--------|------|
| Route qo'shish | `src/App.tsx` |
| Store o'zgartirish | `src/stores/app-store.ts` |
| Dars qo'shish | `src/content/phases/phase-*.ts` |
| Dars ko'rsatish | `src/components/lesson/LessonPlayer.tsx` |
| XP/badges | `src/lib/xp-engine.ts` |
| Kunlik reja | `src/lib/daily-plan.ts` |
| UI tarjima | `src/locales/uz.json`, `en.json` |
| Tiplar | `src/types/index.ts` |
| Deploy | `netlify.toml` |

---

## Loyiha maqsadi (eslatma)

Foydalanuvchi kuniga **2 soat** o'qiydi, ~16-18 haftada Etihad Assessment Day ga tayyor bo'ladi.
Platforma **Readiness Score 85%+** va hujjatlar tayyor bo'lganda ariza berishni tavsiya qiladi.

Rasmiy Etihad brendini copy qilmang — faqat premium aviation estetikasi.
