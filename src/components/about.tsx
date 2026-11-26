"use client";

import { useLanguage } from "@/components/language-provider";
import { Parallax } from "@/components/parallax";
import { ProfileCard } from "@/components/profile-card";
import { Reveal } from "@/components/reveal";

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="gioi-thieu"
      aria-labelledby="gioi-thieu-tieu-de"
      className="border-t border-line"
    >
      <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-[23rem_1fr] lg:gap-16 xl:gap-24">
        <div className="flex flex-col lg:order-last">
          <h2
            id="gioi-thieu-tieu-de"
            className="font-display text-2xl leading-none font-bold text-highlight"
          >
            {t.about.heading}
          </h2>

          <Reveal>
            <p className="mt-6 text-[clamp(1.75rem,3.1vw,3.5rem)] leading-[1.22] font-medium tracking-tight whitespace-pre-line text-pretty">
              {t.about.leadBefore}
              <span className="text-highlight">{t.about.leadHighlight}</span>
              {t.about.leadAfter}
            </p>
          </Reveal>

          <ul className="mt-12 grid border-t border-line pt-6 max-sm:gap-5 sm:grid-cols-3 sm:divide-x sm:divide-line lg:mt-auto">
            {t.about.highlights.map(({ value, label }, index) => (
              <li
                key={index}
                className="sm:px-4 xl:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <Reveal delay={0.1 + index * 0.12}>
                  <p className="font-display text-3xl leading-tight font-bold whitespace-nowrap xl:text-5xl xl:leading-tight">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-pretty text-ink-2">{label}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal from="left">
          <Parallax y={28}>
            <ProfileCard />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
