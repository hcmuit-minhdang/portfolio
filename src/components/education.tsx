"use client";

import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { credentials, schools } from "@/lib/education";

export function Education() {
  const { locale, t } = useLanguage();

  return (
    <section
      id="hoc-tap"
      aria-labelledby="hoc-tap-tieu-de"
      className="border-t border-line"
    >
      <div className="shell py-16 md:py-24">
        <h2
          id="hoc-tap-tieu-de"
          className="font-display text-2xl leading-none font-bold text-highlight"
        >
          {t.education.heading}
        </h2>

        <Reveal>
          <p className="mt-6 text-[clamp(1.75rem,3.1vw,3.5rem)] leading-[1.22] font-medium tracking-tight text-balance">
            {t.education.leadBefore}
            <span className="text-highlight">{t.education.leadHighlight}</span>
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Học vấn / Trường học */}
          <div className="grid gap-6">
            {schools.map((entry, index) => (
              <Reveal
                key={entry.school.en}
                delay={index * 0.08}
                className="grid h-full"
              >
                <article className="card-lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6 md:p-8">
                  <div className="flex items-center gap-3 text-ink-2">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-6 shrink-0 fill-none stroke-current stroke-2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span className="text-sm font-medium">
                      {t.education.schoolLabel}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl leading-snug font-bold sm:text-3xl">
                    {entry.school[locale]}
                  </h3>

                  <p className="mt-2 text-lg font-medium">
                    {entry.program[locale]}
                  </p>
                  <p className="mt-1 text-sm text-ink-2">
                    {entry.location[locale]}
                  </p>

                  {(entry.gpa10 || entry.gpa4) && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {entry.gpa10 && (
                        <div className="rounded-2xl border border-line bg-bg px-4 py-3">
                          <p className="text-xs text-ink-2">
                            {t.education.gpa10Label}
                          </p>
                          <p className="mt-1 font-display text-2xl leading-none font-bold tabular-nums sm:text-3xl">
                            {entry.gpa10}
                            <span className="ml-1 font-sans text-sm font-normal text-ink-2">
                              / 10
                            </span>
                          </p>
                        </div>
                      )}
                      {entry.gpa4 && (
                        <div className="rounded-2xl border border-line bg-bg px-4 py-3">
                          <p className="text-xs text-ink-2">
                            {t.education.gpa4Label}
                          </p>
                          <p className="mt-1 font-display text-2xl leading-none font-bold tabular-nums sm:text-3xl">
                            {entry.gpa4}
                            <span className="ml-1 font-sans text-sm font-normal text-ink-2">
                              / 4.0
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {entry.credits && (
                    <div className="mt-4 rounded-2xl border border-line bg-bg px-4 py-3.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                        <span className="text-ink-2">
                          {t.education.creditsLabel}
                        </span>
                        <span className="font-medium tabular-nums">
                          {entry.credits.earned} / {entry.credits.total}{" "}
                          <span className="font-normal text-ink-2">
                            {t.education.creditsUnit} (
                            {Math.round(
                              (entry.credits.earned / entry.credits.total) *
                                100,
                            )}
                            %)
                          </span>
                        </span>
                      </div>
                      <div
                        role="progressbar"
                        aria-label={t.education.creditsLabel}
                        aria-valuenow={entry.credits.earned}
                        aria-valuemin={0}
                        aria-valuemax={entry.credits.total}
                        className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-surface"
                      >
                        <div
                          className="h-full rounded-full bg-accent transition-all duration-500 motion-reduce:transition-none"
                          style={{
                            width: `${Math.min(100, (entry.credits.earned / entry.credits.total) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <p className="mt-6 flex items-center gap-3 font-medium lg:mt-auto lg:pt-6">
                    <span
                      aria-hidden="true"
                      className="status-dot"
                      data-status={entry.status}
                    />
                    {entry.statusText[locale]}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Bằng cấp & Chứng chỉ */}
          <Reveal delay={0.1} className="grid h-full">
            <div className="card-lift flex h-full flex-col rounded-3xl border border-line bg-surface p-6 md:p-8">
              <div className="flex items-center gap-3 text-ink-2">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-6 shrink-0 fill-none stroke-current stroke-2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
                <h3 className="font-display text-2xl leading-none font-bold text-ink">
                  {t.education.credentialsHeading}
                </h3>
              </div>

              <ul className="mt-5 divide-y divide-line">
                {credentials.map((item) => (
                  <li
                    key={item.name.en}
                    className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-1 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{item.name[locale]}</p>
                      <p className="mt-0.5 text-sm text-ink-2">
                        {item.issuer[locale]}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-xs font-medium text-ink-2">
                      <span
                        aria-hidden="true"
                        className="status-dot scale-75"
                        data-status={item.status}
                      />
                      {item.statusText[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
