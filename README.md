# Sora · Loom & Gift House

Website for **Sora Loom** (clothing) and **Sora Gift House** (gifts), two sister shops from Polonnaruwa, Sri Lanka. Orders are confirmed and paid on WhatsApp, so the site never handles card details.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, Lenis and Zustand.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Production build (also type-checks) |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript only |
| `npm run palette` | Re-extract the colour palette from `assets-raw/logos` (needs Python + Pillow + NumPy) |
| `npm run logos` | Re-make the transparent logo PNGs in `public/brand` |

`/styleguide` shows every colour, font and component in one place.

## Where things live

| Path | What |
|---|---|
| `site.config.ts` | **Start here.** WhatsApp numbers, social links, delivery fee, free-delivery threshold, size chart, gift box options, seasonal mode (`season: "christmas"` etc. adds festive doodles) |
| `data/products.ts` | The product list |
| `data/categories.ts` | Shop categories for each label |
| `lib/i18n/en.ts` | Every piece of text on the site (add `si.ts` with the same keys for Sinhala) |
| `app/globals.css` | Colour tokens, type scale, animations |
| `app/` | One folder per page (`shop`, `product/[slug]`, `gift-box`, `checkout`, …) |
| `components/` | `home/`, `shop/`, `product/`, `cart/`, `giftbox/`, `layout/`, `ui/`, `doodles/` |
| `lib/images.ts` + `public/images/` | The AI-generated mood images (hero, category tiles, banners). Replace a file with a real photo of the same name to swap it |
| `lib/order.ts` | Builds the WhatsApp order message |
| `lib/payments.ts` | Placeholder for adding PayHere or Stripe later |
| `BRAND.md` | Palette, fonts, tone of voice and logo rules |
| `_legacy/` | The previous static site, kept for reference. Safe to delete. |

## Add products and photos

1. Put real photos in `public/products/`, named after the product, e.g. `lilac-sundress-1.jpg`, `lilac-sundress-2.jpg`. Square or 4:5 portrait, at least 1200 px wide. **Only real product photos for products.** The AI images in `public/images/` are decoration only; never use them as a product's photo, because customers would expect to receive exactly what they see.
2. Add the product to `data/products.ts`:

```ts
{
  id: "loom-001",
  slug: "lilac-sundress",          // becomes /product/lilac-sundress
  world: "loom",                   // "loom" or "gift"
  category: "dresses",             // an id from data/categories.ts
  name: "Lilac sundress",
  priceLKR: 4500,
  compareAtLKR: 5500,              // optional: shows the old price and a -18% sticker
  description: "Soft cotton, tie straps, midi length.",
  images: ["/products/lilac-sundress-1.jpg", "/products/lilac-sundress-2.jpg"],
  sizes: ["S", "M", "L"],          // optional: customers must pick one
  colours: ["Lilac"],              // optional: used by the shop filters
  occasions: ["Birthday"],         // optional: used by the shop filters
  isNew: true,                     // optional: shows in "New in" on the home page
},
```

The second photo shows when someone hovers over the card. Products with no photos show a "photo coming soon" card. The home page "New in" and "Bestsellers" sections, the gift finder suggestions and the sitemap all update automatically.

## Change colours or fonts

Colours are CSS variables at the top of `app/globals.css` (`--sora-plum`, `--sora-lilac`, …). They were extracted from the logos, so change them only if the brand changes, and check that text still meets WCAG AA contrast (at least 4.5:1 for small text). Fonts (Cormorant Garamond for headings and notes, Nunito Sans for text) are set in `app/layout.tsx` with `next/font`.

## Things still waiting on the owner

These show a friendly "we'll confirm on WhatsApp" message until they're filled in. Search the code for `TODO` to find them.

- [ ] Real domain → `siteConfig.url`
- [ ] Which WhatsApp number takes website orders
- [ ] Delivery fee and free-delivery threshold → `siteConfig.delivery`
- [ ] Loom size chart → `siteConfig.sizeGuide`
- [ ] Gift box prices → `siteConfig.giftBox.boxes`
- [ ] Facebook page URLs → `siteConfig.socials`
- [ ] Real product photos, names and prices → `data/products.ts`
- [ ] High-res logos (the current ones are 150 px)
- [ ] The brand story in the owner's own words → `home.storyBody` in `lib/i18n/en.ts`
- [ ] Returns policy, delivery times, payment methods → `app/policies/page.tsx`, `app/faq/page.tsx`
- [ ] Real customer feedback screenshots (a testimonials section is added once these exist)

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repository. Vercel detects Next.js, so the defaults are fine.
3. Click **Deploy**.
4. Add your domain under **Settings → Domains**, then set `siteConfig.url` to it and push again, so link previews and the sitemap use the right address.

Every push to the main branch redeploys the site automatically.

## Quality checks (last run 2026-11-09, before the switch to AI mood images and Cormorant Garamond; re-run Lighthouse after deploying)

Lighthouse, mobile, production build:

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 87 | 100 | 100 | 100 |
| Shop | 89 | 100 | 100 | 100 |
| Gift box | 90 | 100 | 100 | 100 |
| Contact | 89 | 100 | 100 | 100 |

Lighthouse always measures a first visit, which includes the ~1.1 s logo intro. Repeat visitors skip it. Also checked: no broken internal links (the styleguide's sample cards link to demo products that don't exist, on purpose), no tap target under 24 px (buttons are 44 px or more), no sideways scrolling at 390 / 768 / 1440 px, and `prefers-reduced-motion` turns off the intro, smooth scrolling and entrance animations.
