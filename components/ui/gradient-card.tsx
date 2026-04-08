"use client";

import { ReactNode } from "react";
import { useTheme } from "@/components/providers/theme-provider";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export function GradientCard({
  children,
  className = "",
  glowColor,
  onClick,
}: GradientCardProps) {
  const { theme } = useTheme();
  const glow = glowColor ?? theme.cardGlow;
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl backdrop-blur-md
        p-5 text-left transition-all duration-200
        ${onClick ? "cursor-pointer active:scale-[0.98] hover:-translate-y-[1px]" : ""}
        ${className}
      `}
      style={{
        background: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        boxShadow: `0 0 24px ${glow}, inset 0 1px 0 rgba(255,255,255,.05)`,
      }}
      onMouseEnter={(e) => {
        if (!onClick) return;
        e.currentTarget.style.background = theme.cardBg;
      }}
      onMouseLeave={(e) => {
        if (!onClick) return;
        e.currentTarget.style.background = theme.cardBg;
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl"
        style={{ background: glow }}
      />
      {children}
    </Component>
  );
}
