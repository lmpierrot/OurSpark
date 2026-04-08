"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import { useTheme } from "@/components/providers/theme-provider";
import type { SparkTheme } from "@/lib/themes";
import {
  BookHeart,
  Plus,
  Image as ImageIcon,
  MapPinned,
  Clock3,
  Heart,
  Sparkles,
  ChevronRight,
  Map,
  LayoutGrid,
  Rows3,
  Camera,
  X,
  NotebookPen,
  CalendarDays,
  Smile,
  Trash2,
} from "lucide-react";

type MemoryView = "snapshots" | "timeline" | "map";

type MemoryMood =
  | "Romantic"
  | "Happy"
  | "Peaceful"
  | "Fun"
  | "Adventurous"
  | "Warm"
  | "Special";

type MemoryItem = {
  id: string;
  title: string;
  note: string;
  date: string;
  location: string;
  mood: MemoryMood;
  image?: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop";

const starterMemories: MemoryItem[] = [
  {
    id: "1",
    title: "Our First Coffee Date",
    note: "We talked for hours and neither of us wanted to leave.",
    date: "2024-01-14",
    location: "Miami, FL",
    mood: "Warm",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Beach Sunset",
    note: "One of those quiet moments that said everything without words.",
    date: "2024-03-03",
    location: "South Beach",
    mood: "Peaceful",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Late Night Drive",
    note: "Music on, windows down, no destination — just us.",
    date: "2024-06-19",
    location: "Downtown Miami",
    mood: "Adventurous",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
  },
];

const moods: MemoryMood[] = [
  "Romantic",
  "Happy",
  "Peaceful",
  "Fun",
  "Adventurous",
  "Warm",
  "Special",
];

function formatPrettyDate(date: string) {
  if (!date) return "No date";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function MemoryPage() {
  // ── Correct useTheme destructuring ──────────────────────────────
  const { theme } = useTheme();

  const [view, setView] = useState<MemoryView>("snapshots");
  const [showAddModal, setShowAddModal] = useState(false);
  const [memories, setMemories] = useState<MemoryItem[]>(starterMemories);

  const [form, setForm] = useState({
    title: "",
    note: "",
    date: "",
    location: "",
    mood: "Romantic" as MemoryMood,
    image: "",
  });

  const sortedMemories = useMemo(() => {
    return [...memories].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [memories]);

  const featured = sortedMemories[0];

  function resetForm() {
    setForm({
      title: "",
      note: "",
      date: "",
      location: "",
      mood: "Romantic",
      image: "",
    });
  }

  function openAddMemory() {
    resetForm();
    setShowAddModal(true);
  }

  function closeAddMemory() {
    setShowAddModal(false);
  }

  function saveMemory() {
    if (!form.title.trim() || !form.note.trim()) return;

    const newMemory: MemoryItem = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      note: form.note.trim(),
      date: form.date || new Date().toISOString().slice(0, 10),
      location: form.location.trim() || "Unknown place",
      mood: form.mood,
      image: form.image.trim() || DEFAULT_IMAGE,
    };

    setMemories((prev) => [newMemory, ...prev]);
    closeAddMemory();
  }

  function deleteMemory(id: string) {
    setMemories((prev) => prev.filter((memory) => memory.id !== id));
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <section className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
              Memory
            </h1>
            <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
              Your shared story, saved one moment at a time.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddMemory}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-[0_10px_28px_rgba(0,0,0,0.18)]"
            style={{ background: theme.accent, color: "#fff" }}
            aria-label="Add memory"
          >
            <Plus size={18} />
          </button>
        </section>

        <section>
          <div
            className="grid grid-cols-3 gap-2 rounded-2xl p-1"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <ViewButton
              active={view === "snapshots"}
              label="Snapshots"
              icon={<LayoutGrid size={15} />}
              onClick={() => setView("snapshots")}
              theme={theme}
            />
            <ViewButton
              active={view === "timeline"}
              label="Timeline"
              icon={<Rows3 size={15} />}
              onClick={() => setView("timeline")}
              theme={theme}
            />
            <ViewButton
              active={view === "map"}
              label="Map"
              icon={<Map size={15} />}
              onClick={() => setView("map")}
              theme={theme}
            />
          </div>
        </section>

        {featured ? (
          <GradientCard className="overflow-hidden p-0">
            <div className="relative">
              <img
                src={featured.image || DEFAULT_IMAGE}
                alt={featured.title}
                className="h-56 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}
                >
                  Featured Memory
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-medium"
                  style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
                >
                  {featured.mood}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-lg font-semibold text-white">{featured.title}</p>
                <p className="mt-1 text-sm text-white/80">{featured.note}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <MetaPill icon={<Clock3 size={12} />} text={formatPrettyDate(featured.date)} />
                  <MetaPill icon={<MapPinned size={12} />} text={featured.location} />
                </div>
              </div>
            </div>
          </GradientCard>
        ) : null}

        <section className="grid grid-cols-3 gap-3">
          <QuickAction icon={<Camera size={17} />} label="Add Photo" onClick={openAddMemory} theme={theme} />
          <QuickAction icon={<NotebookPen size={17} />} label="Write Note" onClick={openAddMemory} theme={theme} />
          <QuickAction icon={<MapPinned size={17} />} label="Add Place" onClick={openAddMemory} theme={theme} />
        </section>

        {view === "snapshots" && (
          <section className="space-y-3">
            <SectionLabel label="Snapshots" theme={theme} />
            {sortedMemories.length === 0 ? (
              <EmptyState
                icon={<BookHeart size={34} />}
                title="No memories yet"
                text="Start by adding your first photo, note, or special moment."
                actionLabel="Add Memory"
                onAction={openAddMemory}
                theme={theme}
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {sortedMemories.map((memory) => (
                  <SnapshotCard
                    key={memory.id}
                    memory={memory}
                    onDelete={() => deleteMemory(memory.id)}
                    theme={theme}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {view === "timeline" && (
          <section className="space-y-3">
            <SectionLabel label="Timeline" theme={theme} />
            {sortedMemories.length === 0 ? (
              <EmptyState
                icon={<Rows3 size={34} />}
                title="Your timeline starts here"
                text="Every memory you add becomes part of your story."
                actionLabel="Add First Memory"
                onAction={openAddMemory}
                theme={theme}
              />
            ) : (
              <div className="space-y-3">
                {sortedMemories.map((memory, index) => (
                  <TimelineCard
                    key={memory.id}
                    memory={memory}
                    isLast={index === sortedMemories.length - 1}
                    onDelete={() => deleteMemory(memory.id)}
                    theme={theme}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {view === "map" && (
          <section className="space-y-3">
            <SectionLabel label="Memory Map" theme={theme} />
            <GradientCard className="overflow-hidden p-0">
              <div
                className="relative flex h-72 items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 25%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06), transparent 22%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                }}
              >
                <div className="absolute inset-0 opacity-30">
                  <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
                </div>

                {sortedMemories.slice(0, 5).map((memory, index) => {
                  const positions = [
                    { top: "24%", left: "30%" },
                    { top: "50%", left: "62%" },
                    { top: "68%", left: "42%" },
                    { top: "35%", left: "78%" },
                    { top: "72%", left: "20%" },
                  ];
                  const pos = positions[index] || positions[0];
                  return (
                    <MapPinDot
                      key={memory.id}
                      top={pos.top}
                      left={pos.left}
                      label={memory.title}
                      theme={theme}
                    />
                  );
                })}

                <div className="relative z-10 px-6 text-center">
                  <MapPinned size={34} style={{ color: theme.accent, opacity: 0.9 }} />
                  <p className="mt-3 text-sm font-medium" style={{ color: theme.textPrimary }}>
                    Your relationship map
                  </p>
                  <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>
                    Add places to your memories so your story becomes something you can explore visually.
                  </p>
                </div>
              </div>
            </GradientCard>

            <div className="space-y-3">
              {sortedMemories.map((memory) => (
                <GradientCard key={memory.id} className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.05)", color: theme.accent }}
                    >
                      <MapPinned size={17} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                        {memory.title}
                      </p>
                      <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>
                        {memory.location}
                      </p>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px]"
                      style={{ background: "rgba(255,255,255,0.05)", color: theme.textMuted }}
                    >
                      {formatPrettyDate(memory.date)}
                    </span>
                  </div>
                </GradientCard>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-3">
          <SectionLabel label="Collections" theme={theme} />
          <div className="space-y-3">
            <CollectionRow icon={<ImageIcon size={16} />} title="Photos" subtitle="Your favorite visual moments together" theme={theme} />
            <CollectionRow icon={<Heart size={16} />} title="Special Moments" subtitle="Big feelings, little details, and unforgettable days" theme={theme} />
            <CollectionRow icon={<MapPinned size={16} />} title="Places" subtitle="A map of where your story has happened" theme={theme} />
          </div>
        </section>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[32px] border px-4 pb-6 pt-4 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]"
            style={{ background: theme.bgBase, borderColor: theme.cardBorder }}
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/10" />

            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold" style={{ color: theme.textPrimary }}>
                  Add Memory
                </h2>
                <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
                  Save a photo, note, place, and feeling from a special moment.
                </p>
              </div>
              <button
                type="button"
                onClick={closeAddMemory}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.05)", color: theme.textMuted }}
                aria-label="Close"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4">
              <FormField label="Memory Title" theme={theme}>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Our first rooftop dinner"
                  className="w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                  style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}
                />
              </FormField>

              <FormField label="Note" theme={theme}>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                  placeholder="What made this moment special?"
                  rows={4}
                  className="w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                  style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Date" theme={theme}>
                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: theme.textMuted }}
                    />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                      className="w-full rounded-2xl border bg-transparent py-3 pl-11 pr-4 text-sm outline-none"
                      style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}
                    />
                  </div>
                </FormField>

                <FormField label="Mood" theme={theme}>
                  <div className="relative">
                    <Smile
                      size={15}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: theme.textMuted }}
                    />
                    <select
                      aria-label="Memory mood"
                      value={form.mood}
                      onChange={(e) => setForm((prev) => ({ ...prev, mood: e.target.value as MemoryMood }))}
                      className="w-full rounded-2xl border bg-transparent py-3 pl-11 pr-4 text-sm outline-none"
                      style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}
                    >
                      {moods.map((mood) => (
                        <option key={mood} value={mood} style={{ color: "#111" }}>
                          {mood}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormField>
              </div>

              <FormField label="Place" theme={theme}>
                <div className="relative">
                  <MapPinned
                    size={15}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: theme.textMuted }}
                  />
                  <input
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Ex: Miami Beach"
                    className="w-full rounded-2xl border bg-transparent py-3 pl-11 pr-4 text-sm outline-none"
                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}
                  />
                </div>
              </FormField>

              <FormField label="Photo URL" theme={theme}>
                <div className="relative">
                  <ImageIcon
                    size={15}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: theme.textMuted }}
                  />
                  <input
                    value={form.image}
                    onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="Paste an image link"
                    className="w-full rounded-2xl border bg-transparent py-3 pl-11 pr-4 text-sm outline-none"
                    style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}
                  />
                </div>
              </FormField>

              <GradientCard className="px-4 py-4">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.05)", color: theme.accent }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                      Great memories feel layered
                    </p>
                    <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
                      Add a title, note, date, place, and mood so this moment looks beautiful in snapshot, timeline, and map views.
                    </p>
                  </div>
                </div>
              </GradientCard>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeAddMemory}
                  className="flex-1 rounded-2xl px-4 py-3 text-sm font-medium"
                  style={{ background: "rgba(255,255,255,0.05)", color: theme.textPrimary }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveMemory}
                  className="flex-1 rounded-2xl px-4 py-3 text-sm font-medium"
                  style={{ background: theme.accent, color: "#fff" }}
                >
                  Save Memory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

/* ── Helper Components ────────────────────────────────────────── */

function ViewButton({
  active, label, icon, onClick, theme,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  theme: SparkTheme;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-medium transition"
      style={{
        background: active ? theme.cardBg : "transparent",
        color: active ? theme.textPrimary : theme.textMuted,
        border: active ? `1px solid ${theme.cardBorder}` : "1px solid transparent",
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function QuickAction({
  icon, label, onClick, theme,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  theme: SparkTheme;
}) {
  return (
    <GradientCard onClick={onClick} className="px-3 py-4">
      <div className="flex flex-col items-center text-center">
        <div
          className="mb-2 flex h-9 w-9 items-center justify-center rounded-2xl"
          style={{ background: "rgba(255,255,255,0.05)", color: theme.accent }}
        >
          {icon}
        </div>
        <p className="text-xs font-medium" style={{ color: theme.textPrimary }}>
          {label}
        </p>
      </div>
    </GradientCard>
  );
}

function SnapshotCard({
  memory, onDelete, theme,
}: {
  memory: MemoryItem;
  onDelete: () => void;
  theme: SparkTheme;
}) {
  return (
    <GradientCard className="overflow-hidden p-0">
      <img src={memory.image || DEFAULT_IMAGE} alt={memory.title} className="h-28 w-full object-cover" />
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
            {memory.title}
          </p>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", color: theme.textMuted }}
            aria-label="Delete memory"
          >
            <Trash2 size={14} />
          </button>
        </div>
        <p className="mt-1 line-clamp-2 text-xs" style={{ color: theme.textMuted }}>
          {memory.note}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[10px]" style={{ color: theme.textMuted }}>
            {formatPrettyDate(memory.date)}
          </span>
          <span className="text-[10px]" style={{ color: theme.accent }}>
            {memory.location}
          </span>
        </div>
      </div>
    </GradientCard>
  );
}

function TimelineCard({
  memory, isLast, onDelete, theme,
}: {
  memory: MemoryItem;
  isLast: boolean;
  onDelete: () => void;
  theme: SparkTheme;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="mt-1 h-3.5 w-3.5 rounded-full" style={{ background: theme.accent }} />
        {!isLast && <div className="mt-2 w-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />}
      </div>
      <div className="flex-1 pb-4">
        <GradientCard className="px-4 py-4">
          <div className="flex items-start gap-3">
            <img src={memory.image || DEFAULT_IMAGE} alt={memory.title} className="h-16 w-16 rounded-2xl object-cover" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                  {memory.title}
                </p>
                <button
                  type="button"
                  onClick={onDelete}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", color: theme.textMuted }}
                  aria-label="Delete memory"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
                {memory.note}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <SmallTag text={formatPrettyDate(memory.date)} theme={theme} />
                <SmallTag text={memory.location} theme={theme} />
                <SmallTag text={memory.mood} theme={theme} />
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}

function CollectionRow({
  icon, title, subtitle, theme,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  theme: SparkTheme;
}) {
  return (
    <GradientCard onClick={() => {}} className="px-4 py-4">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{ background: "rgba(255,255,255,0.05)", color: theme.accent }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: theme.textPrimary }}>{title}</p>
          <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>{subtitle}</p>
        </div>
        <ChevronRight size={16} style={{ color: theme.textMuted }} />
      </div>
    </GradientCard>
  );
}

function SectionLabel({ label, theme }: { label: string; theme: SparkTheme }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.textMuted }}>
      {label}
    </p>
  );
}

function SmallTag({ text, theme }: { text: string; theme: SparkTheme }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[10px]"
      style={{ background: "rgba(255,255,255,0.05)", color: theme.textMuted }}
    >
      {text}
    </span>
  );
}

function MetaPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/90 backdrop-blur-sm">
      {icon}
      {text}
    </span>
  );
}

function MapPinDot({
  top, left, label, theme,
}: {
  top: string;
  left: string;
  label: string;
  theme: SparkTheme;
}) {
  return (
    <div className="absolute z-10" style={{ top, left, transform: "translate(-50%, -50%)" }}>
      <div className="relative flex flex-col items-center">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          style={{ background: theme.accent, color: "#fff" }}
        >
          <MapPinned size={16} />
        </div>
        <span
          className="mt-2 rounded-full px-2 py-1 text-[10px] font-medium"
          style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function EmptyState({
  icon, title, text, actionLabel, onAction, theme,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  actionLabel: string;
  onAction: () => void;
  theme: SparkTheme;
}) {
  return (
    <GradientCard>
      <div className="flex flex-col items-center gap-3 py-7 text-center">
        <div style={{ color: theme.accent, opacity: 0.9 }}>{icon}</div>
        <p className="text-sm font-medium" style={{ color: theme.textPrimary }}>{title}</p>
        <p className="max-w-[260px] text-xs leading-5" style={{ color: theme.textMuted }}>{text}</p>
        <button
          type="button"
          onClick={onAction}
          className="mt-2 rounded-full px-4 py-2 text-sm font-medium"
          style={{ background: theme.accent, color: "#fff" }}
        >
          {actionLabel}
        </button>
      </div>
    </GradientCard>
  );
}

function FormField({
  label, children, theme,
}: {
  label: string;
  children: React.ReactNode;
  theme: SparkTheme;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium" style={{ color: theme.textMuted }}>{label}</p>
      {children}
    </div>
  );
}
