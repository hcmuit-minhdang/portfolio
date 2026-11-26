"use client";

import { useLanguage } from "@/components/language-provider";
import { Parallax } from "@/components/parallax";
import { ProfileCard } from "@/components/profile-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";
import { techStackGroups } from "@/lib/skills";

const pad2 = (n: number) => String(n).padStart(2, "0");

const totalTechCount = techStackGroups.reduce(
  (sum, group) => sum + group.items.length,
  0,
);

export function About() {
  const { t } = useLanguage();

  const stats = [
    {
      value: "03",
      label: t.about.highlights.yearLabel,
      accent: true,
    },
    {
      value: pad2(projects.length),
      label: t.about.highlights.projectsLabel,
      accent: false,
    },
    {
      value: pad2(totalTechCount),
      label: t.about.highlights.toolboxLabel,
      accent: false,
    },
  ];

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
            {stats.map(({ value, label, accent }, index) => (
              <li
                key={index}
                className="sm:px-4 xl:px-6 sm:first:pl-0 sm:last:pr-0"
              >
                <Reveal delay={0.1 + index * 0.12}>
                  <p
                    className={`font-display text-5xl leading-none font-bold tabular-nums xl:text-6xl ${
                      accent ? "text-highlight" : "text-ink"
                    }`}
                  >
                    {value}
                  </p>
                  <p className="mt-2.5 text-xs font-medium tracking-wider text-ink-2 uppercase">
                    {label}
                  </p>
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
