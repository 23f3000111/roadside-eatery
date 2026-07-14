# The Roadside Eatery — Setia Alam (Mockup)

A modern, animated landing-page mockup for **The Roadside Eatery**, a casual
Western/fusion halal eatery in Setia Alam, Shah Alam. Built with React + Vite +
Tailwind CSS, with motion by Framer Motion.

> This is a design mockup. Copy, prices, hours and reviews are illustrative
> placeholders. All food, interior and logo images are © their respective owners.

## Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **Framer Motion** (scroll reveals, parallax, carousels)
- **lucide-react** (icons)
- **Playfair Display** + **Manrope** (Google Fonts)

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173/roadside-eatery/)
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Deploying to GitHub Pages

This repo serves Pages from the **`gh-pages` branch** (no Actions minutes needed).
Build locally and publish the `dist` output to that branch:

```bash
npm run deploy   # builds, then pushes /dist to the gh-pages branch
```

Then in the repo: **Settings → Pages → Source = "Deploy from a branch" → `gh-pages` / root**.
The site publishes at `https://<user>.github.io/roadside-eatery/`.
(The Vite `base` in `vite.config.js` must match the repo name.)

## Sections

Announcement ticker · Navbar · Hero · Signature Plates · Story · Menu ·
The Vibe · Reviews · Location (Google Maps) · Gallery · CTA · Footer

## Design

- **Palette:** ember `#E8622A`, amber `#E8A33D`, charcoal `#1F1B18`,
  cream `#FBF6EF`, wood `#8A5A3B`
- **Theme basis:** adapted from the "Toastiful" layout, re-skinned to a
  bold, industrial grilled-comfort-food identity.

## Credits

Design mockup generated with assistance from Claude Code.
