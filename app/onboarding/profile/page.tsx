"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Check, Camera } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { getOnboardingData, saveOnboardingData } from "@/lib/onboarding";

type AvatarCategory = "animal" | "woman" | "man";
type AvatarMode = "emoji" | "photo";

type AvatarOption = {
  id: string;
  emoji: string;
  category: AvatarCategory;
  labelKey: string;
  fallbackLabel: string;
  accentFrom: string;
  accentTo: string;
  glow: string;
  soft: string;
  border: string;
};

const AVATARS: AvatarOption[] = [
  {
    id: "lion",
    emoji: "🦁",
    category: "animal",
    labelKey: "profile.avatar.lion",
    fallbackLabel: "Lion",
    accentFrom: "#f59e0b",
    accentTo: "#f97316",
    glow: "rgba(245,158,11,0.35)",
    soft: "rgba(245,158,11,0.14)",
    border: "rgba(245,158,11,0.30)",
  },
  {
    id: "wolf",
    emoji: "🐺",
    category: "animal",
    labelKey: "profile.avatar.wolf",
    fallbackLabel: "Wolf",
    accentFrom: "#8b5cf6",
    accentTo: "#6366f1",
    glow: "rgba(139,92,246,0.35)",
    soft: "rgba(139,92,246,0.14)",
    border: "rgba(139,92,246,0.30)",
  },
  {
    id: "panther",
    emoji: "🐆",
    category: "animal",
    labelKey: "profile.avatar.panther",
    fallbackLabel: "Panther",
    accentFrom: "#3b82f6",
    accentTo: "#06b6d4",
    glow: "rgba(59,130,246,0.35)",
    soft: "rgba(59,130,246,0.14)",
    border: "rgba(59,130,246,0.30)",
  },
  {
    id: "fox",
    emoji: "🦊",
    category: "animal",
    labelKey: "profile.avatar.fox",
    fallbackLabel: "Fox",
    accentFrom: "#ec4899",
    accentTo: "#f43f5e",
    glow: "rgba(236,72,153,0.35)",
    soft: "rgba(236,72,153,0.14)",
    border: "rgba(236,72,153,0.30)",
  },
  {
    id: "eagle",
    emoji: "🦅",
    category: "animal",
    labelKey: "profile.avatar.eagle",
    fallbackLabel: "Eagle",
    accentFrom: "#f97316",
    accentTo: "#ef4444",
    glow: "rgba(249,115,22,0.35)",
    soft: "rgba(249,115,22,0.14)",
    border: "rgba(249,115,22,0.30)",
  },
  {
    id: "tiger",
    emoji: "🐯",
    category: "animal",
    labelKey: "profile.avatar.tiger",
    fallbackLabel: "Tiger",
    accentFrom: "#ef4444",
    accentTo: "#f97316",
    glow: "rgba(239,68,68,0.35)",
    soft: "rgba(239,68,68,0.14)",
    border: "rgba(239,68,68,0.30)",
  },
  {
    id: "deer",
    emoji: "🦌",
    category: "animal",
    labelKey: "profile.avatar.deer",
    fallbackLabel: "Deer",
    accentFrom: "#22c55e",
    accentTo: "#84cc16",
    glow: "rgba(34,197,94,0.35)",
    soft: "rgba(34,197,94,0.14)",
    border: "rgba(34,197,94,0.30)",
  },

  {
    id: "woman1",
    emoji: "👩🏻",
    category: "woman",
    labelKey: "profile.avatar.woman1",
    fallbackLabel: "Woman 1",
    accentFrom: "#ec4899",
    accentTo: "#a855f7",
    glow: "rgba(236,72,153,0.35)",
    soft: "rgba(236,72,153,0.14)",
    border: "rgba(236,72,153,0.30)",
  },
  {
    id: "woman2",
    emoji: "👩🏽",
    category: "woman",
    labelKey: "profile.avatar.woman2",
    fallbackLabel: "Woman 2",
    accentFrom: "#d946ef",
    accentTo: "#8b5cf6",
    glow: "rgba(217,70,239,0.35)",
    soft: "rgba(217,70,239,0.14)",
    border: "rgba(217,70,239,0.30)",
  },
  {
    id: "woman3",
    emoji: "👩🏾",
    category: "woman",
    labelKey: "profile.avatar.woman3",
    fallbackLabel: "Woman 3",
    accentFrom: "#f43f5e",
    accentTo: "#ec4899",
    glow: "rgba(244,63,94,0.35)",
    soft: "rgba(244,63,94,0.14)",
    border: "rgba(244,63,94,0.30)",
  },
  {
    id: "woman4",
    emoji: "👱🏼‍♀️",
    category: "woman",
    labelKey: "profile.avatar.woman4",
    fallbackLabel: "Woman 4",
    accentFrom: "#fb7185",
    accentTo: "#f472b6",
    glow: "rgba(251,113,133,0.35)",
    soft: "rgba(251,113,133,0.14)",
    border: "rgba(251,113,133,0.30)",
  },

  {
    id: "man1",
    emoji: "👨🏻",
    category: "man",
    labelKey: "profile.avatar.man1",
    fallbackLabel: "Man 1",
    accentFrom: "#3b82f6",
    accentTo: "#06b6d4",
    glow: "rgba(59,130,246,0.35)",
    soft: "rgba(59,130,246,0.14)",
    border: "rgba(59,130,246,0.30)",
  },
  {
    id: "man2",
    emoji: "👨🏽",
    category: "man",
    labelKey: "profile.avatar.man2",
    fallbackLabel: "Man 2",
    accentFrom: "#06b6d4",
    accentTo: "#14b8a6",
    glow: "rgba(6,182,212,0.35)",
    soft: "rgba(6,182,212,0.14)",
    border: "rgba(6,182,212,0.30)",
  },
  {
    id: "man3",
    emoji: "👨🏾",
    category: "man",
    labelKey: "profile.avatar.man3",
    fallbackLabel: "Man 3",
    accentFrom: "#f59e0b",
    accentTo: "#eab308",
    glow: "rgba(245,158,11,0.35)",
    soft: "rgba(245,158,11,0.14)",
    border: "rgba(245,158,11,0.30)",
  },
  {
    id: "man4",
    emoji: "👱🏻‍♂️",
    category: "man",
    labelKey: "profile.avatar.man4",
    fallbackLabel: "Man 4",
    accentFrom: "#22c55e",
    accentTo: "#3b82f6",
    glow: "rgba(34,197,94,0.35)",
    soft: "rgba(34,197,94,0.14)",
    border: "rgba(34,197,94,0.30)",
  },
];

const FILTERS: { id: "all" | AvatarCategory; fallback: string; key: string }[] = [
  { id: "all", fallback: "All", key: "profile.filters.all" },
  { id: "animal", fallback: "Animals", key: "profile.filters.animals" },
  { id: "woman", fallback: "Women", key: "profile.filters.women" },
  { id: "man", fallback: "Men", key: "profile.filters.men" },
];

function safeText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

export default function ProfilePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onboardingData = getOnboardingData();

  const [name, setName] = useState(onboardingData.firstName ?? "");
  const [birthday, setBirthday] = useState(onboardingData.birthday ?? "");
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    onboardingData.avatarId ?? "lion"
  );
  const [activeFilter, setActiveFilter] = useState<"all" | AvatarCategory>("all");
  const [avatarMode, setAvatarMode] = useState<AvatarMode>(
    onboardingData.profilePhoto ? "photo" : "emoji"
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    onboardingData.profilePhoto ?? null
  );

  const filteredAvatars = useMemo(() => {
    if (activeFilter === "all") return AVATARS;
    return AVATARS.filter((avatar) => avatar.category === activeFilter);
  }, [activeFilter]);

  const currentAvatar =
    AVATARS.find((avatar) => avatar.id === selectedAvatar) ?? AVATARS[0];

  const getText = (namespace: string, key: string, fallback: string) => {
    const value = t(namespace, key);
    return safeText(value, fallback);
  };

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      setPhotoPreview(result);
      setAvatarMode("photo");
    };
    reader.readAsDataURL(file);
  };

  const handleChooseEmoji = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    setAvatarMode("emoji");
  };

  const handleContinue = () => {
    if (!name.trim()) return;

    saveOnboardingData({
      firstName: name.trim(),
      birthday: birthday || "",
      avatarId: selectedAvatar,
      profilePhoto: avatarMode === "photo" ? photoPreview ?? "" : "",
    });

    router.push("/onboarding/relationship-stage");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
      style={{ background: theme.bgBase }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            theme.bgGradientA,
            theme.bgGradientB,
            theme.bgGradientC,
            theme.bgLinear,
          ].join(", "),
        }}
      />

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col min-h-screen pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 mb-10"
          role="progressbar"
          aria-valuenow={1}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Step 1 of 3"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                flex: i === 0 ? 2 : 1,
                background:
                  i === 0 ? theme.btnPrimaryBg : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <h1
            className="text-3xl font-semibold mb-2 tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: theme.textPrimary,
            }}
          >
            {getText("onboarding", "profile.title", "Choose your avatar")}
          </h1>

          <p className="text-sm" style={{ color: theme.textMuted }}>
            {getText(
              "onboarding",
              "profile.subtitle",
              "Pick an avatar or add your own picture"
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col items-center mb-7"
        >
          <div className="relative mb-4">
            <div
              className="absolute inset-[-16px] rounded-full blur-2xl"
              style={{
                background:
                  avatarMode === "photo"
                    ? `radial-gradient(circle, ${theme.btnPrimaryGlow} 0%, transparent 70%)`
                    : `radial-gradient(circle, ${currentAvatar.glow} 0%, transparent 70%)`,
              }}
            />

            <div
              className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background:
                  avatarMode === "photo"
                    ? "rgba(255,255,255,0.08)"
                    : `linear-gradient(135deg, ${currentAvatar.soft}, rgba(255,255,255,0.05))`,
                border:
                  avatarMode === "photo"
                    ? `1px solid ${theme.cardBorder}`
                    : `1px solid ${currentAvatar.border}`,
                boxShadow:
                  avatarMode === "photo"
                    ? `
                      0 16px 40px rgba(0,0,0,0.22),
                      0 0 28px ${theme.btnPrimaryGlow},
                      inset 0 1px 0 rgba(255,255,255,0.18),
                      inset 0 -10px 20px rgba(0,0,0,0.18)
                    `
                    : `
                      0 16px 40px rgba(0,0,0,0.22),
                      0 0 28px ${currentAvatar.glow},
                      inset 0 1px 0 rgba(255,255,255,0.18),
                      inset 0 -10px 20px rgba(0,0,0,0.18)
                    `,
              }}
            >
              <div className="absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.14)_100%)]" />

              {avatarMode === "photo" && photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="relative h-full w-full object-cover"
                />
              ) : (
                <span className="relative text-[3.2rem] drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
                  {currentAvatar.emoji}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 h-9 w-9 rounded-full flex items-center justify-center"
              style={{
                background: theme.btnPrimaryBg,
                color: theme.btnPrimaryText,
                boxShadow: `0 8px 20px ${theme.btnPrimaryGlow}`,
                border: `1px solid rgba(255,255,255,0.12)`,
              }}
              aria-label={getText("onboarding", "profile.uploadPhoto", "Upload photo")}
            >
              <Camera size={16} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
          </div>

          <p
            className="text-sm font-medium"
            style={{ color: theme.textPrimary }}
          >
            {avatarMode === "photo"
              ? getText("onboarding", "profile.photoSelected", "Your photo")
              : getText("onboarding", currentAvatar.labelKey, currentAvatar.fallbackLabel)}
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-xs"
            style={{ color: theme.textMuted }}
          >
            {getText("onboarding", "profile.addOwnPicture", "Add your own picture")}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-5"
        >
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className="px-4 h-9 rounded-full text-sm whitespace-nowrap transition-all"
                  style={{
                    background: isActive
                      ? theme.btnPrimaryBg
                      : "rgba(255,255,255,0.05)",
                    color: isActive
                      ? theme.btnPrimaryText
                      : theme.textSecondary,
                    border: `1px solid ${theme.cardBorder}`,
                    boxShadow: isActive
                      ? `0 8px 22px ${theme.btnPrimaryGlow}`
                      : "none",
                  }}
                >
                  {getText("onboarding", filter.key, filter.fallback)}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8"
        >
          <div className="grid grid-cols-3 gap-3">
            {filteredAvatars.map((avatar) => {
              const isSelected =
                avatarMode === "emoji" && selectedAvatar === avatar.id;

              return (
                <motion.button
                  key={avatar.id}
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChooseEmoji(avatar.id)}
                  className="relative rounded-2xl p-3 overflow-hidden transition-all"
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, ${avatar.soft}, rgba(255,255,255,0.04))`
                      : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))",
                    border: isSelected
                      ? `1px solid ${avatar.border}`
                      : `1px solid ${theme.cardBorder}`,
                    boxShadow: isSelected
                      ? `0 0 24px ${avatar.glow}, inset 0 1px 0 rgba(255,255,255,0.14)`
                      : "0 10px 24px rgba(0,0,0,0.12)",
                  }}
                  aria-label={getText("onboarding", avatar.labelKey, avatar.fallbackLabel)}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.12)_100%)]" />
                  <div className="relative flex flex-col items-center justify-center gap-2">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${avatar.soft}, rgba(255,255,255,0.05))`,
                        border: `1px solid ${
                          isSelected ? avatar.border : "rgba(255,255,255,0.08)"
                        }`,
                        boxShadow: isSelected
                          ? `0 0 18px ${avatar.glow}`
                          : "inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                    >
                      <span className="text-[2rem] drop-shadow-[0_6px_12px_rgba(0,0,0,0.28)]">
                        {avatar.emoji}
                      </span>
                    </div>

                    <span
                      className="text-[11px] font-medium text-center leading-tight"
                      style={{
                        color: isSelected
                          ? theme.textPrimary
                          : theme.textSecondary,
                      }}
                    >
                      {getText("onboarding", avatar.labelKey, avatar.fallbackLabel)}
                    </span>
                  </div>

                  {isSelected && (
                    <div
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${avatar.accentFrom}, ${avatar.accentTo})`,
                        boxShadow: `0 0 12px ${avatar.glow}`,
                      }}
                    >
                      <Check size={10} color="white" strokeWidth={3} />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.4 }}
          className="flex flex-col gap-4 flex-1"
        >
          <div>
            <label
              htmlFor="profile-name"
              className="block text-xs mb-2 ml-1 uppercase tracking-widest"
              style={{ color: theme.textMuted }}
            >
              {getText("onboarding", "profile.firstNameLabel", "Your name")}
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={getText(
                "onboarding",
                "profile.firstNamePlaceholder",
                "First name"
              )}
              autoComplete="given-name"
              className="w-full h-14 rounded-2xl px-5 text-base focus:outline-none transition-all"
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.cardBorder}`,
                color: theme.textPrimary,
              }}
            />
          </div>

          <div>
            <label
              htmlFor="profile-birthday"
              className="block text-xs mb-2 ml-1 uppercase tracking-widest"
              style={{ color: theme.textMuted }}
            >
              {getText("onboarding", "profile.birthdayLabel", "Birth date")}{" "}
              <span className="normal-case tracking-normal">
                ({getText("onboarding", "profile.optional", "optional")})
              </span>
            </label>

            <input
              id="profile-birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              title={getText("onboarding", "profile.birthdayLabel", "Birth date")}
              placeholder="MM/DD/YYYY"
              aria-label={getText("onboarding", "profile.birthdayLabel", "Birth date")}
              className="w-full h-14 rounded-2xl px-5 text-base focus:outline-none transition-all [color-scheme:dark]"
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.cardBorder}`,
                color: theme.textSecondary,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          className="pt-8"
        >
          <motion.button
            type="button"
            onClick={handleContinue}
            whileTap={{ scale: 0.97 }}
            disabled={!name.trim()}
            className="relative w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-base disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
            style={{
              background: theme.btnPrimaryBg,
              color: theme.btnPrimaryText,
              boxShadow: `0 8px 32px ${theme.btnPrimaryGlow}`,
            }}
          >
            <span className="relative">
              {getText("common", "buttons.continue", "Continue")}
            </span>
            <ChevronRight size={18} className="relative" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
