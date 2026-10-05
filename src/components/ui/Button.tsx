import { useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../utils/cn";

type Variant = "primary" | "outline" | "gold" | "light" | "ghost";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit";
  variant?: Variant;
  arrow?: boolean;
  breathe?: boolean;
  full?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-evergreen text-ivory hover:bg-evergreen-deep hover:shadow-[0_14px_44px_-8px_rgba(201,162,75,0.75)]",
  gold: "bg-gold text-evergreen-deep hover:bg-honey hover:shadow-[0_14px_44px_-8px_rgba(233,185,73,0.85)]",
  light: "bg-ivory text-evergreen hover:shadow-[0_14px_44px_-8px_rgba(233,185,73,0.8)]",
  outline:
    "border-2 border-evergreen text-evergreen bg-ivory/40 hover:bg-evergreen hover:text-ivory hover:shadow-[0_14px_44px_-10px_rgba(201,162,75,0.6)]",
  ghost: "text-evergreen hover:bg-evergreen/5",
};

/**
 * Calm, tactile button:
 *  - soft magnetic follow on mouse hover (disabled for touch / reduced motion)
 *  - warm gold glow, arrow that slides forward
 *  - gentle ripple on click
 *  - optional barely perceptible "breathing" pulse
 */
export function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  arrow = true,
  breathe = false,
  full = false,
  disabled,
  className,
  ariaLabel,
  external,
}: ButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 160, damping: 16, mass: 0.4 });
  const wrap = useRef<HTMLSpanElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse" || !wrap.current) return;
    const r = wrap.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const addRipple = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    window.setTimeout(() => setRipples((p) => p.filter((i) => i.id !== id)), 850);
  };

  const classes = cn(
    "group relative inline-flex min-h-[52px] items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-center font-sans text-[0.95rem] font-semibold tracking-wide",
    "transition-[box-shadow,background-color,color] duration-500 ease-soft",
    "disabled:cursor-not-allowed disabled:opacity-60",
    breathe && "animate-breathe",
    full && "w-full",
    VARIANTS[variant],
    className
  );

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
        {children}
        {arrow && (
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 ease-soft group-hover:translate-x-1.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </span>
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="animate-ripple pointer-events-none absolute z-0 h-64 w-64 rounded-full bg-white/45"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );

  const handle = (e: MouseEvent<HTMLElement>) => {
    addRipple(e);
    onClick?.(e);
  };

  let el: ReactNode;
  if (to) {
    el = (
      <Link to={to} className={classes} onClick={handle} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  } else if (href) {
    const ext = external ?? /^https?:/.test(href);
    el = (
      <a
        href={href}
        className={classes}
        onClick={handle}
        aria-label={ariaLabel}
        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  } else {
    el = (
      <button type={type} className={classes} onClick={handle} disabled={disabled} aria-label={ariaLabel}>
        {inner}
      </button>
    );
  }

  return (
    <motion.span
      ref={wrap}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", full && "w-full")}
    >
      {el}
    </motion.span>
  );
}
