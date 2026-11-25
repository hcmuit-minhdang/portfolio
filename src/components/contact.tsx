"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`;

const socials = [
  {
    name: "GitHub",
    handle: "@hcmuit-minhdang",
    href: site.github,
    icon: (
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
    ),
  },
  {
    name: "LinkedIn",
    handle: "thanh-minh-dang-le",
    href: site.linkedin,
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: "Facebook",
    handle: "@minhdanguit",
    href: site.facebook,
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
];

export function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Bỏ qua nếu trình duyệt chặn clipboard.
    }
  };

  return (
    <section
      id="lien-he"
      aria-labelledby="lien-he-tieu-de"
      className="border-t border-line"
    >
      <div className="shell py-16 md:py-24">
        <h2
          id="lien-he-tieu-de"
          className="font-display text-2xl leading-none font-bold text-highlight"
        >
          {t.contact.heading}
        </h2>

        <Reveal>
          <p className="mt-6 text-[clamp(1.75rem,3.1vw,3.5rem)] leading-[1.22] font-medium tracking-tight text-balance">
            {t.contact.leadBefore}
            <span className="text-highlight">{t.contact.leadHighlight}</span>
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 md:mt-12">
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-line bg-surface p-6 md:flex-row md:items-center md:p-10">
            <div className="min-w-0">
              <p className="text-sm text-ink-2">{t.contact.emailLabel}</p>
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-display text-2xl leading-tight font-bold break-all decoration-accent decoration-2 underline-offset-4 hover:underline sm:text-3xl md:text-4xl"
              >
                {site.email}
                <span className="sr-only">{t.opensInNewTab}</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 md:shrink-0">
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="group btn bg-accent text-accent-ink"
              >
                {t.contact.sendEmail}
                <span className="sr-only">{t.opensInNewTab}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="btn cursor-pointer border border-highlight hover:bg-bg"
              >
                {copied ? t.contact.copied : t.contact.copyEmail}
              </button>
            </div>
          </div>
        </Reveal>

        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {socials.map((social, index) => (
            <li key={social.name}>
              <Reveal delay={0.12 + index * 0.08} className="grid h-full">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card-lift group flex h-full flex-col justify-between gap-8 rounded-3xl border border-line bg-surface p-6 md:p-8"
                >
                  <div className="flex items-center justify-between text-ink-2">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-6 fill-none stroke-current stroke-2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {social.icon}
                    </svg>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl leading-snug font-bold">
                      {social.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-2">{social.handle}</p>
                  </div>

                  <span className="sr-only">{t.opensInNewTab}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
