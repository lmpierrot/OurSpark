"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { SparkTheme, DEFAULT_THEME_ID, getThemeById, THEMES } from "@/lib/themes";

interface ThemeContextValue {
  textPrimary: string;
  textMuted: string;
  accent: string;
  bgBase: string;
  cardBorder: string;
  theme: SparkTheme;
  themeId: string;
  setThemeId: (id: string) => void;
  allThemes: SparkTheme[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "oursparks-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_THEME_ID;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && getThemeById(saved).id === saved) {
      return saved;
    }
    return DEFAULT_THEME_ID;
  });

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  const theme = getThemeById(themeId);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeId,
        setThemeId,
        allThemes: THEMES,
        textPrimary: theme.textPrimary,
        textMuted: theme.textMuted,
        accent: theme.accent,
        bgBase: theme.bgBase,
        cardBorder: theme.cardBorder,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider>");
  }
  return ctx;
}
export type { SparkTheme };

