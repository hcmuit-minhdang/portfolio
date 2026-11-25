"use client";

import { useEffect, useRef } from "react";

// Quầng sáng trôi chậm, lệch theo chuột. CSS giữ nó đứng yên khi giảm chuyển động.
export function HeroGlow() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    const area = el?.parentElement;
    if (!el || !area) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = area.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      el.style.setProperty("--x", `${x * 10}rem`);
      el.style.setProperty("--y", `${y * 8}rem`);
    };

    area.addEventListener("pointermove", onMove);
    return () => area.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={glow} aria-hidden="true" className="hero-glow">
      <div />
    </div>
  );
}
