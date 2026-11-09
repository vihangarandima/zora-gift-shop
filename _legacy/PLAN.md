# PLAN — Sora site (folder is named "Vihanga Clothing" but the client brand is Sora Gift House + Sora Loom)

## Done
- 2026-11-08: researched FB/IG, saved logos to `brand/`, wrote `SITE_PROMPT.md`.
- 2026-11-08: first build, `git init` done, nothing committed. Static site: `index.html` (hero gift-box untie, scroll thread, Loom clothesline, Gift drop-in box, how-to, feedback wall, dispatch belt, find us, end bow), `loom.html` + `gift.html` (filter chips, grid, WhatsApp order links), `404.html`, `products.json` (sample items only), `HOW_TO_UPDATE.md`, `css/style.css`, `js/{common,home,shop}.js`, `img/mushroom.svg`, `favicon.svg`. Run locally: `python -m http.server 8000` in this folder.
- Checked in the in-app browser at 390 wide: hero, thread, all home sections, Loom page, no horizontal overflow, no JS errors (only 404s for the missing font files and og.png).

- 2026-11-08: fonts downloaded (Fontsource via jsDelivr, 4 woff2, 265 KB) and og.png made (1200x630). Mobile pass at 390x844: first load 318 KB, no overflow, all tap targets >= 44px, fixed thread over dispatch belt, hint hidden by WhatsApp button, 100svh fallback, font preloads.

- 2026-11-08: looks pass: shaded hero box with "for you" tag and twinkles, scalloped lilac/cream bands, peeking mushrooms, wax seal, kraft price tags, star doodles on titles, footer wordmark, fade-up reveals, per-category placeholder art, thread now runs down the side margins (crosses only in section gaps), 3-column steps on desktop. Fixed a console error on shop pages (fab button missing).

## Next
- `og:image` must become an absolute URL (https://yourdomain/og.png) once the domain is known, or WhatsApp may not show it.
- Swap the logo JPGs (150px) for originals.
- Owner: real photos, prices, Facebook links, delivery/payment/returns, brand-or-two-sites decision. Have a Sinhala speaker proofread all Sinhala copy (written by Claude).
- Not yet done: Lighthouse run, 4x CPU throttle test, 1440px full screenshot set, real phone and in-app browser test, Lenis (skipped on purpose, no scroll-speed changes).

## Decisions
- 2026-11-08: one site with two shops; WhatsApp ordering, no cart.
- 2026-11-08: hero pins for 150% scroll except on 2-core or 2 GB devices and reduced motion (short non-pinned reveal there).
- 2026-11-08: no Lenis; GSAP 3.12.5 + ScrollTrigger from cdnjs.
