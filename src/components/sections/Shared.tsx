import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArchImage } from "../ui/Photo";
import { Blobs, EASE, Emph, Reveal, SectionHeading, WordReveal } from "../ui/Motion";
import { ConsultForm } from "../ConsultForm";
import { CardIcon, ScaleIcon, ShieldIcon, VideoIcon, PhoneIcon } from "../ui/Icons";
import { ROUTES, SITE, type PhotoAsset } from "../../data/site";
import { cn } from "../../utils/cn";

// ---------------------------------------------------------------------------
// "Two paths become one": two thin gold strokes draw across and intertwine
// into a single flowing line (a quiet metaphor for couples reconnecting).
// ---------------------------------------------------------------------------
export function TwoPaths({ className, delay = 0.6 }: { className?: string; delay?: number }) {
  const common = {
    fill: "none",
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };
  return (
    <svg
      className={cn("pointer-events-none overflow-visible", className)}
      viewBox="0 0 800 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M0 100 C 110 100, 150 14, 270 38 C 350 54, 380 78, 470 64 C 580 46, 660 66, 800 60"
        stroke="#C9A24B"
        strokeWidth={2}
        {...common}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.2, delay, ease: EASE }}
      />
      <motion.path
        d="M0 18 C 110 18, 150 106, 270 82 C 350 66, 380 44, 470 56 C 580 74, 660 54, 800 60"
        stroke="#E9B949"
        strokeWidth={2}
        {...common}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.2, delay: delay + 0.35, ease: EASE }}
      />
      {/* the single line they become */}
      <motion.path
        d="M470 60 C 580 60, 660 60, 800 60"
        stroke="#C9A24B"
        strokeWidth={3.2}
        {...common}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: delay + 2.6, ease: EASE }}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Inner-page hero
// ---------------------------------------------------------------------------
export function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  shape = "arch",
  actions,
  label,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  photo?: PhotoAsset;
  shape?: "arch" | "round";
  actions?: ReactNode;
  label?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-cream via-ivory to-ivory pb-16 pt-32 sm:pt-40 lg:pb-24">
      <Blobs />
      <div
        className={cn(
          "relative mx-auto grid max-w-[88rem] items-center gap-12 px-5 sm:px-8",
          photo && "lg:grid-cols-[1.1fr_0.9fr] lg:gap-20"
        )}
      >
        <div>
          <motion.p
            className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.24em] text-gold-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {eyebrow}
          </motion.p>
          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
            <WordReveal text={title} delay={0.15} stagger={0.08} />
          </h1>
          <TwoPaths className="mt-5 h-8 w-56 sm:w-72" delay={0.4} />
          <motion.div
            className="mt-6 max-w-2xl space-y-4 text-lg text-charcoal sm:text-xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
          >
            {intro}
          </motion.div>
          {actions && (
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: EASE }}
            >
              {actions}
            </motion.div>
          )}
        </div>
        {photo && (
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <ArchImage
              photo={photo}
              shape={shape}
              priority
              label={label}
              className="aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[4/5]"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Calm "Your first step is simple" banner with phone + short form
// ---------------------------------------------------------------------------
export function FirstStepBanner() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-evergreen py-20 sm:py-28" aria-labelledby="first-step">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob animate-drift-a -left-20 top-0 h-80 w-80 bg-honey/20" />
        <div className="blob animate-drift-b -right-20 bottom-0 h-96 w-96 bg-clay/20" />
        <div className="blob animate-drift-c left-1/2 top-1/3 hidden h-72 w-72 bg-sage/20 md:block" />
      </div>
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            dark
            eyebrow="Free 15-minute consultation"
            title="Your first step is *simple*."
            from="left"
            as="h2"
            intro={
              <p>
                A short, no-pressure conversation by phone or email. Tell me what’s on your heart, ask me anything,
                and we’ll both get a feel for whether we’re a fit for each other. I would be honored to join you.
              </p>
            }
          />
          <span id="first-step" className="sr-only">Your first step</span>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-5">
            <Button href={SITE.phoneHref} variant="gold" arrow={false} breathe>
              <PhoneIcon width={20} height={20} /> Call {SITE.phone}
            </Button>
            <span className="text-ivory/85">or send a note, I’ll get back to you.</span>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="rounded-[2rem] bg-ivory p-6 shadow-bloom sm:p-9">
          <h3 className="mb-5 text-3xl">Request a gentle first call</h3>
          <ConsultForm mode="compact" />
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Practical reassurance strip
// ---------------------------------------------------------------------------
const ITEMS = [
  { icon: CardIcon, title: "Clear fees", text: "Individual $100 · Couples $135 per session" },
  { icon: ShieldIcon, title: "Insurance via Headway", text: "Join Headway and request Carol" },
  { icon: ScaleIcon, title: "Sliding scale", text: "Available. Call or apply to ask" },
  { icon: VideoIcon, title: "In person or virtual", text: "Mostly in Fresno, virtual if needed" },
];

export function ReassuranceStrip() {
  return (
    <section className="relative bg-cream py-14 sm:py-16" aria-label="Fees, insurance and session options">
      <div className="mx-auto grid max-w-[88rem] gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className="group flex h-full items-start gap-4 rounded-3xl border border-gold/25 bg-ivory/80 p-5 transition-all duration-700 ease-soft hover:-translate-y-1 hover:shadow-bloom">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-evergreen">
                <Icon />
              </span>
              <div>
                <p className="font-serif text-xl font-semibold leading-tight text-evergreen">{title}</p>
                <p className="mt-1 text-[0.95rem] leading-snug text-charcoal">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center">
        <Button to={ROUTES.fees} variant="ghost">
          See fees &amp; insurance details
        </Button>
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Future reviews: HIDDEN BY DEFAULT. Enable via SITE.showReviews once Carol
// has approved reviews under professional ethics guidelines. Do not add
// invented testimonials.
// ---------------------------------------------------------------------------
export function ReviewsSection({ reviews = [] as { quote: string; by: string }[] }) {
  if (!SITE.showReviews || reviews.length === 0) return null;
  return (
    <section className="bg-ivory py-20" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 id="reviews-heading" className="text-4xl">
          <Emph text="Kind *words*" />
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <blockquote key={r.by} className="rounded-3xl bg-cream p-6">
              <p className="font-serif text-2xl italic">“{r.quote}”</p>
              <footer className="mt-3 text-sm font-semibold text-gold-ink">{r.by}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
