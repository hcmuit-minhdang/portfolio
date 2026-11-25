"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// 90 ngôi sao phân bố đều tự nhiên toàn màn hình cho nền Tối (công thức cố định, không dùng Math.random để tránh lệch hydration).
const STARS = Array.from({ length: 90 }, (_, i) => {
  const x = ((i * 37.61 + 11.3) % 96) + 2;
  const y = ((i * 29.47 + 5.1) % 72) + 3;
  const tier = i % 9 === 0 ? "bright" : i % 3 === 0 ? "mid" : "dim";
  const size = tier === "bright" ? 3 : tier === "mid" ? 2 : 1.5;
  const delay = `${((i * 0.43) % 4.5).toFixed(2)}s`;
  const duration = `${(2.8 + ((i * 0.37) % 3.2)).toFixed(2)}s`;
  return { x, y, size, tier, delay, duration };
});

// Cánh hoa bay nhẹ trong khung cảnh thiên nhiên.
const PETALS = [
  { x: 10, delay: "0s", duration: "18s", size: 8, tone: "primary" },
  { x: 24, delay: "-4s", duration: "22s", size: 6, tone: "blush" },
  { x: 39, delay: "-9s", duration: "19s", size: 7, tone: "primary" },
  { x: 54, delay: "-2s", duration: "24s", size: 6, tone: "cream" },
  { x: 68, delay: "-11s", duration: "20s", size: 8, tone: "blush" },
  { x: 81, delay: "-6s", duration: "23s", size: 7, tone: "primary" },
  { x: 92, delay: "-14s", duration: "21s", size: 6, tone: "cream" },
  { x: 47, delay: "-16s", duration: "25s", size: 7, tone: "blush" },
] as const;

const noopSubscribe = () => () => {};

// Nền thiên nhiên toàn trang dùng chung cho cả Sáng và Tối:
// - Nền Sáng: trời xanh, mây trắng, nắng vàng, cây xanh, hoa và bướm yên bình.
// - Nền Tối: cùng khung cảnh đó dưới ánh trăng lưỡi liềm, 90 sao và sắc đêm tím dịu.
export function SkyBackground() {
  const { resolvedTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const isLightMode = hydrated && resolvedTheme === "light";

  return (
    <div
      aria-hidden="true"
      data-sky={isLightMode ? "day" : "night"}
      className="sky-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="sky-gradient absolute inset-0" />

      {/* 90 ngôi sao lấp lánh vào ban đêm */}
      {!isLightMode && (
        <div className="absolute inset-0 opacity-95">
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

      {/* Mặt trời (Sáng) hoặc Mặt trăng lưỡi liềm (Tối) ở cùng vị trí trên bầu trời */}
      <div className="sky-orb absolute top-[14%] left-[44%] -translate-x-1/2 -translate-y-1/2">
        {isLightMode ? (
          <div className="sky-sun relative size-24 rounded-full sm:size-28" />
        ) : (
          <div className="sky-moon relative size-16 rounded-full sm:size-20" />
        )}
      </div>

      {/* Mây trôi nhẹ (trắng ban ngày, bạc tím mờ ban đêm) */}
      <div className="absolute inset-0">
        <div className="sky-cloud sky-cloud-1" />
        <div className="sky-cloud sky-cloud-2" />
        <div className="sky-cloud sky-cloud-3" />
      </div>

      {/* Cảnh đồi cỏ, cây xanh lớn, hoa và bướm (tự đổi sắc ngày/đêm qua biến CSS) */}
      <PeacefulMeadowScene />
    </div>
  );
}

function PeacefulMeadowScene() {
  return (
    <div className="meadow-scene pointer-events-none absolute inset-0 overflow-hidden">
      {/* Cánh hoa rơi nhẹ */}
      {PETALS.map((petal, index) => (
        <span
          key={index}
          className={`meadow-petal meadow-petal-${petal.tone} absolute -top-4`}
          style={{
            left: `${petal.x}%`,
            width: `${petal.size}px`,
            height: `${Math.round(petal.size * 1.4)}px`,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        />
      ))}

      {/* 3 chú bướm bay chậm nhẹ nhàng qua bầu trời */}
      <Butterfly className="meadow-butterfly meadow-butterfly-1" size={26} />
      <Butterfly className="meadow-butterfly meadow-butterfly-2" size={20} />
      <Butterfly className="meadow-butterfly meadow-butterfly-3" size={18} />

      {/* Cành lá mềm rủ ở góc trên bên phải */}
      <svg
        viewBox="0 0 320 220"
        fill="none"
        className="meadow-sway-slow absolute top-14 -right-6 w-56 opacity-60 sm:w-72 lg:w-88"
      >
        <path
          d="M320 14C256 32 200 68 136 128"
          stroke="var(--meadow-trunk)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M240 46C212 40 186 46 164 60"
          stroke="var(--meadow-trunk)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <ellipse
          cx="252"
          cy="46"
          rx="26"
          ry="12"
          transform="rotate(-22 252 46)"
          fill="var(--meadow-leaf-2)"
        />
        <ellipse
          cx="216"
          cy="76"
          rx="24"
          ry="11"
          transform="rotate(-36 216 76)"
          fill="var(--meadow-leaf-3)"
        />
        <ellipse
          cx="180"
          cy="98"
          rx="21"
          ry="9.5"
          transform="rotate(-18 180 98)"
          fill="var(--meadow-leaf-4)"
        />
        <ellipse
          cx="184"
          cy="54"
          rx="18"
          ry="8.5"
          transform="rotate(14 184 54)"
          fill="var(--meadow-leaf-3)"
        />
        <ellipse
          cx="146"
          cy="122"
          rx="17"
          ry="8"
          transform="rotate(-30 146 122)"
          fill="var(--meadow-leaf-4)"
        />
        <circle cx="234" cy="36" r="5.5" fill="var(--meadow-flower-b)" />
        <circle cx="196" cy="68" r="5" fill="var(--meadow-flower-c)" />
        <circle cx="152" cy="112" r="4.5" fill="var(--meadow-flower-center)" />
      </svg>

      {/* Đồi cỏ thoai thoải + rặng cây xa dọc chân màn hình */}
      <svg
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        fill="none"
        className="absolute inset-x-0 bottom-0 h-40 w-full sm:h-52 lg:h-64"
      >
        <path
          d="M0 176C230 116 450 132 720 166C990 200 1220 124 1440 156V280H0V176Z"
          fill="var(--meadow-hill-far)"
          fillOpacity="0.58"
        />
        <circle
          cx="340"
          cy="150"
          r="24"
          fill="var(--meadow-hill-tree)"
          fillOpacity="0.5"
        />
        <circle
          cx="366"
          cy="158"
          r="18"
          fill="var(--meadow-hill-tree)"
          fillOpacity="0.44"
        />
        <circle
          cx="1090"
          cy="156"
          r="26"
          fill="var(--meadow-hill-tree)"
          fillOpacity="0.5"
        />
        <circle
          cx="1120"
          cy="162"
          r="19"
          fill="var(--meadow-hill-tree)"
          fillOpacity="0.44"
        />
        <path
          d="M0 206C280 164 520 194 820 180C1080 168 1280 192 1440 176V280H0V206Z"
          fill="var(--meadow-hill-mid)"
          fillOpacity="0.56"
        />
        <path
          d="M0 232C320 208 640 238 980 218C1200 204 1340 220 1440 212V280H0V232Z"
          fill="var(--meadow-hill-near)"
          fillOpacity="0.62"
        />
      </svg>

      {/* Cụm cây lớn & hoa đung đưa góc dưới bên trái */}
      <svg
        viewBox="0 0 440 380"
        fill="none"
        className="meadow-sway absolute bottom-0 -left-8 w-72 opacity-80 sm:w-96 lg:w-[29rem]"
      >
        <path
          d="M174 380V242"
          stroke="var(--meadow-trunk-back)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle
          cx="174"
          cy="206"
          r="54"
          fill="var(--meadow-leaf-back)"
          fillOpacity="0.76"
        />
        <circle
          cx="144"
          cy="226"
          r="38"
          fill="var(--meadow-leaf-4)"
          fillOpacity="0.68"
        />
        <circle
          cx="204"
          cy="228"
          r="34"
          fill="var(--meadow-leaf-2)"
          fillOpacity="0.72"
        />

        <path
          d="M84 380C84 316 86 254 88 186"
          stroke="var(--meadow-trunk)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M86 266L44 226M86 242L130 206M87 212L62 184"
          stroke="var(--meadow-trunk)"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <circle
          cx="88"
          cy="148"
          r="78"
          fill="var(--meadow-leaf-1)"
          fillOpacity="0.86"
        />
        <circle
          cx="38"
          cy="178"
          r="56"
          fill="var(--meadow-leaf-2)"
          fillOpacity="0.84"
        />
        <circle
          cx="138"
          cy="176"
          r="54"
          fill="var(--meadow-leaf-2)"
          fillOpacity="0.82"
        />
        <circle
          cx="76"
          cy="118"
          r="54"
          fill="var(--meadow-leaf-3)"
          fillOpacity="0.82"
        />
        <circle
          cx="118"
          cy="136"
          r="44"
          fill="var(--meadow-leaf-4)"
          fillOpacity="0.78"
        />
        <circle
          cx="52"
          cy="150"
          r="36"
          fill="var(--meadow-leaf-4)"
          fillOpacity="0.72"
        />

        <path
          d="M226 380C224 348 228 324 234 300"
          stroke="var(--meadow-stem)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M258 380C262 352 270 330 278 312"
          stroke="var(--meadow-stem)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M302 380C300 358 304 340 310 326"
          stroke="var(--meadow-stem)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="234" cy="298" r="7" fill="var(--meadow-flower-a)" />
        <circle cx="230" cy="310" r="5" fill="var(--meadow-flower-b)" />
        <circle cx="238" cy="312" r="4.5" fill="var(--meadow-flower-b)" />

        <circle cx="278" cy="310" r="6.5" fill="var(--meadow-flower-c)" />
        <circle cx="278" cy="310" r="2.5" fill="var(--meadow-flower-center)" />

        <circle cx="310" cy="324" r="6" fill="var(--meadow-flower-b)" />
        <circle cx="310" cy="324" r="2.2" fill="var(--meadow-flower-center)" />
      </svg>

      {/* Cụm cây lớn & hoa góc dưới bên phải */}
      <svg
        viewBox="0 0 380 340"
        fill="none"
        className="meadow-sway-slow absolute -right-8 bottom-0 w-64 opacity-78 sm:w-88 lg:w-[25rem]"
      >
        <path
          d="M214 340V232"
          stroke="var(--meadow-trunk-back)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle
          cx="214"
          cy="200"
          r="46"
          fill="var(--meadow-leaf-back)"
          fillOpacity="0.76"
        />
        <circle
          cx="186"
          cy="218"
          r="32"
          fill="var(--meadow-leaf-4)"
          fillOpacity="0.68"
        />

        <path
          d="M304 340C304 282 302 228 300 170"
          stroke="var(--meadow-trunk)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M302 246L266 212M302 224L338 194"
          stroke="var(--meadow-trunk)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <circle
          cx="300"
          cy="138"
          r="70"
          fill="var(--meadow-leaf-1)"
          fillOpacity="0.86"
        />
        <circle
          cx="254"
          cy="166"
          r="50"
          fill="var(--meadow-leaf-2)"
          fillOpacity="0.82"
        />
        <circle
          cx="344"
          cy="164"
          r="48"
          fill="var(--meadow-leaf-2)"
          fillOpacity="0.82"
        />
        <circle
          cx="288"
          cy="112"
          r="46"
          fill="var(--meadow-leaf-3)"
          fillOpacity="0.8"
        />
        <circle
          cx="326"
          cy="128"
          r="38"
          fill="var(--meadow-leaf-4)"
          fillOpacity="0.76"
        />

        <path
          d="M124 340C122 314 116 294 108 276"
          stroke="var(--meadow-stem)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M156 340C158 318 164 300 170 286"
          stroke="var(--meadow-stem)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="108" cy="274" r="6.5" fill="var(--meadow-flower-b)" />
        <circle cx="108" cy="274" r="2.4" fill="var(--meadow-flower-center)" />
        <circle cx="170" cy="284" r="6" fill="var(--meadow-flower-c)" />
        <circle cx="170" cy="284" r="2.2" fill="var(--meadow-flower-center)" />
      </svg>
    </div>
  );
}

function Butterfly({
  className,
  size,
}: {
  className: string;
  size: number;
}) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="size-full overflow-visible"
      >
        <g className="butterfly-wing-left">
          <path
            d="M15.5 15.5C12.5 9.5 4.5 7 3.5 12.5C2.8 16.2 7.5 18.2 14.5 17.2Z"
            fill="var(--meadow-butterfly-1)"
            fillOpacity="0.88"
          />
          <path
            d="M15.2 17.2C10.5 18 6.5 21.5 8.5 24.5C10.2 27 14.2 24 15.5 18.8Z"
            fill="var(--meadow-butterfly-2)"
            fillOpacity="0.85"
          />
        </g>
        <g className="butterfly-wing-right">
          <path
            d="M16.5 15.5C19.5 9.5 27.5 7 28.5 12.5C29.2 16.2 24.5 18.2 17.5 17.2Z"
            fill="var(--meadow-butterfly-1)"
            fillOpacity="0.88"
          />
          <path
            d="M16.8 17.2C21.5 18 25.5 21.5 23.5 24.5C21.8 27 17.8 24 16.5 18.8Z"
            fill="var(--meadow-butterfly-2)"
            fillOpacity="0.85"
          />
        </g>
        <rect
          x="15.2"
          y="12"
          width="1.6"
          height="9"
          rx="0.8"
          fill="var(--meadow-butterfly-body)"
        />
      </svg>
    </div>
  );
}
