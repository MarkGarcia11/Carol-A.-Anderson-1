import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Button } from "../components/ui/Button";
import { ArchImage } from "../components/ui/Photo";
import { Blobs, CountUp, PullQuote, Reveal, SectionHeading } from "../components/ui/Motion";
import { FirstStepBanner, PageHero } from "../components/sections/Shared";
import { PTBadge } from "../components/Footer";
import { ROUTES, SITE, SPECIALTIES, photos } from "../data/site";

const TIMELINE = [
  { year: "1986", title: "Master of Science (60 units)", text: "California State University, Fresno." },
  { year: "1992", title: "EMDR Institute, Level 2", text: "Trained in EMDR, a gentle approach for stuck or painful memories." },
  { year: "1994", title: "Imago Relationship Therapy certificate", text: "Advanced Therapist, Singles Workshop Presenter and Couples Workshop Presenter." },
  { year: "Today", title: "40 years in practice", text: `Licensed Marriage & Family Therapist, State of California (${SITE.license}).` },
];

export default function About() {
  useSeo(
    "About Carol A. Anderson, MS, LMFT | Fresno Marriage & Family Therapist",
    "Meet Carol A. Anderson, MS, LMFT: 40 years in practice, Certified Imago Therapist (Advanced Clinician) and EMDR-trained. Warm, grounded care for couples and individuals in Fresno, CA."
  );
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });

  return (
    <>
      <PageHero
        eyebrow="About Carol"
        title="Forty years of walking *alongside* people"
        intro={
          <>
            <p>
              I’m Carol Anderson. I believe every person who sits down across from me is the most important person in
              the room, and that our problems are really a catalyst for growth.
            </p>
          </>
        }
        photo={photos.portrait}
        label="REPLACE WITH CAROL'S REAL PHOTO"
      />

      <section className="relative isolate overflow-hidden bg-ivory py-20 sm:py-28">
        <Blobs tone="calm" />
        <div className="relative mx-auto grid max-w-[88rem] items-start gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="My story" title="Why I do this *work*" from="left" />
            <div className="mt-6 space-y-5 text-lg">
              <Reveal><p>
                For more than 40 years I’ve been privileged to sit with couples, individuals and groups, adults and
                elders (65+), through some of the hardest and most tender chapters of their lives.
              </p></Reveal>
              <Reveal delay={0.08}><p>
                What I’ve learned is that roadblocks aren’t the end of the story. With the right tools and a little
                courage, they become the place where the real growth begins, and where two people, or one person,
                find their way home.
              </p></Reveal>
              <Reveal delay={0.16}><p>
                My style is warm, plain-spoken and practical. You won’t be handed jargon. You’ll be listened to,
                respected, and given tools you can use the very next day.
              </p></Reveal>
            </div>
            <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-5">
              <PTBadge />
              <Button to={ROUTES.contact}>Book a free consultation</Button>
            </Reveal>
          </div>
          <div className="space-y-6">
            <ArchImage photo={photos.officeCredentials} shape="round" className="aspect-[4/5] w-full" />
            <p className="text-center text-sm text-charcoal/80">
              Some of my certificates and training, on the wall of my Fresno office.
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-cream py-20 sm:py-28" aria-labelledby="timeline">
        <Blobs tone="glow" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading eyebrow="Training & credentials" title="A *foundation* built over decades" from="right" align="center" />
          <span id="timeline" className="sr-only">Training and credentials</span>
          <ol ref={trackRef} className="relative mt-14 ml-6 space-y-10 sm:ml-10">
            <div aria-hidden="true" className="absolute -left-[1.2rem] bottom-2 top-2 w-px bg-evergreen/15 sm:-left-[1.8rem]" />
            <motion.div
              aria-hidden="true"
              className="absolute -left-[1.27rem] bottom-2 top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-gold to-honey sm:-left-[1.87rem]"
              style={{ scaleY: fill }}
            />
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 0.08} x={i % 2 ? 30 : -30} y={0} className="relative">
                <span aria-hidden="true" className="absolute -left-[1.62rem] top-2 h-3.5 w-3.5 rounded-full border-2 border-gold bg-ivory sm:-left-[2.22rem]" />
                <p className="font-serif text-3xl italic text-gold-ink">
                  {t.year === "Today" ? <><CountUp to={40} suffix="+" /> years</> : t.year}
                </p>
                <h3 className="mt-1 text-2xl">{t.title}</h3>
                <p className="mt-1 text-lg">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative bg-ivory py-20 sm:py-28">
        <div className="mx-auto grid max-w-[88rem] items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading eyebrow="Areas of focus" title="What I help *with*" from="left" />
            <ul className="mt-8 flex flex-wrap gap-3">
              {SPECIALTIES.map((s, i) => (
                <Reveal as="li" key={s} delay={i * 0.04} y={14}>
                  <span className="inline-flex min-h-[44px] items-center rounded-full border border-gold/40 bg-cream px-5 text-[0.98rem] font-medium text-evergreen">{s}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.1} className="mt-8">
              <p className="text-lg">
                I work with <strong>adults and elders (65+)</strong>, as individuals, couples and groups, mostly in
                person in Fresno, with virtual sessions if needed.
              </p>
            </Reveal>
          </div>
          <PullQuote
            className="rounded-[2rem] bg-evergreen px-7 pb-8 pt-12 sm:px-10"
            dark
            cite="Tineka Murphy-Burgess, LCSW (peer endorsement)"
          >
            Highly respected experienced LMFT, known for her professionalism, compassion and strong commitment to
            providing quality care.
          </PullQuote>
        </div>
      </section>

      <FirstStepBanner />
    </>
  );
}
