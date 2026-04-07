import { Heart } from "lucide-react";

interface CoupleAvatarPairProps {
  /** URL or initials fallback for partner 1 */
  avatarA?: string;
  initialsA?: string;
  /** URL or initials fallback for partner 2 */
  avatarB?: string;
  initialsB?: string;
  /** Avatar diameter in px — default 56 */
  size?: number;
}

/**
 * CoupleAvatarPair — two overlapping circular avatars
 * linked by a tiny heart badge. Accepts image URLs or
 * falls back to colored-initial circles.
 */
export function CoupleAvatarPair({
  avatarA,
  initialsA = "A",
  avatarB,
  initialsB = "B",
  size = 56,
}: CoupleAvatarPairProps) {
  const overlap = size * 0.3;

  return (
    <div className="relative flex items-center" style={{ height: size }}>
      {/* Partner A */}
      <Avatar src={avatarA} initials={initialsA} size={size} ringColor="#e11d48" />

      {/* Partner B — shifted left to overlap */}
      <div style={{ marginLeft: -overlap }}>
        <Avatar src={avatarB} initials={initialsB} size={size} ringColor="#a855f7" />
      </div>

      {/* Heart badge between the two */}
      <div
        className="absolute flex items-center justify-center rounded-full bg-[#1a1520] shadow-lg"
        style={{
          width: size * 0.38,
          height: size * 0.38,
          left: size - overlap / 2 - (size * 0.38) / 2,
          top: size * 0.55,
        }}
      >
        <Heart
          size={size * 0.2}
          className="fill-rose-500 text-rose-500"
        />
      </div>
    </div>
  );
}

/* ── Internal avatar circle ── */

function Avatar({
  src,
  initials,
  size,
  ringColor,
}: {
  src?: string;
  initials: string;
  size: number;
  ringColor: string;
}) {
  const common = `rounded-full flex items-center justify-center font-semibold text-white/90 select-none`;

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
          className={common}
          style={{
            width: size,
            height: size,
            fontSize: size * 0.36,
            background: "rgba(255,255,255,.08)",
          }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
