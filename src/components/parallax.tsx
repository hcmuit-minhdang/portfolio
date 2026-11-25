"use client";

import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  // Quãng dịch chuyển (px) khi phần tử đi hết màn hình.
  x?: number;
  y?: number;
  // "leave": chỉ dịch khi trôi lên khỏi màn hình. "through": dịch suốt lúc đi qua.
  mode?: "leave" | "through";
};

// Dịch nội dung theo vị trí cuộn, tự đảo chiều khi cuộn ngược lại.
export function Parallax({
  children,
  className,
  x = 0,
  y = 0,
  mode = "through",
}: Props) {
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const leaving = mode === "leave";

  const { scrollYProgress } = useScroll(
    leaving ? undefined : { target: ref, offset: ["start end", "end start"] },
  );
  const { scrollY } = useScroll();

  const throughX = useTransform(scrollYProgress, [0, 1], [x, -x]);
  const throughY = useTransform(scrollYProgress, [0, 1], [y, -y]);
  const leaveX = useTransform(scrollY, [0, 800], [0, x]);
  const leaveY = useTransform(scrollY, [0, 800], [0, y]);

  // Chế độ "leave" nằm trong tiêu đề, nơi chỉ được dùng thẻ span.
  const Outer = leaving ? "span" : "div";
  const Inner = leaving ? m.span : m.div;

  return (
    <Outer ref={ref} className={`block ${className ?? ""}`}>
      <Inner
        className="block"
        style={
          reduced
            ? undefined
            : {
                x: leaving ? leaveX : throughX,
                y: leaving ? leaveY : throughY,
              }
        }
      >
        {children}
      </Inner>
    </Outer>
  );
}
