"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, MessageCircle, ChevronRight } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import {
  getOnboardingData,
  saveOnboardingData,
  generatePartnerCode,
} from "@/lib/onboarding";
import { getDictionary, getDictionaryValue } from "@/lib/i18n";
import type { AppLanguage } from "@/lib/i18n";

/* ── Read language from the single onboarding blob ─────────────────────────
   The user picks their language at app/onboarding/language/page.tsx
   which saves it to localStorage key "oursparks_onboarding" as { language: "en"|"fr"|"es"|"ht" }
   We read it here directly so this page always reflects the chosen language
   regardless of whether the i18n provider has already initialized.
────────────────────────────────────────────────────────────────────────── */
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

function initCode(): string {
  if (typeof window === "undefined") return "";
  const existing = getOnboardingData().partnerCode;
  if (existing) return existing;
  const newCode = generatePartnerCode();
  saveOnboardingData({ partnerCode: newCode });
  return newCode;
}

function isRenderableText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default function PartnerPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t: tProvider } = useI18n();

  /* ── Language-aware dictionary ──────────────────────────────────────────── */
  const lang = useMemo(readStoredLanguage, []);
  const dict = useMemo(() => getDictionary(lang), [lang]);

  // Resolve: local dict first → i18n provider fallback → hardcoded fallback
  const getText = (namespace: "onboarding" | "common", key: string, fallback: string): string => {
    const val = getDictionaryValue(dict, namespace, key);
    if (isRenderableText(val)) return val;
    const pv = tProvider(namespace, key);
    if (isRenderableText(pv) && pv !== key) return pv;
    return fallback;
  };

  /* ── Component state — untouched ────────────────────────────────────────── */
  const [code] = useState<string>(initCode);
  const [copied, setCopied] = useState(false);
  const [partnerCode, setPartnerCode] = useState("");
  const [mode, setMode] = useState<"share" | "join">("share");

  /* ── All translated strings ─────────────────────────────────────────────── */
  const text = useMemo(
    () => ({
      title:                  getText("onboarding", "partner.title",                "Connect with your partner"),
      subtitle:               getText("onboarding", "partner.subtitle",             "Share your code or enter theirs"),
      shareTab:               getText("onboarding", "partner.shareTab",             "Share my code"),
      joinTab:                getText("onboarding", "partner.joinTab",              "I have a code"),
      inviteCodeLabel:        getText("onboarding", "partner.inviteCodeLabel",      "Your invite code"),
      codeExpiry:             getText("onboarding", "partner.codeExpiry",           "This code expires in 48 hours"),
      sendToPartner:          getText("onboarding", "partner.sendToPartner",        "Send to my partner"),
      inviteLater:            getText("onboarding", "partner.inviteLater",          "I\u2019ll invite them later"),
      continueCta:            getText("onboarding", "partner.continueCta",          "Go to my space"),
      partnerCodeLabel:       getText("onboarding", "partner.partnerCodeLabel",     "Partner\u2019s code"),
      partnerCodePlaceholder: getText("onboarding", "partner.partnerCodePlaceholder","SPARK-XXXXXX"),
      joinCta:                getText("onboarding", "partner.joinCta",              "Continue"),
      copyCode:               getText("onboarding", "partner.copyCode",             "Copy code"),
      copied:                 getText("onboarding", "partner.copied",               "Copied!"),
      shareMessageTitle:      getText("onboarding", "partner.shareMessageTitle",    "Join me on OurSparks"),
      shareMessageBody:       getText("onboarding", "partner.shareMessageBody",     "Use my code to connect:"),
      joinHint:               getText("onboarding", "partner.joinHint",             "Enter the code your partner shared with you to connect your spaces."),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]  // re-derive only when language changes, not on every render
  );

  /* ── Handlers — untouched ───────────────────────────────────────────────── */
  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async () => {
    if (!code) return;
    const shareText = `${text.shareMessageBody} ${code}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: text.shareMessageTitle, text: shareText });
      } else {
        await handleCopy();
      }
    } catch {
      // user cancelled or sharing failed — do nothing noisy
    }
  };

  const handleContinue = () => {
    router.push("/onboarding/welcome");
  };

  const handleJoinWithCode = () => {
    if (!partnerCode.trim()) return;
    saveOnboardingData({ partnerCode: partnerCode.trim().toUpperCase() });
    router.push("/onboarding/welcome");
  };

  /* ── JSX — layout and vibe untouched ────────────────────────────────────── */
  return (
    <div
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{ background: theme.bgBase }}
    >
      {/* Base themed background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            theme.bgGradientA,
            theme.bgGradientB,
            theme.bgGradientC,
            theme.bgLinear,
          ].join(", "),
        }}
      />

      {/* Romantic glow overlays */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[2%] w-[78vw] h-[78vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(244,63,94,0.18) 0%, rgba(244,63,94,0.10) 28%, transparent 72%)",
          }}
        />
        <div
          className="absolute top-[18%] right-[-14%] w-[68vw] h-[68vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.08) 30%, transparent 74%)",
          }}
        />
        <div
          className="absolute bottom-[-12%] right-[0%] w-[72vw] h-[72vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(99,102,241,0.06) 28%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,5,15,0.30) 0%, rgba(10,5,15,0.72) 56%, rgba(10,5,15,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col min-h-screen pt-16 pb-12">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 mb-10"
          role="progressbar"
          aria-valuenow={3}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Step 3 of 3"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 rounded-full flex-1"
              style={{
                background:
                  "linear-gradient(90deg, rgba(244,63,94,0.95), rgba(217,70,239,0.95), rgba(168,85,247,0.95))",
                boxShadow:
                  i === 1
                    ? "0 0 12px rgba(244,63,94,0.35), 0 0 18px rgba(168,85,247,0.20)"
                    : "0 0 10px rgba(244,63,94,0.18)",
              }}
            />
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1
            className="text-3xl font-semibold mb-2 tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: theme.textPrimary,
              textShadow: "0 2px 18px rgba(244,63,94,0.10)",
            }}
          >
            {text.title}
          </h1>
          <p className="text-sm" style={{ color: theme.textMuted }}>
            {text.subtitle}
          </p>
        </motion.div>

        {/* Mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="mb-8"
        >
          <div
            role="group"
            aria-label="Connection mode"
            className="relative flex p-1 rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
              border: `1px solid ${theme.cardBorder}`,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.18)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(244,63,94,0.05), rgba(168,85,247,0.04), transparent)",
              }}
            />
            {(["share", "join"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-current={mode === m ? "true" : undefined}
                aria-label={m === "share" ? text.shareTab : text.joinTab}
                className="relative flex-1 h-11 rounded-xl text-sm font-medium transition-colors duration-200"
              >
                {mode === m && (
                  <motion.div
                    layoutId="partner-mode-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(244,63,94,0.26), rgba(168,85,247,0.18))",
                      border: "1px solid rgba(244,63,94,0.28)",
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.03) inset, 0 8px 24px rgba(244,63,94,0.16)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className="relative transition-colors duration-200"
                  style={{
                    color: mode === m ? theme.textPrimary : "rgba(255,255,255,0.42)",
                  }}
                >
                  {m === "share" ? text.shareTab : text.joinTab}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "share" ? (
            <motion.div
              key="share"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5 flex-1"
            >
              {/* Invite card */}
              <div
                className="relative rounded-3xl p-6 overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, rgba(244,63,94,0.12), rgba(168,85,247,0.10)),
                    linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))
                  `,
                  border: "1px solid rgba(244,63,94,0.22)",
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.03) inset,
                    0 18px 50px rgba(10,5,15,0.34),
                    0 0 42px rgba(244,63,94,0.12),
                    0 0 64px rgba(168,85,247,0.08)
                  `,
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute -top-4 -right-3 w-24 h-24 rounded-full blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(244,63,94,0.20), rgba(168,85,247,0.10), transparent 70%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute left-[-10%] bottom-[-20%] w-32 h-32 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)",
                  }}
                />

                <p
                  className="text-xs uppercase tracking-[0.2em] mb-3"
                  style={{ color: theme.textMuted }}
                >
                  {text.inviteCodeLabel}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-2xl sm:text-[30px] font-semibold tracking-[0.15em]"
                    style={{
                      color: theme.textPrimary,
                      textShadow: "0 1px 14px rgba(255,255,255,0.04)",
                    }}
                  >
                    {code}
                  </span>

                  <motion.button
                    type="button"
                    onClick={handleCopy}
                    whileTap={{ scale: 0.92 }}
                    aria-label={copied ? text.copied : text.copyCode}
                    className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow:
                        "0 6px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <Check size={15} className="text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Copy size={15} style={{ color: "rgba(255,255,255,0.66)" }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                <p className="text-xs mt-3" style={{ color: theme.textMuted }}>
                  {text.codeExpiry}
                </p>
              </div>

              {/* Share button */}
              <motion.button
                type="button"
                onClick={handleShare}
                whileTap={{ scale: 0.97 }}
                className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 text-sm font-medium transition-colors"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.03))",
                  border: `1px solid ${theme.cardBorder}`,
                  color: theme.textSecondary,
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                <MessageCircle size={17} style={{ color: "#f9a8d4" }} />
                {text.sendToPartner}
              </motion.button>

              <div className="flex-1" />

              <button
                type="button"
                onClick={handleContinue}
                className="text-center text-sm transition-colors"
                style={{ color: theme.textMuted }}
              >
                {text.inviteLater}
              </button>

              {/* Main CTA */}
              <motion.button
                type="button"
                onClick={handleContinue}
                whileTap={{ scale: 0.97 }}
                className="relative w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-base overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(90deg, #f43f5e 0%, #d946ef 52%, #8b5cf6 100%)",
                  color: "#ffffff",
                  boxShadow:
                    "0 12px 36px rgba(236,72,153,0.30), 0 8px 20px rgba(168,85,247,0.18)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.12), transparent 30%, transparent 70%, rgba(255,255,255,0.08))",
                  }}
                />
                <span className="relative">{text.continueCta}</span>
                <ChevronRight size={18} className="relative" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="join"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5 flex-1"
            >
              <div>
                <label
                  htmlFor="partner-code-input"
                  className="block text-xs mb-2 ml-1 uppercase tracking-[0.18em]"
                  style={{ color: theme.textMuted }}
                >
                  {text.partnerCodeLabel}
                </label>

                <input
                  id="partner-code-input"
                  type="text"
                  value={partnerCode}
                  onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                  placeholder={text.partnerCodePlaceholder}
                  maxLength={12}
                  autoFocus
                  className="w-full h-14 rounded-2xl px-5 text-base text-center tracking-[0.15em] focus:outline-none transition-all uppercase"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
                    border: `1px solid ${theme.cardBorder}`,
                    color: theme.textPrimary,
                    boxShadow:
                      "0 14px 34px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.03)",
                  }}
                />
              </div>

              <div
                className="rounded-3xl p-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(244,63,94,0.08), rgba(168,85,247,0.07))",
                  border: "1px solid rgba(244,63,94,0.16)",
                  boxShadow:
                    "0 12px 28px rgba(0,0,0,0.12), 0 0 28px rgba(244,63,94,0.07)",
                }}
              >
                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                  {text.joinHint}
                </p>
              </div>

              <div className="flex-1" />

              <motion.button
                type="button"
                onClick={handleJoinWithCode}
                whileTap={{ scale: 0.97 }}
                disabled={!partnerCode.trim()}
                className="relative w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-base disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
                style={{
                  background:
                    "linear-gradient(90deg, #f43f5e 0%, #d946ef 52%, #8b5cf6 100%)",
                  color: "#ffffff",
                  boxShadow:
                    "0 12px 36px rgba(236,72,153,0.30), 0 8px 20px rgba(168,85,247,0.18)",
                }}
              >
                <span className="relative">{text.joinCta}</span>
                <ChevronRight size={18} className="relative" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
