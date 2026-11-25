"use client";

import { useEffect, type RefObject } from "react";

const HEADER_HEIGHT = 72;
const SHOW_RATIO = 0.25;

type Handlers = {
  onEnter: () => void;
  // "above": phần tử đã trôi lên trên màn hình, "below": còn ở bên dưới.
  onLeave: (side: "above" | "below") => void;
};

// Báo khi phần tử hiện đủ nhiều, và khi nó ra khỏi màn hình hoàn toàn.
// Hai ngưỡng khác nhau để hiệu ứng không giật khi dừng cuộn ở mép.
export function useReplay(
  ref: RefObject<HTMLElement | null>,
  { onEnter, onLeave }: Handlers,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          onLeave(
            entry.boundingClientRect.top < HEADER_HEIGHT ? "above" : "below",
          );
        } else if (entry.intersectionRatio >= SHOW_RATIO) {
          onEnter();
        }
      },
      {
        threshold: [0, SHOW_RATIO],
        rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, onEnter, onLeave]);
}
