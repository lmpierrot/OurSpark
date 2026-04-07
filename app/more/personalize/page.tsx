"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/shared/app-shell";
import { ThemePicker } from "@/components/settings/theme-picker";
import { AvatarPicker } from "@/components/settings/avatar-picker";
import { WritingStylePicker } from "@/components/settings/writing-style-picker";
import { GradientCard } from "@/components/ui/gradient-card";
import { useTheme } from "@/components/providers/theme-provider";
import {
  ArrowLeft,
  Sparkles,
  Languages,
  MapPin,
} from "lucide-react";

type LanguageOption =
  | "english"
  | "french"
  | "spanish"
  | "haitian-creole"
  | "portuguese";

export default function PersonalizePage() {
  const { theme } = useTheme();

  const [language, setLanguage] = useState<LanguageOption>("english");
  const [location, setLocation] = useState("Miami, Florida");

  return (
    <AppShell>
      <div className="space-y-6">
        <Link
          href="/more/settings"
          className="inline-flex items-center gap-1 text-sm"
          style={{ color: theme.textMuted }}
        >
          <ArrowLeft size={16} /> Settings
        </Link>

        <section>
          <h1 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
            Personalize
          </h1>
          <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
            Make OurSparks feel like yours.
          </p>
        </section>

        <GradientCard glowColor="rgba(244,63,94,.10)">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: theme.accent,
                }}
              >
                <Sparkles size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                  Live Feel Preview
                </p>
                <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>
                  Your theme and writing style shape the app’s mood.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl border p-4"
              style={{
                borderColor: theme.cardBorder,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: theme.textPrimary }}
              >
                A soft space for connection, memories, and shared growth.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <SmallTag text={language.replace("-", " ")} theme={theme} />
                <SmallTag text={location} theme={theme} />
              </div>
            </div>
          </div>
        </GradientCard>

        <SettingsBlock
          title="Theme"
          subtitle="Choose the mood and look of your shared space."
          theme={theme}
        >
          <ThemePicker />
        </SettingsBlock>

        <SettingsBlock
          title="Avatar"
          subtitle="Pick something playful or upload something personal."
          theme={theme}
        >
          <AvatarPicker />
        </SettingsBlock>

        <SettingsBlock
          title="Writing Style"
          subtitle="Shape how the app talks, prompts, and writes to you."
          theme={theme}
        >
          <WritingStylePicker />
        </SettingsBlock>

        <SettingsBlock
          title="Language"
          subtitle="Choose how the app speaks to you."
          theme={theme}
        >
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "English", value: "english" },
              { label: "French", value: "french" },
              { label: "Spanish", value: "spanish" },
              { label: "Haitian Creole", value: "haitian-creole" },
              { label: "Portuguese", value: "portuguese" },
            ].map((item) => (
              <SelectCard
                key={item.value}
                active={language === item.value}
                onClick={() => setLanguage(item.value as LanguageOption)}
                icon={<Languages size={16} />}
                label={item.label}
                theme={theme}
              />
            ))}
          </div>
        </SettingsBlock>

        <SettingsBlock
          title="Location"
          subtitle="Used for date ideas, memory places, local planning, and timing."
          theme={theme}
        >
          <div className="relative">
            <MapPin
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: theme.textMuted }}
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city or location"
              className="w-full rounded-2xl border bg-transparent py-3 pl-11 pr-4 text-sm outline-none"
              style={{
                borderColor: theme.cardBorder,
                color: theme.textPrimary,
              }}
            />
          </div>
        </SettingsBlock>
      </div>
    </AppShell>
  );
}

function SettingsBlock({
  title,
  subtitle,
  children,
  theme,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  theme: any;
}) {
  return (
    <GradientCard className="px-4 py-4">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
            {title}
          </p>
          <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </GradientCard>
  );
}

function SelectCard({
  active,
  onClick,
  icon,
  label,
  theme,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  theme: any;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border px-4 py-3 text-left transition"
      style={{
        borderColor: active ? theme.accent : theme.cardBorder,
        background: active ? "rgba(255,255,255,0.05)" : "transparent",
        color: active ? theme.textPrimary : theme.textSecondary,
      }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: theme.accent }}>{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </button>
  );
}

function SmallTag({ text, theme }: { text: string; theme: any }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wide"
      style={{
        background: "rgba(255,255,255,0.05)",
        color: theme.textMuted,
      }}
    >
      {text}
    </span>
  );
}
