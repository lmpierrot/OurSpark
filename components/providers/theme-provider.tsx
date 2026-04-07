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
  theme: SparkTheme;
  themeId: string;
  setThemeId: (id: string) => void;
  allThemes: SparkTheme[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "oursparks-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState(DEFAULT_THEME_ID);
  const [mounted, setMounted] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && getThemeById(saved).id === saved) {
      setThemeIdState(saved);
    }
    setMounted(true);
  }, []);

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const theme = getThemeById(themeId);

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <div style={{ background: "#0c0a10", minHeight: "100dvh" }} />
    );
  }

  return (
    <ThemeContext.Provider
      value={{ theme, themeId, setThemeId, allThemes: THEMES }}
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
