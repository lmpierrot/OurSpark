"use client";

import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import {
  Sparkles,
  Clock3,
  CheckCircle2,
  FolderOpen,
  Heart,
  Flame,
  Laugh,
  Compass,
  Home,
  ChevronRight,
} from "lucide-react";

const tabs = [
  { label: "All", active: true, icon: Sparkles },
  { label: "Your Turn", active: false, icon: Clock3 },
  { label: "Answered", active: false, icon: CheckCircle2 },
  { label: "Completed", active: false, icon: FolderOpen },
];

const categories = [
  {
    title: "Fun",
    description: "Playful questions to make each other smile.",
    icon: Laugh,
    glow: "rgba(249,115,22,.12)",
  },
  {
    title: "Deep",
    description: "Meaningful questions for real connection.",
    icon: Sparkles,
    glow: "rgba(168,85,247,.12)",
  },
  {
    title: "Romantic",
    description: "Questions about love, care, and closeness.",
    icon: Heart,
    glow: "rgba(244,63,94,.12)",
  },
  {
    title: "Spicy",
    description: "Flirty and intimate conversations.",
    icon: Flame,
    glow: "rgba(236,72,153,.12)",
  },
  {
    title: "Future",
    description: "Dreams, plans, and what comes next.",
    icon: Compass,
    glow: "rgba(59,130,246,.12)",
  },
  {
    title: "Moving In",
    description: "Living together, routines, and shared space.",
    icon: Home,
    glow: "rgba(34,197,94,.12)",
  },
];

const folders = [
  {
    title: "Starters",
    subtitle: "Easy openers",
    progress: "0% complete",
  },
  {
    title: "Relationship",
    subtitle: "Values and connection",
    progress: "12% complete",
  },
  {
    title: "Sex & Love",
    subtitle: "Intimacy and attraction",
    progress: "0% complete",
  },
  {
    title: "Money & Finances",
    subtitle: "Goals, habits, and spending",
    progress: "0% complete",
  },
  {
    title: "Travel",
    subtitle: "Trips, dreams, and adventure",
    progress: "0% complete",
  },
  {
    title: "Family",
    subtitle: "Boundaries, traditions, and future plans",
    progress: "0% complete",
  },
];

export default function AskPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[30px] font-bold tracking-tight text-white">
            Ask
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Explore questions, topics, and deeper conversations together.
          </p>
        </div>

        {/* Tabs */}
        <section className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.label}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    tab.active
                      ? "border-pink-300/20 bg-pink-400/15 text-pink-200 shadow-[0_0_18px_rgba(244,114,182,0.12)]"
                      : "border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.07] hover:text-white"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Daily question */}
        <section className="space-y-3">
          <GradientCard
            glowColor="rgba(249,115,22,.12)"
            className="group bg-gradient-to-br from-orange-400/[0.10] to-transparent transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(249,115,22,0.14)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300/80">
                  Free Daily Conversation
                </p>
                <p className="mt-3 text-lg font-semibold leading-7 text-white">
                  What is something you want us to improve together this month?
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-pink-400/80 ring-2 ring-[#120318]" />
                  <div className="-ml-2 h-8 w-8 rounded-full bg-purple-400/80 ring-2 ring-[#120318]" />
                </div>
              </div>

              <button className="shrink-0 rounded-full bg-orange-400/20 px-4 py-2 text-sm font-medium text-orange-200 transition hover:bg-orange-400/30">
                Answer
              </button>
            </div>
          </GradientCard>
        </section>

        {/* Categories */}
        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Categories</h2>
            <p className="mt-1 text-sm text-white/50">
              Pick a vibe and start talking.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button key={category.title} className="text-left">
                  <GradientCard
                    glowColor={category.glow}
                    className="group h-full min-h-[138px] px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(255,255,255,0.05)]"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="rounded-2xl bg-white/[0.04] p-2.5 w-fit transition group-hover:bg-white/[0.06]">
                        <Icon size={18} className="text-white/85" />
                      </div>

                      <div>
                        <p className="text-base font-semibold text-white">
                          {category.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/45">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </GradientCard>
                </button>
              );
            })}
          </div>
        </section>

        {/* Folders */}
        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Folders</h2>
            <p className="mt-1 text-sm text-white/50">
              Explore advanced topics and guided conversation packs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {folders.map((folder) => (
              <button key={folder.title} className="text-left">
                <GradientCard className="group px-4 py-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_18px_40px_rgba(255,255,255,0.05)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-white">
                        {folder.title}
                      </p>
                      <p className="mt-1 text-sm text-white/45">
                        {folder.subtitle}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-pink-300/70">
                        {folder.progress}
                      </p>
                    </div>

                    <ChevronRight className="text-white/35 transition group-hover:translate-x-0.5 group-hover:text-white/65" size={18} />
                  </div>
                </GradientCard>
              </button>
            ))}
          </div>
        </section>

        {/* Explore more */}
        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Explore More</h2>
            <p className="mt-1 text-sm text-white/50">
              Browse topic packs made for every stage of your relationship.
            </p>
          </div>

          <Link href="/play" className="block">
            <GradientCard
              glowColor="rgba(168,85,247,.10)"
              className="group transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(168,85,247,0.12)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-300/80">
                    Switch it up
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Try a couple game instead
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 rounded-full bg-purple-400/15 px-4 py-2 text-sm font-medium text-purple-200 transition group-hover:bg-purple-400/25">
                  Go to Play <ChevronRight size={15} />
                </div>
              </div>
            </GradientCard>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
