"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { defaultLocale, messages, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "portfolio-locale";

const listeners = new Set<() => void>();

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "vi") return saved;
  } catch {
    // Bỏ qua khi storage bị chặn.
  }
  return defaultLocale;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function setStoredLocale(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Bỏ qua khi storage bị chặn.
  }
  for (const listener of listeners) listener();
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (typeof messages)[Locale];
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: messages[defaultLocale],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    readStoredLocale,
    () => defaultLocale,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale: setStoredLocale, t: messages[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
