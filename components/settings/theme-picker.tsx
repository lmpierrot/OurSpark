"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { Check } from "lucide-react";
import type { SparkTheme } from "@/lib/themes";

export function ThemePicker() {
  const { theme: current, setThemeId, allThemes } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-3">
      {allThemes.map((t) => (
        <ThemeCard
          key={t.id}
          theme={t}
          isActive={current.id === t.id}
          onSelect={() => setThemeId(t.id)}
        />
      ))}
    </div>
  );
}

function ThemeCard({
  theme,
  isActive,
  onSelect,
}: {
  theme: SparkTheme;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-2xl p-3 text-left
        transition-all duration-300
        ${isActive ? "scale-[1.02]" : "active:scale-[0.97]"}
      `}
      style={{
        background: theme.cardBg,
        border: isActive
          ? `2px solid ${theme.accent}`
          : `1px solid ${theme.cardBorder}`,
        boxShadow: isActive
          ? `0 0 20px ${theme.accentGlow}, 0 0 40px ${theme.accentGlow}`
          : "none",
      }}
    >
      {/* Preview gradient swatch */}
      <div
        className="mb-3 h-16 w-full rounded-xl"
        style={{ background: theme.preview }}
      />

      {/* Accent dot row */}
      <div className="mb-2 flex gap-1.5">
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: theme.accent }}
        />
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: theme.secondary }}
        />
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: theme.avatarRingA }}
        />
      </div>

      {/* Label */}
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{theme.emoji}</span>
        <span
          className="text-xs font-semibold"
          style={{ color: theme.textPrimary }}
        >
          {theme.name}
        </span>
      </div>
      <p
        className="mt-0.5 text-[10px]"
        style={{ color: theme.textMuted }}
      >
        {theme.description}
      </p>

      {/* Active check */}
      {isActive && (
        <div
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full"
          style={{ background: theme.accent }}
        >
          <Check size={14} color="#fff" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}
