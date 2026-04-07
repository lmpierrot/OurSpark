"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { saveOnboardingData } from "@/lib/onboarding";

type SlideAccent = {
  from: string;
  to: string;
  glow: string;
  soft: string;
  border: string;
  orb: string;
};

const SLIDE_EMOJIS = ["💫", "🌙", "✨"] as const;

const SLIDE_ACCENTS: SlideAccent[] = [
  {
    from: "#f43f5e",
    to: "#ec4899",
    glow: "rgba(244, 63, 94, 0.32)",
    soft: "rgba(244, 63, 94, 0.14)",
    border: "rgba(244, 63, 94, 0.24)",
    orb: "rgba(244, 63, 94, 0.20)",
  },
  {
    from: "#8b5cf6",
    to: "#6366f1",
    glow: "rgba(139, 92, 246, 0.30)",
    soft: "rgba(139, 92, 246, 0.14)",
    border: "rgba(139, 92, 246, 0.24)",
    orb: "rgba(139, 92, 246, 0.20)",
  },
  {
    from: "#f97316",
    to: "#ef4444",
    glow: "rgba(249, 115, 22, 0.30)",
    soft: "rgba(249, 115, 22, 0.14)",
    border: "rgba(249, 115, 22, 0.24)",
    orb: "rgba(249, 115, 22, 0.18)",
  },
];

const variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 42 : -42,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -42 : 42,
  }),
};

function isRenderableText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default function IntroPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const getText = (namespace: string, key: string, fallback: string) => {
    const value = t(namespace, key);
    if (isRenderableText(value) && value !== key) return value;
    return fallback;
  };

  const slides = useMemo(
    () => [
      {
        emoji: SLIDE_EMOJIS[0],
        accent: SLIDE_ACCENTS[0],
        title: getText(
          "onboarding",
          "intro.slide1.title",
          "Your love story,\nbeautifully kept"
        ),
        body: getText(
          "onboarding",
          "intro.slide1.description",
          "OurSparks is a private universe built for two — where your milestones, memories, and moments live together, always."
        ),
      },
      {
        emoji: SLIDE_EMOJIS[1],
        accent: SLIDE_ACCENTS[1],
        title: getText(
          "onboarding",
          "intro.slide2.title",
          "Stay close,\nno matter the distance"
        ),
        body: getText(
          "onboarding",
          "intro.slide2.description",
          "Share your day, send a touch, celebrate each other — the distance between you shrinks with every spark."
        ),
      },
      {
        emoji: SLIDE_EMOJIS[2],
        accent: SLIDE_ACCENTS[2],
        title: getText(
          "onboarding",
          "intro.slide3.title",
          "Grow together,\nintentionally"
        ),
        body: getText(
          "onboarding",
          "intro.slide3.description",
          "Relationship check-ins, shared goals, and gentle nudges keep your connection strong and evolving every single day."
        ),
      },
    ],
    [t]
  );

  const slide = slides[current];

  const skipLabel = getText("common", "buttons.skip", "Skip");
  const continueLabel = getText("common", "buttons.continue", "Continue");
  const getStartedLabel = getText(
    "onboarding",
    "intro.getStarted",
    "Get Started"
  );

  const markDone = () => {
    saveOnboardingData({ introCompleted: true });
    router.push("/auth");
  };

  const advance = () => {
    if (current < slides.length - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    } else {
      markDone();
    }
  };

  const goTo = (i: number) => {
    if (i === current) return;
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#0b0610] pb-12 pt-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div
            className="absolute top-[-18%] left-[-10%] w-[78vw] h-[78vw] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${slide.accent.orb} 0%, transparent 68%)`,
            }}
          />
          <div
            className="absolute bottom-[-16%] right-[-10%] w-[68vw] h-[68vw] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${slide.accent.glow} 0%, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,5,15,0.70)_0%,rgba(10,5,15,0.95)_100%)]" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${slide.accent.soft}, transparent 38%, rgba(255,255,255,0.02) 58%, transparent 82%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-sm px-6 flex justify-end">
        {current < slides.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={markDone}
            className="text-sm font-light transition-colors text-white/38 hover:text-white/62"
            aria-label="Skip introduction"
          >
            {skipLabel}
          </motion.button>
        )}
      </div>

      <div className="relative z-10 w-full max-w-sm px-6 flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center w-full"
          >
            <motion.div
              className="relative mb-10"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="absolute inset-[-26px] rounded-[34px] blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${slide.accent.glow} 0%, transparent 70%)`,
                }}
              />

              <div
                className="relative w-28 h-28 rounded-[30px] flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${slide.accent.from}20, ${slide.accent.to}14)`,
                  border: `1px solid ${slide.accent.border}`,
                  boxShadow: `
                    0 0 34px ${slide.accent.glow},
                    inset 0 1px 0 rgba(255,255,255,0.10)
                  `,
                }}
                aria-hidden="true"
              >
                <span className="relative text-4xl">{slide.emoji}</span>
              </div>
            </motion.div>

            <div className="w-full px-2">
              <h2
                className="text-[2.6rem] font-semibold leading-[0.98] tracking-tight mb-6 whitespace-pre-line text-center"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  background: `linear-gradient(135deg, #ffffff 58%, ${slide.accent.to})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {slide.title}
              </h2>

              <p className="text-white/50 text-[1.05rem] leading-[1.8] text-center max-w-[320px] mx-auto font-light">
                {slide.body}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center gap-6">
        <div
          className="flex items-center gap-2.5"
          role="group"
          aria-label="Slide indicators"
        >
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative p-1"
              type="button"
            >
              <motion.div
                animate={{
                  width: i === current ? 26 : 7,
                  backgroundColor:
                    i === current ? s.accent.from : "rgba(255,255,255,0.18)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="h-1.5 rounded-full"
                style={{
                  boxShadow:
                    i === current ? `0 0 14px ${s.accent.glow}` : "none",
                }}
              />
            </button>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={advance}
          whileTap={{ scale: 0.975 }}
          whileHover={{ scale: 1.01 }}
          className="relative w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-white text-base overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${slide.accent.from}, ${slide.accent.to})`,
            boxShadow: `0 18px 42px ${slide.accent.glow}`,
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04)_38%,rgba(0,0,0,0.15)_100%)]" />
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(90deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]" />
          <span className="relative">
            {current < slides.length - 1 ? continueLabel : getStartedLabel}
          </span>
          <ChevronRight size={18} className="relative" aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}
