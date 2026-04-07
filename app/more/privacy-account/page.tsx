"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import { useTheme } from "@/components/providers/theme-provider";
import {
  ArrowLeft,
  EyeOff,
  Shield,
  Bell,
  Smartphone,
  Heart,
  Target,
  Sparkles,
  LogOut,
  Trash2,
  ChevronRight,
} from "lucide-react";

export default function PrivacyAccountPage() {
  const { theme } = useTheme();

  const [hide18Plus, setHide18Plus] = useState(true);
  const [showCouplePrivacyPolicy, setShowCouplePrivacyPolicy] = useState(true);

  const [pushNotifications, setPushNotifications] = useState(true);
  const [dateReminders, setDateReminders] = useState(true);
  const [goalReminders, setGoalReminders] = useState(true);
  const [memoryReminders, setMemoryReminders] = useState(false);
  const [widgetsEnabled, setWidgetsEnabled] = useState(true);

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
            Privacy & Account
          </h1>
          <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
            Control privacy, content, reminders, widgets, and account access.
          </p>
        </section>

        <SettingsBlock
          title="Content Controls"
          subtitle="Keep the app aligned with your comfort level."
          theme={theme}
        >
          <div className="space-y-3">
            <ToggleRow
              icon={<EyeOff size={16} />}
              label="Hide 18+ content"
              subtitle="Filter spicy or mature features unless you choose to allow them."
              checked={hide18Plus}
              onChange={setHide18Plus}
              theme={theme}
            />

            <ToggleRow
              icon={<Shield size={16} />}
              label="Show couple privacy policy"
              subtitle="Keep a privacy explanation available for both partners."
              checked={showCouplePrivacyPolicy}
              onChange={setShowCouplePrivacyPolicy}
              theme={theme}
            />

            {showCouplePrivacyPolicy && (
              <div
                className="rounded-2xl border p-4 text-xs leading-6"
                style={{
                  borderColor: theme.cardBorder,
                  background: "rgba(255,255,255,0.03)",
                  color: theme.textMuted,
                }}
              >
                OurSparks should protect both partners. Shared messages, memories,
                relationship details, and private experiences should only be visible
                inside the shared space and should respect comfort, consent, and trust.
              </div>
            )}
          </div>
        </SettingsBlock>

        <SettingsBlock
          title="Notifications"
          subtitle="Choose what the app should remind you about."
          theme={theme}
        >
          <div className="space-y-3">
            <ToggleRow
              icon={<Bell size={16} />}
              label="Push notifications"
              subtitle="Master switch for reminders and activity alerts."
              checked={pushNotifications}
              onChange={setPushNotifications}
              theme={theme}
            />

            <ToggleRow
              icon={<Heart size={16} />}
              label="Date reminders"
              subtitle="Get nudges for anniversaries, date nights, and plans."
              checked={dateReminders}
              onChange={setDateReminders}
              theme={theme}
            />

            <ToggleRow
              icon={<Target size={16} />}
              label="Goal reminders"
              subtitle="Stay on track with shared goals and progress."
              checked={goalReminders}
              onChange={setGoalReminders}
              theme={theme}
            />

            <ToggleRow
              icon={<Sparkles size={16} />}
              label="Memory reminders"
              subtitle="Helpful prompts to save moments and revisit memories."
              checked={memoryReminders}
              onChange={setMemoryReminders}
              theme={theme}
            />
          </div>
        </SettingsBlock>

        <SettingsBlock
          title="Widgets"
          subtitle="Show quick access and relationship highlights outside the app."
          theme={theme}
        >
          <ToggleRow
            icon={<Smartphone size={16} />}
            label="Enable widgets"
            subtitle="Allow home screen widgets for streaks, countdowns, and reminders."
            checked={widgetsEnabled}
            onChange={setWidgetsEnabled}
            theme={theme}
          />
        </SettingsBlock>

        <SettingsBlock
          title="Account Actions"
          subtitle="Manage your session and account access."
          theme={theme}
        >
          <div className="space-y-3">
            <ActionRow
              icon={<LogOut size={16} />}
              label="Log Out"
              subtitle="Sign out from your account on this device."
              danger={false}
              theme={theme}
            />

            <ActionRow
              icon={<Trash2 size={16} />}
              label="Delete Account"
              subtitle="Permanently remove your account and shared data."
              danger
              theme={theme}
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

function ToggleRow({
  icon,
  label,
  subtitle,
  checked,
  onChange,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  theme: any;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border p-3"
      style={{
        borderColor: theme.cardBorder,
        background: "rgba(255,255,255,0.03)",
      }}
    >
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
        <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
          {subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="relative h-7 w-12 rounded-full transition"
        style={{
          background: checked ? theme.accent : "rgba(255,255,255,0.10)",
        }}
        aria-pressed={checked}
      >
        <span
          className="absolute top-1 h-5 w-5 rounded-full bg-white transition"
          style={{
            left: checked ? "24px" : "4px",
          }}
        />
      </button>
    </div>
  );
}

function ActionRow({
  icon,
  label,
  subtitle,
  danger,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  danger?: boolean;
  theme: any;
}) {
  return (
    <button
      type="button"
      className="w-full rounded-2xl border px-4 py-4 text-left transition"
      style={{
        borderColor: theme.cardBorder,
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            background: danger ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.05)",
            color: danger ? "#ef4444" : theme.accent,
          }}
        >
          {icon}
        </div>

        <div className="flex-1">
          <p
            className="text-sm font-medium"
            style={{ color: danger ? "#ef4444" : theme.textPrimary }}
          >
            {label}
          </p>
          <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
            {subtitle}
          </p>
        </div>

        <ChevronRight size={16} style={{ color: theme.textMuted }} />
      </div>
    </button>
  );
}
