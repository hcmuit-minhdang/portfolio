"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
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
    <header
      ref={header}
      className="sticky top-0 z-20 border-b border-line bg-bg"
    >
      <div className="flex h-18 items-center gap-3 px-6 md:gap-8 md:px-16">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="mr-auto font-display text-3xl leading-none font-bold"
        >
          {site.name}
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden md:block">
          <ul className="flex gap-7">
            {site.nav.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="py-2 decoration-accent decoration-2 underline-offset-8 hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />

        <button
          ref={menuButton}
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
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
        aria-label="Điều hướng trên điện thoại"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-surface px-6 py-3 md:hidden"
      >
        <ul className="divide-y divide-line">
          {site.nav.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-4 text-lg"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
