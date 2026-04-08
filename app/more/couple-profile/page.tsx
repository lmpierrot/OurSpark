"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import { useTheme } from "@/components/providers/theme-provider";
import {
  ArrowLeft,
  UserRound,
  CalendarDays,
  Cake,
  Stars,
  Heart,
} from "lucide-react";

type RelationshipStage =
  | "getting-to-know"
  | "dating"
  | "boyfriend-girlfriend"
  | "engaged"
  | "married"
  | "long-distance"
  | "other";

type Theme = ReturnType<typeof useTheme>["theme"];

function getZodiacSign(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  return "Capricorn";
}

export default function CoupleProfilePage() {
  const { theme } = useTheme();

  const [partnerAName, setPartnerAName] = useState("Alex");
  const [partnerBName, setPartnerBName] = useState("Jordan");
  const [relationshipStage, setRelationshipStage] =
    useState<RelationshipStage>("dating");
  const [anniversaryDate, setAnniversaryDate] = useState("");

  const [showBirthday, setShowBirthday] = useState(true);
  const [showZodiac, setShowZodiac] = useState(false);
  const [partnerABirthday, setPartnerABirthday] = useState("");
  const [partnerBBirthday, setPartnerBBirthday] = useState("");

  const zodiacA = useMemo(
    () => (showZodiac && partnerABirthday ? getZodiacSign(partnerABirthday) : ""),
    [partnerABirthday, showZodiac]
  );

  const zodiacB = useMemo(
    () => (showZodiac && partnerBBirthday ? getZodiacSign(partnerBBirthday) : ""),
    [partnerBBirthday, showZodiac]
  );

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
            Couple Profile
          </h1>
          <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
            Set up your shared relationship details.
          </p>
        </section>

        <GradientCard glowColor="rgba(244,63,94,.10)">
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: theme.accent,
              }}
            >
              <Heart size={20} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                Shared Couple Preview
              </p>
              <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
                Keep this part warm, intentional, and optional where needed.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <SmallTag text={partnerAName} theme={theme} />
                <SmallTag text={partnerBName} theme={theme} />
                <SmallTag text={relationshipStage.replaceAll("-", " ")} theme={theme} />
              </div>
            </div>
          </div>
        </GradientCard>

        <SettingsBlock
          title="Relationship Info"
          subtitle="Core details that shape the couple experience."
          theme={theme}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="Partner 1 Name"
                value={partnerAName}
                onChange={setPartnerAName}
                placeholder="Name"
                icon={<UserRound size={15} />}
                theme={theme}
              />
              <TextField
                label="Partner 2 Name"
                value={partnerBName}
                onChange={setPartnerBName}
                placeholder="Name"
                icon={<UserRound size={15} />}
                theme={theme}
              />
            </div>

            <div>
              <FieldLabel theme={theme}>Relationship Stage</FieldLabel>
              <select
                value={relationshipStage}
                onChange={(e) =>
                  setRelationshipStage(e.target.value as RelationshipStage)
                }
                className="mt-2 w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                style={{
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                }}
                aria-label="Relationship Stage"
              >
                <option value="getting-to-know" style={{ color: "#111" }}>
                  Getting to know each other
                </option>
                <option value="dating" style={{ color: "#111" }}>
                  Dating
                </option>
                <option value="boyfriend-girlfriend" style={{ color: "#111" }}>
                  Boyfriend / Girlfriend
                </option>
                <option value="engaged" style={{ color: "#111" }}>
                  Engaged
                </option>
                <option value="married" style={{ color: "#111" }}>
                  Married
                </option>
                <option value="long-distance" style={{ color: "#111" }}>
                  Long distance
                </option>
                <option value="other" style={{ color: "#111" }}>
                  Other
                </option>
              </select>
            </div>

            <TextField
              label="Anniversary / Together Since"
              value={anniversaryDate}
              onChange={setAnniversaryDate}
              type="date"
              icon={<CalendarDays size={15} />}
              theme={theme}
            />
          </div>
        </SettingsBlock>

        <SettingsBlock
          title="Birthdays & Zodiac"
          subtitle="Keep birthdays and zodiac optional and light."
          theme={theme}
        >
          <div className="space-y-3">
            <ToggleRow
              label="Show birthday fields"
              subtitle="Allow birthdays to be part of the couple profile."
              checked={showBirthday}
              onChange={setShowBirthday}
              theme={theme}
            />

            <ToggleRow
              label="Show zodiac signs"
              subtitle="Only show zodiac if birthdays are added."
              checked={showZodiac}
              onChange={setShowZodiac}
              theme={theme}
            />

            {showBirthday && (
              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label="Partner 1 Birthday"
                  value={partnerABirthday}
                  onChange={setPartnerABirthday}
                  type="date"
                  icon={<Cake size={15} />}
                  theme={theme}
                />
                <TextField
                  label="Partner 2 Birthday"
                  value={partnerBBirthday}
                  onChange={setPartnerBBirthday}
                  type="date"
                  icon={<Cake size={15} />}
                  theme={theme}
                />
              </div>
            )}

            {showZodiac && (zodiacA || zodiacB) && (
              <div className="grid grid-cols-2 gap-3">
                <InfoMiniCard
                  title={partnerAName || "Partner 1"}
                  value={zodiacA || "—"}
                  icon={<Stars size={15} />}
                  theme={theme}
                />
                <InfoMiniCard
                  title={partnerBName || "Partner 2"}
                  value={zodiacB || "—"}
                  icon={<Stars size={15} />}
                  theme={theme}
                />
              </div>
            )}
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
  theme: Theme;
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

function FieldLabel({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <p className="mb-2 text-xs font-medium" style={{ color: theme.textMuted }}>
      {children}
    </p>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  theme,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  theme: Theme;
}) {
  return (
    <div>
      <FieldLabel theme={theme}>{label}</FieldLabel>
      <div className="relative">
        {icon ? (
          <div
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: theme.textMuted }}
          >
            {icon}
          </div>
        ) : null}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          className={`w-full rounded-2xl border bg-transparent py-3 pr-4 text-sm outline-none ${
            icon ? "pl-11" : "px-4"
          }`}
          style={{
            borderColor: theme.cardBorder,
            color: theme.textPrimary,
          }}
        />
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  subtitle,
  checked,
  onChange,
  theme,
}: {
  label: string;
  subtitle: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  theme: Theme;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border p-3"
      style={{
        borderColor: theme.cardBorder,
        background: "rgba(255,255,255,0.03)",
      }}
    >
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
        title={label}
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

function InfoMiniCard({
  title,
  value,
  icon,
  theme,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  theme: Theme;
}) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        borderColor: theme.cardBorder,
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div className="flex items-center gap-2" style={{ color: theme.textMuted }}>
        {icon}
        <p className="text-xs">{title}</p>
      </div>
      <p className="mt-2 text-sm font-semibold" style={{ color: theme.textPrimary }}>
        {value}
      </p>
    </div>
  );
}

function SmallTag({ text, theme }: { text: string; theme: Theme }) {
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
