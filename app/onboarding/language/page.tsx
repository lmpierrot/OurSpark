"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { getOnboardingData, saveOnboardingData } from "@/lib/onboarding";

type LanguageCode = "en" | "fr" | "es" | "ht";

const LANGUAGES: {
  code: LanguageCode;
  name: string;
  native: string;
  accent: {
    from: string;
    to: string;
    glow: string;
    soft: string;
    border: string;
    orb: string;
  };
}[] = [
  {
    code: "en",
    name: "English",
    native: "English",
    accent: {
      from: "#ec4899",
      to: "#a855f7",
      glow: "rgba(236,72,153,0.35)",
      soft: "rgba(236,72,153,0.16)",
      border: "rgba(236,72,153,0.34)",
      orb: "rgba(236,72,153,0.20)",
    },
  },
  {
    code: "fr",
    name: "French",
    native: "Français",
    accent: {
      from: "#8b5cf6",
      to: "#6366f1",
      glow: "rgba(139,92,246,0.35)",
      soft: "rgba(139,92,246,0.16)",
      border: "rgba(139,92,246,0.34)",
      orb: "rgba(139,92,246,0.20)",
    },
  },
  {
    code: "es",
    name: "Spanish",
    native: "Español",
    accent: {
      from: "#f97316",
      to: "#ef4444",
      glow: "rgba(249,115,22,0.35)",
      soft: "rgba(249,115,22,0.16)",
      border: "rgba(249,115,22,0.34)",
      orb: "rgba(249,115,22,0.20)",
    },
  },
  {
    code: "ht",
    name: "Haitian Creole",
    native: "Kreyòl Ayisyen",
    accent: {
      from: "#06b6d4",
      to: "#3b82f6",
      glow: "rgba(6,182,212,0.35)",
      soft: "rgba(6,182,212,0.16)",
      border: "rgba(6,182,212,0.34)",
      orb: "rgba(6,182,212,0.20)",
    },
  },
];

function initLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";
  const saved = getOnboardingData().language;
  return saved ?? "en";
}

function isRenderableText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default function LanguagePage() {
  const router = useRouter();
  const { t, setLocale } = useI18n();

  const [selected, setSelected] = useState<LanguageCode>(initLanguage);

  const getText = (namespace: string, key: string, fallback: string) => {
    const value = t(namespace, key);
    if (isRenderableText(value) && value !== key) return value;
    return fallback;
  };

  const title = getText(
    "onboarding",
    "language.title",
    "Choose your language"
  );

  const subtitle = getText(
    "onboarding",
    "language.subtitle",
    "We’ll keep everything in your preferred language"
  );

  const continueLabel = getText(
    "common",
    "buttons.continue",
    "Continue"
  );

  const activeLanguage =
    LANGUAGES.find((lang) => lang.code === selected) ?? LANGUAGES[0];

  const handleSelect = (code: LanguageCode) => {
    setSelected(code);
    setLocale(code);
  };

  const handleContinue = () => {
    saveOnboardingData({ language: selected });
    router.push("/onboarding/intro");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0b0610]">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          key={`orb-top-${selected}`}
          initial={{ opacity: 0.45, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[-18%] left-[-10%] w-[74vw] h-[74vw] rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${activeLanguage.accent.orb} 0%, transparent 68%)`,
          }}
        />

        <motion.div
          key={`orb-bottom-${selected}`}
          initial={{ opacity: 0.35, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[-14%] right-[-12%] w-[66vw] h-[66vw] rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${activeLanguage.accent.glow} 0%, transparent 70%)`,
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,5,14,0.72)_0%,rgba(12,6,18,0.94)_100%)]" />

        <motion.div
          key={`sheen-${selected}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${activeLanguage.accent.soft}, transparent 38%, rgba(255,255,255,0.02) 58%, transparent 82%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col min-h-screen py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-4"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="relative w-14 h-14 rounded-[20px] flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${activeLanguage.accent.from}, ${activeLanguage.accent.to})`,
                boxShadow: `
                  0 18px 40px ${activeLanguage.accent.glow},
                  inset 0 1px 1px rgba(255,255,255,0.35),
                  inset 0 -10px 20px rgba(0,0,0,0.25)
                `,
              }}
            >
              <div className="absolute inset-[1px] rounded-[19px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_45%,rgba(0,0,0,0.18)_100%)]" />
              <span className="relative text-xl text-white" aria-hidden="true">
                ✦
              </span>
            </div>
          </motion.div>

          <h1
            className="text-3xl font-semibold mb-2 tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {title}
          </h1>

          <p className="text-sm font-light leading-relaxed text-white/50">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14, duration: 0.45 }}
          className="flex-1 space-y-3"
          role="radiogroup"
          aria-label="Language selection"
        >
          {LANGUAGES.map((lang, index) => {
            const isSelected = selected === lang.code;

            return (
              <motion.button
                key={lang.code}
                type="button"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1 + index * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handleSelect(lang.code)}
                whileTap={{ scale: 0.985 }}
                role="radio"
                aria-checked={isSelected}
                aria-label={lang.name}
                className="relative w-full text-left rounded-2xl px-5 py-4 overflow-hidden transition-all duration-300"
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${lang.accent.soft}, rgba(255,255,255,0.04))`
                    : "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.03))",
                  border: isSelected
                    ? `1px solid ${lang.accent.border}`
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isSelected
                    ? `0 18px 40px ${lang.accent.glow}, inset 0 1px 0 rgba(255,255,255,0.16)`
                    : "0 10px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
                  transform: isSelected ? "translateY(-1px)" : "translateY(0px)",
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_35%,rgba(0,0,0,0.16)_100%)]" />

                {isSelected && (
                  <motion.div
                    layoutId="language-active-glow"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(90deg, ${lang.accent.soft}, transparent 70%)`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 30,
                    }}
                  />
                )}

                <div className="relative flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-base font-medium leading-tight transition-colors"
                      style={{
                        color: isSelected ? "#ffffff" : "rgba(255,255,255,0.82)",
                        textShadow: isSelected
                          ? "0 0 16px rgba(255,255,255,0.10)"
                          : "none",
                      }}
                    >
                      {lang.native}
                    </div>

                    {lang.native !== lang.name && (
                      <div className="text-xs mt-1 leading-tight text-white/38">
                        {lang.name}
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {isSelected ? (
                      <motion.div
                        key={`selected-${lang.code}`}
                        initial={{ scale: 0.7, opacity: 0, rotate: -12 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.7, opacity: 0, rotate: 12 }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 24,
                        }}
                        className="relative w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${lang.accent.from}, ${lang.accent.to})`,
                          boxShadow: `
                            0 8px 18px ${lang.accent.glow},
                            inset 0 1px 1px rgba(255,255,255,0.32),
                            inset 0 -6px 12px rgba(0,0,0,0.22)
                          `,
                        }}
                        aria-hidden="true"
                      >
                        <Check size={13} color="white" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`unselected-${lang.code}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-6 h-6 rounded-full shrink-0"
                        style={{
                          border: "1px solid rgba(255,255,255,0.08)",
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -4px 10px rgba(0,0,0,0.18)",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="pt-6"
        >
          <motion.button
            type="button"
            onClick={handleContinue}
            whileTap={{ scale: 0.975 }}
            whileHover={{ scale: 1.01 }}
            className="relative w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-base overflow-hidden text-white"
            style={{
              background: `linear-gradient(90deg, ${activeLanguage.accent.from}, ${activeLanguage.accent.to})`,
              boxShadow: `
                0 18px 42px ${activeLanguage.accent.glow},
                inset 0 1px 1px rgba(255,255,255,0.28),
                inset 0 -10px 18px rgba(0,0,0,0.22)
              `,
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04)_38%,rgba(0,0,0,0.16)_100%)]" />
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(90deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]" />
            <span className="relative">{continueLabel}</span>
            <ChevronRight size={18} className="relative" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
