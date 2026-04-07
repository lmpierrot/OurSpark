"use client";

import { Heart } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

interface CoupleAvatarPairProps {
  avatarA?: string;
  initialsA?: string;
  emojiA?: string;
  avatarB?: string;
  initialsB?: string;
  emojiB?: string;
  size?: number;
}

export function CoupleAvatarPair({
  avatarA,
  initialsA = "A",
  emojiA,
  avatarB,
  initialsB = "B",
  emojiB,
  size = 56,
}: CoupleAvatarPairProps) {
  const { theme } = useTheme();
  const overlap = size * 0.3;

  return (
    <div className="relative flex items-center" style={{ height: size }}>
      <Avatar
        src={avatarA}
        initials={initialsA}
        emoji={emojiA}
        size={size}
        ringColor={theme.avatarRingA}
      />
      <div style={{ marginLeft: -overlap }}>
        <Avatar
          src={avatarB}
          initials={initialsB}
          emoji={emojiB}
          size={size}
          ringColor={theme.avatarRingB}
        />
      </div>
      <div
        className="absolute flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: size * 0.38,
          height: size * 0.38,
          left: size - overlap / 2 - (size * 0.38) / 2,
          top: size * 0.55,
          background: theme.bgBase,
        }}
      >
        <Heart
          size={size * 0.2}
          style={{ color: theme.accent, fill: theme.accent }}
        />
      </div>
    </div>
  );
}

function Avatar({
  src,
  initials,
  emoji,
  size,
  ringColor,
}: {
  src?: string;
  initials: string;
  emoji?: string;
  size: number;
  ringColor: string;
}) {
  return (
    <div
      className="rounded-full p-[2px]"
      style={{
        background: `linear-gradient(135deg, ${ringColor}, transparent 70%)`,
        width: size + 4,
        height: size + 4,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={initials}
          className="rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-full font-semibold select-none"
          style={{
            width: size,
            height: size,
            fontSize: emoji ? size * 0.5 : size * 0.36,
            background: "rgba(255,255,255,.08)",
            color: "rgba(255,255,255,.9)",
          }}
        >
          {emoji ?? initials}
        </div>
      )}
    </div>
  );
}
