import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "../../utils/cn";
import { useIsDesktop } from "../../lib/hooks";

/** Soft, slow easing used across the whole site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------------------
// Emphasis helper: wrap words in *asterisks* to render italic gold accent words
// ---------------------------------------------------------------------------
export function Emph({ text }: { text: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? (
          <em key={i} className="accent">
            {part}
          </em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Reveal: fade-and-rise on scroll, with stagger via `delay`
// ---------------------------------------------------------------------------
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "blockquote" | "article";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

// ---------------------------------------------------------------------------
// Section heading: slides in from alternating sides with a light parallax offset
// ---------------------------------------------------------------------------
export function SectionHeading({
  eyebrow,
  title,
  intro,
  from = "left",
  align = "left",
  dark = false,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  from?: "left" | "right";
  align?: "left" | "center";
  dark?: boolean;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], desktop ? [22, -22] : [8, -8]);
  const dist = desktop ? 70 : 28;
  // Memoised so the heading element isn't re-created (and re-animated) on every render
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  return (
    <div
      ref={ref}
      className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", dark && "on-dark", className)}
    >
      <motion.div style={{ y: parallax }}>
        {eyebrow && (
          <motion.p
            className={cn(
              "mb-3 text-[0.78rem] font-bold uppercase tracking-[0.24em]",
              dark ? "text-honey" : "text-gold-ink"
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
        )}
        <MotionTag
          className={cn("text-[2.15rem] leading-[1.1] sm:text-5xl lg:text-[3.4rem]", dark && "!text-ivory")}
          initial={{ opacity: 0, x: from === "left" ? -dist : dist }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <Emph text={title} />
        </MotionTag>
        {intro && (
          <motion.div
            className={cn("mt-5 text-lg", dark ? "text-ivory/90" : "text-charcoal")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            {intro}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero headline: word-by-word rise with blur-to-sharp. *Emotional* words are
// italic and get a champagne-gold underline that draws in after the text lands.
// ---------------------------------------------------------------------------
export function WordReveal({
  text,
  className,
  delay = 0.3,
  stagger = 0.1,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const tokens = text.split(" ").map((w) => ({ word: w.replace(/\*/g, ""), em: w.includes("*") }));
  const plain = tokens.map((t) => t.word).join(" ");
  const endOfText = delay + tokens.length * stagger + 0.9;
  return (
    <span className={className} aria-label={plain}>
      {tokens.map((t, i) => (
        <span key={i} aria-hidden="true" className="mr-[0.26em] inline-block">
          <motion.span
            className={cn("relative inline-block", t.em && "accent")}
            initial={{ opacity: 0, y: "0.55em", filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {t.word}
            {t.em && (
              <svg
                className="absolute -bottom-[0.08em] left-0 h-[0.28em] w-full overflow-visible"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M1 8 C 22 2, 40 12, 62 6 S 90 3, 99 6"
                  fill="none"
                  stroke="#C9A24B"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: endOfText + (i % 3) * 0.15, ease: EASE }}
                />
              </svg>
            )}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Rotating phrase: "A calm space for [couples]" slides softly between words
// ---------------------------------------------------------------------------
export function RotatingPhrase({ prefix, words }: { prefix: string; words: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2800);
    return () => window.clearInterval(t);
  }, [words.length, reduce]);
  return (
    <p className="font-serif text-xl text-evergreen sm:text-2xl">
      <span className="sr-only">
        {prefix} {words.join(", ")}.
      </span>
      <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-2">
        <span>{prefix}</span>
        <span className="relative inline-block min-w-[9.5ch] overflow-hidden align-bottom">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={words[i]}
              className="accent inline-block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {words[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </p>
  );
}

// ---------------------------------------------------------------------------
// Scroll-driven text reveal: each word brightens as you scroll through the paragraph
// ---------------------------------------------------------------------------
function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.26em] inline-block">
      {word}
    </motion.span>
  );
}

export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.6 / words.length);
        return <ScrollWord key={i} word={w} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Count-up number, runs once when scrolled into view
// ---------------------------------------------------------------------------
export function CountUp({ to, suffix = "", duration = 2.2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Drifting background blobs (blush, honey, sage). 20-30s loops, transform only.
// ---------------------------------------------------------------------------
export function Blobs({ tone = "warm", className }: { tone?: "warm" | "calm" | "glow"; className?: string }) {
  const palette =
    tone === "calm"
      ? ["bg-sage/45", "bg-honey/20", "bg-clay/30"]
      : tone === "glow"
        ? ["bg-honey/30", "bg-clay/40", "bg-sage/30"]
        : ["bg-clay/35", "bg-honey/22", "bg-sage/40"];
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={cn("blob animate-drift-a -left-24 top-10 h-72 w-72 md:h-[26rem] md:w-[26rem]", palette[0])} />
      <div className={cn("blob animate-drift-b -right-24 top-1/3 h-64 w-64 md:h-[24rem] md:w-[24rem]", palette[1])} />
      <div className={cn("blob animate-drift-c bottom-0 left-1/3 hidden h-80 w-80 md:block", palette[2])} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Floating pull quote that drifts in
// ---------------------------------------------------------------------------
export function PullQuote({
  children,
  cite,
  className,
  dark = false,
}: {
  children: ReactNode;
  cite?: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <motion.figure
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 40, x: -20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <div className="animate-float">
        <span
          aria-hidden="true"
          className={cn("absolute -top-8 -left-1 font-serif text-8xl leading-none", dark ? "text-honey/60" : "text-gold/70")}
        >
          “
        </span>
        <blockquote
          className={cn("relative font-serif text-2xl italic leading-snug sm:text-3xl", dark ? "text-ivory" : "text-evergreen")}
        >
          {children}
        </blockquote>
        {cite && (
          <figcaption className={cn("mt-4 text-sm font-semibold tracking-wide", dark ? "text-sage" : "text-gold-ink")}>
            {cite}
          </figcaption>
        )}
      </div>
    </motion.figure>
  );
}
