"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLanguage } from "@/components/language-provider";
import { Parallax } from "@/components/parallax";
import { Replay } from "@/components/replay";
import { Tilt } from "@/components/tilt";
import { site } from "@/lib/site";

const lines = ["Đặng Lê", "Thanh Minh"];

const order = (index: number) => ({ "--i": index }) as CSSProperties;

function Letters({ text, start }: { text: string; start: number }) {
  return [...text].map((letter, index) => (
    <span key={index} className="hero-letter" style={order(start + index)}>
      {letter === " " ? "\u00a0" : letter}
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
  const { t } = useLanguage();

  return (
    <section className="relative grid min-h-[calc(100svh-4.5rem)] items-center overflow-hidden">

      <div className="relative shell grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1fr_22rem] lg:gap-16 xl:grid-cols-[1fr_26rem] xl:gap-24">
        <div className="grid gap-8">
          <Replay>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.75rem)] leading-[1.06] font-bold">
              <span className="sr-only">{site.name}</span>
              <span aria-hidden="true" className="block whitespace-nowrap">
                <Parallax mode="leave" x={-90}>
                  <Letters text={lines[0]} start={0} />
                </Parallax>
              </span>
              <span
                aria-hidden="true"
                className="block whitespace-nowrap text-highlight"
              >
                <Parallax mode="leave" x={90}>
                  <Letters text={lines[1]} start={lines[0].length} />
                </Parallax>
              </span>
            </h1>
          </Replay>

          <Replay className="grid gap-7">
            <div className="grid max-w-2xl gap-3">
              <p
                className="hero-rise text-xl font-medium whitespace-pre-line text-balance md:text-2xl"
                style={order(0)}
              >
                {t.hero.lead}
              </p>
              <p
                className="hero-rise text-lg text-balance text-ink-2"
                style={order(1)}
              >
                {t.hero.sub}
              </p>
            </div>

            <div className="hero-rise flex flex-wrap gap-3" style={order(2)}>
              <a href="#du-an" className="group btn bg-accent text-accent-ink">
                {t.hero.viewProjects}
                <Arrow
                  className="group-hover:translate-y-1"
                  d="M12 5v14M6 13l6 6 6-6"
                />
              </a>
            </div>
          </Replay>
        </div>

        <Replay className="mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-none">
          <div className="hero-rise" style={order(2)}>
            <Tilt>
              <div className="overflow-hidden rounded-3xl border border-line bg-surface p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg">
                  {site.heroPhoto ? (
                    <Image
                      src={site.heroPhoto}
                      alt={t.profileCard.photoAlt(site.name)}
                      fill
                      preload
                      sizes="(min-width: 80rem) 26rem, (min-width: 64rem) 22rem, 90vw"
                      className="object-cover object-bottom"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="grid size-full place-items-center font-display text-8xl font-bold text-accent select-none xl:text-9xl"
                    >
                      TM
                    </div>
                  )}
                </div>
              </div>
            </Tilt>
          </div>
        </Replay>
      </div>
    </section>
  );
}
