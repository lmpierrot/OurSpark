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
  Palette,
  UserCircle2,
  PenSquare,
} from "lucide-react";

type LanguageOption =
  | "english"
  | "french"
  | "spanish"
  | "haitian-creole"
  | "portuguese";

export default function ThemeSettingsPage() {
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

        {/* Preview */}
        <GradientCard glowColor="rgba(244,63,94,.10)">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
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
                <p
                  className="text-sm font-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  Live Feel Preview
                </p>
                <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
                  Your theme, tone, and preferences shape the mood of the app.
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
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: theme.textMuted }}
              >
                Sample
              </p>
              <p
                className="mt-2 text-sm font-medium"
                style={{ color: theme.textPrimary }}
              >
                Tonight’s spark
              </p>
              <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>
                What is one small thing that made you feel loved recently?
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <SmallTag text={language.replaceAll("-", " ")} theme={theme} />
                <SmallTag text={location} theme={theme} />
              </div>
            </div>
          </div>
        </GradientCard>

        {/* Theme */}
        <SettingsBlock
          title="Theme"
          subtitle="Choose the mood and visual style of your shared space."
          icon={<Palette size={18} />}
          theme={theme}
        >
          <ThemePicker />
        </SettingsBlock>

        {/* Avatar */}
        <SettingsBlock
          title="Avatar"
          subtitle="Pick something playful or personal for your profile."
          icon={<UserCircle2 size={18} />}
          theme={theme}
        >
          <AvatarPicker />
        </SettingsBlock>

        {/* Writing style */}
        <SettingsBlock
          title="Writing Style"
          subtitle="Shape how prompts, notes, and messages sound in the app."
          icon={<PenSquare size={18} />}
          theme={theme}
        >
          <WritingStylePicker />
        </SettingsBlock>

        {/* Language */}
        <SettingsBlock
          title="Language"
          subtitle="Choose how the app speaks to you."
          icon={<Languages size={18} />}
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
                label={item.label}
                theme={theme}
              />
            ))}
          </div>
        </SettingsBlock>

        {/* Location */}
        <SettingsBlock
          title="Location"
          subtitle="Used for date ideas, local planning, memory places, and timing."
          icon={<MapPin size={18} />}
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
  icon,
  children,
  theme,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  theme: any;
}) {
  return (
    <GradientCard className="px-4 py-4">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: theme.accent,
            }}
          >
            {icon}
          </div>

          <div>
            <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
              {title}
            </p>
            <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
              {subtitle}
            </p>
          </div>
        </div>

        {children}
      </div>
    </GradientCard>
  );
}

function SelectCard({
  active,
  onClick,
  label,
  theme,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  theme: any;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border px-4 py-3 text-left text-sm font-medium transition"
      style={{
        borderColor: active ? theme.accent : theme.cardBorder,
        background: active ? "rgba(255,255,255,0.05)" : "transparent",
        color: active ? theme.textPrimary : theme.textSecondary,
      }}
    >
      {label}
    </button>
  );
}

function SmallTag({
  text,
  theme,
}: {
  text: string;
  theme: any;
}) {
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
