"use client";

import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import {
  Gamepad2,
  HeartHandshake,
  Flame,
  Shuffle,
  Trophy,
  Brain,
  Sparkles,
  ChevronRight,
  CircleHelp,
  MessagesSquare,
  Star,
} from "lucide-react";

const gameCategories = [
  {
    title: "Would You Rather",
    description: "Pick between two fun or tricky options.",
    icon: Shuffle,
    glow: "rgba(249,115,22,.12)",
  },
  {
    title: "Compatibility Quiz",
    description: "Compare your answers and see how aligned you are.",
    icon: HeartHandshake,
    glow: "rgba(244,63,94,.12)",
  },
  {
    title: "Love Language Quiz",
    description: "Discover how you both feel most loved.",
    icon: Sparkles,
    glow: "rgba(168,85,247,.12)",
  },
  {
    title: "Truth or Dare",
    description: "Playful prompts, bold moments, and flirty fun.",
    icon: Flame,
    glow: "rgba(236,72,153,.12)",
  },
  {
    title: "Never Have I Ever",
    description: "Funny and revealing questions for couples.",
    icon: CircleHelp,
    glow: "rgba(59,130,246,.12)",
  },
  {
    title: "Who’s More Likely To",
    description: "Find out who fits the prompt better.",
    icon: Trophy,
    glow: "rgba(34,197,94,.12)",
  },
];

const featuredGames = [
  {
    title: "This or That",
    subtitle: "60 choices with images",
    vibe: "Fast, fun, and easy to compare",
  },
  {
    title: "Finish My Sentence",
    subtitle: "50 playful prompts",
    vibe: "Cute, emotional, and revealing",
  },
  {
    title: "Love Trivia",
    subtitle: "100 Q&A",
    vibe: "Test what you know about each other",
  },
];

export default function PlayPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[30px] font-bold tracking-tight text-white">
            Play
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Games, quizzes, and playful ways to connect together.
          </p>
        </div>

        {/* Featured game */}
        <section className="space-y-3">
          <GradientCard
            glowColor="rgba(244,63,94,.12)"
            className="group bg-gradient-to-br from-rose-500/[0.12] via-pink-500/[0.08] to-transparent transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(244,63,94,0.14)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-300/80">
                  Featured Game
                </p>
                <p className="mt-3 text-xl font-semibold leading-7 text-white">
                  Couples Compatibility Challenge
                </p>
                <p className="mt-2 text-sm text-white/55">
                  Answer together, compare your choices, and see how strong your match feels.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-pink-400/80 ring-2 ring-[#120318]" />
                  <div className="-ml-2 h-8 w-8 rounded-full bg-purple-400/80 ring-2 ring-[#120318]" />
                </div>
              </div>

              <button className="shrink-0 rounded-full bg-rose-400/20 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-400/30">
                Play
              </button>
            </div>
          </GradientCard>
        </section>

        {/* Compatibility block */}
        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Compatibility
            </h2>
            <p className="mt-1 text-sm text-white/50">
              See how well your answers match and where you differ.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <GradientCard className="min-h-[118px] px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <HeartHandshake className="text-pink-300" size={18} />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                    Match
                  </span>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">82%</p>
                  <p className="mt-1 text-xs text-white/45">overall compatibility</p>
                </div>
              </div>
            </GradientCard>

            <GradientCard className="min-h-[118px] px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <Brain className="text-purple-300" size={18} />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                    Insight
                  </span>
                </div>

                <div>
                  <p className="text-[15px] font-semibold leading-6 text-white">
                    You agree most on emotional connection
                  </p>
                  <p className="mt-1 text-xs text-white/45">based on recent answers</p>
                </div>
              </div>
            </GradientCard>
          </div>
        </section>

        {/* Game categories */}
        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Game Categories</h2>
            <p className="mt-1 text-sm text-white/50">
              Choose a style and start playing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {gameCategories.map((game) => {
              const Icon = game.icon;

              return (
                <button key={game.title} className="text-left">
                  <GradientCard
                    glowColor={game.glow}
                    className="group h-full min-h-[140px] px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(255,255,255,0.05)]"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="rounded-2xl bg-white/[0.04] p-2.5 w-fit transition group-hover:bg-white/[0.06]">
                        <Icon size={18} className="text-white/85" />
                      </div>

                      <div>
                        <p className="text-base font-semibold text-white">
                          {game.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/45">
                          {game.description}
                        </p>
                      </div>
                    </div>
                  </GradientCard>
                </button>
              );
            })}
          </div>
        </section>

        {/* Browse all */}
        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Browse More Games</h2>
            <p className="mt-1 text-sm text-white/50">
              Quick ways to laugh, compare, and learn about each other.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {featuredGames.map((game) => (
              <button key={game.title} className="text-left">
                <GradientCard className="group px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(255,255,255,0.05)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-white">
                        {game.title}
                      </p>
                      <p className="mt-1 text-sm text-white/45">
                        {game.subtitle}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-pink-300/70">
                        {game.vibe}
                      </p>
                    </div>

                    <ChevronRight className="text-white/35 transition group-hover:translate-x-0.5 group-hover:text-white/65" size={18} />
                  </div>
                </GradientCard>
              </button>
            ))}
          </div>
        </section>

        {/* Explore deeper */}
        <section className="space-y-3">
          <Link href="/ask" className="block">
            <GradientCard
              glowColor="rgba(168,85,247,.10)"
              className="group transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(168,85,247,0.12)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-300/80">
                    Want something deeper?
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Explore the Ask section
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    Move from games into real conversations.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 rounded-full bg-purple-400/15 px-4 py-2 text-sm font-medium text-purple-200 transition group-hover:bg-purple-400/25">
                  Go to Ask <ChevronRight size={15} />
                </div>
              </div>
            </GradientCard>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
