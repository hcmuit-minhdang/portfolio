"use client";

import { useEffect } from "react";

// Cập nhật phần #hash trên thanh địa chỉ theo vùng đang xem (dùng replaceState
// để không làm rác lịch sử nút Back của trình duyệt).
export function SectionHash() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main#noi-dung > section[id]"),
    );
    if (sections.length === 0) return;

    let frame = 0;

    const sync = () => {
      frame = 0;

      const triggerY = Math.max(96, window.innerHeight * 0.35);
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;

      let activeId = "";
      if (atBottom) {
        activeId = sections[sections.length - 1].id;
      } else {
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= triggerY) {
            activeId = section.id;
          }
        }
      }

      const base = window.location.pathname + window.location.search;
      const nextUrl = activeId ? `${base}#${activeId}` : base;
      const currentUrl = base + window.location.hash;

      if (nextUrl !== currentUrl) {
        window.history.replaceState(null, "", nextUrl);
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("hashchange", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  return null;
}
