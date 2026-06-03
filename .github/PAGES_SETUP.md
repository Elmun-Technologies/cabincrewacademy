# GitHub Pages Setup

This project is configured to deploy to **GitHub Pages** as a free
alternative to Netlify.

## One-time setup (5 minutes)

1. Go to **Settings → Pages** in this GitHub repository:
   https://github.com/Elmun-Technologies/cabincrewacademy/settings/pages
2. Under **Source**, select **GitHub Actions**.
3. Save. That's it.

After enabling Pages, the next push to `main` triggers the workflow at
`.github/workflows/deploy.yml`. It will:

1. Install dependencies (`npm ci`)
2. Build with `BASE_PATH=/cabincrewacademy/` so asset URLs work
3. Copy `dist/index.html` to `dist/404.html` so React Router routes
   like `/journey` work on direct visits
4. Publish `dist/` to GitHub Pages

The live URL will be:
**https://elmun-technologies.github.io/cabincrewacademy/**

## Why the `404.html` trick?

GitHub Pages serves static files. When a user visits
`/cabincrewacademy/journey` directly, GH Pages can't find that file,
so it serves `404.html`. By making `404.html` an identical copy of
`index.html`, the React app loads and React Router takes over —
showing the right page. Same trick is used by many Vite SPAs.

## Custom domain (optional)

If you point a custom domain like `cabincrewacademy.com`:

1. In **Settings → Pages**, add the custom domain
2. In `.github/workflows/deploy.yml` change `BASE_PATH: /cabincrewacademy/`
   to `BASE_PATH: /`
3. Add a `public/CNAME` file containing just the domain
