import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ArchImage, Photo } from "../ui/Photo";
import {
  Blobs,
  CountUp,
  EASE,
  Emph,
  PullQuote,
  Reveal,
  RotatingPhrase,
  ScrollWords,
  SectionHeading,
  WordReveal,
} from "../ui/Motion";
import { HeroVideo } from "./HeroVideo";
import { TwoPaths } from "./Shared";
import { PTBadge } from "../Footer";
import { HeartIcon, LeafIcon, ShieldIcon, SparkIcon } from "../ui/Icons";
import { APPROACH_STEPS, ROUTES, SERVICES, photos } from "../../data/site";
import { useIsDesktop } from "../../lib/hooks";
import { cn } from "../../utils/cn";

// ===========================================================================
// 1. HERO: video-first, headline reveal, two paths become one
// ===========================================================================
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden" aria-labelledby="hero-title">
      <HeroVideo />
      {/* legibility overlays: ivory wash, stronger on mobile */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ivory/92 via-ivory/78 to-ivory/90 lg:bg-gradient-to-r lg:from-ivory/96 lg:via-ivory/80 lg:to-ivory/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-honey/10 via-transparent to-clay/15 mix-blend-multiply"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ivory to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 pb-32 pt-32 sm:px-8 sm:pb-28 sm:pt-36">
        <div className="max-w-[46rem]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <RotatingPhrase prefix="A calm space for" words={["couples", "individuals", "new beginnings", "healing"]} />
          </motion.div>

          <h1
            id="hero-title"
            className="mt-5 text-[2.75rem] font-medium leading-[1.04] sm:text-6xl lg:text-[5.4rem]"
          >
            <WordReveal text="You matter *here*. And so does your *story*." delay={0.25} stagger={0.1} />
          </h1>

          <TwoPaths className="mt-4 h-10 w-full max-w-md sm:h-12 sm:max-w-xl" delay={0.5} />

          <motion.p
            className="mt-6 max-w-2xl text-lg text-charcoal sm:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.5, ease: EASE }}
          >
            Couples and individuals find clarity, connection and hope, because your hardest season can become your
            turning point.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.7, ease: EASE }}
          >
            <Button to={ROUTES.contact} breathe className="sm:min-h-[58px]">
              Book Your Free 15-Minute Consultation
            </Button>
            <Button
              variant="outline"
              className="sm:min-h-[58px]"
              onClick={() => document.getElementById("how-i-help")?.scrollIntoView({ behavior: "smooth" })}
            >
              How I Help
            </Button>
          </motion.div>

          <motion.div
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.0, ease: EASE }}
          >
            <PTBadge />
            <p className="max-w-xs font-serif text-lg italic leading-snug text-evergreen">
              40+ years of guiding people home to themselves and each other.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 2. EMPATHY: "You're in the right place" with scroll-driven word reveal
// ===========================================================================
export function Empathy() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory py-24 sm:py-32" aria-labelledby="right-place">
      <Blobs tone="glow" />
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="You’re in the right place"
            title="Wherever you are today, you don’t have to *figure it out* alone."
            from="left"
          />
          <span id="right-place" className="sr-only">You’re in the right place</span>
          <ScrollWords
            className="mt-10 font-serif text-[1.65rem] leading-[1.45] text-evergreen sm:text-[2rem]"
            text="Maybe the two of you have stopped really hearing each other. Maybe life has piled up, and you can’t remember the last time you felt like yourself. That’s okay. Here, you are the most important person in the room."
          />
          <Reveal delay={0.1} className="mt-10 border-l-[3px] border-gold pl-5">
            <p className="font-serif text-3xl leading-tight text-evergreen sm:text-4xl">
              <Emph text="Challenges are often a *catalyst for growth.*" />
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <ArchImage photo={photos.elderHands} className="aspect-[4/5] w-full" />
          <div className="absolute -bottom-8 -left-4 hidden w-64 rounded-3xl bg-ivory/95 p-5 shadow-bloom backdrop-blur sm:block lg:-left-14">
            <p className="font-serif text-xl italic leading-snug text-evergreen">
              Your hardest season can become your turning point.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 3. HOW I CAN HELP: three service cards
// ===========================================================================
function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.14} className="h-full">
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-gold/20 bg-ivory shadow-soft transition-all duration-700 ease-soft hover:-translate-y-2 hover:shadow-bloom focus-within:-translate-y-2 focus-within:shadow-bloom"
        onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="h-full w-full transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.05]">
            <Photo photo={s.photo} />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-evergreen/55 via-transparent to-transparent" />
          {/* "what to expect": on hover (mouse) or tap/keyboard (toggle) */}
          <div
            className={cn(
              "absolute inset-x-3 bottom-3 rounded-2xl bg-evergreen/95 p-4 text-[0.95rem] leading-snug text-ivory transition-all duration-700 ease-soft",
              open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            )}
            id={`expect-${s.id}`}
            role="note"
          >
            {s.expect}
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={`expect-${s.id}`}
            onClick={() => setOpen((o) => !o)}
            className="absolute right-3 top-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-ivory/90 px-4 text-[0.82rem] font-semibold text-evergreen backdrop-blur"
          >
            <SparkIcon width={16} height={16} />
            What to expect
          </button>
        </div>
        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <h3 className="text-[1.9rem] leading-tight">{s.title}</h3>
          <p className="mt-3 flex-1 text-[1.02rem] text-charcoal">{s.blurb}</p>
          <div className="mt-6">
            <Button to={s.to} variant="outline" className="!px-6">
              Explore more
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="how-i-help" className="relative isolate overflow-hidden bg-cream py-24 sm:py-32" aria-labelledby="help-title">
      <Blobs tone="calm" />
      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow="How I can help"
          title="Three *gentle* ways to begin"
          from="right"
          align="center"
          intro={
            <p>
              Every person who walks in is the most important person in the room. Choose the path that feels closest
              to where you are, and we’ll take it from there, together.
            </p>
          }
        />
        <span id="help-title" className="sr-only">How I can help</span>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 4. APPROACH: scrollytelling. Sticky image changes as each step scrolls in,
//    and a gold line fills with scroll progress.
// ===========================================================================
function Step({
  i,
  step,
  active,
  onActive,
}: {
  i: number;
  step: (typeof APPROACH_STEPS)[number];
  active: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const reached = i <= active;
  return (
    <div ref={ref} className="relative flex min-h-[48vh] flex-col justify-center py-8 lg:min-h-[62vh]">
      <motion.span
        aria-hidden="true"
        className={cn(
          "absolute -left-[2.55rem] top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-700 sm:-left-[3.4rem] sm:h-11 sm:w-11",
          reached ? "border-gold bg-gold text-evergreen-deep" : "border-evergreen/25 bg-ivory text-evergreen/60"
        )}
        animate={{ scale: active === i ? 1.12 : 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {i + 1}
      </motion.span>
      <motion.div
        animate={{ opacity: active === i ? 1 : 0.45, x: active === i ? 0 : 8 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-gold-ink">Step {i + 1}</p>
        <h3 className="mt-2 text-[2rem] leading-tight sm:text-4xl">{step.title}</h3>
        <p className="mt-4 max-w-xl text-lg text-charcoal">{step.text}</p>
        {/* mobile inline image (the sticky image is desktop-only) */}
        <div className="mt-6 overflow-hidden rounded-3xl shadow-soft lg:hidden">
          <div className="aspect-[16/10]">
            <Photo photo={step.photo} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 55%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  return (
    <section ref={ref} className="relative isolate bg-ivory py-24 sm:py-32" aria-labelledby="approach-title">
      <Blobs tone="warm" />
      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Carol’s approach"
          title="A path you can *walk*, one step at a time"
          from="left"
          intro={<p>No pressure, no blame, just a clear, caring way forward.</p>}
        />
        <span id="approach-title" className="sr-only">Carol’s approach</span>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* Sticky visual (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 h-[min(72vh,620px)]">
              <div className="arch relative h-full w-full overflow-hidden bg-cream shadow-bloom">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: EASE }}
                  >
                    <Photo photo={APPROACH_STEPS[active].photo} />
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-evergreen/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-6 text-center text-ivory">
                  <motion.p
                    key={`n-${active}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="font-serif text-6xl italic"
                  >
                    0{active + 1}
                  </motion.p>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em]">
                    {APPROACH_STEPS[active].title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps + animated connecting line */}
          <div ref={trackRef} className="relative ml-[2.55rem] sm:ml-14">
            <div aria-hidden="true" className="absolute -left-[1.55rem] bottom-6 top-6 w-px bg-evergreen/15 sm:-left-[2.35rem]" />
            <motion.div
              aria-hidden="true"
              className="absolute -left-[1.62rem] bottom-6 top-6 w-[3px] origin-top rounded-full bg-gradient-to-b from-gold via-honey to-clay sm:-left-[2.43rem]"
              style={{ scaleY: fill }}
            />
            {APPROACH_STEPS.map((s, i) => (
              <Step key={s.title} i={i} step={s} active={active} onActive={setActive} />
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button to={ROUTES.contact} breathe>
            Begin with a free consultation
          </Button>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 5. MEET CAROL: arch portrait, bio, animated credentials, peer endorsement
// ===========================================================================
const CREDS = [
  { icon: HeartIcon, big: <><CountUp to={40} suffix="+" /></>, label: "Years in Practice" },
  { icon: SparkIcon, big: "Imago", label: "Certified Imago Therapist" },
  { icon: LeafIcon, big: "EMDR", label: "EMDR Trained" },
  { icon: ShieldIcon, big: "LMFT", label: "Licensed MFT, California" },
] as { icon: typeof HeartIcon; big: ReactNode; label: string }[];

export function MeetCarol() {
  return (
    <section className="relative isolate overflow-hidden bg-cream py-24 sm:py-32" aria-labelledby="meet-carol">
      <Blobs tone="glow" />
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* REPLACE WITH CAROL'S REAL PHOTO: drop carol-portrait.jpg into /public/images */}
          <ArchImage
            photo={photos.portrait}
            className="aspect-[3/4] w-full"
            label="REPLACE WITH CAROL'S REAL PHOTO"
          />
          <div aria-hidden="true" className="absolute -right-5 -top-5 -z-10 h-full w-full rounded-t-[999px] rounded-b-[2rem] border-2 border-gold/50" />
        </div>

        <div>
          <SectionHeading
            eyebrow="Meet Carol"
            title="Warm, experienced, and *honored* to join you"
            from="right"
          />
          <span id="meet-carol" className="sr-only">Meet Carol</span>
          <Reveal delay={0.1} className="mt-6 space-y-4 text-lg">
            <p>
              I’m Carol Anderson, a licensed marriage and family therapist in Fresno. For more than 40 years I’ve been
              sitting with couples and individuals at the moments that feel hardest, and I’ve seen again and again how
              those moments can become a catalyst for growth.
            </p>
            <p>
              I’m a Certified Imago Therapist (Advanced Clinician) and EMDR-trained, and my goal is simple: that you
              leave each session feeling heard, a little lighter, and equipped with tools you can really use.
            </p>
          </Reveal>

          <ul className="mt-9 grid grid-cols-2 gap-4">
            {CREDS.map(({ icon: Icon, big, label }, i) => (
              <Reveal as="li" key={label} delay={i * 0.12}>
                <div className="group h-full rounded-3xl border border-gold/30 bg-ivory/85 p-5 transition-all duration-700 ease-soft hover:-translate-y-1 hover:shadow-bloom">
                  <Icon className="text-gold-ink" width={26} height={26} />
                  <p className="mt-3 font-serif text-4xl font-semibold leading-none text-evergreen sm:text-5xl">{big}</p>
                  <p className="mt-2 text-[0.95rem] font-medium leading-snug text-charcoal">{label}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <PullQuote
            className="mt-14 rounded-[2rem] bg-evergreen px-7 pb-8 pt-12 sm:px-10"
            dark
            cite="Tineka Murphy-Burgess, LCSW (peer endorsement)"
          >
            Highly respected experienced LMFT, known for her professionalism, compassion and strong commitment to
            providing quality care.
          </PullQuote>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button to={ROUTES.about}>More about Carol</Button>
            <Button to={ROUTES.contact} variant="outline">
              Say hello
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// 6. OFFICE GALLERY: Carol's real office photos with soft parallax
// ===========================================================================
function Parallax({ range = 40, className, children }: { range?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], desktop ? [range, -range] : [range / 3, -range / 3]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function OfficeGallery() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory py-24 sm:py-32" aria-labelledby="office-title">
      <Blobs tone="calm" />
      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <SectionHeading eyebrow="Step inside" title="A quiet room, made for *your* story" from="left" />
          <span id="office-title" className="sr-only">Step inside the office</span>
          <Reveal delay={0.15}>
            <p className="max-w-xl text-lg lg:ml-auto">
              My Fresno office is softly lit, with comfortable seating, living plants and a calm, unhurried feel. It’s
              a place where you can breathe out. Prefer to meet from home? Virtual sessions are available when needed.
            </p>
            <p className="mt-4 text-sm font-semibold text-gold-ink">
              Hoover neighborhood · 6777 N. Willow Ave, Suite 139, Fresno
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-6 gap-4 sm:gap-6 lg:grid-cols-12">
          <Parallax range={20} className="col-span-6 lg:col-span-7">
            <ArchImage photo={photos.officeWindows} shape="round" className="aspect-[4/3] w-full" />
          </Parallax>
          <Parallax range={60} className="col-span-3 lg:col-span-5 lg:row-span-2 lg:mt-20">
            <ArchImage photo={photos.officeCredentials} shape="arch" className="aspect-[3/4.4] w-full" delay={0.15} />
          </Parallax>
          <Parallax range={36} className="col-span-3 lg:col-span-4">
            <ArchImage photo={photos.officeLoveseat} shape="round" className="aspect-[4/5] w-full lg:aspect-[4/3]" delay={0.1} />
          </Parallax>
          <Parallax range={12} className="col-span-6 lg:col-span-3">
            <ArchImage photo={photos.officeBookshelf} shape="round" className="aspect-[16/10] w-full lg:aspect-[4/3]" delay={0.2} />
          </Parallax>
        </div>

        <div className="mt-14 text-center">
          <Link
            to={ROUTES.contact}
            className="inline-flex min-h-[48px] items-center font-serif text-2xl italic text-evergreen underline decoration-gold decoration-2 underline-offset-8 transition-colors hover:text-gold-ink"
          >
            See how to find me →
          </Link>
        </div>
      </div>
    </section>
  );
}
