"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/shared/app-shell";
import { GradientCard } from "@/components/ui/gradient-card";
import {
  Phone,
  Bell,
  Heart,
  Mic,
  Image as ImageIcon,
  CalendarHeart,
  SendHorizontal,
  Plus,
  Lock,
  X,
} from "lucide-react";

const messages = [
  {
    id: 1,
    sender: "partner",
    text: "Good morning love ❤️",
    time: "8:12 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Good morning baby, I hope you slept well 🥺",
    time: "8:14 AM",
  },
  {
    id: 3,
    sender: "partner",
    text: "I did. I was thinking about you before I fell asleep.",
    time: "8:15 AM",
  },
  {
    id: 4,
    sender: "me",
    text: "That made me smile. I can’t wait to see you.",
    time: "8:17 AM",
  },
];

export default function ChatPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  function handleSend() {
    if (!inputValue.trim()) return;

    // Replace this later with real send logic
    console.log("Send message:", inputValue);
    setInputValue("");
    setShowMenu(false);
  }

  function handleActionClick(action: string) {
    console.log("Selected action:", action);
    setShowMenu(false);
  }

  return (
    <AppShell>
      <div className="flex h-full flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500/90 to-pink-400/80 text-lg font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-2 ring-white/10">
                J
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#120318]" />
            </div>

            <div>
              <h1 className="text-[28px] font-bold tracking-tight text-white">
                Chat
              </h1>
              <p className="text-sm text-white/50">Jordan • online now</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-full border border-white/10 bg-white/[0.05] p-2.5 text-white/75 transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>

            <button
              className="rounded-full border border-white/10 bg-white/[0.05] p-2.5 text-white/75 transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Call partner"
            >
              <Phone size={18} />
            </button>
          </div>
        </div>

        {/* Love note banner */}
        <GradientCard
          glowColor="rgba(244,63,94,.10)"
          className="bg-gradient-to-r from-rose-500/[0.12] via-pink-500/[0.08] to-transparent"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-rose-400/15 p-2.5">
                <Heart size={18} className="text-rose-300" />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-300/75">
                  Love Note
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Send something sweet, soft, and unexpected.
                </p>
              </div>
            </div>

            <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/15">
              Send
            </button>
          </div>
        </GradientCard>

        {/* Privacy note */}
        <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/50 backdrop-blur-sm">
          <Lock size={13} />
          Your shared chat space is private and built just for two.
        </div>

        {/* Messages area */}
        <div className="flex-1 space-y-4 overflow-y-auto pb-2">
          <div className="flex justify-center">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/40">
              Today
            </span>
          </div>

          <div className="space-y-3">
            {messages.map((message) =>
              message.sender === "me" ? (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[82%] rounded-[22px] rounded-br-md bg-gradient-to-br from-rose-500/80 to-pink-500/70 px-4 py-3 text-white shadow-[0_8px_20px_rgba(244,63,94,0.18)]">
                    <p className="text-sm leading-6">{message.text}</p>
                    <p className="mt-1 text-right text-[11px] text-white/70">
                      {message.time}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex justify-start">
                  <div className="max-w-[82%] rounded-[22px] rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] backdrop-blur-md">
                    <p className="text-sm leading-6 text-white/90">
                      {message.text}
                    </p>
                    <p className="mt-1 text-[11px] text-white/45">
                      {message.time}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="sticky bottom-20 pt-2">
          <div className="relative" ref={menuRef}>
            {/* Floating mini menu */}
            {showMenu && (
              <div className="absolute bottom-16 left-0 z-20 flex flex-col gap-2">
                <MiniActionButton
                  icon={<Heart size={16} className="text-rose-300" />}
                  label="Love Note"
                  onClick={() => handleActionClick("love-note")}
                />
                <MiniActionButton
                  icon={<Mic size={16} className="text-purple-300" />}
                  label="Voice Message"
                  onClick={() => handleActionClick("voice-message")}
                />
                <MiniActionButton
                  icon={<ImageIcon size={16} className="text-blue-300" />}
                  label="Image"
                  onClick={() => handleActionClick("image")}
                />
                <MiniActionButton
                  icon={<CalendarHeart size={16} className="text-orange-300" />}
                  label="Date Plan"
                  onClick={() => handleActionClick("date-plan")}
                />
              </div>
            )}

            <div className="flex items-center gap-2 rounded-[28px] border border-white/10 bg-[#1a1321]/90 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                aria-label={showMenu ? "Close actions menu" : "Open actions menu"}
              >
                {showMenu ? <X size={18} /> : <Plus size={18} />}
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Send a message..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
              />

              <button
                type="button"
                onClick={handleSend}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/80 text-white shadow-[0_8px_20px_rgba(244,63,94,0.25)] transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
                disabled={!inputValue.trim()}
              >
                <SendHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function MiniActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1b1522]/90 px-4 py-2.5 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:bg-white/[0.08]"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.05]">
        {icon}
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-white/90">
        {label}
      </span>
    </button>
  );
}
