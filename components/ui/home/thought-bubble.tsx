import { ReactNode } from "react";

interface ThoughtBubbleProps {
  children: ReactNode;
  /** Who said it — shows as a small label */
  author?: string;
  className?: string;
}

/**
 * ThoughtBubble — a soft speech-bubble style container for
 * shared thoughts, prompts, or reflections between partners.
 */
export function ThoughtBubble({
  children,
  author,
  className = "",
}: ThoughtBubbleProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Bubble body */}
      <div
        className="relative rounded-2xl border border-white/[0.07] bg-white/[0.05]
                    px-5 py-4 text-sm leading-relaxed text-white/80 backdrop-blur-sm"
      >
        {author && (
          <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-rose-400/70">
            {author}
          </span>
        )}
        {children}
      </div>

      {/* Tail — two small circles beneath the bubble */}
      <div className="ml-6 flex items-end gap-1 pt-1">
        <span className="block h-2.5 w-2.5 rounded-full border border-white/[0.07] bg-white/[0.05]" />
        <span className="block h-1.5 w-1.5 rounded-full border border-white/[0.07] bg-white/[0.05]" />
      </div>
    </div>
  );
}
