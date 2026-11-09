import { siteConfig, type Season } from "@/site.config";

// Themed accents for festive seasons. Switch with `season` in site.config.ts.
const themes: Record<Exclude<Season, "none">, string[]> = {
  valentine: ["💝", "💌", "🌹", "💜"],
  avurudu: ["🪔", "🌼", "🪁", "🍌"],
  christmas: ["🎄", "❄️", "⭐", "🎁"],
};

// Spots along the page edges, kept clear of the header and the WhatsApp button.
const spots = [
  { top: "18%", left: "1.5%" },
  { top: "42%", right: "1.5%" },
  { top: "66%", left: "2%" },
  { top: "30%", right: "3%" },
];

export function SeasonalDoodles() {
  const { season } = siteConfig;
  if (season === "none") return null;
  const icons = themes[season];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      {spots.map((pos, i) => (
        <span
          key={i}
          className="absolute animate-[twinkle_4s_ease-in-out_infinite] text-3xl opacity-80"
          style={{ ...pos, animationDelay: `${i * 0.9}s` }}
        >
          {icons[i % icons.length]}
        </span>
      ))}
    </div>
  );
}
