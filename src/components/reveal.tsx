"use client";

import * as m from "motion/react-m";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { useReplay } from "@/lib/use-replay";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "vertical" | "left";
};

type State = "shown" | "above" | "below";

// Hiện nội dung mỗi lần cuộn tới: cuộn xuống thì trồi lên, cuộn lên thì
// trượt xuống. Khung ngoài đứng yên để việc dò vị trí không bị lệch.
export function Reveal({
  children,
  className,
  delay = 0,
  from = "vertical",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("below");

  useReplay(ref, {
    onEnter: useCallback(() => setState("shown"), []),
    onLeave: setState,
  });

  const hidden = (y: number) => ({
    opacity: 0,
    x: from === "left" ? -56 : 0,
    y: from === "left" ? 0 : y,
    transition: { duration: 0 },
  });

  return (
    <div ref={ref} className={className}>
      <m.div
        data-reveal=""
        initial="below"
        animate={state}
        variants={{
          below: hidden(40),
          above: hidden(-40),
          shown: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </m.div>
    </div>
  );
}
