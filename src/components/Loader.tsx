import { useEffect } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "./Logo";

/**
 * Full-screen brand loader. The logo draws itself (two paths become one),
 * the name fades in, and a thin gold line fills. It lifts away softly once
 * the page is ready (minimum ~2.4s so the animation can land, never longer
 * than ~3.6s so it never blocks content).
 */
export function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const MIN = 2400;
    const MAX = 3600;
    const start = performance.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onDone();
    };
    const afterLoad = () => {
      const wait = Math.max(0, MIN - (performance.now() - start));
      window.setTimeout(finish, wait);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    const cap = window.setTimeout(finish, MAX);

    // Lock scroll while loading
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(cap);
      window.removeEventListener("load", afterLoad);
    };
  }, [onDone]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading Carol A. Anderson, MS, LMFT"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ivory"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease } }}
    >
      {/* soft drifting glow */}
      <div className="blob animate-drift-a -left-24 top-1/4 h-72 w-72 bg-clay/40" aria-hidden="true" />
      <div className="blob animate-drift-b -right-20 bottom-1/4 h-80 w-80 bg-sage/50" aria-hidden="true" />
      <div className="blob animate-drift-c left-1/3 -top-20 h-64 w-64 bg-honey/25" aria-hidden="true" />

      <motion.div
        className="relative flex flex-col items-center"
        exit={{ scale: 1.06, y: -10, transition: { duration: 0.9, ease } }}
      >
        <LogoMark size={112} animate />
        <motion.p
          className="mt-6 font-serif text-3xl font-semibold text-evergreen sm:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease }}
        >
          Carol A. Anderson
        </motion.p>
        <motion.p
          className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9, ease }}
        >
          MS, LMFT · Fresno, California
        </motion.p>
        <div className="mt-8 h-px w-44 overflow-hidden bg-evergreen/10" aria-hidden="true">
          <motion.div
            className="h-full origin-left bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, delay: 0.2, ease: [0.45, 0, 0.2, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
