"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageCircleHeart,
  Gamepad2,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Ask", href: "/ask", icon: Sparkles },
  { label: "Play", href: "/play", icon: Gamepad2 },
  { label: "Chat", href: "/chat", icon: MessageCircleHeart },
  { label: "More", href: "/more", icon: MoreHorizontal },
];

export function BottomNav() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 backdrop-blur-2xl"
      style={{
        background: theme.navBg,
        borderTop: `1px solid ${theme.navBorder}`,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="mx-auto max-w-md px-3 pb-2 pt-2">
        <ul
          className="flex items-center justify-between rounded-[28px] px-2 py-2"
          style={{
            border: `1px solid ${theme.navBorder}`,
            background: theme.navInnerBg || "rgba(255,255,255,0.03)",
            boxShadow: theme.navShadow || "0 -10px 30px rgba(0,0,0,0.25)",
          }}
        >
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href || pathname?.startsWith(href + "/");

            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className="mx-auto flex w-fit flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all duration-200"
                  style={{
                    color: isActive ? theme.navActive : theme.navInactive,
                    background: isActive ? theme.navActiveBg || "rgba(255,255,255,0.06)" : "transparent",
                    boxShadow: isActive ? theme.navActiveShadow || "0 0 18px rgba(255,255,255,0.08)" : "none",
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    style={
                      isActive
                        ? { filter: `drop-shadow(0 0 8px ${theme.navGlow})` }
                        : undefined
                    }
                  />
                  <span className="text-[10px] font-medium tracking-wide">
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
