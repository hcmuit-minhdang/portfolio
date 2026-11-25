"use client";

import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/lib/i18n";

const options: { value: Locale; code: string }[] = [
  { value: "en", code: "EN" },
  { value: "vi", code: "VI" },
];

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  const activeIndex = options.findIndex((option) => option.value === locale);

  return (
    <div
      role="group"
      aria-label={t.language.groupAria}
      className="relative flex gap-0.5 rounded-full border border-line bg-surface p-1"
    >
      <span
        aria-hidden="true"
        className="absolute top-1 left-1 h-9 w-10 rounded-full bg-accent transition-transform duration-400 ease-out motion-reduce:transition-none"
        style={{
          transform: `translateX(${activeIndex * 2.625}rem)`,
        }}
      />
      {options.map(({ value, code }) => {
        const label = t.language[value];
        const pressed = locale === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={pressed}
            title={label}
            onClick={() => setLocale(value)}
            className="relative grid h-9 w-10 cursor-pointer place-items-center rounded-full text-xs font-bold tracking-wider text-ink-2 transition-colors hover:text-ink aria-pressed:text-accent-ink"
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
