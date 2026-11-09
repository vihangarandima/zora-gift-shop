"""Extract the dominant colours from the brand logos with k-means (numpy only).

Usage: python scripts/extract_palette.py assets-raw/logos/*.jpg
"""
import sys
import numpy as np
from PIL import Image


def kmeans(px, k, iters=40, seed=1):
    rng = np.random.default_rng(seed)
    centers = px[rng.choice(len(px), k, replace=False)]
    for _ in range(iters):
        labels = ((px[:, None] - centers[None]) ** 2).sum(-1).argmin(1)
        new = np.array([px[labels == i].mean(0) if (labels == i).any() else centers[i] for i in range(k)])
        if np.allclose(new, centers):
            break
        centers = new
    return centers, np.bincount(labels, minlength=k)


def hexc(c):
    return "#%02X%02X%02X" % tuple(int(round(v)) for v in c)


all_px = []
for path in sys.argv[1:]:
    px = np.asarray(Image.open(path).convert("RGB"), dtype=float).reshape(-1, 3)
    all_px.append(px)
    # brand colours: ignore near-white background pixels
    ink = px[px.min(1) < 235]
    centers, counts = kmeans(ink, 6)
    order = counts.argsort()[::-1]
    print(path)
    for i in order:
        print(f"  {hexc(centers[i])}  {counts[i] / counts.sum():5.1%}")

px = np.vstack(all_px)
centers, counts = kmeans(px, 8)
print("combined (incl. background)")
for i in counts.argsort()[::-1]:
    print(f"  {hexc(centers[i])}  {counts[i] / counts.sum():5.1%}")
