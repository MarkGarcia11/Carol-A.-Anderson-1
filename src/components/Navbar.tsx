import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { CloseIcon, ChevronIcon, MenuIcon, PhoneIcon } from "./ui/Icons";
import { HELP_LINKS, NAV_LINKS, ROUTES, SITE } from "../data/site";
import { useScrolled } from "../lib/hooks";
import { cn } from "../utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Hand-drawn style underline that draws on hover/focus (SVG path, CSS-driven). */
function HandUnderline({ active }: { active?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      className={cn("nav-underline pointer-events-none absolute -bottom-1 left-0 h-[7px] w-full", active && "is-active")}
    >
      <path
        d="M1 5 C 18 1, 34 8, 52 4 S 84 2, 99 5"
        pathLength={1}
        fill="none"
        stroke="#C9A24B"
        strokeWidth="2.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const linkBase =
  "group relative inline-flex min-h-[48px] items-center px-1 text-[0.95rem] font-semibold text-evergreen transition-colors hover:text-evergreen-deep";

export function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const location = useLocation();
  const helpRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation
  useEffect(() => {
    setOpen(false);
    setHelpOpen(false);
  }, [location.pathname]);

  // Lock body scroll + Escape to close the mobile menu
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const helpActive = HELP_LINKS.some((l) => l.to === location.pathname);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-700 ease-soft",
          scrolled
            ? "bg-ivory/80 py-2 shadow-[0_8px_30px_-18px_rgba(36,64,58,0.4)] backdrop-blur-xl"
            : "bg-gradient-to-b from-ivory/90 to-ivory/0 py-4"
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-[88rem] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8"
        >
          <Link to={ROUTES.home} aria-label="Carol A. Anderson, MS, LMFT, home" className="rounded-xl">
            <Logo compact={scrolled} />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 lg:flex">
            <li>
              <NavLink to={ROUTES.about} className={linkBase}>
                {({ isActive }) => (
                  <>
                    About Carol
                    <HandUnderline active={isActive} />
                  </>
                )}
              </NavLink>
            </li>
            <li
              ref={helpRef as unknown as React.RefObject<HTMLLIElement>}
              className="relative"
              onMouseEnter={() => setHelpOpen(true)}
              onMouseLeave={() => setHelpOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setHelpOpen(false);
              }}
            >
              <button
                type="button"
                className={cn(linkBase, "gap-1.5")}
                aria-expanded={helpOpen}
                aria-haspopup="true"
                onClick={() => setHelpOpen((o) => !o)}
              >
                How I Help
                <ChevronIcon
                  width={16}
                  height={16}
                  className={cn("transition-transform duration-500 ease-soft", helpOpen && "rotate-180")}
                />
                <HandUnderline active={helpActive} />
              </button>
              <AnimatePresence>
                {helpOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                  >
                    <ul className="rounded-3xl border border-gold/25 bg-ivory/95 p-2 shadow-soft backdrop-blur-xl">
                      {HELP_LINKS.map((l) => (
                        <li key={l.to}>
                          <Link
                            to={l.to}
                            className="block rounded-2xl px-4 py-3 transition-colors hover:bg-cream focus-visible:bg-cream"
                          >
                            <span className="block font-semibold text-evergreen">{l.label}</span>
                            <span className="block text-sm text-charcoal/80">{l.hint}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {NAV_LINKS.slice(1).map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkBase}>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <HandUnderline active={isActive} />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <Button to={ROUTES.contact} variant="primary" className="!px-6" breathe>
                Free 15-Min Consultation
              </Button>
            </div>
            {/* Mobile: persistent Call button + menu */}
            <a
              href={SITE.phoneHref}
              className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full bg-evergreen px-3.5 text-[0.9rem] font-semibold text-ivory shadow-soft transition-shadow active:scale-[0.98] sm:gap-2 sm:px-4 lg:hidden"
              aria-label={`Call Carol at ${SITE.phone}`}
            >
              <PhoneIcon width={18} height={18} />
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">Call Carol</span>
            </a>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-evergreen/25 bg-ivory/70 text-evergreen lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[55] bg-evergreen-deep/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-menu"
              aria-label="Mobile menu"
              className="fixed inset-y-0 right-0 z-[60] flex w-[88%] max-w-sm flex-col overflow-y-auto bg-ivory px-6 pb-8 pt-5 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <Logo compact />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-evergreen/25 text-evergreen"
                >
                  <CloseIcon />
                </button>
              </div>
              <ul className="mt-8 flex flex-col">
                {[{ label: "Home", to: ROUTES.home }, ...NAV_LINKS.slice(0, 1)].map((l, i) => (
                  <MobileItem key={l.to} to={l.to} i={i}>
                    {l.label}
                  </MobileItem>
                ))}
                <li className="mt-3 px-1 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-ink">How I help</li>
                {HELP_LINKS.map((l, i) => (
                  <MobileItem key={l.to} to={l.to} i={i + 2} indent>
                    {l.label}
                  </MobileItem>
                ))}
                <li className="mt-3 px-1 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-ink">More</li>
                {NAV_LINKS.slice(1).map((l, i) => (
                  <MobileItem key={l.to} to={l.to} i={i + 6} indent>
                    {l.label}
                  </MobileItem>
                ))}
              </ul>
              <div className="mt-auto space-y-3 pt-8">
                <Button to={ROUTES.contact} full breathe>
                  Free 15-Min Consultation
                </Button>
                <Button href={SITE.phoneHref} variant="outline" full arrow={false}>
                  <PhoneIcon width={18} height={18} /> Call {SITE.phone}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileItem({
  to,
  i,
  children,
  indent,
}: {
  to: string;
  i: number;
  children: React.ReactNode;
  indent?: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: EASE }}
    >
      <NavLink
        to={to}
        end={to === "/"}
        className={({ isActive }) =>
          cn(
            "flex min-h-[52px] items-center border-b border-evergreen/10 px-1 font-serif text-[1.55rem] text-evergreen",
            indent && "pl-3 !text-[1.3rem]",
            isActive && "text-gold-ink"
          )
        }
      >
        {children}
      </NavLink>
    </motion.li>
  );
}
