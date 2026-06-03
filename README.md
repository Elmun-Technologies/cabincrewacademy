# Cabin Crew Academy

Etihad Airways kabina ekipajiga ishga kirish uchun gamifikatsiyali o'quv platformasi.

## Features

- 13 bosqichli o'quv yo'li (Journey Map)
- Kunlik 2 soatlik reja + daily challenges
- English Academy (IPA, flashcards, glossary, speaking)
- Gamification (XP, levels, badges, streaks)
- Assessment Day simulator
- CV Builder + Document Vault
- Test Arena (Memory, Reaction, Pattern, SJT)
- O'zbek / Ingliz til toggle
- PWA — telefonda "Add to Home Screen"

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Zustand (local persistence)
- Supabase (optional — auth & sync)
- react-i18next
- vite-plugin-pwa

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Environment Variables

Copy `.env.example` to `.env`:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Without Supabase, the app runs in **local mode** with localStorage persistence.

## Build & Deploy (Netlify)

```bash
npm run build
```

Deploy `dist` folder to Netlify. Configuration is in `netlify.toml`.

## Supabase Setup

Run migration in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor.

## Project Structure

```
src/
├── components/   # UI, gamification, lesson player, games
├── pages/        # Route pages
├── content/      # Lesson content (JSON/TS)
├── lib/          # Utils, XP engine, i18n, readiness
├── stores/       # Zustand app store
├── locales/      # uz.json, en.json
└── types/        # TypeScript types
```

## Disclaimer

This is a personal preparation tool, not an official Etihad Airways training product.
