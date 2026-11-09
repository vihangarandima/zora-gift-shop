# How to update the Sora site (no coding needed)

Everything you sell lives in one file: `products.json`. Open it in Notepad.

## Add an item
Copy one block between `{` and `}` (with its comma) and change the words:

```
{ "id": "l7", "shop": "loom", "category": "dresses",
  "name_en": "Lilac sundress", "name_si": "ලිලැක් සන්ඩ්‍රෙස්",
  "price_lkr": 3500, "image": "img/products/l7.webp" }
```

- `id`: any short name, different for every item.
- `shop`: `"loom"` or `"gift"`.
- `category`: one of the ids in the `categories` list at the top (`dresses`, `sleepwear`, `shawls`, `labubu`, `stitch`, `celebrate`, `xmas`, `dropprice`).
- `price_lkr`: a number with no commas (`3500`). Write `null` to hide the price; the site then says "Price on WhatsApp".
- `image`: the photo path. Put the photo in `img/products` first. `null` shows a placeholder. Delete `"placeholder": true` from real items.
- Every item needs a comma after `}` except the last one.

## Remove or change an item
Delete its block, or change the words or price.

## New category
Add a line in `categories` for the right shop, e.g. `{ "id": "bags", "en": "Bags", "si": "බෑග්" }`, then use `"category": "bags"` in items.

## Photos
Resize to about 800 px wide and save as `.webp` (squoosh.app does this free in the browser). Keep each under 100 KB so the site stays fast on mobile data.

## Feedback and dispatch photos
In `index.html` look for the `TODO` comments in the Feedback and Parcels sections. Replace each grey placeholder with your real image (hide customer names first).

## Still to fill in
- Facebook page links (Find us section).
- Delivery fee, delivery time, payment methods, return policy (write only what is true).
- Original logo files, real photos, `og.png` (1200x630, the picture shown when the link is shared).
- Fonts: see the top of `css/style.css` (put the .woff2 files in the `fonts` folder).
- Sinhala wording: please have a Sinhala speaker read all the Sinhala text once.

## Putting it online
Upload the whole folder to Cloudflare Pages (static, no build step). Test locally with `python -m http.server 8000` in this folder, then open http://localhost:8000.
