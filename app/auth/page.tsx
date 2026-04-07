"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Mail,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { getDictionary } from "@/lib/i18n";
import type { AppLanguage } from "@/lib/i18n";

type Mode = "signin" | "signup";

/* ── Read language from the single onboarding blob ─────────────── */
function readStoredLanguage(): AppLanguage {
  if (typeof window === "undefined") return "en";
  try {
    const raw = localStorage.getItem("oursparks_onboarding");
    if (!raw) return "en";
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const lang = parsed.language;
    if (lang === "fr" || lang === "es" || lang === "ht") return lang;
    return "en";
  } catch {
    return "en";
  }
}

export default function AuthPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t: tProvider } = useI18n();

  /* ── Language-aware dictionary ────────────────────────────────── */
  const lang = useMemo(readStoredLanguage, []);
  const dict = useMemo(() => getDictionary(lang), [lang]);

  // Resolve: local dict first → provider fallback → hardcoded fallback
  const tx = (key: string, fallback: string): string => {
    const ns = dict.auth as Record<string, unknown>;
    if (ns) {
      const val = ns[key];
      if (typeof val === "string" && val.trim()) return val;
    }
    const pv = tProvider("auth", key);
    if (pv && pv !== key) return pv;
    return fallback;
  };

  /* ── Component state — untouched ──────────────────────────────── */
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  /* ── handleSubmit — untouched ─────────────────────────────────── */
  const handleSubmit = async () => {
    setError("");

    if (!email.trim() || !isValidEmail(email)) {
      setError(tx("errors.invalidEmail", "Please enter a valid email"));
      return;
    }

    if (password.length < 8 || password.length > 14) {
      setError(tx("errors.passwordLength", "Password must be 8–14 characters"));
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      setError(tx("errors.passwordMatch", "Passwords do not match"));
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    if (mode === "signin") {
      router.push("/home");
    } else {
      alert(tx("verificationSent", "Verification email sent"));
      router.push("/onboarding/profile");
    }
  };

  /* ── Translated strings ───────────────────────────────────────── */
  const signInLabel      = tx("signIn",           "Sign In");
  const signUpLabel      = tx("signUp",            "Sign Up");
  const welcomeBack      = tx("welcomeBack",       "Welcome back");
  const createAccount    = tx("createAccount",     "Create your account");
  const emailPlaceholder = tx("emailPlaceholder",  "Email");
  const passwordLabel    = tx("passwordLabel",     "Password");
  const confirmLabel     = tx("confirmPassword",   "Confirm password");
  const loadingLabel     = tx("loading",           "Loading...");
  const continueApple    = tx("continueWithApple", "Continue with Apple");
  const orLabel          = tx("or",                "or");
  const noAccount        = tx("noAccount",         "Don't have an account?");
  const hasAccount       = tx("hasAccount",        "Already have an account?");

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">

      {/* 🔥 PREMIUM BACKGROUND — untouched */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 80% 20%, rgba(168,85,247,0.18), transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(244,63,94,0.18), transparent 40%),
            linear-gradient(135deg, #0a050f 0%, #140812 40%, #1b0a18 100%)
          `,
        }}
      />

      {/* 🔥 FLOATING GLOW — untouched */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.18), rgba(168,85,247,0.12), transparent 70%)",
        }}
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-10%", "15%", "-10%"],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-[400px] px-6">

        {/* LOGO — untouched */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-5">
            <div className="absolute inset-[-14px] rounded-3xl blur-2xl opacity-50 bg-gradient-to-r from-rose-500 to-purple-500" />
            <div className="w-[72px] h-[72px] rounded-[22px] flex items-center justify-center bg-gradient-to-r from-rose-500 to-purple-500">
              <Sparkles size={28} color="#fff" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white">
            OurSparks
          </h1>

          <p className="text-sm text-white/50 mt-2">
            {mode === "signin" ? welcomeBack : createAccount}
          </p>
        </div>

        {/* CARD — untouched layout */}
        <div className="rounded-3xl p-6 backdrop-blur-xl border border-white/10 bg-white/5">

          {/* TOGGLE */}
          <div className="flex mb-6 p-1 bg-white/5 rounded-2xl">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-xl ${
                  mode === m
                    ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white"
                    : "text-white/50"
                }`}
              >
                {m === "signin" ? signInLabel : signUpLabel}
              </button>
            ))}
          </div>

          {/* FORM — untouched structure */}
          <div className="flex flex-col gap-4">

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={emailPlaceholder}
              className="p-3 rounded-xl bg-white/10 text-white"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={passwordLabel}
                className="p-3 w-full rounded-xl bg-white/10 text-white"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/50"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {mode === "signup" && (
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={confirmLabel}
                className="p-3 rounded-xl bg-white/10 text-white"
              />
            )}

            {error && (
              <div className="text-red-400 text-sm flex items-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="h-14 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2"
            >
              {loading
                ? loadingLabel
                : mode === "signin"
                ? signInLabel
                : tx("createAccountBtn", "Create Account")}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* DIVIDER — untouched */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-xs">{orLabel}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* APPLE BUTTON — untouched */}
          <button className="w-full h-12 bg-white text-black rounded-2xl">
            {continueApple}
          </button>

        </div>

        {/* BOTTOM TEXT — untouched layout */}
        <p className="text-center text-sm text-white/50 mt-6">
          {mode === "signin" ? noAccount : hasAccount}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-rose-400 font-semibold"
          >
            {mode === "signin" ? signUpLabel : signInLabel}
          </button>
        </p>

      </div>
    </div>
  );
}
