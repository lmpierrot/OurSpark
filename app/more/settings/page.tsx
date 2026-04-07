"use client";

import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Palette,
  Heart,
  Shield,
  ChevronRight,
  Settings,
} from "lucide-react";

export default function SettingsPage() {
  const { theme } = useTheme();

  return (
    <AppShell>
      <div className="space-y-6">
        <section>
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: theme.accent,
              }}
            >
              <Settings size={20} />
            </div>

            <div>
              <h1
                className="text-xl font-bold"
                style={{ color: theme.textPrimary }}
              >
                Settings
              </h1>
              <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
                Customize your experience, relationship profile, and account controls.
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-3">
          <SettingsLinkCard
            href="/more/personalize"
            icon={<Palette size={18} />}
            title="Personalize"
            subtitle="Theme, avatar, writing style, language, and location"
            theme={theme}
          />

          <SettingsLinkCard
            href="/more/couple-profile"
            icon={<Heart size={18} />}
            title="Couple Profile"
            subtitle="Names, birthdays, zodiac, anniversary, and relationship stage"
            theme={theme}
          />

          <SettingsLinkCard
            href="/more/privacy-account"
            icon={<Shield size={18} />}
            title="Privacy & Account"
            subtitle="18+ controls, privacy, notifications, widgets, and account actions"
            theme={theme}
          />
        </div>
      </div>
    </AppShell>
  );
}

function SettingsLinkCard({
  href,
  icon,
  title,
  subtitle,
  theme,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  theme: any;
}) {
  return (
    <Link href={href}>
      <GradientCard className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: theme.accent,
            }}
          >
            {icon}
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
              {title}
            </p>
            <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
              {subtitle}
            </p>
          </div>

          <ChevronRight size={16} style={{ color: theme.textMuted }} />
        </div>
      </GradientCard>
    </Link>
  );
}
