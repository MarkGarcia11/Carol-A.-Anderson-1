import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FaqItem } from "../data/site";
import { ChevronIcon } from "./ui/Icons";
import { Reveal } from "./ui/Motion";
import { cn } from "../utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Accessible accordion: buttons with aria-expanded, smooth height open/close. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-evergreen/12 rounded-[2rem] border border-evergreen/10 bg-white/70 shadow-soft">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={it.q} delay={i * 0.05} y={18}>
            <div>
              <h3 className="!font-sans !text-base">
                <button
                  type="button"
                  className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-8"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-serif text-[1.35rem] font-semibold leading-snug text-evergreen sm:text-2xl">
                    {it.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 text-evergreen transition-colors duration-500",
                      isOpen && "bg-gold/25"
                    )}
                  >
                    <ChevronIcon className={cn("transition-transform duration-500 ease-soft", isOpen && "rotate-180")} />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-7 text-lg text-charcoal sm:px-8 sm:pr-20">
                      {it.a}
                      {/* Dev-only flag: answers Carol must verify before launch */}
                      {import.meta.env.DEV && it.verify && (
                        <span className="ml-2 rounded bg-honey/40 px-2 py-0.5 text-xs font-bold">CAROL TO VERIFY</span>
                      )}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
