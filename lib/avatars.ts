/**
 * 15 curated animal avatar options.
 * Each has an emoji, label, and a soft color for the avatar ring.
 */
export interface AnimalAvatar {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

export const ANIMAL_AVATARS: AnimalAvatar[] = [
  { id: "fox", emoji: "🦊", label: "Fox", color: "#f97316" },
  { id: "cat", emoji: "🐱", label: "Cat", color: "#a78bfa" },
  { id: "dog", emoji: "🐶", label: "Dog", color: "#f59e0b" },
  { id: "bunny", emoji: "🐰", label: "Bunny", color: "#f472b6" },
  { id: "bear", emoji: "🐻", label: "Bear", color: "#92400e" },
  { id: "panda", emoji: "🐼", label: "Panda", color: "#6b7280" },
  { id: "owl", emoji: "🦉", label: "Owl", color: "#d97706" },
  { id: "butterfly", emoji: "🦋", label: "Butterfly", color: "#38bdf8" },
  { id: "dolphin", emoji: "🐬", label: "Dolphin", color: "#0ea5e9" },
  { id: "swan", emoji: "🦢", label: "Swan", color: "#e2e8f0" },
  { id: "deer", emoji: "🦌", label: "Deer", color: "#b45309" },
  { id: "penguin", emoji: "🐧", label: "Penguin", color: "#1e293b" },
  { id: "lion", emoji: "🦁", label: "Lion", color: "#eab308" },
  { id: "koala", emoji: "🐨", label: "Koala", color: "#9ca3af" },
  { id: "wolf", emoji: "🐺", label: "Wolf", color: "#64748b" },
];

export function getAnimalById(id: string): AnimalAvatar | undefined {
  return ANIMAL_AVATARS.find((a) => a.id === id);
}
