import { motion } from "framer-motion";
import { cn } from "../utils/cn";

/**
 * Brand mark: an open arch (a doorway / "the right place") holding two
 * separate strokes, evergreen and champagne gold, that travel upward and
 * become one, with a honey dot at the top (hope, the new beginning).
 * It echoes the hero animation "two paths become one".
 */
export function LogoMark({
  size = 48,
  animate = false,
  tone = "light",
  className,
}: {
  size?: number;
  animate?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const green = tone === "dark" ? "#FBF7F0" : "#24403A";
  const ease = [0.22, 1, 0.36, 1] as const;
  const draw = (delay: number, duration = 1.4) =>
    animate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration, delay, ease },
        }
      : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <motion.path
        d="M12 56V32a20 20 0 0 1 40 0v24"
        stroke="#C9A24B"
        strokeWidth="2.4"
        strokeLinecap="round"
        {...draw(0, 1.6)}
      />
      <motion.path
        d="M22 55c0-12 20-14 20-26 0-6-5-10-10-15"
        stroke={green}
        strokeWidth="3"
        strokeLinecap="round"
        {...draw(0.5)}
      />
      <motion.path
        d="M42 55c0-12-20-14-20-26 0-6 5-10 10-15"
        stroke="#C9A24B"
        strokeWidth="3"
        strokeLinecap="round"
        {...draw(0.8)}
      />
      <motion.circle
        cx="32"
        cy="10"
        r="3.4"
        fill="#E9B949"
        {...(animate
          ? {
              initial: { scale: 0, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.8, delay: 1.9, ease },
            }
          : {})}
        style={{ transformOrigin: "32px 10px" }}
      />
    </svg>
  );
}

/** Mark + wordmark lockup. */
export function Logo({
  tone = "light",
  compact = false,
  className,
}: {
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
}) {
  const main = tone === "dark" ? "text-ivory" : "text-evergreen";
  const sub = tone === "dark" ? "text-sage" : "text-gold-ink";
  return (
    <span className={cn("inline-flex items-center gap-2 sm:gap-3", className)}>
      <LogoMark
        size={compact ? 40 : 48}
        tone={tone}
        className={compact ? "h-9 w-9 sm:h-10 sm:w-10" : "h-11 w-11 sm:h-12 sm:w-12"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-serif font-semibold tracking-tight transition-all duration-500",
            compact ? "text-[1.02rem] sm:text-[1.35rem]" : "text-[1.3rem] sm:text-[1.6rem]",
            main
          )}
        >
          Carol A. Anderson
        </span>
        <span
          className={cn(
            "mt-1 whitespace-nowrap font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.62rem] sm:tracking-[0.2em]",
            sub
          )}
        >
          <span className="sm:hidden">MS, LMFT</span>
          <span className="hidden sm:inline">MS, LMFT · Marriage &amp; Family</span>
        </span>
      </span>
    </span>
  );
}
