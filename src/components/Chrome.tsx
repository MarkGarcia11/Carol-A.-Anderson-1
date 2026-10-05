import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { PhoneIcon, CalendarIcon } from "./ui/Icons";
import { ROUTES, SITE } from "../data/site";
import { cn } from "../utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Thin gold scroll-progress line at the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold via-honey to-clay"
      style={{ scaleX }}
    />
  );
}

/** Tiny custom cursor ring (precise pointers only). Softens + enlarges over interactive elements. */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.35 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest("a,button,[role='button'],input,select,textarea,label,summary"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="cursor-ring pointer-events-none fixed left-0 top-0 z-[90] -ml-[14px] -mt-[14px]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="h-7 w-7 rounded-full border-[1.5px] border-gold"
        animate={{
          scale: active ? 2 : 1,
          backgroundColor: active ? "rgba(233,185,73,0.22)" : "rgba(233,185,73,0)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </motion.div>
  );
}

/** Persistent mobile bottom bar: Call + Free Consultation. */
export function MobileBar() {
  return (
    <div
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-ivory/90 px-3 pt-3 backdrop-blur-xl lg:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="mx-auto grid max-w-md grid-cols-[1fr_1.5fr] gap-3">
        <a
          href={SITE.phoneHref}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border-2 border-evergreen text-[0.95rem] font-semibold text-evergreen active:bg-evergreen/10"
        >
          <PhoneIcon width={18} height={18} /> Call
        </a>
        <Link
          to={ROUTES.contact}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-evergreen text-[0.95rem] font-semibold text-ivory shadow-soft active:opacity-90"
        >
          <CalendarIcon width={18} height={18} /> Free Consultation
        </Link>
      </div>
    </div>
  );
}

/** Simple cookie + privacy notice (remembered in localStorage). */
export function CookieNotice() {
  const KEY = "caa-cookie-notice";
  const [show, setShow] = useState(false);
  const timer = useRef<number>(0);
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      /* storage blocked: still show */
    }
    timer.current = window.setTimeout(() => setShow(true), 4500);
    return () => window.clearTimeout(timer.current);
  }, []);
  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie and privacy notice"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={cn(
            "fixed left-3 right-3 z-[45] rounded-3xl border border-gold/30 bg-ivory p-5 shadow-soft",
            "bottom-[5.75rem] sm:left-6 sm:right-auto sm:max-w-md lg:bottom-6"
          )}
        >
          <p className="text-[0.95rem] text-charcoal">
            This site uses only essential storage to work well and remember this notice. Read my{" "}
            <Link to={ROUTES.privacy} className="font-semibold text-evergreen underline">
              privacy policy
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={close}
            className="mt-3 min-h-[48px] rounded-full bg-evergreen px-6 text-[0.95rem] font-semibold text-ivory"
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
