# Sora (Gift House + Loom) — site brief and build prompt

Logos saved in `brand/` (only 150px profile pics; ask the owner for the original files, see "Missing").

## 1. What I found

**Sora Gift House** — gift shop, Polonnaruwa, Sri Lanka. Island-wide delivery, "always open".
- Tagline: "Welcome My Sweet World". Sinhala bio: "Come give gifts with love to your loved ones, join us".
- WhatsApp only: 070 600 8576 / 070 408 0791
- Facebook: 63K followers, 100% recommend (39 reviews). Instagram `_sora_gift_house_`: 2.6K followers, 2,161 posts.
- TikTok `@sora_gift_house_` and `@sora_gift_lk`; YouTube `@soragifthouse` ("It's me kavee (Sora💜)") and `@soraa00`.
- Instagram highlights = real site sections: Feedback, Labubu, Stitch, Drop Price, Celebrate, YouTube Vlog, X-mas Offers, Gift.
- Stock seen in recent posts: gift boxes, hand cream, fragrance, hair products, handbags, shoes, pouches, soft toys, stationery. Facebook posts "Dispatch" photo albums (parcels going out).
- Logo: round lilac badge, smiling purple mushroom with white spots, "SORA" in an elegant serif, "GIFT HOUSE" small caps, strapline "Gifts · Fashion · Beauty · Accessories". Mushroom emoji 🍄💜 is used everywhere.

**Sora Loom** — girls' clothing brand, same owner, Polonnaruwa.
- Sinhala bio: "For girls who love to dress beautifully 😍💜🪻".
- WhatsApp only: 074 189 6530
- Facebook: 25K followers, 100% recommend (10 reviews). Instagram `_sora_loom_`: ~790 followers, 450 posts.
- TikTok `@sora_loom__` (also `@sora_store__` in the IG bio).
- Highlights: Customer Snap, Feedback, Special Notice.
- Products: dresses, sundresses, sleepwear, skirts, shawls/scarves.
- Logo: clothes hanger whose hook is a question mark, "SORA" lilac serif over "Loom", handwritten strapline "we wrap love". Lilac 🪻 emoji used everywhere.

**Language and voice:** Sinhala first, with English mixed in. Warm, chatty and sisterly, lots of emoji. Customers are mainly young women across Sri Lanka, on phones.

**How they sell:** post on social, customer sends WhatsApp, pays, parcel is dispatched. There is no real storefront online, so the site's main job is to make "order on WhatsApp" easy and trustworthy.

## 2. Missing (ask the owner, do not invent)
- Original logo files (vector or high-res PNG), real product photos, real prices and categories.
- TikTok and YouTube could not be read (they block bots), so the follower counts and video list are unknown.
- Delivery fee, delivery time, payment methods (COD? bank transfer?), return policy.
- Whether the site is one brand ("Sora" with two shops) or two sites. This brief assumes **one site, two shops**.
- Owner name (YouTube hints "Kavee", unconfirmed). Do not put a name on the site until confirmed.

## 3. The prompt (paste into a fresh chat)

> Spun off from: Sora brand research. Read `SITE_PROMPT.md` sections 1 and 2 first, then build.
>
> **Goal.** Build a mobile-first website for **Sora**, a Sri Lankan (Polonnaruwa) small business with two shops: **Sora Gift House** (gifts, beauty, fashion, accessories) and **Sora Loom** (girls' dresses, sleepwear, shawls). People discover it on Instagram, Facebook and TikTok, so most visitors arrive on a phone inside an in-app browser on mobile data. The site must feel hand-made and warm, not like a template or a generated site.
>
> **Stack.** Plain HTML/CSS/JS or Astro, no React. GSAP + ScrollTrigger (and Lenis for smooth scroll) loaded from a CDN with a pinned version. Self-host fonts. No other libraries. Total first load under 1 MB on mobile; images WebP/AVIF, lazy-loaded, with real width/height. Respect `prefers-reduced-motion` (swap animations for plain fades). Deployable as static files on Cloudflare Pages.
>
> **Language.** Sinhala/English toggle (Sinhala default, remembered). Use Noto Sans Sinhala or Iskoola-safe fallback and test that Sinhala text does not clip or break. Write copy in the owner's voice: short, warm, sisterly. No marketing filler ("elevate", "curated", "seamless", "unlock").
>
> **Look. This is the most important part.** Avoid the generated-site look. Explicitly do NOT use: purple-to-pink gradient blobs, glassmorphism, glowing orbs, floating 3D shapes, centered hero with two pill buttons, a row of three identical rounded cards with icons, emoji used as icons, Inter/Poppins, fake "10K+ happy customers" stat bars, or testimonials in a symmetrical carousel.
> Instead:
> - **Palette from the logos:** soft lilac `#B79CE6`-ish, deep plum for text (not black), warm cream paper background, one accent (a strawberry/rose pink used sparingly). Sample the exact lilac from the logo files.
> - **Type:** a characterful serif for display (the logo uses an elegant high-contrast serif; choose something with a similar feel, e.g. Fraunces, Cormorant or Gloock) plus a small handwritten face for notes and price tags, plus a clean sans for body. Mix sizes boldly; allow big type to crop off the edge of the screen.
> - **Material feel:** paper texture and grain, kraft tags with string, washi tape, stitched seams as dividers, ribbon, wax-seal stamps, slightly rotated photos with hard small shadows like they are taped to a wall. Things should be a little off-grid and slightly imperfect; don't align everything to a rigid 12-column.
> - **Mascot:** use the mushroom as a small recurring character (peeking from section edges, a cursor/tap reaction, a loading state), drawn as SVG matching the logo.
> - **Photos:** real customer and product photos from the owner (placeholders until supplied), shown as polaroids, parcel flat-lays and dispatch shots. The "Dispatch" and "Feedback" content is the proof; make it prominent and real (screenshots of WhatsApp feedback, cropped, with names hidden).
>
> **Scroll animation (the signature).** One continuous **thread** (SVG path, stroke-dashoffset scrubbed by scroll) runs down the whole page, stitching sections together, which ties to "Loom". At the hero it starts as the ribbon of a gift box. Scrolling:
> 1. Hero: closed lilac gift box tied with the thread. Scroll untied the bow, lid lifts, and the Sora logo and tagline "Welcome My Sweet World" rise out. (Pinned for ~1.5 screens; on low-end phones fall back to a short non-pinned reveal.)
> 2. Thread weaves through a hanger and becomes the divider into the **Sora Loom** section; clothes slide in on the thread like they're hanging on a line, each slightly swaying. Tap or drag to see an item.
> 3. **Gift House** section: items drop into a box one by one as you scroll, then the box closes with a tape strip.
> 4. **Dispatch** strip: a horizontal, scroll-driven conveyor of real parcel photos ("sent today to Kandy, Galle, Jaffna...") with a handwritten counter.
> 5. Ending: the thread ties into a bow around the WhatsApp button.
> Keep it smooth at 60fps on a mid-range Android; test with 4x CPU throttling. Do not hijack scroll speed on mobile; no scroll-jacking that traps the user.
>
> **Pages/sections.** One long home page plus two shop pages.
> - Home: hero (above), the two shops, how ordering works in 3 steps (pick on site, message on WhatsApp, we dispatch island-wide), Feedback wall, Dispatch strip, find us (Polonnaruwa, no street address unless given), social links, footer.
> - Shop pages: filterable grid of items (categories from the Instagram highlights: Labubu, Stitch, Celebrate, X-mas, Drop Price, Dresses, Sleepwear, Shawls). Each item has photo, name, price (LKR) and an **"Order on WhatsApp"** button that opens `https://wa.me/94706008576?text=` (Gift House) or `https://wa.me/94741896530?text=` (Loom) with a prefilled Sinhala/English message naming the item. No cart, no checkout, no accounts.
> - Data in one `products.json` the owner can edit; no backend. Include a short `HOW_TO_UPDATE.md` for a non-developer.
>
> **Trust and details.** Real contact numbers (WhatsApp only, say so), always-visible floating WhatsApp button, Facebook/Instagram/TikTok/YouTube links, Open Graph image so links look good when shared on WhatsApp, favicon from the mushroom, 404 page in the brand voice. Good contrast, 44px tap targets, alt text, keyboard focus states.
>
> **Do not.** Invent prices, stock, reviews, customer names, delivery times or policies; leave clearly marked `TODO` placeholders. Don't touch `brand/` originals. No tracking scripts or cookie banner.
>
> **Done when.** (1) Runs locally; (2) Lighthouse mobile performance ≥ 85; (3) a 390×844 scroll-through screenshot set of every section, plus the same at 1440 wide, shows no overflow or clipped Sinhala; (4) the thread animation runs without jank under 4x throttle; (5) you list what you could not verify (real device, Sinhala fonts on old Android, in-app browsers). Then update `PLAN.md`.

## 4. Suggested model split
- Opus, effort high: the first build (hero + thread animation + art direction).
- Sonnet, effort medium: shop pages, `products.json`, language toggle.
- Gemini Flash: later bulk work like adding products from a clear list. Commit first.
