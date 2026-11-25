"use client";

import type { PointerEvent, ReactNode } from "react";

const MAX_DEGREES = 9;

// Nghiêng nội dung theo con trỏ chuột, kèm vệt sáng. Chỉ chạy với chuột;
// CSS trong globals.css tắt hiệu ứng khi người dùng giảm chuyển động.
export function Tilt({ children }: { children: ReactNode }) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const el = event.currentTarget;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    el.style.setProperty("--tilt-x", `${(0.5 - y) * 2 * MAX_DEGREES}deg`);
    el.style.setProperty("--tilt-y", `${(x - 0.5) * 2 * MAX_DEGREES}deg`);
    el.style.setProperty("--glare-x", `${x * 100}%`);
    el.style.setProperty("--glare-y", `${y * 100}%`);
    el.style.setProperty("--glare", "1");
  }

  function onPointerLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.removeAttribute("style");
  }

  return (
    <div
      className="tilt w-full max-w-[23rem]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="tilt-body">
        {children}
        <div aria-hidden="true" className="tilt-glare" />
      </div>
    </div>
  );
}
