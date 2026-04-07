"use client";

import { ReactNode } from "react";
import { useTheme } from "@/components/providers/theme-provider";

interface ThoughtBubbleProps {
  children: ReactNode;
  author?: string;
  className?: string;
}

export function ThoughtBubble({
  children,
  author,
  className = "",
}: ThoughtBubbleProps) {
  const { theme } = useTheme();

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative rounded-2xl px-5 py-4 text-sm leading-relaxed backdrop-blur-sm"
        style={{
          background: theme.bubbleBg,
          border: `1px solid ${theme.bubbleBorder}`,
          color: theme.textSecondary,
        }}
      >
        {author && (
          <span
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: theme.bubbleAuthor }}
          >
            {author}
          </span>
        )}
        {children}
      </div>
      <div className="ml-6 flex items-end gap-1 pt-1">
        <span
          className="block h-2.5 w-2.5 rounded-full"
          style={{
            background: theme.bubbleBg,
            border: `1px solid ${theme.bubbleBorder}`,
          }}
        />
        <span
          className="block h-1.5 w-1.5 rounded-full"
          style={{
            background: theme.bubbleBg,
            border: `1px solid ${theme.bubbleBorder}`,
          }}
        />
      </div>
    </div>
  );
}
