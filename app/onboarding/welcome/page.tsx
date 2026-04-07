"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";

/* ─────────────────────────────────────────────────────────────────
   Read user choices from the single onboarding JSON blob.
   Key: "oursparks_onboarding"  (underscore, not hyphen)
   Language key: "oursparks_onboarding".language  ("en" | "fr" | "es" | "ht")
───────────────────────────────────────────────────────────────── */
function getUserChoices() {
  const defaults = { name: "You", emoji: "✦", stage: "", themeName: "", lang: "English" };

  if (typeof window === "undefined") return defaults;

  try {
    /* ── Onboarding blob ── */
    const raw = localStorage.getItem("oursparks_onboarding");
    const parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};

    const name    = typeof parsed.firstName === "string" && parsed.firstName.trim()
      ? parsed.firstName.trim()
      : defaults.name;

    const stage   = typeof parsed.relationshipStage === "string"
      ? parsed.relationshipStage.replace(/-/g, " ")
      : "";

    /* ── Avatar emoji ── */
    const EMOJI_MAP: Record<string, string> = {
      lion: "🦁", wolf: "🐺", panther: "🐆", fox: "🦊", eagle: "🦅",
      tiger: "🐯", deer: "🦌",
      woman1: "👩🏻", woman2: "👩🏽", woman3: "👩🏾", woman4: "👱🏼‍♀️",
      man1: "👨🏻", man2: "👨🏽", man3: "👨🏾", man4: "👱🏻‍♂️",
    };
    let emoji = defaults.emoji;
    if (typeof parsed.avatarId === "string") emoji = EMOJI_MAP[parsed.avatarId] ?? "✦";
    if (parsed.profilePhoto) emoji = "📸";
    /* animal avatar from new system */
    if (parsed.avatar && typeof parsed.avatar === "object") {
      const av = parsed.avatar as Record<string, unknown>;
      if (av.type === "animal" && typeof av.emoji === "string") emoji = av.emoji;
      if (av.type === "photo") emoji = "📸";
    }

    /* ── Theme name ── */
    const themeRaw = localStorage.getItem("oursparks_theme") ?? "";
    const themeName = themeRaw
      ? themeRaw.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "";

    /* ── Language — stored inside the onboarding blob as .language ── */
    const LANG_MAP: Record<string, string> = {
      en: "English", fr: "Français", es: "Español", ht: "Kreyòl",
    };
    const langCode = typeof parsed.language === "string" ? parsed.language : "en";
    const lang = LANG_MAP[langCode] ?? "English";

    return { name, emoji, stage, themeName, lang };
  } catch {
    return defaults;
  }
}

/* ─── Floating particles ─────────────────────────────────────── */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 5 + Math.random() * 90,
  size: 1.5 + Math.random() * 3,
  delay: Math.random() * 4,
  dur: 4 + Math.random() * 5,
  drift: (Math.random() - 0.5) * 40,
}));

function safeText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

/* ─── 3D Heart component ─────────────────────────────────────── */
function Heart3D({ progress, accentFrom, accentTo, glowColor }: {
  progress: number;
  accentFrom: string;
  accentTo: string;
  glowColor: string;
}) {
  const pulse = Math.sin(Date.now() / 500) * 0.04 + 1;
  const fill = Math.min(progress / 100, 1);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 130 }}>
      {/* Outer glow layers */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 160,
          height: 160,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          opacity: 0.4 + fill * 0.3,
          transform: `scale(${0.8 + fill * 0.4})`,
          transition: "all 0.6s ease",
        }}
      />
      <div
        className="absolute rounded-full blur-xl"
        style={{
          width: 100,
          height: 100,
          background: `radial-gradient(circle, ${accentFrom}60 0%, transparent 70%)`,
          opacity: fill,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* SVG heart with fill animation */}
      <svg
        width="120"
        height="110"
        viewBox="0 0 120 110"
        className="relative z-10"
        style={{
          filter: `drop-shadow(0 0 ${8 + fill * 16}px ${accentFrom}80)`,
          transform: `scale(${1 + fill * 0.08})`,
          transition: "transform 0.4s ease, filter 0.4s ease",
        }}
      >
        <defs>
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentFrom} />
            <stop offset="100%" stopColor={accentTo} />
          </linearGradient>
          <linearGradient id="heartGradFill" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={accentFrom} stopOpacity="0.95" />
            <stop offset="100%" stopColor={accentTo} stopOpacity="0.9" />
          </linearGradient>
          <clipPath id="heartClip">
            <path d="M60 95 C20 70 5 50 5 32 C5 15 18 5 32 5 C42 5 52 11 60 20 C68 11 78 5 88 5 C102 5 115 15 115 32 C115 50 100 70 60 95 Z" />
          </clipPath>
          {/* Shine overlay */}
          <linearGradient id="heartShine" x1="0%" y1="0%" x2="60%" y2="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Heart outline (unfilled) */}
        <path
          d="M60 95 C20 70 5 50 5 32 C5 15 18 5 32 5 C42 5 52 11 60 20 C68 11 78 5 88 5 C102 5 115 15 115 32 C115 50 100 70 60 95 Z"
          fill="none"
          stroke={`${accentFrom}30`}
          strokeWidth="2"
        />

        {/* Animated fill rect clipped to heart shape */}
        <rect
          x="0"
          y={110 - fill * 110}
          width="120"
          height="110"
          fill="url(#heartGradFill)"
          clipPath="url(#heartClip)"
          style={{ transition: "y 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}
        />

        {/* Shine */}
        <path
          d="M60 95 C20 70 5 50 5 32 C5 15 18 5 32 5 C42 5 52 11 60 20 C68 11 78 5 88 5 C102 5 115 15 115 32 C115 50 100 70 60 95 Z"
          fill="url(#heartShine)"
          clipPath="url(#heartClip)"
        />

        {/* Inner highlight for 3D depth */}
        <ellipse
          cx="42"
          cy="28"
          rx="10"
          ry="7"
          fill="white"
          opacity={0.08 + fill * 0.06}
          transform="rotate(-20 42 28)"
        />
      </svg>

      {/* Floating sparkles around the heart */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const r = 68 + fill * 8;
        const cx = 70 + Math.cos(angle) * r;
        const cy = 55 + Math.sin(angle) * r;
        return (
          <motion.div
            key={i}
            className="absolute text-xs"
            style={{ left: cx - 8, top: cy - 8, opacity: fill * 0.8 }}
            animate={{ scale: [0.7, 1.2, 0.7], opacity: [fill * 0.4, fill * 0.9, fill * 0.4] }}
            transition={{ duration: 2 + i * 0.3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Two silhouettes approaching each other ─────────────────── */
function CoupleApproach({ progress }: { progress: number }) {
  const separation = Math.max(0, 1 - progress / 80);
  const leftX = -separation * 36;
  const rightX = separation * 36;
  const opacity = Math.min(1, progress / 20);

  return (
    <div className="relative flex items-end justify-center gap-0" style={{ height: 64, opacity }}>
      {/* Left silhouette */}
      <motion.div
        animate={{ x: leftX }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <svg width="28" height="52" viewBox="0 0 28 52" fill="rgba(255,255,255,0.18)">
          <circle cx="14" cy="10" r="7" />
          <path d="M4 52 C4 36 8 28 14 28 C20 28 24 36 24 52 Z" />
          <path d="M0 44 C4 38 8 36 14 38 C8 38 4 38 0 44 Z" opacity="0.5" />
          <path d="M28 44 C24 38 20 36 14 38 C20 38 24 38 28 44 Z" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Heart between them — appears as they get close */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 text-base"
        animate={{
          opacity: Math.max(0, 1 - separation * 3),
          scale: Math.max(0.3, 1 - separation * 2),
          y: -8 - (1 - separation) * 8,
        }}
        transition={{ duration: 0.4 }}
      >
        💗
      </motion.div>

      {/* Right silhouette */}
      <motion.div
        animate={{ x: rightX }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <svg width="28" height="52" viewBox="0 0 28 52" fill="rgba(255,255,255,0.18)">
          <circle cx="14" cy="10" r="7" />
          <path d="M4 52 C4 36 8 28 14 28 C20 28 24 36 24 52 Z" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function WelcomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useI18n();
  const choices = useMemo(() => getUserChoices(), []);

  const getText = (ns: string, key: string, fallback: string) =>
    safeText(t(ns, key), fallback);

  /* ── Phases personalised with user choices ── */
  const PHASES = useMemo(() => [
    { text: `${getText("onboarding","welcome.phase1","Hey")} ${choices.name}… ${getText("onboarding","welcome.phase1Tail","give us a moment")}`, icon: "🌸" },
    { text: choices.lang !== "English" ? `${getText("onboarding","welcome.phase5","Language")}: ${choices.lang}` : getText("onboarding","welcome.phase5En","Setting up English"), icon: "🌍" },
    { text: choices.stage ? `${getText("onboarding","welcome.phase3","Tuning for")} "${choices.stage}"` : getText("onboarding","welcome.phase3Fallback","Reading your love story…"), icon: "💫" },
    { text: `${getText("onboarding","welcome.phase2","Setting")} ${choices.emoji === "✦" ? "" : choices.emoji} ${getText("onboarding","welcome.phase2Tail","your identity")}`, icon: choices.emoji },
    { text: choices.themeName ? `${getText("onboarding","welcome.phase4","Applying")} ${choices.themeName}` : getText("onboarding","welcome.phase4Fallback","Painting your palette…"), icon: "🎨" },
    { text: getText("onboarding","welcome.phase6","Weaving your shared space…"), icon: "🕊️" },
    { text: getText("onboarding","welcome.phase7","Almost there…"), icon: "✨" },
    { text: `${choices.name}, ${getText("onboarding","welcome.phase8","your spark is ready")} 🔥`, icon: "🔥" },
  ], [choices, t]);

  const [phase, setPhase]     = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone]       = useState(false);
  const progRef = useRef(0);

  /* ── Phase ticker ── */
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      idx++;
      if (idx >= PHASES.length) { clearInterval(iv); setPhase(PHASES.length - 1); setDone(true); return; }
      setPhase(idx);
    }, 1100);
    return () => clearInterval(iv);
  }, [PHASES.length]);

  /* ── Progress counter ── */
  useEffect(() => {
    const target = Math.round(((phase + 1) / PHASES.length) * 100);
    const iv = setInterval(() => {
      progRef.current += 1;
      if (progRef.current >= target) { progRef.current = target; clearInterval(iv); }
      setProgress(progRef.current);
    }, 14);
    return () => clearInterval(iv);
  }, [phase, PHASES.length]);

  /* ── Navigate to /home when done ── */
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => router.push("/home"), 1400);
    return () => clearTimeout(t);
  }, [done, router]);

  return (
    <div
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: theme.bgBase }}
    >
      {/* ── Deep background glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            `radial-gradient(ellipse 90% 55% at 50% 35%, ${theme.accentGlow ?? "rgba(244,63,94,0.2)"} 0%, transparent 70%)`,
            `radial-gradient(ellipse 70% 45% at 50% 95%, ${theme.secondaryGlow ?? "rgba(168,85,247,0.15)"} 0%, transparent 70%)`,
          ].join(", "),
        }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top:  `${p.y}%`,
            width:  p.size,
            height: p.size,
            background: `rgba(${theme.accentRgb ?? "244,63,94"}, 0.25)`,
          }}
          animate={{ y: [0, p.drift, 0], opacity: [0.1, 0.45, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center text-center">

        {/* App logo badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="mb-5"
        >
          <div className="relative">
            <div
              className="absolute inset-[-10px] rounded-3xl blur-xl opacity-55"
              style={{ background: theme.btnPrimaryBg ?? "linear-gradient(135deg,#f43f5e,#a855f7)" }}
            />
            <div
              className="relative w-14 h-14 rounded-[18px] flex items-center justify-center text-2xl"
              style={{
                background: theme.btnPrimaryBg ?? "linear-gradient(135deg,#f43f5e,#a855f7)",
                boxShadow: `0 0 36px ${theme.accentGlow ?? "rgba(244,63,94,0.45)"}`,
              }}
            >
              ✦
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl font-semibold tracking-tight mb-1.5"
          style={{ color: theme.textPrimary, fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {getText("onboarding","welcome.title","Crafting your space")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm mb-8"
          style={{ color: theme.textMuted }}
        >
          {getText("onboarding","welcome.subtitle","Just a moment")}, {choices.name}…
        </motion.p>

        {/* ── 3D Heart visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 160, damping: 18 }}
          className="mb-3"
        >
          <Heart3D
            progress={progress}
            accentFrom={theme.accentFrom ?? "#f43f5e"}
            accentTo={theme.accentTo ?? "#a855f7"}
            glowColor={theme.accentGlow ?? "rgba(244,63,94,0.35)"}
          />
        </motion.div>

        {/* ── Couple silhouettes ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 -mt-2"
        >
          <CoupleApproach progress={progress} />
        </motion.div>

        {/* ── Animated phase text ── */}
        <div className="h-12 relative w-full mb-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-xl">{PHASES[phase].icon}</span>
              <p className="text-sm font-medium leading-snug" style={{ color: theme.textSecondary }}>
                {PHASES[phase].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Progress bar ── */}
        <div className="w-full max-w-[260px]">
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mb-2"
            style={{ background: "rgba(255,255,255,0.07)" }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ background: theme.btnPrimaryBg ?? "linear-gradient(90deg,#f43f5e,#a855f7)" }}
            />
          </div>

          <div className="flex justify-between">
            <span className="text-[11px] tabular-nums font-medium" style={{ color: theme.textMuted }}>
              {progress}%
            </span>
            <span className="text-[11px]" style={{ color: theme.textMuted }}>
              {done
                ? getText("onboarding","welcome.done","Ready ✦")
                : getText("onboarding","welcome.preparing","Preparing…")}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
