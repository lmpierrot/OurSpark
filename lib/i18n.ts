// ─────────────────────────────────────────────────────────────────────────────
// lib/i18n.ts
// OurSparks — complete i18n dictionary loader
//
// Namespaces (10):  ask · auth · chat · common · home · more
//                   onboarding · play · themes · welcome
// Languages  (4):   en · fr · es · ht
// ─────────────────────────────────────────────────────────────────────────────

// ── English ──────────────────────────────────────────────────────────────────
import enAsk        from "@/data/i18n/en/ask.json";
import enAuth       from "@/data/i18n/en/auth.json";
import enChat       from "@/data/i18n/en/chat.json";
import enCommon     from "@/data/i18n/en/common.json";
import enHome       from "@/data/i18n/en/home.json";
import enMore       from "@/data/i18n/en/more.json";
import enOnboarding from "@/data/i18n/en/onboarding.json";
import enPlay       from "@/data/i18n/en/play.json";
import enThemes     from "@/data/i18n/en/theme.json";
import enWelcome    from "@/data/i18n/en/welcome.json";

// ── French ───────────────────────────────────────────────────────────────────
import frAsk        from "@/data/i18n/fr/ask.json";
import frAuth       from "@/data/i18n/fr/auth.json";
import frChat       from "@/data/i18n/fr/chat.json";
import frCommon     from "@/data/i18n/fr/common.json";
import frHome       from "@/data/i18n/fr/home.json";
import frMore       from "@/data/i18n/fr/more.json";
import frOnboarding from "@/data/i18n/fr/onboarding.json";
import frPlay       from "@/data/i18n/fr/play.json";
import frThemes     from "@/data/i18n/fr/theme.json";
import frWelcome    from "@/data/i18n/fr/welcome.json";

// ── Spanish ──────────────────────────────────────────────────────────────────
import esAsk        from "@/data/i18n/es/ask.json";
import esAuth       from "@/data/i18n/es/auth.json";
import esChat       from "@/data/i18n/es/chat.json";
import esCommon     from "@/data/i18n/es/common.json";
import esHome       from "@/data/i18n/es/home.json";
import esMore       from "@/data/i18n/es/more.json";
import esOnboarding from "@/data/i18n/es/onboarding.json";
import esPlay       from "@/data/i18n/es/play.json";
import esThemes     from "@/data/i18n/es/theme.json";
import esWelcome    from "@/data/i18n/es/welcome.json";

// ── Haitian Creole ───────────────────────────────────────────────────────────
import htAsk        from "@/data/i18n/ht/ask.json";
import htAuth       from "@/data/i18n/ht/auth.json";
import htChat       from "@/data/i18n/ht/chat.json";
import htCommon     from "@/data/i18n/ht/common.json";
import htHome       from "@/data/i18n/ht/home.json";
import htMore       from "@/data/i18n/ht/more.json";
import htOnboarding from "@/data/i18n/ht/onboarding.json";
import htPlay       from "@/data/i18n/ht/play.json";
import htThemes     from "@/data/i18n/ht/theme.json";
import htWelcome    from "@/data/i18n/ht/welcome.json";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AppLanguage = "en" | "fr" | "es" | "ht";

const dictionaries = {
  en: {
    ask:        enAsk,
    auth:       enAuth,
    chat:       enChat,
    common:     enCommon,
    home:       enHome,
    more:       enMore,
    onboarding: enOnboarding,
    play:       enPlay,
    themes:     enThemes,
    welcome:    enWelcome,
  },
  fr: {
    ask:        frAsk,
    auth:       frAuth,
    chat:       frChat,
    common:     frCommon,
    home:       frHome,
    more:       frMore,
    onboarding: frOnboarding,
    play:       frPlay,
    themes:     frThemes,
    welcome:    frWelcome,
  },
  es: {
    ask:        esAsk,
    auth:       esAuth,
    chat:       esChat,
    common:     esCommon,
    home:       esHome,
    more:       esMore,
    onboarding: esOnboarding,
    play:       esPlay,
    themes:     esThemes,
    welcome:    esWelcome,
  },
  ht: {
    ask:        htAsk,
    auth:       htAuth,
    chat:       htChat,
    common:     htCommon,
    home:       htHome,
    more:       htMore,
    onboarding: htOnboarding,
    play:       htPlay,
    themes:     htThemes,
    welcome:    htWelcome,
  },
};

/** Full dictionary type — inferred from the English source of truth */
export type Dictionary = typeof dictionaries["en"];

/** All valid namespace keys */
export type DictionaryNamespace = keyof Dictionary;

// ─────────────────────────────────────────────────────────────────────────────
// Core functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Return the full dictionary for a given language.
 * Falls back to English if the language is not found.
 */
export function getDictionary(language: AppLanguage = "en"): Dictionary {
  return (dictionaries[language] ?? dictionaries.en) as Dictionary;
}

/**
 * Resolve a single translation value from a dictionary.
 *
 * Supports two key formats:
 *   1. Flat dot-key  — the JSON literally has the key "midnight-rose.name"
 *   2. Nested path   — the JSON has nested objects traversed by dots
 *
 * Returns undefined if the key is not found.
 *
 * Examples:
 *   getDictionaryValue(dict, "themes",     "midnight-rose.name")  → "Rose de Minuit"
 *   getDictionaryValue(dict, "onboarding", "chooseTheme")         → "Choisissez votre ambiance"
 *   getDictionaryValue(dict, "auth",       "errors.invalidEmail") → "Veuillez entrer un e-mail valide"
 *   getDictionaryValue(dict, "welcome",    "phase1")              → "Bonjour"
 */
export function getDictionaryValue(
  dict: Dictionary,
  namespace: DictionaryNamespace,
  key: string
): string | undefined {
  const ns = dict[namespace] as Record<string, unknown>;
  if (!ns) return undefined;

  // 1. Try the key as a literal flat key first (fastest, covers themes.json pattern)
  if (typeof ns[key] === "string") return ns[key] as string;

  // 2. Try dot-notation traversal for nested objects
  const parts = key.split(".");
  let current: unknown = ns;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

/**
 * Convenience: read the user's chosen language from the onboarding
 * localStorage blob. Safe to call on both server and client.
 *
 * Key: "oursparks_onboarding"  →  { language: "en" | "fr" | "es" | "ht" }
 */
export function getStoredLanguage(): AppLanguage {
  if (typeof window === "undefined") return "en";
  try {
    const raw = localStorage.getItem("oursparks_onboarding");
    if (!raw) return "en";
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const lang = parsed.language;
    if (lang === "fr" || lang === "es" || lang === "ht") return lang;
    return "en";
  } catch {
    return "en";
  }
}

/**
 * Convenience: get the dictionary for the language the user chose
 * during onboarding. One-liner for use inside components:
 *
 *   const dict = getUserDictionary();
 *   const label = dict.onboarding["chooseTheme"];
 */
export function getUserDictionary(): Dictionary {
  return getDictionary(getStoredLanguage());
}
