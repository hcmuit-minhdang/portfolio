"use client";

import { useLanguage } from "@/components/language-provider";
import { site } from "@/lib/site";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-8 text-sm text-ink-2">
        <p>© 2026 {site.name}</p>
        <a
          href="#top"
          aria-label={t.backToTop}
          title={t.backToTop}
          className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-accent-ink motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
