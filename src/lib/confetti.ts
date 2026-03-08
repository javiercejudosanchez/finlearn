"use client";

export default function confetti() {
  if (typeof window === "undefined") return;
  // Simple CSS confetti — no extra dependency
  const colors = ["#22c55e", "#eab308", "#3b82f6", "#ef4444", "#a855f7"];
  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden";
  document.body.appendChild(container);

  for (let i = 0; i < 60; i++) {
    const el = document.createElement("div");
    const size = Math.random() * 8 + 4;
    el.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      background:${colors[i % colors.length]};
      left:${Math.random() * 100}%;
      top:-10px;
      border-radius:${Math.random() > 0.5 ? "50%" : "0"};
      animation:confetti-fall ${1.5 + Math.random()}s ease-out forwards;
      animation-delay:${Math.random() * 0.3}s;
    `;
    container.appendChild(el);
  }

  if (!document.getElementById("confetti-style")) {
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
      @keyframes confetti-fall {
        to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => container.remove(), 3000);
}
