"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { techStackGroups, type SkillIcon } from "@/lib/skills";

function GroupIcon({ icon }: { icon: SkillIcon }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-bg text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5 fill-none stroke-current stroke-2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon === "code" && <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />}
        {icon === "database" && (
          <>
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14a9 3 0 0 0 18 0V5" />
            <path d="M3 12a9 3 0 0 0 18 0" />
          </>
        )}
        {icon === "server" && (
          <>
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
            <line x1="6" x2="6.01" y1="6" y2="6" />
            <line x1="6" x2="6.01" y1="18" y2="18" />
          </>
        )}
      </svg>
    </span>
  );
}

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

        <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-3">
          {techStackGroups.map((group, index) => (
            <Reveal
              key={group.title.en}
              delay={index * 0.08}
              className="grid h-full"
            >
              <article className="card-lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6 md:p-8">
                <GroupIcon icon={group.icon} />

                <h3 className="mt-5 font-display text-2xl leading-snug font-bold text-highlight">
                  {group.title[locale]}
                </h3>

                <p className="mt-3 text-pretty text-ink-2">
                  {group.description[locale]}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2.5 pt-6">
                  {group.items.map((item) => {
                    const label =
                      typeof item.name === "string"
                        ? item.name
                        : item.name[locale];
                    const key =
                      typeof item.name === "string" ? item.name : item.name.en;
                    return (
                      <li
                        key={key}
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${
                          item.core
                            ? "bg-accent text-accent-ink"
                            : "border border-line bg-bg text-ink"
                        }`}
                      >
                        <span>{label}</span>
                        {item.note && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              item.core
                                ? "bg-accent-ink/15 text-accent-ink"
                                : "text-ink-2"
                            }`}
                          >
                            {item.note[locale]}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
