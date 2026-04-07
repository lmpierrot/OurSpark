"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

const STORAGE_KEY = "oursparks-writing-style";

export interface WritingStyle {
  id: string;
  emoji: string;
  name: string;
  description: string;
  sample: string;
}

export const WRITING_STYLES: WritingStyle[] = [
  {
    id: "warm",
    emoji: "💕",
    name: "Warm & Sweet",
    description: "Gentle, affectionate, heartfelt",
    sample: "Hey love, here\u2019s something beautiful to think about together\u2026",
  },
  {
    id: "playful",
    emoji: "😏",
    name: "Playful & Flirty",
    description: "Fun, teasing, lighthearted",
    sample: "Okay you two, let\u2019s see who knows each other best!",
  },
  {
    id: "deep",
    emoji: "🌙",
    name: "Deep & Thoughtful",
    description: "Reflective, intimate, meaningful",
    sample: "Take a moment together. This question goes beneath the surface\u2026",
  },
  {
    id: "direct",
    emoji: "💬",
    name: "Straight Talk",
    description: "Clear, honest, no-nonsense",
    sample: "Here\u2019s today\u2019s question. Be real with each other.",
  },
  {
    id: "poetic",
    emoji: "✨",
    name: "Poetic & Romantic",
    description: "Lyrical, dreamy, expressive",
    sample: "Like stars drawn together by gravity, this question pulls you closer\u2026",
  },
];

export function WritingStylePicker() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState("warm");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setSelected(saved);
  }, []);

  function select(id: string) {
    setSelected(id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  return (
    <div>
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-widest"
        style={{ color: theme.textMuted }}
      >
        Writing style
      </p>

      <div className="grid gap-2">
        {WRITING_STYLES.map((style) => {
          const isActive = selected === style.id;
          return (
            <button
              key={style.id}
              onClick={() => select(style.id)}
              className="relative rounded-2xl p-4 text-left transition-all duration-200 active:scale-[0.98]"
              style={{
                background: isActive ? theme.cardBg : "transparent",
                border: isActive
                  ? `2px solid ${theme.accent}`
                  : `1px solid ${theme.cardBorder}`,
                boxShadow: isActive
                  ? `0 0 16px ${theme.accentGlow}`
                  : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{style.emoji}</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  {style.name}
                </span>
              </div>
              <p
                className="mt-0.5 text-xs"
                style={{ color: theme.textMuted }}
              >
                {style.description}
              </p>
              <p
                className="mt-2 text-xs italic"
                style={{ color: theme.textSecondary, opacity: 0.7 }}
              >
                &ldquo;{style.sample}&rdquo;
              </p>

              {isActive && (
                <div
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: theme.accent }}
                >
                  <Check size={12} color="#fff" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function getSavedWritingStyle(): string {
  if (typeof window === "undefined") return "warm";
  return localStorage.getItem(STORAGE_KEY) ?? "warm";
}
