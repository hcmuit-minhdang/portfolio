"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { useReplay } from "@/lib/use-replay";

type Props = {
  children: ReactNode;
  className?: string;
};

// Chạy lại hiệu ứng CSS bên trong mỗi lần phần tử trở lại màn hình.
// Lần đầu chạy ngay từ HTML, không cần đợi JavaScript.
export function Replay({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useReplay(ref, {
    onEnter: useCallback(() => ref.current?.removeAttribute("data-away"), []),
    onLeave: useCallback(() => {
      ref.current?.setAttribute("data-away", "");
      ref.current?.setAttribute("data-seen", "");
    }, []),
  });

  return (
    <div ref={ref} className={`replay ${className}`}>
      {children}
    </div>
  );
}
