"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { ThemePicker } from "@/components/settings/theme-picker";
import { ArrowRight, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { getDictionary } from "@/lib/i18n";
import type { AppLanguage } from "@/lib/i18n";

/* ─────────────────────────────────────────────────────────────────
   Read the chosen language directly from the onboarding localStorage
   blob — same key used everywhere in the app: "oursparks_onboarding"
───────────────────────────────────────────────────────────────── */
function readStoredLanguage(): AppLanguage {
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

function isRenderableText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default function OnboardingThemePage() {
  const router = useRouter();
  const { theme } = useTheme();

  // ── Language-aware dictionary ──────────────────────────────────
  // We bypass the i18n provider here and read the blob directly so
  // this page always reflects whatever language the user picked,
  // even if the provider was initialized before the selection was made.
  const lang = useMemo(readStoredLanguage, []);
  const dict = useMemo(() => getDictionary(lang), [lang]);

  // Also keep the provider's t() for any keys the provider handles
  const { t: tProvider } = useI18n();

  // Resolve from our local dict first, fall back to provider, then hardcoded fallback
  const getText = (
    namespace: keyof typeof dict,
    key: string,
    fallback: string
  ): string => {
    const ns = dict[namespace] as Record<string, unknown> | undefined;
    if (ns) {
      const val = ns[key];
      if (isRenderableText(val)) return val;
    }
    const providerVal = tProvider(namespace, key);
    if (isRenderableText(providerVal) && providerVal !== key) return providerVal;
    return fallback;
  };

  // ── Translated strings ─────────────────────────────────────────
  const eyebrow     = getText("onboarding", "theme.eyebrow",          "Choose your look");
  const title       = getText("onboarding", "chooseTheme",            "Choose your vibe");
  const description = getText("onboarding", "chooseThemeDesc",
    "Pick a theme that feels like you. You can always change it later in Settings.");
  const previewTitle       = getText("onboarding", "theme.previewTitle",       "Preview your space");
  const previewDescription = getText("onboarding", "theme.previewDescription",
    "Soft, romantic, playful, or elegant — choose the feeling you want every time you open the app.");
  const sampleLabel  = getText("onboarding", "theme.sampleLabel",  "Sample");
  const sampleTitle  = getText("onboarding", "theme.sampleTitle",  "Tonight\u2019s spark");
  const sampleBody   = getText("onboarding", "theme.sampleBody",
    "What is one little thing that made you feel loved recently?");
  const continueLabel = getText("common", "buttons.continue", "Continue");

  function handleContinue() {
    if (typeof window !== "undefined") {
      localStorage.setItem("oursparks-onboarding-theme", "done");
    }
    router.push("/onboarding/partner");
  }

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: theme.bgBase }}
    >
      {/* ── Main background ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: [
            theme.bgGradientA,
            theme.bgGradientB,
            theme.bgGradientC,
            theme.bgLinear,
          ].join(", "),
        }}
      />

      {/* ── Extra depth glows ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -top-16 left-[-10%] h-[320px] w-[320px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(244,63,94,0.16) 0%, rgba(244,63,94,0.06) 35%, transparent 72%)",
          }}
        />
        <div
          className="absolute top-[18%] right-[-12%] h-[300px] w-[300px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(168,85,247,0.06) 35%, transparent 72%)",
          }}
        />
        <div
          className="absolute bottom-[-8%] left-[15%] h-[260px] w-[260px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.05) 35%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,5,15,0.24) 0%, rgba(10,5,15,0.62) 58%, rgba(10,5,15,0.88) 100%)",
          }}
        />
      </div>

      {/* ── Page content ── */}
      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-5 pb-8 pt-12">
        <div className="flex-1">

          {/* Eyebrow label — no step counter, no progress bar */}
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.textMuted }}
          >
            {eyebrow}
          </p>

          <h1
            className="mt-3 text-[30px] font-bold tracking-tight leading-tight"
            style={{
              color: theme.textPrimary,
              fontFamily: "'Playfair Display', Georgia, serif",
              textShadow: "0 4px 24px rgba(244,63,94,0.10)",
            }}
          >
            {title}
          </h1>

          <p
            className="mt-3 text-sm leading-6"
            style={{ color: theme.textMuted }}
          >
            {description}
          </p>

          {/* ── Live preview card ── */}
          <div
            className="relative mt-6 overflow-hidden rounded-3xl border p-4 backdrop-blur-md"
            style={{
              background: `
                linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025)),
                ${theme.cardBg}
              `,
              border: `1px solid ${theme.cardBorder}`,
              boxShadow: `
                0 14px 40px rgba(0,0,0,0.18),
                0 0 40px rgba(244,63,94,0.06),
                inset 0 1px 0 rgba(255,255,255,0.04)
              `,
            }}
          >
            <div
              aria-hidden
              className="absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(244,63,94,0.14), transparent 70%)",
              }}
            />

            <div className="flex items-start gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                  color: theme.accent,
                  border: `1px solid ${theme.cardBorder}`,
                  boxShadow: "0 8px 18px rgba(0,0,0,0.14)",
                }}
              >
                <Sparkles size={18} />
              </div>

              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  {previewTitle}
                </p>
                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: theme.textMuted }}
                >
                  {previewDescription}
                </p>
              </div>
            </div>

            <div
              className="mt-4 rounded-2xl border p-4"
              style={{
                border: `1px solid ${theme.cardBorder}`,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.025))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: theme.textMuted }}
              >
                {sampleLabel}
              </p>
              <p
                className="mt-2 text-sm font-medium"
                style={{ color: theme.textPrimary }}
              >
                {sampleTitle}
              </p>
              <p
                className="mt-1 text-sm leading-6"
                style={{ color: theme.textSecondary }}
              >
                {sampleBody}
              </p>
            </div>
          </div>

          {/* ── Theme picker ── */}
          <div className="mt-6">
            <ThemePicker />
          </div>
        </div>

        {/* ── CTA ── */}
        <button
          onClick={handleContinue}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
          style={{
            background: theme.btnPrimaryBg,
            color: theme.btnPrimaryText,
            boxShadow: `0 8px 28px ${theme.btnPrimaryGlow}`,
          }}
        >
          {continueLabel}
          <ArrowRight size={16} />
        </button>
      </main>
    </div>
  );
}
