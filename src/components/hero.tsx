import type { CSSProperties } from "react";
import { HeroGlow } from "@/components/hero-glow";
import { Parallax } from "@/components/parallax";
import { Replay } from "@/components/replay";
import { site } from "@/lib/site";

const lines = ["Đặng Lê", "Thanh Minh"];

const order = (index: number) => ({ "--i": index }) as CSSProperties;

function Letters({ text, start }: { text: string; start: number }) {
  return [...text].map((letter, index) => (
    <span key={index} className="hero-letter" style={order(start + index)}>
      {letter === " " ? " " : letter}
    </span>
  ));
}

function Arrow({ className, d }: { className: string; d: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-4 fill-none stroke-current stroke-2 transition-transform duration-300 ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative grid min-h-[calc(100svh-4.5rem)] overflow-hidden">
      <HeroGlow />

      <div className="relative shell grid content-end gap-10 pt-20 pb-16">
        <Replay>
          <h1 className="font-display text-[clamp(3rem,16.5vw,11rem)] leading-[1.05] font-bold">
            <span className="sr-only">{site.name}</span>
            <span aria-hidden="true" className="block whitespace-nowrap">
              <Parallax mode="leave" x={-140}>
                <Letters text={lines[0]} start={0} />
              </Parallax>
            </span>
            <span
              aria-hidden="true"
              className="block whitespace-nowrap text-highlight"
            >
              <Parallax mode="leave" x={140}>
                <Letters text={lines[1]} start={lines[0].length} />
              </Parallax>
            </span>
          </h1>
        </Replay>

        <Replay className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid max-w-xl gap-3">
            <p
              className="hero-rise text-xl font-medium md:text-2xl"
              style={order(0)}
            >
              Sinh viên Công nghệ thông tin Việt – Nhật tại Trường Đại học Công
              nghệ Thông tin (UIT).
            </p>
            <p
              className="hero-rise text-lg text-pretty text-ink-2"
              style={order(1)}
            >
              Mình quan tâm đến backend, data và AI.
            </p>
          </div>

          <div className="hero-rise flex flex-wrap gap-3" style={order(2)}>
            <a href="#du-an" className="group btn bg-accent text-accent-ink">
              Xem dự án
              <Arrow
                className="group-hover:translate-y-1"
                d="M12 5v14M6 13l6 6 6-6"
              />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="group btn border border-highlight hover:bg-surface"
            >
              GitHub
              <span className="sr-only"> (mở tab mới)</span>
              <Arrow
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                d="M7 17L17 7M9 7h8v8"
              />
            </a>
          </div>
        </Replay>
      </div>
    </section>
  );
}
