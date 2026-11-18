# Sinta Pangasinan — Next.js Tourism Website

A complete, responsive **Node.js + Next.js 15 App Router** educational tourism guide for Pangasinan. It highlights three destinations: Hundred Islands (Alaminos City), Cape Bolinao Lighthouse (Bolinao), and Balungao Hot Springs (Balungao).

> **Disclaimer:** An independent educational prototype, not an official Pangasinan government site. It does not accept bookings, charge money, or claim real-time prices or operating hours.

## Quick start

Requirements: **Node.js 20.9+**, npm, and internet access **the first time** to install Next.js packages. Once installed, destination artwork and fonts do not depend on third-party CDNs.

```bash
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

To run a production build:

```bash
npm run check
npm run start
```

A package-independent project integrity test is also provided:

```bash
npm test
```

## Features

- Editorial homepage, immersive self-hosted SVG illustrations, and responsive design for phones, tablets, and laptops.
- Dynamic destination detail route, statically generated for each of the three places.
- Working search and category filters with accessible filter state and a clear-results action.
- Functional Save for later button on destination pages (browser localStorage).
- Working multi-stop itinerary planner: choose destinations, choose day/weekend, generate and print an inspiration itinerary, save choices locally.
- Local map links to Google Maps search; official-source links; transparent source credits.
- Real low-data mode toggle: image **background URLs are removed** by CSS, while readable gradients replace artwork. The initial choice is loaded early from localStorage, with `prefers-reduced-data` as a default when supported. No remote fonts or images are needed.
- Progressive offline fallback service worker in production. Previously visited pages may be available offline; otherwise a custom offline page appears. Scenes are *not precached* so data mode doesn't fetch unused artwork in the background.
- Keyboard-friendly mobile menu, visible focus outlines, skip-to-content, semantic landmarks and headings, explicit labels, text alternatives for artwork, reduced-motion handling, and accessible form controls.
- SEO metadata, robots, sitemap, web manifest, custom favicon, Next.js page-level metadata, baseline security headers.
- Mobile-first resizing, lazy image-free visual assets, and zero external component/UI packages.

## Source tree

```
app/
  page.tsx                         Homepage
  explore/page.tsx                 Browse/filter destinations
  destinations/[slug]/page.tsx     Destination details, static params
  culture/page.tsx                 Culture and respectful tourism
  plan/page.tsx                    Interactive trip planner
  credits/page.tsx                 Editorial source disclosure
  layout.tsx                       Navigation, footer, metadata
  globals.css                      Full responsive design system
  sitemap.ts, robots.ts            Search metadata
components/                        Reusable UI and client-side controls
lib/destinations.ts                Structured, editable place data
public/scenes/                     Three original self-hosted SVG scenes
public/sw.js                       Optional production offline cache
public/offline.html                Network fallback
public/manifest.webmanifest        Web app manifest
```

## Architecture choices / assessment criteria

| Criterion | Implementation |
| --- | --- |
| **Resilient** | No backend needed for browsing; no external image/font dependency; offline fallback with service worker; graceful storage failure handling. |
| **Accessible** | Headings, landmarks, breadcrumbs, image descriptions, keyboard controls, labeled search/radio/checkbox controls, contrast-conscious colors, reduced-motion and focus indicators. |
| **Maintainable** | TypeScript, `Destination` type, reusable components, centralized data, category enum, metadata per route, clean directory layout. |
| **High performance** | Server-rendered static pages, self-hosted compact vector artwork, no external JavaScript component dependencies, CSS transitions only, route prefetch disabled to conserve mobile bandwidth. |
| **Mobile data** | Low-data mode hides scenic SVG downloads; text/core content remains; illustrations are compact SVGs, no streaming video, no webfonts, no trackers. |
| **Discoverability** | Destination pages, working filtering, culture stories, internal links, SEO sitemap, official source links. |
| **Privacy** | No accounts, cookies, analytics, or personal-data server collection; settings/plans stored only on the user’s device. |
| **Security** | No submitted backend data; external links use `noopener noreferrer`; standard secure response headers. |

## Updating content

Edit `lib/destinations.ts`. Each entry has a slug, title, location, category, illustration type, highlights, visitor reminders and an official source link. New destinations require adding scenic artwork and associated CSS visual mapping or reusing an existing illustration type.

**Do not add unverified admission prices, tour availability, weather forecasts, or opening times as fixed facts.** Check government/operator sources before deploying and keep information dated where appropriate.

## Production deployment

1. Run `npm install` and `npm run check`.
2. Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS address (optional in local development; **required for correct production sitemap/canonical metadata**).
3. Deploy as a standard Next.js Node server (`npm run build && npm run start`) or to a Next.js-compatible host.
4. Confirm HTTPS service worker behavior, navigations, focus order, and accessibility with browser developer tools.
5. To disable offline support, remove `<ServiceWorkerRegistration/>` from `app/layout.tsx` and `public/sw.js`.

## Content sources

See `/credits` page, which links the Provincial Tourism and Cultural Affairs Office, the Pangasinan provincial tourism site, and the official Hundred Islands visitor site. The artwork in `public/scenes` is original illustrative vector work, **not photographs**.

## Verification note

The source code and static assets are checked with `npm test`. The production build must be run on a machine with npm registry access to install the pinned-compatible packages. A successful runtime or Lighthouse score is not claimed without executing those checks.


## Destination photo assets (updated)

The website now displays **six bundled WebP image assets** in `public/photos/`:

| Destination | Lightweight | High density |
|---|---|---|
| Hundred Islands | `hundred-islands-720.webp` | `hundred-islands-1280.webp` |
| Cape Bolinao Lighthouse | `cape-bolinao-lighthouse-720.webp` | `cape-bolinao-lighthouse-1280.webp` |
| Balungao Hot Springs | `balungao-hot-springs-720.webp` | `balungao-hot-springs-1280.webp` |

Images appear on the homepage, Explore cards, destination details, Culture mosaic, and itinerary planner. They are referenced by `image-set()` in `app/globals.css`; browsers select a resolution according to device pixel density. **These are AI-assisted illustrative scenes, not authentic location photos.** The images are self-hosted with the app, so no third-party image server is required. Low-data mode removes all background image requests and displays a lightweight gradient instead. The service worker caches photos only after visitors request them.

To replace an asset with an actual photograph, export the licensed/permissioned photo as WebP at the two widths with the same names. Review object positioning (`.visual--...:before`) and change this note and the site credits to include the actual photographer, link, license and modification details. Do not describe an illustrative image as an actual on-site photograph.
