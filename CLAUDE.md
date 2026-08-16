# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # oxlint (no config file — uses oxlint defaults)
```

There is no test suite in this project.

## Deployment

- Live site: https://adityarahalkar.xyz (Vercel project `aditya-rahalkar`, team `ar-8`).
- GitHub repo (`adityarahalkar07/personal_website`) is connected to Vercel's Git integration: every push to `main` auto-deploys to production in ~10-20s. There is no `vercel.json` — Vercel Serverless Functions are picked up automatically from the `api/` directory convention.
- **Standing workflow rule**: after making any change in this repo, commit and push to `origin/main` immediately (don't batch changes) so the live site stays in sync. Don't run `vercel deploy` manually — the Git integration handles it.

## Architecture

This is a single-page personal/portfolio site (React 19 + Vite), not a multi-page app — there's no router. `src/App.jsx` renders one long scrolling page by stacking section components in a fixed order (`Navbar`, `Hero`, `About`, `ParallaxDivider`, `Research`, `ParallaxDivider`, `Publications`, `ParallaxDivider`, `Education`, `Contact`, `Footer`). Each section is a self-contained component with its own co-located `.css` file (no CSS modules, no Tailwind — plain global-ish class names scoped by BEM-ish prefixes like `.divider__text`).

`App.jsx` also owns a `LoadingScreen` (a railroad-themed progress bar) shown via `framer-motion`'s `AnimatePresence` before the page content mounts.

**Animation stack**: all scroll/entrance animation is done with `framer-motion` (`useScroll`, `useTransform`, `motion.div`) plus two custom hooks in `src/hooks/useScrollAnimation.js` (`useScrollAnimation` — IntersectionObserver-based fade-in, `useParallax`, `useScrollProgress`). `three`, `@react-three/fiber`, `@react-three/drei`, and `gsap` are listed as dependencies but are currently unused anywhere in `src/` — don't assume a 3D scene exists just because those packages are installed.

**Publication/citation data flow**: `src/hooks/useScholarData.js` fetches live citation metrics from `/api/scholar` (a Vercel serverless function at `api/scholar.js` that proxies OpenAlex using a hardcoded `OPENALEX_AUTHOR_ID`). If the fetch fails, it falls back to a hardcoded `FALLBACK` object in the same file. `Publications.jsx` has its own hardcoded array of publication metadata (title/authors/venue/year) and calls `getCitations(title)` from the hook to overlay live citation counts by fuzzy-matching normalized titles — the hook does not return full publication records to consume directly, only a citation lookup by title plus aggregate `metrics` (citations/hIndex/i10Index).

**Static assets**: CV, papers, and presentation files live in `public/` and are linked directly (e.g. `/Aditya_Rahalkar_CV.pdf`); images imported into components (e.g. `aditya_headshot.png`, `hero.png`) live in `src/assets/` and go through Vite's asset pipeline instead.
