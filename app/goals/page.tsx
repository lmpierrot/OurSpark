"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Target,
  Plus,
  X,
  Heart,
  Wallet,
  Plane,
  MessageCircleHeart,
  CalendarHeart,
  Home,
  Users,
  CheckCircle2,
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";

type RelationshipStage =
  | "getting-to-know"
  | "dating"
  | "boyfriend-girlfriend"
  | "engaged"
  | "married"
  | "long-distance"
  | "other";

type GoalCategory =
  | "communication"
  | "finance"
  | "wedding"
  | "travel"
  | "date"
  | "family"
  | "home"
  | "intimacy"
  | "future"
  | "custom";

type Goal = {
  id: string;
  title: string;
  category: GoalCategory;
  progress: number;
  target: number;
  description?: string;
  deadline?: string;
  priority: "low" | "medium" | "high";
  isSuggested?: boolean;
};

const STAGE_OPTIONS: {
  value: RelationshipStage;
  label: string;
}[] = [
  { value: "getting-to-know", label: "Getting to know each other" },
  { value: "dating", label: "Dating" },
  { value: "boyfriend-girlfriend", label: "Boyfriend / Girlfriend" },
  { value: "engaged", label: "Engaged" },
  { value: "married", label: "Married" },
  { value: "long-distance", label: "Long distance" },
  { value: "other", label: "Other" },
];

const CATEGORY_OPTIONS: {
  value: GoalCategory;
  label: string;
}[] = [
  { value: "communication", label: "Communication" },
  { value: "finance", label: "Finance" },
  { value: "wedding", label: "Wedding" },
  { value: "travel", label: "Travel" },
  { value: "date", label: "Date" },
  { value: "family", label: "Family" },
  { value: "home", label: "Home" },
  { value: "intimacy", label: "Intimacy" },
  { value: "future", label: "Future" },
  { value: "custom", label: "Custom" },
];

const STAGE_GOAL_SUGGESTIONS: Record<
  RelationshipStage,
  { title: string; category: GoalCategory; target: number; description: string }[]
> = {
  "getting-to-know": [
    {
      title: "Have 3 meaningful conversations this week",
      category: "communication",
      target: 3,
      description: "Learn more about each other through intentional talks.",
    },
    {
      title: "Go on 2 intentional dates",
      category: "date",
      target: 2,
      description: "Create real moments together and build connection.",
    },
    {
      title: "Share one personal life goal each",
      category: "future",
      target: 2,
      description: "Talk about where each of you wants to go in life.",
    },
  ],
  dating: [
    {
      title: "Plan 1 date night this week",
      category: "date",
      target: 1,
      description: "Create quality time intentionally.",
    },
    {
      title: "Do 3 daily check-ins",
      category: "communication",
      target: 3,
      description: "Stay connected with quick and meaningful check-ins.",
    },
    {
      title: "Save toward one shared experience",
      category: "finance",
      target: 100,
      description: "Build toward something fun together.",
    },
  ],
  "boyfriend-girlfriend": [
    {
      title: "Plan 2 quality dates this month",
      category: "date",
      target: 2,
      description: "Make time for each other on purpose.",
    },
    {
      title: "Build a shared savings goal",
      category: "finance",
      target: 250,
      description: "Save together for a shared experience or need.",
    },
    {
      title: "Have 4 deeper conversations this month",
      category: "communication",
      target: 4,
      description: "Grow your emotional connection through intentional talks.",
    },
  ],
  engaged: [
    {
      title: "Set your wedding budget",
      category: "wedding",
      target: 1,
      description: "Create clarity around wedding spending.",
    },
    {
      title: "Shortlist top venues or vendors",
      category: "wedding",
      target: 5,
      description: "Move wedding planning forward together.",
    },
    {
      title: "Start honeymoon savings",
      category: "finance",
      target: 500,
      description: "Build toward your first trip together after the wedding.",
    },
  ],
  married: [
    {
      title: "Do a weekly relationship check-in",
      category: "communication",
      target: 4,
      description: "Protect your connection with consistent time together.",
    },
    {
      title: "Review finances together this month",
      category: "finance",
      target: 1,
      description: "Stay aligned on money and priorities.",
    },
    {
      title: "Plan 1 meaningful date night",
      category: "date",
      target: 1,
      description: "Keep the romance intentional.",
    },
  ],
  "long-distance": [
    {
      title: "Schedule 3 video dates this week",
      category: "communication",
      target: 3,
      description: "Make distance easier with intentional connection.",
    },
    {
      title: "Plan your next visit",
      category: "travel",
      target: 1,
      description: "Give yourselves something real to look forward to.",
    },
    {
      title: "Send 5 thoughtful messages",
      category: "communication",
      target: 5,
      description: "Stay emotionally close across the distance.",
    },
  ],
  other: [
    {
      title: "Create your first shared goal",
      category: "custom",
      target: 1,
      description: "Start with something meaningful to both of you.",
    },
    {
      title: "Plan one intentional moment together",
      category: "date",
      target: 1,
      description: "Choose a goal that reflects your relationship.",
    },
  ],
};

function getCategoryIcon(category: GoalCategory) {
  switch (category) {
    case "communication":
      return MessageCircleHeart;
    case "finance":
      return Wallet;
    case "wedding":
      return CalendarHeart;
    case "travel":
      return Plane;
    case "date":
      return Heart;
    case "family":
      return Users;
    case "home":
      return Home;
    case "intimacy":
      return Heart;
    case "future":
      return Target;
    default:
      return Plus;
  }
}

function CategoryIcon({ category, size, color }: { category: GoalCategory; size: number; color: string }) {
  switch (category) {
    case "communication":
      return <MessageCircleHeart size={size} style={{ color }} />;
    case "finance":
      return <Wallet size={size} style={{ color }} />;
    case "wedding":
      return <CalendarHeart size={size} style={{ color }} />;
    case "travel":
      return <Plane size={size} style={{ color }} />;
    case "date":
      return <Heart size={size} style={{ color }} />;
    case "family":
      return <Users size={size} style={{ color }} />;
    case "home":
      return <Home size={size} style={{ color }} />;
    case "intimacy":
      return <Heart size={size} style={{ color }} />;
    case "future":
      return <Target size={size} style={{ color }} />;
    default:
      return <Plus size={size} style={{ color }} />;
  }
}

export default function GoalsPage() {
  const { theme } = useTheme();

  const [relationshipStage, setRelationshipStage] =
    useState<RelationshipStage>("dating");
  const [showStageMenu, setShowStageMenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "goal-1",
      title: "Plan 1 date night this week",
      category: "date",
      progress: 0,
      target: 1,
      description: "Create quality time intentionally.",
      deadline: "",
      priority: "medium",
    },
    {
      id: "goal-2",
      title: "Do 3 daily check-ins",
      category: "communication",
      progress: 1,
      target: 3,
      description: "Stay connected with quick and meaningful check-ins.",
      deadline: "",
      priority: "high",
    },
  ]);

  const [form, setForm] = useState<{
    title: string;
    category: GoalCategory;
    target: number;
    progress: number;
    description: string;
    deadline: string;
    priority: "low" | "medium" | "high";
  }>({
    title: "",
    category: "custom",
    target: 1,
    progress: 0,
    description: "",
    deadline: "",
    priority: "medium",
  });

  const suggestions = useMemo(() => {
    return STAGE_GOAL_SUGGESTIONS[relationshipStage];
  }, [relationshipStage]);

  const activeGoals = goals;
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.progress >= goal.target).length;

  function openCreateGoal(prefill?: Partial<typeof form>) {
    setEditingGoalId(null);
    setForm({
      title: prefill?.title ?? "",
      category: prefill?.category ?? "custom",
      target: prefill?.target ?? 1,
      progress: prefill?.progress ?? 0,
      description: prefill?.description ?? "",
      deadline: prefill?.deadline ?? "",
      priority: prefill?.priority ?? "medium",
    });
    setIsCreatingGoal(true);
    setShowAddMenu(false);
  }

  function openEditGoal(goal: Goal) {
    setEditingGoalId(goal.id);
    setForm({
      title: goal.title,
      category: goal.category,
      target: goal.target,
      progress: goal.progress,
      description: goal.description ?? "",
      deadline: goal.deadline ?? "",
      priority: goal.priority,
    });
    setIsCreatingGoal(true);
    setShowAddMenu(false);
  }

  function saveGoal() {
    if (!form.title.trim()) return;

    if (editingGoalId) {
      setGoals((prev) =>
        prev.map((goal) =>
          goal.id === editingGoalId
            ? {
                ...goal,
                title: form.title.trim(),
                category: form.category,
                target: Math.max(1, Number(form.target) || 1),
                progress: Math.min(
                  Math.max(0, Number(form.progress) || 0),
                  Math.max(1, Number(form.target) || 1)
                ),
                description: form.description.trim(),
                deadline: form.deadline,
                priority: form.priority,
              }
            : goal
        )
      );
    } else {
      setGoals((prev) => [
        {
          id: crypto.randomUUID(),
          title: form.title.trim(),
          category: form.category,
          target: Math.max(1, Number(form.target) || 1),
          progress: Math.min(
            Math.max(0, Number(form.progress) || 0),
            Math.max(1, Number(form.target) || 1)
          ),
          description: form.description.trim(),
          deadline: form.deadline,
          priority: form.priority,
        },
        ...prev,
      ]);
    }

    setIsCreatingGoal(false);
    setEditingGoalId(null);
  }

  function addSuggestedGoal(item: {
    title: string;
    category: GoalCategory;
    target: number;
    description: string;
  }) {
    const exists = goals.some((goal) => goal.title === item.title);
    if (exists) return;

    setGoals((prev) => [
      {
        id: crypto.randomUUID(),
        title: item.title,
        category: item.category,
        target: item.target,
        progress: 0,
        description: item.description,
        deadline: "",
        priority: "medium",
        isSuggested: true,
      },
      ...prev,
    ]);
  }

  function deleteGoal(id: string) {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }

  function incrementProgress(id: string) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              progress: Math.min(goal.progress + 1, goal.target),
            }
          : goal
      )
    );
  }

  function getStageLabel(value: RelationshipStage) {
    return STAGE_OPTIONS.find((item) => item.value === value)?.label ?? value;
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <section>
          <h1 className="text-xl font-bold" style={{ color: theme.textPrimary }}>
            Goals
          </h1>
          <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
            Grow together in a way that fits your relationship.
          </p>
        </section>

        {/* Relationship stage */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.textMuted }}
          >
            Relationship Stage
          </p>

          <div className="relative">
            <GradientCard
              onClick={() => setShowStageMenu((prev) => !prev)}
              className="px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: theme.textPrimary }}
                  >
                    {getStageLabel(relationshipStage)}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>
                    Choose the stage that best matches your relationship.
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  style={{
                    color: theme.textMuted,
                    transform: showStageMenu ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </div>
            </GradientCard>

            {showStageMenu && (
              <div className="mt-2 space-y-2">
                {STAGE_OPTIONS.map((option) => (
                  <GradientCard
                    key={option.value}
                    onClick={() => {
                      setRelationshipStage(option.value);
                      setShowStageMenu(false);
                    }}
                    className="px-4 py-3"
                  >
                    <p
                      className="text-sm font-medium"
                      style={{ color: theme.textPrimary }}
                    >
                      {option.label}
                    </p>
                  </GradientCard>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-3 gap-3">
            <MiniStatCard
              label="Active"
              value={String(totalGoals)}
              theme={theme}
            />
            <MiniStatCard
              label="Done"
              value={String(completedGoals)}
              theme={theme}
            />
            <MiniStatCard
              label="Stage"
              value={getStageLabel(relationshipStage).split(" ")[0]}
              theme={theme}
            />
          </div>
        </section>

        {/* Active goals */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: theme.textMuted }}
            >
              Active Goals
            </p>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAddMenu((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition"
                style={{
                  background: theme.accent,
                  color: "#fff",
                }}
                aria-label="Add goal"
              >
                {showAddMenu ? <X size={18} /> : <Plus size={18} />}
              </button>

              {showAddMenu && (
                <div className="absolute right-0 top-12 z-20 flex w-56 flex-col gap-2">
                  <MiniMenuButton
                    label="Custom Goal"
                    onClick={() => openCreateGoal({ category: "custom" })}
                    theme={theme}
                  />
                  <MiniMenuButton
                    label="Finance Goal"
                    onClick={() => openCreateGoal({ category: "finance" })}
                    theme={theme}
                  />
                  <MiniMenuButton
                    label="Wedding Goal"
                    onClick={() => openCreateGoal({ category: "wedding" })}
                    theme={theme}
                  />
                  <MiniMenuButton
                    label="Date Goal"
                    onClick={() => openCreateGoal({ category: "date" })}
                    theme={theme}
                  />
                  <MiniMenuButton
                    label="Travel Goal"
                    onClick={() => openCreateGoal({ category: "travel" })}
                    theme={theme}
                  />
                  <MiniMenuButton
                    label="Communication Goal"
                    onClick={() => openCreateGoal({ category: "communication" })}
                    theme={theme}
                  />
                </div>
              )}
            </div>
          </div>

          {activeGoals.length === 0 ? (
            <GradientCard>
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <Target size={28} style={{ color: theme.accent }} />
                <p
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary }}
                >
                  Set your first couple goal
                </p>
                <p className="text-xs" style={{ color: theme.textMuted }}>
                  Start building something meaningful together.
                </p>
              </div>
            </GradientCard>
          ) : (
            <div className="space-y-3">
              {activeGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  theme={theme}
                  onEdit={() => openEditGoal(goal)}
                  onDelete={() => deleteGoal(goal.id)}
                  onProgress={() => incrementProgress(goal.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Suggestions */}
        <section className="space-y-3">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.textMuted }}
          >
            Suggested For You
          </p>

          <div className="space-y-3">
            {suggestions.map((item, index) => {
              const Icon = getCategoryIcon(item.category);
              const alreadyAdded = goals.some((goal) => goal.title === item.title);

              return (
                <GradientCard key={index} className="px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: theme.accent,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: theme.textPrimary }}
                      >
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs" style={{ color: theme.textMuted }}>
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={alreadyAdded}
                      onClick={() => addSuggestedGoal(item)}
                      className="rounded-full px-3 py-1.5 text-xs font-medium transition disabled:opacity-50"
                      style={{
                        background: alreadyAdded
                          ? "rgba(255,255,255,0.05)"
                          : theme.accent,
                        color: "#fff",
                      }}
                    >
                      {alreadyAdded ? "Added" : "Use"}
                    </button>
                  </div>
                </GradientCard>
              );
            })}
          </div>
        </section>

        {/* Goal editor */}
        {isCreatingGoal && (
          <section className="space-y-3">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: theme.textMuted }}
            >
              {editingGoalId ? "Edit Goal" : "Create Goal"}
            </p>

            <GradientCard className="px-4 py-4">
              <div className="space-y-4">
                <FieldLabel theme={theme}>Goal Title</FieldLabel>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Ex: Plan 2 date nights this month"
                  className="w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                  style={{
                    borderColor: theme.cardBorder,
                    color: theme.textPrimary,
                  }}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel theme={theme}>Category</FieldLabel>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          category: e.target.value as GoalCategory,
                        }))
                      }
                      aria-label="Goal category"
                      className="goal-select mt-1 w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                    >
                      {CATEGORY_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <FieldLabel theme={theme}>Priority</FieldLabel>
                    <select
                      value={form.priority}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          priority: e.target.value as "low" | "medium" | "high",
                        }))
                      }
                      aria-label="Goal priority level"
                      className="goal-select mt-1 w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                    >
                      <option value="low">
                        Low
                      </option>
                      <option value="medium">
                        Medium
                      </option>
                      <option value="high">
                        High
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel theme={theme}>Target</FieldLabel>
                    <input
                      type="number"
                      min={1}
                      value={form.target}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          target: Number(e.target.value) || 1,
                        }))
                      }
                      className="mt-1 w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                      style={{
                        borderColor: theme.cardBorder,
                        color: theme.textPrimary,
                      }}
                    />
                  </div>

                  <div>
                    <FieldLabel theme={theme}>Current Progress</FieldLabel>
                    <input
                      type="number"
                      min={0}
                      max={form.target}
                      value={form.progress}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          progress: Number(e.target.value) || 0,
                        }))
                      }
                      className="mt-1 w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                      style={{
                        borderColor: theme.cardBorder,
                        color: theme.textPrimary,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel theme={theme}>Deadline</FieldLabel>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, deadline: e.target.value }))
                    }
                    className="mt-1 w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                    style={{
                      borderColor: theme.cardBorder,
                      color: theme.textPrimary,
                    }}
                  />
                </div>

                <div>
                  <FieldLabel theme={theme}>Description</FieldLabel>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Add a note or intention for this goal"
                    rows={3}
                    className="mt-1 w-full rounded-2xl border bg-transparent px-4 py-3 text-sm outline-none"
                    style={{
                      borderColor: theme.cardBorder,
                      color: theme.textPrimary,
                    }}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingGoal(false);
                      setEditingGoalId(null);
                    }}
                    className="flex-1 rounded-2xl px-4 py-3 text-sm font-medium transition"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: theme.textPrimary,
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={saveGoal}
                    className="flex-1 rounded-2xl px-4 py-3 text-sm font-medium transition"
                    style={{
                      background: theme.accent,
                      color: "#fff",
                    }}
                  >
                    {editingGoalId ? "Save Changes" : "Create Goal"}
                  </button>
                </div>
              </div>
            </GradientCard>
          </section>
        )}
      </div>
    </AppShell>
  );
}

type Theme = ReturnType<typeof useTheme>["theme"];

function FieldLabel({ children, theme }: { children: React.ReactNode; theme: Theme }) {
  return (
    <p className="text-xs font-medium" style={{ color: theme.textMuted }}>
      {children}
    </p>
  );
}

function MiniStatCard({
  label,
  value,
  theme,
}: {
  label: string;
  value: string;
  theme: Theme;
}) {
  return (
    <GradientCard className="px-3 py-4">
      <div className="text-center">
        <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
          {value}
        </p>
        <p className="mt-1 text-[11px]" style={{ color: theme.textMuted }}>
          {label}
        </p>
      </div>
    </GradientCard>
  );
}

function MiniMenuButton({
  label,
  onClick,
  theme,
}: {
  label: string;
  onClick: () => void;
  theme: Theme;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border px-4 py-3 text-left text-sm shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl transition"
      style={{
        borderColor: theme.cardBorder,
        background: theme.cardBg,
        color: theme.textPrimary,
      }}
    >
      {label}
    </button>
  );
}

function GoalCard({
  goal,
  theme,
  onEdit,
  onDelete,
  onProgress,
}: {
  goal: Goal;
  theme: Theme;
  onEdit: () => void;
  onDelete: () => void;
  onProgress: () => void;
}) {
  const progressPercent = Math.min((goal.progress / goal.target) * 100, 100);

  return (
    <GradientCard className="px-4 py-4">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: theme.accent,
            }}
          >
            <CategoryIcon category={goal.category} size={18} color={theme.accent} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
              {goal.title}
            </p>

            {goal.description ? (
              <p className="mt-1 text-xs leading-5" style={{ color: theme.textMuted }}>
                {goal.description}
              </p>
            ) : null}

            <div className="mt-2 flex flex-wrap gap-2">
              <Tag label={goal.category} theme={theme} />
              <Tag label={`${goal.progress}/${goal.target}`} theme={theme} />
              <Tag label={goal.priority} theme={theme} />
              {goal.deadline ? <Tag label={goal.deadline} theme={theme} /> : null}
            </div>
          </div>
        </div>

        <div>
          <div
            className="h-2 w-full overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progressPercent}%`,
                background: theme.accent,
              }}
            />
          </div>
          <p className="mt-2 text-xs" style={{ color: theme.textMuted }}>
            {progressPercent.toFixed(0)}% complete
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onProgress}
            className="flex-1 rounded-2xl px-3 py-2.5 text-sm font-medium transition"
            style={{
              background: theme.accent,
              color: "#fff",
            }}
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 size={15} />
              Progress
            </span>
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl transition"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: theme.textPrimary,
            }}
            aria-label="Edit goal"
          >
            <Pencil size={15} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl transition"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: theme.textMuted,
            }}
            aria-label="Delete goal"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </GradientCard>
  );
}

function Tag({ label, theme }: { label: string; theme: Theme }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide"
      style={{
        background: "rgba(255,255,255,0.05)",
        color: theme.textMuted,
      }}
    >
      {label.replaceAll("-", " ")}
    </span>
  );
}
