"use client";

import { AppShell } from "@/components/shared/app-shell";
import { CoupleAvatarPair } from "@/components/home/couple-avatar-pair";
import { GradientCard } from "@/components/ui/gradient-card";
import { AvatarPicker } from "@/components/settings/avatar-picker";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Flame,
  Heart,
  MessageCircleHeart,
  CalendarDays,
  Palette,
  Settings,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const { theme } = useTheme();

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section>
          <h1 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
            Profile
          </h1>
          <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
            Your relationship space, memories, and shared settings.
          </p>
        </section>

        {/* Couple Hero */}
        <GradientCard className="pt-6 pb-6">
          <div className="flex flex-col items-center text-center">
            <CoupleAvatarPair initialsA="A" initialsB="J" size={72} />

            <h2
              className="mt-4 text-lg font-semibold"
              style={{ color: theme.textPrimary }}
            >
              Alex &amp; Jordan
            </h2>

            <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>
              Together since January 2024
            </p>

            <p className="mt-2 text-xs" style={{ color: theme.textMuted }}>
              Built for the two of you, one shared spark at a time.
            </p>
          </div>
        </GradientCard>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              icon={<Flame size={16} style={{ color: theme.accent }} />}
              label="Streak"
              value="12 days"
              theme={theme}
            />
            <StatCard
              icon={
                <MessageCircleHeart
                  size={16}
                  style={{ color: theme.accent }}
                />
              }
              label="Questions"
              value="38"
              theme={theme}
            />
            <StatCard
              icon={<Heart size={16} style={{ color: theme.accent }} />}
              label="Love Notes"
              value="14"
              theme={theme}
            />
          </div>
        </section>

        {/* Highlight Card */}
        <GradientCard glowColor="rgba(244,63,94,.12)">
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{
                background: "rgba(244,63,94,.12)",
              }}
            >
              <Flame size={18} style={{ color: theme.accent }} />
            </div>

            <div className="flex-1">
              <p
                className="text-sm font-semibold"
                style={{ color: theme.textPrimary }}
              >
                12 Day Connection Streak
              </p>
              <p className="mt-1 text-sm" style={{ color: theme.textSecondary }}>
                You’ve checked in with each other for 12 days in a row. Keep the
                spark going.
              </p>
            </div>
          </div>
        </GradientCard>

        {/* Relationship Details */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.textMuted }}
          >
            Relationship Details
          </p>

          <GradientCard>
            <div className="space-y-4">
              <DetailRow
                icon={<CalendarDays size={16} />}
                label="Anniversary"
                value="January 14, 2024"
                theme={theme}
              />
              <DetailRow
                icon={<Heart size={16} />}
                label="Favorite Date Vibe"
                value="Cozy nights & meaningful talks"
                theme={theme}
              />
              <DetailRow
                icon={<MessageCircleHeart size={16} />}
                label="Communication Goal"
                value="Deeper daily check-ins"
                theme={theme}
              />
            </div>
          </GradientCard>
        </section>

        {/* Personalization */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.textMuted }}
          >
            Personalization
          </p>

          <GradientCard>
            <div className="space-y-4">
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary }}
                >
                  Choose your avatar
                </p>
                <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>
                  Pick a playful icon or upload a photo.
                </p>
              </div>

              <AvatarPicker />
            </div>
          </GradientCard>
        </section>

        {/* Quick Actions */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.textMuted }}
          >
            Quick Actions
          </p>

          <div className="space-y-3">
            <ActionRow
              icon={<Palette size={17} />}
              label="Theme & Style"
              subtitle="Customize the look and feel of your space"
              theme={theme}
            />
            <ActionRow
              icon={<Settings size={17} />}
              label="Shared Settings"
              subtitle="Manage notifications, privacy, and preferences"
              theme={theme}
            />
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon,
  label,
  value,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  theme: any;
}) {
  return (
    <GradientCard className="px-4 py-4">
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {icon}
        </div>
        <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
          {value}
        </p>
        <p className="mt-1 text-[11px]" style={{ color: theme.textMuted }}>
          {label}
        </p>
      </div>
    </GradientCard>
  );
}

function DetailRow({
  icon,
  label,
  value,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  theme: any;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          color: theme.accent,
        }}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs" style={{ color: theme.textMuted }}>
          {label}
        </p>
        <p className="mt-1 text-sm font-medium" style={{ color: theme.textPrimary }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function ActionRow({
  icon,
  label,
  subtitle,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  theme: any;
}) {
  return (
    <GradientCard
      onClick={() => {}}
      className="px-4 py-4"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: theme.accent,
          }}
        >
          {icon}
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: theme.textPrimary }}>
            {label}
          </p>
          <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>
            {subtitle}
          </p>
        </div>

        <ChevronRight size={16} style={{ color: theme.textMuted }} />
      </div>
    </GradientCard>
  );
}
