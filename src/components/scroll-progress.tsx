"use client";

import { useScroll } from "motion/react";
import * as m from "motion/react-m";

// Vạch tiến độ cuộn ở mép dưới header.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
    />
  );
}
