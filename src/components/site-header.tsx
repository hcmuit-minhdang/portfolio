"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { Logo } from "@/components/logo";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <>
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-ink"
      >
        {t.skipToContent}
      </a>

      <header
        ref={header}
        className="sticky top-0 z-20 border-b border-line bg-bg"
      >
        <ScrollProgress />
        <div className="shell flex h-18 items-center gap-2 md:gap-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={t.homeAria(site.name)}
            className="mr-auto flex items-center gap-3 rounded-xl"
          >
            <Logo />
            <span className="flex flex-col justify-center">
              <span className="font-display text-lg leading-none font-bold tracking-wide text-ink">
                dangminh
              </span>
              <span className="mt-1.5 hidden items-center gap-2 text-[11px] leading-none font-medium tracking-wider text-ink-2 uppercase sm:flex">
                <span
                  aria-hidden="true"
                  className="status-dot shrink-0 scale-75"
                  data-status="done"
                />
                <span>{t.headerStatus}</span>
              </span>
            </span>
          </Link>

          <nav aria-label={t.navAria} className="hidden md:block">
            <ul className="flex gap-7">
              {site.nav.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className="nav-link py-2">
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageToggle />
          <ThemeToggle />

          <button
            ref={menuButton}
            type="button"
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(!open)}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5 fill-none stroke-current stroke-2"
              strokeLinecap="round"
            >
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>

        <nav
          id="menu-mobile"
          aria-label={t.mobileNavAria}
          hidden={!open}
          className="menu-drop absolute inset-x-0 top-full border-b border-line bg-surface px-6 py-3 md:hidden"
        >
          <ul className="divide-y divide-line">
            {site.nav.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-lg"
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
