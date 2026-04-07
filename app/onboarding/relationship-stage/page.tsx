"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import {
  getOnboardingData,
  saveOnboardingData,
  type RelationshipStage,
} from "@/lib/onboarding";

const STAGES: {
  id: RelationshipStage;
  emoji: string;
  i18nKey: string;
  fallbackTitle: string;
  fallbackDescription: string;
  accent: {
    glow: string;
    border: string;
    soft: string;
    solid: string;
    ring: string;
    buttonTo: string;
  };
}[] = [
  {
    id: "getting-to-know",
    emoji: "🌱",
    i18nKey: "gettingToKnow",
    fallbackTitle: "Getting to know each other",
    fallbackDescription: "We are new and still discovering each other",
    accent: {
      glow: "rgba(34, 197, 94, 0.22)",
      border: "rgba(34, 197, 94, 0.30)",
      soft: "rgba(34, 197, 94, 0.14)",
      solid: "#22c55e",
      ring: "rgba(134, 239, 172, 0.30)",
      buttonTo: "#16a34a",
    },
  },
  {
    id: "dating",
    emoji: "💞",
    i18nKey: "dating",
    fallbackTitle: "Dating",
    fallbackDescription: "We are committed and growing together",
    accent: {
      glow: "rgba(236, 72, 153, 0.22)",
      border: "rgba(236, 72, 153, 0.30)",
      soft: "rgba(236, 72, 153, 0.14)",
      solid: "#ec4899",
      ring: "rgba(249, 168, 212, 0.30)",
      buttonTo: "#db2777",
    },
  },
  {
    id: "boyfriend-girlfriend",
    emoji: "🥰",
    i18nKey: "boyfriendGirlfriend",
    fallbackTitle: "Boyfriend & Girlfriend",
    fallbackDescription: "We are officially together",
    accent: {
      glow: "rgba(249, 115, 22, 0.22)",
      border: "rgba(249, 115, 22, 0.30)",
      soft: "rgba(249, 115, 22, 0.14)",
      solid: "#f97316",
      ring: "rgba(253, 186, 116, 0.30)",
      buttonTo: "#ea580c",
    },
  },
  {
    id: "engaged",
    emoji: "💍",
    i18nKey: "engaged",
    fallbackTitle: "Engaged",
    fallbackDescription: "We said yes and are planning our future",
    accent: {
      glow: "rgba(59, 130, 246, 0.22)",
      border: "rgba(59, 130, 246, 0.30)",
      soft: "rgba(59, 130, 246, 0.14)",
      solid: "#3b82f6",
      ring: "rgba(147, 197, 253, 0.30)",
      buttonTo: "#2563eb",
    },
  },
  {
    id: "married",
    emoji: "✦",
    i18nKey: "married",
    fallbackTitle: "Married",
    fallbackDescription: "We are building a life together",
    accent: {
      glow: "rgba(234, 179, 8, 0.22)",
      border: "rgba(234, 179, 8, 0.30)",
      soft: "rgba(234, 179, 8, 0.14)",
      solid: "#eab308",
      ring: "rgba(253, 224, 71, 0.30)",
      buttonTo: "#ca8a04",
    },
  },
  {
    id: "long-distance",
    emoji: "🌍",
    i18nKey: "longDistance",
    fallbackTitle: "Long distance",
    fallbackDescription: "Miles apart but close at heart",
    accent: {
      glow: "rgba(6, 182, 212, 0.22)",
      border: "rgba(6, 182, 212, 0.30)",
      soft: "rgba(6, 182, 212, 0.14)",
      solid: "#06b6d4",
      ring: "rgba(103, 232, 249, 0.30)",
      buttonTo: "#0891b2",
    },
  },
  {
    id: "rebuilding",
    emoji: "🔥",
    i18nKey: "rebuilding",
    fallbackTitle: "Rebuilding",
    fallbackDescription: "We are working through something and growing stronger",
    accent: {
      glow: "rgba(239, 68, 68, 0.22)",
      border: "rgba(239, 68, 68, 0.30)",
      soft: "rgba(239, 68, 68, 0.14)",
      solid: "#ef4444",
      ring: "rgba(252, 165, 165, 0.30)",
      buttonTo: "#dc2626",
    },
  },
];

function isRenderableText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default function RelationshipStagePage() {
  const router = useRouter();
  const { t } = useI18n();

  const [selected, setSelected] = useState<RelationshipStage | null>(
    () => getOnboardingData().relationshipStage ?? null
  );

  const getText = (namespace: string, key: string, fallback: string) => {
    const value = t(namespace, key);
    if (isRenderableText(value) && value !== key) return value;
    return fallback;
  };

  const pageTitle = getText(
    "onboarding",
    "relationshipStage.title",
    "Where are you two?"
  );

  const pageSubtitle = getText(
    "onboarding",
    "relationshipStage.subtitle",
    "Your experience will be tailored to your stage"
  );

  const continueLabel = getText("common", "buttons.continue", "Continue");

  const resolvedStages = useMemo(
    () =>
      STAGES.map((stage) => ({
        ...stage,
        title: getText(
          "onboarding",
          `relationshipStage.options.${stage.i18nKey}.title`,
          stage.fallbackTitle
        ),
        description: getText(
          "onboarding",
          `relationshipStage.options.${stage.i18nKey}.description`,
          stage.fallbackDescription
        ),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const activeStage = resolvedStages.find((stage) => stage.id === selected);

  const handleContinue = () => {
    if (!selected) return;
    saveOnboardingData({ relationshipStage: selected });
    router.push("/onboarding/theme");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#0a050f]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[5%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,_rgba(244,63,94,0.12)_0%,_transparent_70%)]" />
        <div className="absolute bottom-[-5%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.10)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,5,15,0.68)_0%,rgba(10,5,15,0.96)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col min-h-screen pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 mb-10"
          role="progressbar"
          aria-valuenow={2}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Step 2 of 3"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                flex: i <= 1 ? 2 : 1,
                background:
                  i <= 1
                    ? "linear-gradient(90deg, #f43f5e, #a855f7)"
                    : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1
            className="text-3xl font-semibold text-white mb-2 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {pageTitle}
          </h1>
          <p className="text-white/40 text-sm">{pageSubtitle}</p>
        </motion.div>

        <div
          className="flex flex-col gap-3 flex-1 overflow-y-auto pb-2"
          role="radiogroup"
          aria-label="Relationship stage"
        >
          {resolvedStages.map((stage, i) => {
            const isSelected = selected === stage.id;

            return (
              <motion.button
                key={stage.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 + i * 0.05,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setSelected(stage.id)}
                role="radio"
                aria-checked={isSelected}
                aria-label={stage.title}
                className="relative w-full text-left rounded-2xl p-4 overflow-hidden transition-all duration-300"
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${stage.accent.soft}, rgba(255,255,255,0.03))`
                    : "rgba(255,255,255,0.04)",
                  border: isSelected
                    ? `1px solid ${stage.accent.border}`
                    : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isSelected
                    ? `0 0 0 1px ${stage.accent.ring}, 0 0 26px ${stage.accent.glow}`
                    : "none",
                }}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(90deg, ${stage.accent.soft}, transparent)`,
                      }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative flex items-center gap-4">
                  <motion.div
                    animate={{ scale: isSelected ? 1.03 : 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${stage.accent.soft}, rgba(255,255,255,0.06))`
                        : "rgba(255,255,255,0.05)",
                      border: isSelected
                        ? `1px solid ${stage.accent.border}`
                        : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: isSelected
                        ? `0 0 14px ${stage.accent.glow}`
                        : "none",
                    }}
                    aria-hidden="true"
                  >
                    {stage.emoji}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="block text-sm font-medium transition-colors duration-200"
                      style={{
                        color: isSelected ? "#ffffff" : "rgba(255,255,255,0.82)",
                      }}
                    >
                      {stage.title}
                    </span>

                    <span className="block text-xs mt-0.5 leading-snug text-white/38">
                      {stage.description}
                    </span>
                  </div>

                  <motion.div
                    animate={{ scale: isSelected ? 1 : 0.96 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${stage.accent.solid}, ${stage.accent.buttonTo})`
                        : "rgba(255,255,255,0.06)",
                      border: isSelected
                        ? "none"
                        : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: isSelected
                        ? `0 0 12px ${stage.accent.glow}`
                        : "none",
                    }}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="pt-6"
        >
          <motion.button
            type="button"
            onClick={handleContinue}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            disabled={!selected}
            className="relative w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-white text-base disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group"
            style={{
              background: activeStage
                ? `linear-gradient(90deg, ${activeStage.accent.solid}, ${activeStage.accent.buttonTo})`
                : "linear-gradient(90deg, #f43f5e, #a855f7)",
              boxShadow: activeStage
                ? `0 8px 32px ${activeStage.accent.glow}`
                : "0 8px 32px rgba(236,72,153,0.35)",
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
            <span className="relative">{continueLabel}</span>
            <ChevronRight size={18} className="relative" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
