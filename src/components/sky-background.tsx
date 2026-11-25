"use client";

import { useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/components/language-provider";

export type SkyPhase =
  | "dawn"
  | "morning"
  | "midday"
  | "sunset"
  | "dusk"
  | "night";

const PREVIEW_HOURS: Record<SkyPhase, number> = {
  dawn: 6,
  morning: 9,
  midday: 13,
  sunset: 17.5,
  dusk: 19.25,
  night: 22.5,
};

const PHASE_ORDER: SkyPhase[] = [
  "dawn",
  "morning",
  "midday",
  "sunset",
  "dusk",
  "night",
];

// 90 ngôi sao phân bố đều tự nhiên toàn màn hình (công thức cố định, không dùng Math.random để tránh lệch hydration).
const STARS = Array.from({ length: 90 }, (_, i) => {
  const x = ((i * 37.61 + 11.3) % 96) + 2;
  const y = ((i * 29.47 + 5.1) % 90) + 3;
  const tier = i % 9 === 0 ? "bright" : i % 3 === 0 ? "mid" : "dim";
  const size = tier === "bright" ? 3 : tier === "mid" ? 2 : 1.5;
  const delay = `${((i * 0.43) % 4.5).toFixed(2)}s`;
  const duration = `${(2.8 + ((i * 0.37) % 3.2)).toFixed(2)}s`;
  return { x, y, size, tier, delay, duration };
});

const vnParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Ho_Chi_Minh",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function getVietnamMinuteOfDay(): number {
  const parts = vnParts.formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 20);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

function subscribeMinute(onTick: () => void) {
  const id = window.setInterval(onTick, 30_000);
  return () => window.clearInterval(id);
}

function phaseFromHour(hour: number): SkyPhase {
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 11) return "morning";
  if (hour >= 11 && hour < 15.5) return "midday";
  if (hour >= 15.5 && hour < 18.5) return "sunset";
  if (hour >= 18.5 && hour < 20) return "dusk";
  return "night";
}

function formatHour(hourDecimal: number): string {
  const totalMinutes = Math.round(hourDecimal * 60) % (24 * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function SkyBackground() {
  const { t } = useLanguage();
  const [previewPhase, setPreviewPhase] = useState<SkyPhase | null>(null);

  // Server trả null để không gọi new Date() khi prerender (cacheComponents).
  const liveMinute = useSyncExternalStore<number | null>(
    subscribeMinute,
    getVietnamMinuteOfDay,
    () => null,
  );

  const hour =
    previewPhase !== null
      ? PREVIEW_HOURS[previewPhase]
      : liveMinute !== null
        ? liveMinute / 60
        : 21;

  const phase = previewPhase ?? phaseFromHour(hour);
  const isDay = hour >= 5.5 && hour < 18.5;

  // Quỹ đạo Mặt Trời (5:30 -> 18:30) hoặc Mặt Trăng (18:30 -> 5:30).
  const arcT = isDay
    ? (hour - 5.5) / 13
    : ((hour >= 18.5 ? hour - 18.5 : hour + 5.5) / 11);
  const clampedT = Math.max(0, Math.min(1, arcT));
  const orbX = 14 + clampedT * 72; // 14% -> 86%
  const orbY = 66 - Math.sin(clampedT * Math.PI) * 50; // thấp ở chân trời, cao ở giữa ngày/đêm

  const showStars = phase === "night" || phase === "dusk" || phase === "dawn";
  const starOpacity =
    phase === "night" ? 0.95 : phase === "dusk" ? 0.55 : 0.25;
  const showClouds =
    phase === "morning" ||
    phase === "midday" ||
    phase === "dawn" ||
    phase === "sunset";

  const cyclePreview = () => {
    if (previewPhase === null) {
      const nextIndex = (PHASE_ORDER.indexOf(phase) + 1) % PHASE_ORDER.length;
      setPreviewPhase(PHASE_ORDER[nextIndex]);
      return;
    }
    const currentIndex = PHASE_ORDER.indexOf(previewPhase);
    if (currentIndex === PHASE_ORDER.length - 1) {
      setPreviewPhase(null);
    } else {
      setPreviewPhase(PHASE_ORDER[currentIndex + 1]);
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        data-sky={phase}
        className="sky-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Lớp bầu trời chuyển màu theo thời gian thực */}
        <div className="sky-gradient absolute inset-0" />

        {/* Sao lấp lánh (đêm / chạng vạng / bình minh) */}
        {showStars && (
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: starOpacity }}
          >
            {STARS.map((star, index) => (
              <span
                key={index}
                className={`sky-star absolute rounded-full ${
                  star.tier === "bright" ? "sky-star-bright" : ""
                }`}
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              />
            ))}
          </div>
        )}

        {/* Mặt trời hoặc Mặt trăng đi theo quỹ đạo trong ngày */}
        <div
          className="sky-orb absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
          style={{ left: `${orbX}%`, top: `${orbY}%` }}
        >
          {isDay ? (
            <div className="sky-sun relative size-20 rounded-full sm:size-24" />
          ) : (
            <div className="sky-moon relative size-14 rounded-full sm:size-16" />
          )}
        </div>

        {/* Mây trôi nhẹ vào ban ngày / bình minh / hoàng hôn */}
        {showClouds && (
          <div className="absolute inset-0">
            <div className="sky-cloud sky-cloud-1" />
            <div className="sky-cloud sky-cloud-2" />
            <div className="sky-cloud sky-cloud-3" />
          </div>
        )}
      </div>

      {/* Nhãn thời gian bầu trời cố định góc phải dưới (bấm để xem thử 6 khung giờ) */}
      <button
        type="button"
        onClick={cyclePreview}
        title={t.sky.toggleHint}
        className="fixed right-5 bottom-5 z-30 inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-ink-2 backdrop-blur-md transition-colors hover:border-accent hover:text-ink"
      >
        <span
          aria-hidden="true"
          className="sky-badge-dot size-2 rounded-full"
          data-sky={phase}
        />
        <span>{t.sky.phases[phase]}</span>
        <span aria-hidden="true" className="opacity-50">
          ·
        </span>
        <span className="tabular-nums">
          {liveMinute === null && previewPhase === null
            ? "--:--"
            : formatHour(hour)}
        </span>
        {previewPhase !== null && (
          <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-ink">
            {t.sky.preview}
          </span>
        )}
      </button>
    </>
  );
}
