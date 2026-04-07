"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

type NestedRecord = { [key: string]: string | NestedRecord };
type FlatRecord = Record<string, string>;
type Translations = Record<string, FlatRecord>;

interface I18nContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  t: (namespace: string, key: string) => string;
  ready: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "oursparks-lang";
const SUPPORTED_LOCALES = ["en", "fr", "es", "ht"];
const DEFAULT_LOCALE = "en";

/** Flatten nested JSON into dot-notation keys:
 *  { intro: { slide1: { title: "hi" } } }
 *  becomes { "intro.slide1.title": "hi" }
 */
function flatten(obj: NestedRecord, prefix = ""): FlatRecord {
  const result: FlatRecord = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (typeof val === "string") {
      result[fullKey] = val;
    } else {
      Object.assign(result, flatten(val as NestedRecord, fullKey));
    }
  }
  return result;
}

async function loadNamespace(
  locale: string,
  ns: string
): Promise<FlatRecord> {
  try {
    const mod = await import(`@/data/i18n/${locale}/${ns}.json`);
    const raw = mod.default ?? mod;
    return flatten(raw);
  } catch {
    if (locale !== "en") {
      try {
        const fallback = await import(`@/data/i18n/en/${ns}.json`);
        return flatten(fallback.default ?? fallback);
      } catch {
        return {};
      }
    }
    return {};
  }
}

const NAMESPACES = [
  "common",
  "auth",
  "onboarding",
  "home",
  "ask",
  "play",
  "chat",
  "more",
];

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [translations, setTranslations] = useState<Translations>({});
  const [ready, setReady] = useState(false);

  const loadAll = useCallback(async (loc: string) => {
    const results: Translations = {};
    await Promise.all(
      NAMESPACES.map(async (ns) => {
        results[ns] = await loadNamespace(loc, ns);
      })
    );
    setTranslations(results);
    setReady(true);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial =
      saved && SUPPORTED_LOCALES.includes(saved) ? saved : DEFAULT_LOCALE;
    setLocaleState(initial);
    loadAll(initial);
  }, [loadAll]);

  const setLocale = useCallback(
    (loc: string) => {
      if (!SUPPORTED_LOCALES.includes(loc)) return;
      setLocaleState(loc);
      localStorage.setItem(STORAGE_KEY, loc);
      setReady(false);
      loadAll(loc);
    },
    [loadAll]
  );

  /** Usage: t("onboarding", "intro.slide1.title")
   *  Also works with flat keys: t("home", "greeting") */
  const t = useCallback(
    (namespace: string, key: string): string => {
      return translations[namespace]?.[key] ?? key;
    },
    [translations]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, ready }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
