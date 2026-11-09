"use client";

export function QtyStepper({ value, onChange, min = 0 }: { value: number; onChange: (n: number) => void; min?: number }) {
  const btn = "grid size-11 place-items-center rounded-full text-lg font-bold transition hover:bg-tint disabled:opacity-40";
  return (
    <div className="inline-flex items-center rounded-full ring-1 ring-blush">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">−</button>
      <span className="w-6 text-center text-sm font-bold" aria-live="polite">{value}</span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label="Increase quantity">+</button>
    </div>
  );
}
