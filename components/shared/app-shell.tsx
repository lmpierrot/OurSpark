"use client";

import { ReactNode } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { useTheme } from "@/components/providers/theme-provider";

interface AppShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function AppShell({ children, hideNav = false }: AppShellProps) {
  const { theme } = useTheme();

  return (
    <div
      className="relative min-h-[100dvh]"
      style={{ background: theme.bgBase, color: theme.textBase || "#fff" }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: [
            theme.bgGradientA,
            theme.bgGradientB,
            theme.bgGradientC,
            theme.bgLinear,
          ].join(", "),
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: parseFloat(theme.sparkleOpacity || "0"),
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, #fff 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 40% 70%, #fff 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 75% 35%, #fff 50%, transparent 100%), " +
            "radial-gradient(1px 1px at 90% 80%, #fff 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col">
        <main className={`flex-1 px-4 pt-6 ${hideNav ? "pb-6" : "pb-24"}`}>
          {children}
        </main>

        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
