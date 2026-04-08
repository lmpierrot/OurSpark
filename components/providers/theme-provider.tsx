"use client";

import {
  createContext,
  useMemo,
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
  // Default theme for SSR
  const [themeId, setThemeIdState] = useState<string>(DEFAULT_THEME_ID);
  const [isLoaded, setIsLoaded] = useState(false); // ensures client-only loading

  // Load saved theme from localStorage on the client
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && getThemeById(saved).id === saved) {
      setThemeIdState(saved);
    }
    setIsLoaded(true); // mark theme as loaded
  }, []);

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  const theme = useMemo(() => getThemeById(themeId), [themeId]);

  // Optional: prevent render until client-side is ready
  if (!isLoaded) return null;

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

// Hook for easier usage in components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
