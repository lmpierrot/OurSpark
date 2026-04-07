"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import {
  Bell,
  Gift,
  Flame,
  Eye,
  Heart,
  MessageCircle,
  Camera,
  CalendarDays,
  Sparkles,
  Send,
  MapPin,
  Copy,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useI18n();

  const signedInUserName = "Alex";
  const partnerName = "Jordan";
  const relationshipStage = "gettingToKnow";
  const isPartnerLinked = false;
  const sharedCode = "SPARK-84J2";
  const quoteOfTheDay =
    "Love grows best in the little things you choose every day.";
  const dailyQuestion =
    "How could you make your partner smile without spending money?";

  const thoughtA = "Thinking of you ❤️";
  const thoughtB = "Miss you already 🥺";

  const hour = new Date().getHours();
  const timeOfDay =
    hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  const baseGreeting = t("home", `greeting.${timeOfDay}`);

  const relationshipGreetingTemplate = t(
    "home",
    `relationshipGreetings.${relationshipStage}`
  );

  const finalGreeting =
    relationshipGreetingTemplate !==
    `relationshipGreetings.${relationshipStage}`
      ? relationshipGreetingTemplate
          .replace("{greeting}", baseGreeting)
          .replace("{firstName}", signedInUserName)
      : `${baseGreeting}, ${signedInUserName}`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(sharedCode);
      alert("Shared code copied!");
    } catch {
      alert("Could not copy code.");
    }
  };

  return (
    <AppShell>
      <div className="space-y-5">
        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm" style={{ color: theme.textMuted }}>
              {finalGreeting}
            </p>
            <h1
              className="mt-1 text-[32px] font-bold tracking-tight"
              style={{ color: theme.textPrimary }}
            >
              OurSparks
            </h1>
            <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
              A little place just for you two
            </p>
          </div>

          <button
            className="relative rounded-full p-2.5 transition duration-200 hover:-translate-y-0.5"
            style={{
              border: `1px solid ${theme.cardBorder}`,
              background: theme.cardBg,
              color: theme.textSecondary,
            }}
            aria-label="Notifications"
            onClick={() => router.push("/more")}
          >
            <Bell size={18} />
            <span
              className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2"
              style={{
                background: theme.accent,
                ringColor: theme.bgBase,
              }}
            />
          </button>
        </div>

        {/* ── Partner Link Banner ── */}
        {!isPartnerLinked && (
          <div
            className="group relative overflow-hidden rounded-3xl p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1"
            style={{
              border: `1px solid rgba(${theme.accentRgb}, 0.15)`,
              background: `linear-gradient(135deg, rgba(${theme.accentRgb}, 0.16), transparent)`,
              boxShadow: `0 10px 30px rgba(${theme.accentRgb}, 0.10)`,
            }}
          >
            <div className="relative z-10 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="rounded-2xl p-2.5"
                    style={{ background: "rgba(255,255,255,0.10)" }}
                  >
                    <Gift size={18} style={{ color: theme.accentMuted }} />
                  </div>

                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: theme.accentMuted }}
                    >
                      Shared Code
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: theme.textSecondary }}
                    >
                      Share this code with your partner so they can join your
                      space.
                    </p>
                  </div>
                </div>

                <Link
                  href="/more"
                  className="rounded-full px-3 py-2 text-xs font-medium transition hover:opacity-80"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    color: theme.textPrimary,
                  }}
                >
                  Manage
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="rounded-2xl px-3 py-2 font-mono text-sm tracking-widest"
                  style={{
                    border: `1px solid ${theme.cardBorder}`,
                    background: "rgba(0,0,0,0.20)",
                    color: theme.textPrimary,
                  }}
                >
                  {sharedCode}
                </div>

                <button
                  onClick={copyCode}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition hover:opacity-80"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    color: theme.textPrimary,
                  }}
                >
                  <Copy size={14} />
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Quote of the Day ── */}
        <div
          className="group relative overflow-hidden rounded-3xl p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1"
          style={{
            border: `1px solid ${theme.cardBorder}`,
            background: theme.cardBg,
          }}
        >
          <div className="relative z-10">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: theme.accentMuted }}
            >
              {t("home", "todaysSpark") !== "todaysSpark"
                ? t("home", "todaysSpark")
                : "Quote of the Day"}
            </p>
            <p
              className="mt-2 text-[15px] leading-7"
              style={{ color: theme.textPrimary }}
            >
              &ldquo;{quoteOfTheDay}&rdquo;
            </p>
          </div>
        </div>

        {/* ── Daily Question / Shared Subject ── */}
        <GradientCard
          glowColor={theme.secondaryGlow}
          className="group relative overflow-hidden transition duration-300 hover:-translate-y-1"
        >
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div
                className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: theme.secondary }}
              >
                <Flame size={14} />
                Shared Subject for Today
              </div>

              <p
                className="mt-3 text-[19px] font-semibold leading-7"
                style={{ color: theme.textPrimary }}
              >
                {dailyQuestion}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-3">
              <span className="text-3xl">😊</span>
              <button
                className="rounded-full px-4 py-2 text-sm font-medium transition hover:opacity-80"
                style={{
                  background: `rgba(${theme.accentRgb}, 0.20)`,
                  color: theme.accent,
                }}
                onClick={() => router.push("/ask")}
              >
                Answer
              </button>
            </div>
          </div>
        </GradientCard>

        {/* ── Couple Avatars + Thought Bubbles ── */}
        <section className="space-y-3 pt-1">
          <div className="flex items-end justify-center gap-5">
            <div className="flex flex-col items-center">
              <MiniBubble text={thoughtA} align="left" theme={theme} />
              <AvatarCircle
                initials="A"
                color={theme.avatarRingA}
                bgBase={theme.bgBase}
              />
              <p
                className="mt-2 text-xs"
                style={{ color: theme.textMuted }}
              >
                {signedInUserName}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <MiniBubble text={thoughtB} align="right" theme={theme} />
              <AvatarCircle
                initials="J"
                color={theme.avatarRingB}
                bgBase={theme.bgBase}
              />
              <p
                className="mt-2 text-xs"
                style={{ color: theme.textMuted }}
              >
                {partnerName}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="rounded-full px-3 py-1 text-[11px] backdrop-blur-sm"
              style={{
                border: `1px solid ${theme.cardBorder}`,
                background: theme.cardBg,
                color: theme.textMuted,
              }}
            >
              Shared mini bubbles sync later with Firebase
            </div>
          </div>
        </section>

        {/* ── Quick Message Button ── */}
        <div className="flex justify-center">
          <button
            className="flex w-full max-w-[320px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium backdrop-blur-xl transition duration-200 hover:-translate-y-0.5"
            style={{
              border: `1px solid ${theme.cardBorder}`,
              background: theme.navBg,
              color: theme.textPrimary,
              boxShadow: `0 10px 30px rgba(0,0,0,0.25)`,
            }}
            onClick={() => router.push("/chat")}
          >
            <Send size={16} style={{ color: theme.accent }} />
            Quick Message
          </button>
        </div>

        {/* ── Recommended For You ── */}
        <section className="space-y-3 pt-1">
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ color: theme.textPrimary }}
            >
              Recommended for you
            </h2>
            <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
              Pick something fun or meaningful together.
            </p>
          </div>

          <button
            onClick={() => router.push("/ask")}
            className="block w-full text-left"
          >
            <GradientCard
              glowColor={theme.accentGlow}
              className="group transition duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: theme.accentMuted }}
                  >
                    Never Have I Ever
                  </p>
                  <p
                    className="mt-2 text-lg font-semibold"
                    style={{ color: theme.textPrimary }}
                  >
                    Daily Life
                  </p>
                </div>

                <Eye style={{ color: theme.accent }} size={24} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SmallAvatar color={theme.avatarRingA} bgBase={theme.bgBase} />
                  <SmallAvatar
                    color={theme.avatarRingB}
                    bgBase={theme.bgBase}
                    overlap
                  />
                </div>

                <div
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition group-hover:opacity-80"
                  style={{
                    background: `rgba(${theme.accentRgb}, 0.15)`,
                    color: theme.accent,
                  }}
                >
                  Open <ChevronRight size={15} />
                </div>
              </div>
            </GradientCard>
          </button>

          <button
            onClick={() => router.push("/ask")}
            className="block w-full text-left"
          >
            <GradientCard
              glowColor={theme.secondaryGlow}
              className="group transition duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: theme.secondaryMuted }}
                  >
                    Deep Conversation
                  </p>
                  <p
                    className="mt-2 text-lg font-semibold"
                    style={{ color: theme.textPrimary }}
                  >
                    Our Intimate Life
                  </p>
                </div>

                <Heart style={{ color: theme.secondary }} size={24} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SmallAvatar color={theme.avatarRingA} bgBase={theme.bgBase} />
                  <SmallAvatar
                    color={theme.avatarRingB}
                    bgBase={theme.bgBase}
                    overlap
                  />
                </div>

                <div
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition group-hover:opacity-80"
                  style={{
                    background: `rgba(${theme.accentRgb}, 0.15)`,
                    color: theme.accent,
                  }}
                >
                  Open <ChevronRight size={15} />
                </div>
              </div>
            </GradientCard>
          </button>
        </section>

        {/* ── Widgets ── */}
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl font-semibold"
              style={{ color: theme.textPrimary }}
            >
              Widgets
            </h2>
            <Link
              href="/more"
              className="text-sm transition hover:opacity-70"
              style={{ color: theme.textMuted }}
            >
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <WidgetTile
              icon={<CalendarDays style={{ color: theme.accent }} size={18} />}
              label="Together"
              value="78"
              sub="days"
              theme={theme}
            />
            <WidgetTile
              icon={<Heart style={{ color: theme.secondary }} size={18} />}
              label="Love Note"
              value="I love you 🤍"
              sub="shared thought"
              theme={theme}
              textMode
            />
            <WidgetTile
              icon={
                <MapPin style={{ color: theme.secondary }} size={18} />
              }
              label="Distance"
              value="168"
              sub="miles apart"
              theme={theme}
            />
            <WidgetTile
              icon={
                <Sparkles style={{ color: theme.accent }} size={18} />
              }
              label="Mood"
              value="Calm + Loved"
              sub="today's vibe"
              theme={theme}
              textMode
            />
          </div>
        </section>

        {/* ── Couple Stats ── */}
        <section className="space-y-3 pt-1">
          <h2
            className="text-xl font-semibold"
            style={{ color: theme.textPrimary }}
          >
            Couple Stats
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <StatTile
              icon={<CalendarDays style={{ color: theme.accent }} size={20} />}
              value="78"
              label="Days Together"
              theme={theme}
            />
            <StatTile
              icon={
                <MessageCircle
                  style={{ color: theme.secondary }}
                  size={20}
                />
              }
              value="0%"
              label="Questions Answered"
              theme={theme}
            />
            <StatTile
              icon={
                <Camera style={{ color: theme.accentMuted }} size={20} />
              }
              value="0"
              label="Memories Created"
              theme={theme}
            />
            <StatTile
              icon={
                <Sparkles
                  style={{ color: theme.secondaryMuted }}
                  size={20}
                />
              }
              value="3"
              label="Active Sparks"
              theme={theme}
            />
          </div>
        </section>
      </div>
    </AppShell>
  );
}

/* ── Helper Components ── */

import type { SparkTheme } from "@/lib/themes";

function AvatarCircle({
  initials,
  color,
  bgBase,
}: {
  initials: string;
  color: string;
  bgBase: string;
}) {
  return (
    <div className="group relative">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-white/10 blur-xl opacity-0 transition duration-300 group-hover:opacity-100" />
      <div
        className="relative flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition duration-300 group-hover:-translate-y-1"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}80)`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.10)`,
        }}
      >
        {initials}
      </div>
    </div>
  );
}

function MiniBubble({
  text,
  align = "left",
  theme,
}: {
  text: string;
  align?: "left" | "right";
  theme: SparkTheme;
}) {
  return (
    <div
      className={`mb-3 max-w-[130px] rounded-2xl px-3 py-2 text-center text-xs backdrop-blur-md ${
        align === "left" ? "-translate-x-3" : "translate-x-3"
      }`}
      style={{
        border: `1px solid ${theme.cardBorder}`,
        background: theme.cardBg,
        color: theme.textSecondary,
        boxShadow: "0 8px 20px rgba(0,0,0,0.20)",
      }}
    >
      {text}
    </div>
  );
}

function SmallAvatar({
  color,
  bgBase,
  overlap = false,
}: {
  color: string;
  bgBase: string;
  overlap?: boolean;
}) {
  return (
    <div
      className={`h-7 w-7 rounded-full ${overlap ? "-ml-2" : ""}`}
      style={{
        background: color,
        boxShadow: `0 0 0 2px ${bgBase}`,
      }}
    />
  );
}

function WidgetTile({
  icon,
  label,
  value,
  sub,
  theme,
  textMode = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  theme: SparkTheme;
  textMode?: boolean;
}) {
  return (
    <GradientCard className="group min-h-[108px] px-4 py-4 transition duration-300 hover:-translate-y-1">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          {icon}
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{ color: theme.textMuted }}
          >
            {label}
          </span>
        </div>

        <div>
          <p
            className={
              textMode
                ? "text-[15px] font-semibold leading-6"
                : "text-2xl font-bold"
            }
            style={{ color: theme.textPrimary }}
          >
            {value}
          </p>
          <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>
            {sub}
          </p>
        </div>
      </div>
    </GradientCard>
  );
}

function StatTile({
  icon,
  value,
  label,
  theme,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  theme: SparkTheme;
}) {
  return (
    <GradientCard className="px-4 py-4 transition duration-300 hover:-translate-y-1">
      <div className="space-y-2">
        {icon}
        <p
          className="text-3xl font-bold"
          style={{ color: theme.textPrimary }}
        >
          {value}
        </p>
        <p className="text-sm" style={{ color: theme.textSecondary }}>
          {label}
        </p>
      </div>
    </GradientCard>
  );
}
