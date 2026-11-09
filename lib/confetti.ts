// Tiny dependency-free confetti burst from a point, in brand colours. No-op with reduced motion.
const colours = ["#8b5b9f", "#b48bcb", "#a492d2", "#dbc7e0", "#efdff3"];

export function confetti(x: number, y: number, count = 28) {
  if (typeof window === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    const size = 6 + Math.random() * 6;
    Object.assign(el.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size * (Math.random() > 0.5 ? 1 : 0.45)}px`,
      background: colours[i % colours.length],
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      pointerEvents: "none",
      zIndex: "100",
    });
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;
    el.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
        { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + 80}px) rotate(${Math.random() * 540}deg)`, opacity: 0 },
      ],
      { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" },
    ).onfinish = () => el.remove();
  }
}
