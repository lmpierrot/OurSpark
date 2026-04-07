"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, Check } from "lucide-react";
import { ANIMAL_AVATARS } from "@/lib/avatars";
import { useTheme } from "@/components/providers/theme-provider";

const STORAGE_KEY = "oursparks-avatar";

interface AvatarSelection {
  type: "animal" | "photo";
  value: string; // animal id or base64 data URL
}

export function AvatarPicker() {
  const { theme } = useTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<AvatarSelection>({
    type: "animal",
    value: "fox",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSelected(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  function save(sel: AvatarSelection) {
    setSelected(sel);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sel));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        save({ type: "photo", value: reader.result });
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-widest"
        style={{ color: theme.textMuted }}
      >
        Choose your avatar
      </p>

      <div className="grid grid-cols-5 gap-2">
        {/* Photo upload button */}
        <button
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-xl p-2 transition-all active:scale-95"
          style={{
            background:
              selected.type === "photo" ? theme.cardBg : "transparent",
            border:
              selected.type === "photo"
                ? `2px solid ${theme.accent}`
                : `1px solid ${theme.cardBorder}`,
          }}
        >
          {selected.type === "photo" ? (
            <img
              src={selected.value}
              alt="Your photo"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <Camera size={20} style={{ color: theme.textMuted }} />
          )}
          <span
            className="mt-1 text-[8px]"
            style={{ color: theme.textMuted }}
          >
            Photo
          </span>
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhoto}
        />

        {/* Animal avatars */}
        {ANIMAL_AVATARS.map((animal) => {
          const isActive =
            selected.type === "animal" && selected.value === animal.id;
          return (
            <button
              key={animal.id}
              onClick={() => save({ type: "animal", value: animal.id })}
              className="relative flex flex-col items-center justify-center rounded-xl p-2 transition-all active:scale-95"
              style={{
                background: isActive ? theme.cardBg : "transparent",
                border: isActive
                  ? `2px solid ${theme.accent}`
                  : `1px solid transparent`,
              }}
            >
              <span className="text-2xl">{animal.emoji}</span>
              <span
                className="mt-0.5 text-[8px]"
                style={{ color: theme.textMuted }}
              >
                {animal.label}
              </span>
              {isActive && (
                <div
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full"
                  style={{ background: theme.accent }}
                >
                  <Check size={10} color="#fff" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Helper to read current avatar selection from localStorage */
export function getSavedAvatar(): AvatarSelection {
  if (typeof window === "undefined")
    return { type: "animal", value: "fox" };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { type: "animal", value: "fox" };
  } catch {
    return { type: "animal", value: "fox" };
  }
}
