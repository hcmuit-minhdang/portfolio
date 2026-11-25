"use client";

import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { processSteps, type ProcessStepId } from "@/lib/skills";

const STICKY_TOP_PX = 88; // khớp với lg:top-22 (5.5rem), ngay dưới header

export function ProcessShowcase() {
  const { locale } = useLanguage();
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeRef = useRef(0);

  const paintBars = (progress: number) => {
    for (let i = 0; i < processSteps.length; i += 1) {
      const bar = barRefs.current[i];
      if (!bar) continue;
      const fill = Math.max(0, Math.min(1, progress - i));
      bar.style.transform = `scaleX(${fill})`;
    }
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      paintBars(activeRef.current + 1);
      return;
    }

    let frame = 0;

    const syncFromScroll = () => {
      frame = 0;
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;

      const travel = track.offsetHeight - sticky.offsetHeight;
      if (travel <= 40) {
        // Màn hình nhỏ (không dùng sticky track): hiển thị đầy thanh của tab đang chọn.
        paintBars(activeRef.current + 1);
        return;
      }

      const scrolled = STICKY_TOP_PX - track.getBoundingClientRect().top;
      const ratio = Math.max(0, Math.min(1, scrolled / travel));
      const total = processSteps.length;
      const progress = ratio * total;

      paintBars(progress);

      const nextActive = Math.min(total - 1, Math.floor(progress));
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncFromScroll);
    };

    syncFromScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const selectStep = (index: number) => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!reducedMotion && track && sticky) {
      const travel = track.offsetHeight - sticky.offsetHeight;
      if (travel > 40) {
        const trackTop = track.getBoundingClientRect().top + window.scrollY;
        const targetY =
          trackTop -
          STICKY_TOP_PX +
          (index / processSteps.length) * travel +
          4;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        return;
      }
    }

    activeRef.current = index;
    setActive(index);
    paintBars(index + 1);
  };

  const step = processSteps[active];

  return (
    <div ref={trackRef} className="mt-6 lg:h-[280svh]">
      <div
        ref={stickyRef}
        className="flex rounded-3xl border border-line bg-surface p-6 md:p-10 lg:sticky lg:top-22 lg:min-h-[calc(100svh-7rem)] lg:p-14"
      >
        <div className="grid w-full items-stretch gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div className="flex flex-col justify-between py-2">
            <m.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="tabpanel"
              id={`process-panel-${step.id}`}
              aria-labelledby={`process-tab-${step.id}`}
              className="my-auto"
            >
              <h4 className="font-display text-3xl leading-[1.1] font-bold sm:text-5xl xl:text-6xl">
                {step.title[locale]}
              </h4>

              <p className="mt-5 max-w-[44ch] text-base text-pretty text-ink-2 md:text-xl">
                {step.description[locale]}
              </p>

              <ul className="mt-7 flex flex-wrap gap-3">
                {step.tags[locale].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-ink-2"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </m.div>

            <div
              role="tablist"
              aria-label={
                locale === "en" ? "Workflow steps" : "Các bước làm việc"
              }
              className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6"
            >
              {processSteps.map((item, index) => {
                const isSelected = index === active;
                return (
                  <button
                    key={item.id}
                    id={`process-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`process-panel-${item.id}`}
                    onClick={() => selectStep(index)}
                    className="group cursor-pointer text-left"
                  >
                    <span
                      className={`block text-sm font-medium transition-colors sm:text-base ${
                        isSelected
                          ? "text-ink"
                          : "text-ink-2 opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      {item.tab[locale]}
                    </span>
                    <span className="mt-2.5 block h-0.5 w-full overflow-hidden rounded-full bg-line">
                      <span
                        ref={(el) => {
                          barRefs.current[index] = el;
                        }}
                        className="block h-full origin-left rounded-full bg-accent"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-2xl border border-line bg-bg p-6 sm:min-h-96 md:p-10 lg:h-full">
            <ProcessVisual stepId={step.id} locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessVisual({
  stepId,
  locale,
}: {
  stepId: ProcessStepId;
  locale: "en" | "vi";
}) {
  if (stepId === "understand") return <UnderstandVisual locale={locale} />;
  if (stepId === "structure") return <StructureVisual locale={locale} />;
  return <VerifyVisual locale={locale} />;
}

const problemNodes = [
  { label: { en: "users", vi: "người dùng" }, x: "18%", y: "24%", delay: "0s" },
  { label: { en: "data", vi: "dữ liệu" }, x: "78%", y: "20%", delay: "0.7s" },
  {
    label: { en: "context", vi: "ngữ cảnh" },
    x: "10%",
    y: "54%",
    delay: "1.4s",
  },
  {
    label: { en: "constraints", vi: "ràng buộc" },
    x: "80%",
    y: "56%",
    delay: "2.1s",
  },
  {
    label: { en: "edge cases", vi: "ngoại lệ" },
    x: "20%",
    y: "80%",
    delay: "2.8s",
  },
  { label: { en: "goal", vi: "mục tiêu" }, x: "70%", y: "82%", delay: "3.5s" },
];

function UnderstandVisual({ locale }: { locale: "en" | "vi" }) {
  return (
    <m.div
      key="understand"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
      className="relative flex size-full min-h-64 items-center justify-center sm:min-h-76"
    >
      {/* Các vòng đồng tâm */}
      <div className="pointer-events-none absolute size-36 rounded-full border border-line sm:size-44 lg:size-48" />
      <div className="pointer-events-none absolute size-56 rounded-full border border-line/80 sm:size-72 lg:size-80" />
      <div className="pointer-events-none absolute size-76 rounded-full border border-line/60 sm:size-96 lg:size-[28rem]" />

      {/* Tia quét radar màu lavender */}
      <div className="process-radar pointer-events-none absolute size-76 rounded-full sm:size-96 lg:size-[28rem]" />

      {/* Tâm bài toán */}
      <div className="relative z-10 grid size-18 place-items-center rounded-full border border-accent/50 bg-surface font-display text-5xl font-bold text-highlight shadow-sm lg:size-22 lg:text-6xl">
        ?
      </div>

      {/* Các nút thành phần bài toán */}
      {problemNodes.map((node) => (
        <div
          key={node.label.en}
          style={{
            left: node.x,
            top: node.y,
            animationDelay: node.delay,
          }}
          className="process-node absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1 text-xs font-medium text-ink-2"
        >
          <span className="size-2 rounded-full bg-accent" />
          <span>{node.label[locale]}</span>
        </div>
      ))}
    </m.div>
  );
}

const codeLines = [
  "type Problem = {",
  "  input: string;",
  "  constraints: string[];",
  "};",
  "",
  "function solve(p: Problem) {",
  "  const steps = decompose(p);",
  "  return buildClean(steps);",
  "}",
];

const fullSnippet = codeLines.join("\n");

function StructureVisual({ locale }: { locale: "en" | "vi" }) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.requestAnimationFrame(() =>
        setCharCount(fullSnippet.length),
      );
      return () => window.cancelAnimationFrame(id);
    }

    let current = 0;
    const timer = window.setInterval(() => {
      current += 2;
      if (current >= fullSnippet.length) {
        setCharCount(fullSnippet.length);
        window.clearInterval(timer);
      } else {
        setCharCount(current);
      }
    }, 34);

    return () => window.clearInterval(timer);
  }, []);

  const visibleLines = fullSnippet.slice(0, charCount).split("\n");

  return (
    <m.div
      key="structure"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
      className="flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 text-xs text-ink-2">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-accent" />
          <span className="ml-2 rounded-md border border-line bg-bg px-2 py-0.5 font-medium text-ink">
            solve.ts
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="status-dot scale-75" data-status="done" />
          {locale === "en" ? "clean" : "gọn gàng"}
        </span>
      </div>

      <div className="min-h-64 p-5 font-mono text-xs leading-6 text-ink sm:min-h-72 sm:p-6 sm:text-sm sm:leading-7 lg:min-h-88 lg:p-8 lg:text-base lg:leading-8">
        {codeLines.map((_, row) => {
          const text = visibleLines[row];
          const isCurrent = row === visibleLines.length - 1;
          return (
            <div
              key={row}
              className={`flex gap-4 rounded px-1.5 ${
                isCurrent ? "bg-accent/15" : ""
              }`}
            >
              <span className="w-4 shrink-0 text-right text-ink-2/60 select-none">
                {row + 1}
              </span>
              <span className="whitespace-pre">
                {text ?? ""}
                {isCurrent && (
                  <span className="process-caret ml-0.5 inline-block h-4 w-1.5 align-middle bg-accent" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </m.div>
  );
}

function VerifyVisual({ locale }: { locale: "en" | "vi" }) {
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setCycle((prev) => (prev % 6) + 1);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  const nodes =
    locale === "en"
      ? { top: "Build", right: "Test", left: "Refine", center: "Iteration" }
      : { top: "Xây", right: "Kiểm thử", left: "Cải tiến", center: "Vòng lặp" };

  return (
    <m.div
      key="verify"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
      className="relative flex size-full min-h-64 items-center justify-center sm:min-h-76"
    >
      {/* Vòng quỹ đạo nét đứt */}
      <div className="relative grid size-60 place-items-center rounded-full border border-dashed border-highlight/60 sm:size-72 lg:size-84">
        {/* Điểm sáng chạy quanh quỹ đạo */}
        <div className="process-orbit pointer-events-none absolute inset-0">
          <span className="absolute -top-2 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_16px_var(--accent)]" />
        </div>

        {/* 3 đỉnh vòng lặp */}
        <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
          <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink sm:text-sm">
            {nodes.top}
          </span>
        </div>

        <div className="absolute right-0 bottom-7 translate-x-1/3">
          <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink sm:text-sm">
            {nodes.right}
          </span>
        </div>

        <div className="absolute bottom-7 left-0 -translate-x-1/3">
          <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink sm:text-sm">
            {nodes.left}
          </span>
        </div>

        {/* Vòng tròn trung tâm */}
        <div className="grid size-32 place-items-center rounded-full border border-line bg-surface text-center sm:size-36 lg:size-44">
          <div>
            <p className="text-xs font-medium text-ink-2 sm:text-sm">
              {nodes.center}
            </p>
            <p className="mt-1 font-display text-4xl leading-none font-bold text-highlight sm:text-5xl">
              #{String(cycle).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </m.div>
  );
}
