"""Make transparent copies of the logos. Originals stay untouched in assets-raw/logos.

Gift House: flood-fill the white outside the round badge (badge interior is kept as is).
Loom: white-to-alpha (un-multiply white) so ink and lilac keep their exact colour on any background.
"""
from collections import deque
from pathlib import Path
import numpy as np
from PIL import Image

SRC = Path("assets-raw/logos")
OUT = Path("public/brand")
OUT.mkdir(parents=True, exist_ok=True)


def flood_outside(path, tol=18):
    im = np.asarray(Image.open(path).convert("RGB"), dtype=np.int16)
    h, w, _ = im.shape
    bg = (255 - im).max(2) <= tol
    seen = np.zeros((h, w), bool)
    q = deque((y, x) for y in (0, h - 1) for x in range(w)) + deque((y, x) for x in (0, w - 1) for y in range(h))
    while q:
        y, x = q.popleft()
        if 0 <= y < h and 0 <= x < w and not seen[y, x] and bg[y, x]:
            seen[y, x] = True
            q.extend(((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)))
    alpha = np.where(seen, 0, 255).astype(np.uint8)
    # soften the one-pixel edge so the badge isn't jagged
    a = Image.fromarray(alpha)
    from PIL import ImageFilter
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    out = Image.fromarray(im.astype(np.uint8)).convert("RGBA")
    out.putalpha(a)
    return out


def white_to_alpha(path):
    im = np.asarray(Image.open(path).convert("RGB"), dtype=float) / 255
    a = (1 - im).max(2)  # minimal alpha that reproduces the pixel over white
    a = np.clip((a - 0.04) / 0.96, 0, 1)  # drop JPEG noise in the background
    safe = np.maximum(a, 1e-6)[..., None]
    rgb = np.clip((im - (1 - safe)) / safe, 0, 1)
    rgba = np.dstack([rgb, a]) * 255
    return Image.fromarray(rgba.round().astype(np.uint8), "RGBA")


flood_outside(SRC / "sora_gift_house_logo.jpg").save(OUT / "sora-gift-house.png")
white_to_alpha(SRC / "sora_loom_logo.jpg").save(OUT / "sora-loom.png")
for f in SRC.glob("*.jpg"):
    Image.open(f).save(OUT / f.name.replace("_", "-").replace("-logo", "-original"))
print(sorted(p.name for p in OUT.iterdir()))
