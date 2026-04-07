"use client";

import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import { useTheme } from "@/components/providers/theme-provider";
import {
  User,
  Target,
  BookHeart,
  Settings,
  ChevronRight,
  HeartHandshake,
  Sparkles,
  CalendarHeart,
  Bell,
  Crown,
  Languages,
  Palette,
  TimerReset,
  ScrollText,
  SmilePlus,
  Trophy,
  HandHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MoreLink {
  label: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
}

const RELATIONSHIP_TOOLS: MoreLink[] = [
  {
    label: "Profile",
    subtitle: "Your relationship identity and shared info",
    href: "/profile",
    icon: User,
  },
  {
    label: "Goals",
    subtitle: "Track milestones and shared intentions",
    href: "/goals",
    icon: Target,
  },
  {
    label: "Memory",
    subtitle: "Photos, notes, places, and special moments",
    href: "/memory",
    icon: BookHeart,
  },
  {
    label: "Mood Tracker",
    subtitle: "Check in with how you both feel",
    href: "/more/mood-tracker",
    icon: SmilePlus,
  },
  {
    label: "Love Language",
    subtitle: "Explore how you each give and receive love",
    href: "/more/love-language",
    icon: HandHeart,
  },
  {
    label: "Countdown",
    subtitle: "Track anniversaries, trips, and important dates",
    href: "/more/countdown",
    icon: TimerReset,
  },
  {
    label: "Bucket List",
    subtitle: "Dream up things to do together",
    href: "/more/bucket-list",
    icon: Sparkles,
  },
  {
    label: "Challenges",
    subtitle: "Fun relationship missions and growth prompts",
    href: "/more/challenges",
    icon: Trophy,
  },
  {
    label: "Gratitude Journal",
    subtitle: "Capture appreciation and little meaningful moments",
    href: "/more/gratitude-journal",
    icon: ScrollText,
  },
  {
    label: "Date Planner",
    subtitle: "Plan meaningful time together",
    href: "/more/date-planner",
    icon: CalendarHeart,
  },
];

const APP_SETTINGS: MoreLink[] = [
  {
    label: "Notifications",
    subtitle: "Manage reminders and updates",
    href: "/more/notifications",
    icon: Bell,
  },
  {
    label: "Premium",
    subtitle: "Unlock more ways to personalize your experience",
    href: "/more/premium",
    icon: Crown,
  },
  {
    label: "Language",
    subtitle: "Choose how the app speaks to you",
    href: "/more/language",
    icon: Languages,
  },
  {
    label: "Theme & Style",
    subtitle: "Customize the look and feel of your space",
    href: "/more/theme",
    icon: Palette,
  },
  {
    label: "Settings",
    subtitle: "Privacy, account, and app preferences",
    href: "/more/settings",
    icon: Settings,
  },
];

export default function MorePage() {
  const { theme } = useTheme();

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <section>
          <h1 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
            More
          </h1>
          <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
            Explore more ways to grow, customize, and enjoy your relationship space.
          </p>
        </section>

        {/* Featured Card */}
        <GradientCard glowColor="rgba(244,63,94,.10)">
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: theme.accent,
              }}
            >
              <HeartHandshake size={20} />
            </div>

            <div className="flex-1">
              <p
                className="text-sm font-semibold"
                style={{ color: theme.textPrimary }}
              >
                Make the app feel like yours
              </p>
              <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
                Personalize your relationship journey with goals, memories,
                journals, planners, and more.
              </p>
            </div>
          </div>
        </GradientCard>

        {/* Relationship Tools */}
        <section className="space-y-3">
          <SectionLabel label="Relationship Tools" theme={theme} />

          <div className="space-y-3">
            {RELATIONSHIP_TOOLS.map((item) => (
              <MoreRow key={item.href} item={item} theme={theme} />
            ))}
          </div>
        </section>

        {/* App & Settings */}
        <section className="space-y-3">
          <SectionLabel label="App & Settings" theme={theme} />

          <div className="space-y-3">
            {APP_SETTINGS.map((item) => (
              <MoreRow key={item.href} item={item} theme={theme} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SectionLabel({
  label,
  theme,
}: {
  label: string;
  theme: any;
}) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-[0.2em]"
      style={{ color: theme.textMuted }}
    >
      {label}
    </p>
  );
}

function MoreRow({
  item,
  theme,
}: {
  item: MoreLink;
  theme: any;
}) {
  const Icon = item.icon;

  return (
    <Link href={item.href}>
      <GradientCard onClick={() => {}} className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: theme.accent,
            }}
          >
            <Icon size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: theme.textPrimary }}>
              {item.label}
            </p>
            <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
              {item.subtitle}
            </p>
          </div>

          <ChevronRight size={16} style={{ color: theme.textMuted }} />
        </div>
      </GradientCard>
    </Link>
  );
}
