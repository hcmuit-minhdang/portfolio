"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { languages, skillGroups } from "@/lib/skills";

export function Skills() {
  const { locale, t } = useLanguage();

  return (
    <section
      id="ky-nang"
      aria-labelledby="ky-nang-tieu-de"
      className="border-t border-line"
    >
      <div className="shell py-16 md:py-24">
        <h2
          id="ky-nang-tieu-de"
          className="font-display text-2xl leading-none font-bold text-highlight"
        >
          {t.skills.heading}
        </h2>

        <Reveal>
          <p className="mt-6 text-[clamp(1.75rem,3.1vw,3.5rem)] leading-[1.22] font-medium tracking-tight text-balance">
            {t.skills.leadBefore}
            <span className="text-highlight">{t.skills.leadHighlight}</span>
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title.en}
              delay={index * 0.08}
              className="grid h-full"
            >
              <div className="card-lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6 md:p-8">
                <h3 className="font-display text-2xl leading-snug font-bold">
                  {group.title[locale]}
                </h3>
                {group.description && (
                  <p className="mt-2 text-pretty text-ink-2">
                    {group.description[locale]}
                  </p>
                )}
                <ul className="mt-6 flex flex-wrap gap-3">
                  {group.items.map((item) => {
                    const label =
                      typeof item.name === "string"
                        ? item.name
                        : item.name[locale];
                    return (
                      <li
                        key={typeof item.name === "string" ? item.name : item.name.en}
                        className="inline-flex items-baseline gap-2 rounded-full border border-line bg-bg px-4 py-2 font-medium"
                      >
                        <span>{label}</span>
                        {item.note && (
                          <span className="text-sm font-normal text-ink-2">
                            {item.note[locale]}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}

          <Reveal delay={skillGroups.length * 0.08} className="grid h-full">
            <div className="card-lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6 md:p-8">
              <h3 className="font-display text-2xl leading-snug font-bold">
                {t.skills.languagesHeading}
              </h3>
              <ul className="mt-4 divide-y divide-line">
                {languages.map((item) => {
                  const label =
                    typeof item.name === "string"
                      ? item.name
                      : item.name[locale];
                  return (
                    <li
                      key={typeof item.name === "string" ? item.name : item.name.en}
                      className="flex flex-wrap items-baseline justify-between gap-2 py-4 first:pt-2 last:pb-0"
                    >
                      <span className="text-lg font-medium">{label}</span>
                      {item.note && (
                        <span className="text-ink-2">{item.note[locale]}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
