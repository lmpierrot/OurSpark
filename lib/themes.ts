/**
 * OurSparks Theme System
 * ──────────────────────
 * Each theme is a complete visual identity — not just colors,
 * but gradients, glows, opacities, and atmosphere tokens that
 * work together to create a cohesive luxury feel.
 */

export interface SparkTheme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  /** Preview gradient shown on the theme picker card */
  preview: string;

  /* ── Background layers ── */
  bgBase: string;
  bgGradientA: string;
  bgGradientB: string;
  bgGradientC: string;
  bgLinear: string;

  /* ── Surface / Cards ── */
  cardBg: string;
  cardBorder: string;
  cardGlow: string;

  /* ── Accent colors ── */
  accent: string;
  accentMuted: string;
  accentGlow: string;
  accentRgb: string;       // for rgba() usage

  /* ── Secondary accent ── */
  secondary: string;
  secondaryMuted: string;
  secondaryGlow: string;

  /* ── Text ── */
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textAccent: string;

  /* ── Navigation ── */
  navBg: string;
  navBorder: string;
  navActive: string;
  navInactive: string;
  navGlow: string;

  /* ── Buttons ── */
  btnPrimaryBg: string;
  btnPrimaryText: string;
  btnPrimaryGlow: string;

  /* ── Avatar ring colors ── */
  avatarRingA: string;
  avatarRingB: string;

  /* ── Thought bubble ── */
  bubbleBg: string;
  bubbleBorder: string;
  bubbleAuthor: string;

  /* ── Sparkle overlay opacity ── */
  sparkleOpacity: string;
}

/* ── Theme Definitions ── */

const midnightRose: SparkTheme = {
  id: "midnight-rose",
  name: "Midnight Rose",
  emoji: "🌹",
  description: "Dark romantic elegance",
  preview: "linear-gradient(135deg, #1a0a1e 0%, #2d1033 40%, #3d1541 100%)",

  bgBase: "#0c0a10",
  bgGradientA: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(120,40,80,.35) 0%, transparent 70%)",
  bgGradientB: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(90,30,100,.30) 0%, transparent 70%)",
  bgGradientC: "radial-gradient(ellipse 90% 40% at 50% 90%, rgba(60,20,70,.25) 0%, transparent 70%)",
  bgLinear: "linear-gradient(170deg, #0c0a10 0%, #14101c 40%, #110d18 100%)",

  cardBg: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.07)",
  cardGlow: "rgba(244,63,94,0.12)",

  accent: "#f43f5e",
  accentMuted: "rgba(244,63,94,0.7)",
  accentGlow: "rgba(244,63,94,0.5)",
  accentRgb: "244,63,94",

  secondary: "#a855f7",
  secondaryMuted: "rgba(168,85,247,0.7)",
  secondaryGlow: "rgba(168,85,247,0.5)",

  textPrimary: "rgba(255,255,255,0.95)",
  textSecondary: "rgba(255,255,255,0.70)",
  textMuted: "rgba(255,255,255,0.40)",
  textAccent: "#f43f5e",

  navBg: "rgba(12,10,16,0.80)",
  navBorder: "rgba(255,255,255,0.06)",
  navActive: "#f43f5e",
  navInactive: "rgba(255,255,255,0.40)",
  navGlow: "rgba(244,63,94,0.5)",

  btnPrimaryBg: "linear-gradient(135deg, #e11d48, #be185d)",
  btnPrimaryText: "#ffffff",
  btnPrimaryGlow: "rgba(225,29,72,0.4)",

  avatarRingA: "#e11d48",
  avatarRingB: "#a855f7",

  bubbleBg: "rgba(255,255,255,0.05)",
  bubbleBorder: "rgba(255,255,255,0.07)",
  bubbleAuthor: "rgba(244,63,94,0.7)",

  sparkleOpacity: "0.03",
};

const champagneBlush: SparkTheme = {
  id: "champagne-blush",
  name: "Champagne Blush",
  emoji: "🥂",
  description: "Warm golden intimacy",
  preview: "linear-gradient(135deg, #1c1610 0%, #2a1f16 40%, #342618 100%)",

  bgBase: "#110e0a",
  bgGradientA: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(180,140,60,.25) 0%, transparent 70%)",
  bgGradientB: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(200,120,80,.20) 0%, transparent 70%)",
  bgGradientC: "radial-gradient(ellipse 90% 40% at 50% 90%, rgba(160,100,50,.18) 0%, transparent 70%)",
  bgLinear: "linear-gradient(170deg, #110e0a 0%, #1a1510 40%, #161210 100%)",

  cardBg: "rgba(255,240,220,0.04)",
  cardBorder: "rgba(255,220,180,0.08)",
  cardGlow: "rgba(212,175,105,0.12)",

  accent: "#d4af69",
  accentMuted: "rgba(212,175,105,0.7)",
  accentGlow: "rgba(212,175,105,0.5)",
  accentRgb: "212,175,105",

  secondary: "#c8806e",
  secondaryMuted: "rgba(200,128,110,0.7)",
  secondaryGlow: "rgba(200,128,110,0.4)",

  textPrimary: "rgba(255,248,240,0.95)",
  textSecondary: "rgba(255,240,220,0.70)",
  textMuted: "rgba(255,230,200,0.40)",
  textAccent: "#d4af69",

  navBg: "rgba(17,14,10,0.80)",
  navBorder: "rgba(255,220,180,0.06)",
  navActive: "#d4af69",
  navInactive: "rgba(255,240,220,0.40)",
  navGlow: "rgba(212,175,105,0.5)",

  btnPrimaryBg: "linear-gradient(135deg, #d4af69, #b8943f)",
  btnPrimaryText: "#1a1510",
  btnPrimaryGlow: "rgba(212,175,105,0.4)",

  avatarRingA: "#d4af69",
  avatarRingB: "#c8806e",

  bubbleBg: "rgba(255,240,220,0.05)",
  bubbleBorder: "rgba(255,220,180,0.07)",
  bubbleAuthor: "rgba(212,175,105,0.7)",

  sparkleOpacity: "0.04",
};

const obsidianLove: SparkTheme = {
  id: "obsidian-love",
  name: "Obsidian Love",
  emoji: "🖤",
  description: "Deep dark passion",
  preview: "linear-gradient(135deg, #080808 0%, #141010 40%, #1a1014 100%)",

  bgBase: "#060606",
  bgGradientA: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(180,20,40,.20) 0%, transparent 70%)",
  bgGradientB: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(60,10,20,.25) 0%, transparent 70%)",
  bgGradientC: "radial-gradient(ellipse 90% 40% at 50% 90%, rgba(100,15,30,.15) 0%, transparent 70%)",
  bgLinear: "linear-gradient(170deg, #060606 0%, #0e0a0c 40%, #0a0808 100%)",

  cardBg: "rgba(255,255,255,0.03)",
  cardBorder: "rgba(255,255,255,0.05)",
  cardGlow: "rgba(200,30,50,0.10)",

  accent: "#dc2626",
  accentMuted: "rgba(220,38,38,0.7)",
  accentGlow: "rgba(220,38,38,0.4)",
  accentRgb: "220,38,38",

  secondary: "#991b1b",
  secondaryMuted: "rgba(153,27,27,0.7)",
  secondaryGlow: "rgba(153,27,27,0.4)",

  textPrimary: "rgba(255,255,255,0.90)",
  textSecondary: "rgba(255,255,255,0.60)",
  textMuted: "rgba(255,255,255,0.30)",
  textAccent: "#ef4444",

  navBg: "rgba(6,6,6,0.85)",
  navBorder: "rgba(255,255,255,0.04)",
  navActive: "#ef4444",
  navInactive: "rgba(255,255,255,0.30)",
  navGlow: "rgba(239,68,68,0.4)",

  btnPrimaryBg: "linear-gradient(135deg, #dc2626, #991b1b)",
  btnPrimaryText: "#ffffff",
  btnPrimaryGlow: "rgba(220,38,38,0.35)",

  avatarRingA: "#dc2626",
  avatarRingB: "#7f1d1d",

  bubbleBg: "rgba(255,255,255,0.03)",
  bubbleBorder: "rgba(255,255,255,0.05)",
  bubbleAuthor: "rgba(239,68,68,0.7)",

  sparkleOpacity: "0.02",
};

const lavenderDream: SparkTheme = {
  id: "lavender-dream",
  name: "Lavender Dream",
  emoji: "💜",
  description: "Soft ethereal romance",
  preview: "linear-gradient(135deg, #12101a 0%, #1a1528 40%, #201a30 100%)",

  bgBase: "#0e0c14",
  bgGradientA: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(140,100,200,.28) 0%, transparent 70%)",
  bgGradientB: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(100,80,180,.22) 0%, transparent 70%)",
  bgGradientC: "radial-gradient(ellipse 90% 40% at 50% 90%, rgba(120,90,190,.18) 0%, transparent 70%)",
  bgLinear: "linear-gradient(170deg, #0e0c14 0%, #161320 40%, #13101c 100%)",

  cardBg: "rgba(200,180,255,0.04)",
  cardBorder: "rgba(180,160,240,0.08)",
  cardGlow: "rgba(167,139,250,0.12)",

  accent: "#a78bfa",
  accentMuted: "rgba(167,139,250,0.7)",
  accentGlow: "rgba(167,139,250,0.5)",
  accentRgb: "167,139,250",

  secondary: "#c084fc",
  secondaryMuted: "rgba(192,132,252,0.7)",
  secondaryGlow: "rgba(192,132,252,0.4)",

  textPrimary: "rgba(240,235,255,0.95)",
  textSecondary: "rgba(220,210,245,0.70)",
  textMuted: "rgba(200,190,230,0.40)",
  textAccent: "#a78bfa",

  navBg: "rgba(14,12,20,0.80)",
  navBorder: "rgba(180,160,240,0.06)",
  navActive: "#a78bfa",
  navInactive: "rgba(200,190,230,0.40)",
  navGlow: "rgba(167,139,250,0.5)",

  btnPrimaryBg: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  btnPrimaryText: "#ffffff",
  btnPrimaryGlow: "rgba(139,92,246,0.4)",

  avatarRingA: "#8b5cf6",
  avatarRingB: "#c084fc",

  bubbleBg: "rgba(200,180,255,0.05)",
  bubbleBorder: "rgba(180,160,240,0.07)",
  bubbleAuthor: "rgba(167,139,250,0.7)",

  sparkleOpacity: "0.035",
};

const sunsetPeach: SparkTheme = {
  id: "sunset-peach",
  name: "Sunset Peach",
  emoji: "🌅",
  description: "Warm golden hour glow",
  preview: "linear-gradient(135deg, #181210 0%, #241a14 40%, #2c1e16 100%)",

  bgBase: "#120e0c",
  bgGradientA: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(240,140,80,.25) 0%, transparent 70%)",
  bgGradientB: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(220,100,60,.20) 0%, transparent 70%)",
  bgGradientC: "radial-gradient(ellipse 90% 40% at 50% 90%, rgba(200,80,60,.18) 0%, transparent 70%)",
  bgLinear: "linear-gradient(170deg, #120e0c 0%, #1a1410 40%, #161210 100%)",

  cardBg: "rgba(255,220,200,0.04)",
  cardBorder: "rgba(255,180,140,0.08)",
  cardGlow: "rgba(251,146,60,0.12)",

  accent: "#fb923c",
  accentMuted: "rgba(251,146,60,0.7)",
  accentGlow: "rgba(251,146,60,0.5)",
  accentRgb: "251,146,60",

  secondary: "#f97316",
  secondaryMuted: "rgba(249,115,22,0.7)",
  secondaryGlow: "rgba(249,115,22,0.4)",

  textPrimary: "rgba(255,248,240,0.95)",
  textSecondary: "rgba(255,235,220,0.70)",
  textMuted: "rgba(255,220,200,0.40)",
  textAccent: "#fb923c",

  navBg: "rgba(18,14,12,0.80)",
  navBorder: "rgba(255,180,140,0.06)",
  navActive: "#fb923c",
  navInactive: "rgba(255,220,200,0.40)",
  navGlow: "rgba(251,146,60,0.5)",

  btnPrimaryBg: "linear-gradient(135deg, #f97316, #ea580c)",
  btnPrimaryText: "#ffffff",
  btnPrimaryGlow: "rgba(249,115,22,0.4)",

  avatarRingA: "#f97316",
  avatarRingB: "#fb923c",

  bubbleBg: "rgba(255,220,200,0.05)",
  bubbleBorder: "rgba(255,180,140,0.07)",
  bubbleAuthor: "rgba(251,146,60,0.7)",

  sparkleOpacity: "0.04",
};

const oceanBond: SparkTheme = {
  id: "ocean-bond",
  name: "Ocean Bond",
  emoji: "🌊",
  description: "Deep sea connection",
  preview: "linear-gradient(135deg, #0a1014 0%, #0e1820 40%, #102028 100%)",

  bgBase: "#080c10",
  bgGradientA: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(40,120,180,.28) 0%, transparent 70%)",
  bgGradientB: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(30,100,160,.22) 0%, transparent 70%)",
  bgGradientC: "radial-gradient(ellipse 90% 40% at 50% 90%, rgba(20,80,140,.18) 0%, transparent 70%)",
  bgLinear: "linear-gradient(170deg, #080c10 0%, #0e141c 40%, #0c1018 100%)",

  cardBg: "rgba(180,220,255,0.04)",
  cardBorder: "rgba(140,200,255,0.08)",
  cardGlow: "rgba(56,189,248,0.12)",

  accent: "#38bdf8",
  accentMuted: "rgba(56,189,248,0.7)",
  accentGlow: "rgba(56,189,248,0.5)",
  accentRgb: "56,189,248",

  secondary: "#0ea5e9",
  secondaryMuted: "rgba(14,165,233,0.7)",
  secondaryGlow: "rgba(14,165,233,0.4)",

  textPrimary: "rgba(240,248,255,0.95)",
  textSecondary: "rgba(220,235,250,0.70)",
  textMuted: "rgba(180,210,240,0.40)",
  textAccent: "#38bdf8",

  navBg: "rgba(8,12,16,0.80)",
  navBorder: "rgba(140,200,255,0.06)",
  navActive: "#38bdf8",
  navInactive: "rgba(180,210,240,0.40)",
  navGlow: "rgba(56,189,248,0.5)",

  btnPrimaryBg: "linear-gradient(135deg, #0ea5e9, #0284c7)",
  btnPrimaryText: "#ffffff",
  btnPrimaryGlow: "rgba(14,165,233,0.4)",

  avatarRingA: "#0ea5e9",
  avatarRingB: "#38bdf8",

  bubbleBg: "rgba(180,220,255,0.05)",
  bubbleBorder: "rgba(140,200,255,0.07)",
  bubbleAuthor: "rgba(56,189,248,0.7)",

  sparkleOpacity: "0.035",
};

const softIvory: SparkTheme = {
  id: "soft-ivory",
  name: "Soft Ivory",
  emoji: "🕊️",
  description: "Pure and tender warmth",
  preview: "linear-gradient(135deg, #16140e 0%, #1e1c14 40%, #24221a 100%)",

  bgBase: "#100e0a",
  bgGradientA: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(220,200,160,.20) 0%, transparent 70%)",
  bgGradientB: "radial-gradient(ellipse 60% 50% at 80% 30%, rgba(200,180,140,.16) 0%, transparent 70%)",
  bgGradientC: "radial-gradient(ellipse 90% 40% at 50% 90%, rgba(180,160,120,.14) 0%, transparent 70%)",
  bgLinear: "linear-gradient(170deg, #100e0a 0%, #181610 40%, #14120e 100%)",

  cardBg: "rgba(240,230,210,0.04)",
  cardBorder: "rgba(220,210,180,0.08)",
  cardGlow: "rgba(217,203,172,0.10)",

  accent: "#d9cbac",
  accentMuted: "rgba(217,203,172,0.7)",
  accentGlow: "rgba(217,203,172,0.4)",
  accentRgb: "217,203,172",

  secondary: "#b8a88a",
  secondaryMuted: "rgba(184,168,138,0.7)",
  secondaryGlow: "rgba(184,168,138,0.4)",

  textPrimary: "rgba(245,240,230,0.95)",
  textSecondary: "rgba(230,220,200,0.70)",
  textMuted: "rgba(210,200,180,0.40)",
  textAccent: "#d9cbac",

  navBg: "rgba(16,14,10,0.80)",
  navBorder: "rgba(220,210,180,0.06)",
  navActive: "#d9cbac",
  navInactive: "rgba(210,200,180,0.40)",
  navGlow: "rgba(217,203,172,0.4)",

  btnPrimaryBg: "linear-gradient(135deg, #d9cbac, #b8a88a)",
  btnPrimaryText: "#1a1810",
  btnPrimaryGlow: "rgba(217,203,172,0.3)",

  avatarRingA: "#d9cbac",
  avatarRingB: "#b8a88a",

  bubbleBg: "rgba(240,230,210,0.05)",
  bubbleBorder: "rgba(220,210,180,0.07)",
  bubbleAuthor: "rgba(217,203,172,0.7)",

  sparkleOpacity: "0.03",
};

/* ── Exports ── */

export const THEMES: SparkTheme[] = [
  midnightRose,
  champagneBlush,
  obsidianLove,
  lavenderDream,
  sunsetPeach,
  oceanBond,
  softIvory,
];

export const DEFAULT_THEME_ID = "midnight-rose";

export function getThemeById(id: string): SparkTheme {
  return THEMES.find((t) => t.id === id) ?? midnightRose;
}
