# Sora brand sheet (Sora Loom × Sora Gift House)

Status: **draft, waiting for owner confirmation** before the site build starts.

## Source assets

| File | What it is | Note |
|---|---|---|
| `assets-raw/logos/sora_gift_house_logo.jpg` | Gift House round badge (purple mushroom, "SORA / GIFT HOUSE") | Only 150×150 px (Instagram profile picture) |
| `assets-raw/logos/sora_loom_logo.jpg` | Loom hanger mark, "SORA / Loom / we wrap love" | Only 150×150 px |
| `public/brand/sora-gift-house.png` | Badge with the white outside the circle removed | Made by `scripts/prepare_logos.py` |
| `public/brand/sora-loom.png` | Loom mark on transparent background (white converted to alpha, colours unchanged) | Made by `scripts/prepare_logos.py` |
| `public/brand/*-original.jpg` | Untouched copies of the originals | |

The logos have not been redrawn, recoloured or vectorised. At 150 px they are fine for the header (up to about 64 px tall) but **too small** for the hero, the footer or print.

## Palette

Extracted with `scripts/extract_palette.py` (k-means on the logo pixels, near-white background excluded). Every colour below comes from the logos. Run it again once the high-res logos and screenshots arrive.

| Token | HEX | Taken from | Role | Contrast |
|---|---|---|---|---|
| `--sora-ink` | `#281B29` | Gift House outlines and mushroom face | Body text, headings | 15.4:1 on bg ✅ |
| `--sora-plum` | `#8B5B9F` | Gift House "SORA" wordmark | Primary: buttons, links, eyebrow labels | 4.8:1 on bg ✅ AA (white on plum 5.1:1 ✅) |
| `--sora-lilac` | `#B48BCB` | Mushroom cap | Gift House accent: stickers, doodles, hover fills | 2.6:1, **decoration only, never text** |
| `--sora-periwinkle` | `#A492D2` | Loom "SORA" wordmark | Loom accent: stitches, Loom toggle state | 2.6:1, **decoration only** |
| `--sora-mist` | `#A49BBA` | Loom wordmark shading | Muted: borders, dividers, inactive icons | 2.5:1, **decoration only** |
| `--sora-blush` | `#DBC7E0` | Gift House badge, inner ring | Secondary surface: cards, chips | |
| `--sora-tint` | `#EFDFF3` | Gift House badge fill | Section bands, placeholder cards | |
| `--sora-bg` | `#FBF6FB` | Gift House badge highlight | Page background | |
| `--sora-black` | `#070708` | Loom hanger and "we wrap love" | Loom label personality: fine lines, footer wordmark | 19:1 ✅ |

**Allowed derivative:** `--sora-plum-deep: #6E4A80`, a darker shade of plum for hover and pressed states (7.1:1 on white). Other tints or shades of the colours above are allowed for hover states and gradients. No new hues.

**Label personalities (same palette):**
- **Loom:** calmer and fabric-like. Periwinkle, mist and black, fine stitch lines, more white space.
- **Gift House:** brighter and more festive. Lilac, plum and blush, ribbons, bows, sparkles.

## Typography

- **Display:** *Cormorant Garamond* (500/600, with italics). A tall, refined serif that echoes the "SORA" wordmark serif in both logos.
- **Body:** *Nunito Sans*. Rounded and friendly, readable at small sizes on phones.
- **Accent:** *Cormorant Garamond italic* for small notes (echoes Loom's "we wrap love" script). Never for prices or buttons.
- **Sinhala (later):** *Noto Sans Sinhala*, already chosen for the i18n pass.
- Fluid sizes with `clamp()`. Eyebrow labels in Nunito Sans, 12–13 px, uppercase, `letter-spacing: .18em`, in plum.

## Tone of voice

Warm, sisterly and short. The social accounts are Sinhala-first with English mixed in and plenty of 💜 🍄 🪻, so the site should use:
- Short lowercase taglines ("soft, handmade, made to be gifted").
- Friendly calls to action ("Order on WhatsApp", "Make a gift box").
- No hype words, no invented claims, no fake reviews or follower counts.
- All prices in **Rs.** (LKR). Every string goes through the i18n file so Sinhala can be added later.

## Logo usage rules

1. Use only the files in `public/brand/`. Never redraw, recolour, stretch, crop into the artwork, or add effects (shadows, outlines, gradients).
2. Keep clear space around each logo of at least 1/4 of its width.
3. **Gift House badge:** works on any palette background. Minimum 40 px.
4. **Loom mark:** black ink, so place it only on `--sora-bg`, `--sora-tint`, `--sora-blush` or white. On plum or ink, put it inside a light round chip. Minimum 56 px wide (the script line gets unreadable below that).
5. Don't upscale the current 150 px files beyond 1×. Large uses (hero, footer) use the typeset "SORA" wordmark in Cormorant Garamond until high-res logos arrive.

## Missing (needed from the owner)

- [ ] **High-res logos** (SVG, AI, PDF, or PNG at least 1000 px) for both labels.
- [ ] **Real product photos** (`assets-raw/products/`). The old site's images were AI renders or blank placeholders, so none of them can be used. Until real photos arrive, every product slot shows a "photo coming soon" card.
- [ ] **products.csv**: name, label, category, price (LKR), description, sizes, colours.
- [ ] **Social screenshots** (`assets-raw/screenshots/`) for the social wall, plus a re-check of the palette.
- [ ] **Real customer feedback** screenshots for testimonials (the Feedback highlights).
- [ ] Delivery fee and free-delivery threshold, delivery times, payment methods, return policy.
- [ ] Facebook page URLs for both labels.
- [ ] Which WhatsApp number takes website orders (on record: Gift 070 600 8576 / 070 408 0791, Loom 074 189 6530).
