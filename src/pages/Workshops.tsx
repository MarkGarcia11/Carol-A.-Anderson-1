import { useSeo } from "../lib/seo";
import { Blobs, Reveal, SectionHeading } from "../components/ui/Motion";
import { ArchImage } from "../components/ui/Photo";
import { PageHero } from "../components/sections/Shared";
import { ConsultForm } from "../components/ConsultForm";
import { photos } from "../data/site";
import { CalendarIcon } from "../components/ui/Icons";

// No invented dates: events show "Dates to be announced" until Carol schedules them.
const EVENTS = [
  {
    title: "Imago Couples Workshop",
    book: "Inspired by “Getting the Love You Want”",
    text: "A welcoming experience for couples who want to learn a new way of talking, listening and connecting, alongside other couples.",
    photo: photos.laughing,
  },
  {
    title: "Imago Singles Workshop",
    book: "Inspired by “Keeping the Love You Find”",
    text: "For singles who want to understand their relationship patterns and bring clarity and confidence to dating.",
    photo: photos.journal,
  },
];

export default function Workshops() {
  useSeo(
    "Imago Couples & Singles Workshops in Fresno, CA | Carol A. Anderson, MS, LMFT",
    "Imago couples and singles workshops in Fresno, CA presented by a Certified Imago Therapist. Express interest to hear when the next workshop is scheduled."
  );
  return (
    <>
      <PageHero
        eyebrow="Workshops"
        title="Learn *together*, grow together"
        intro={
          <p>
            Workshops are a warm, practical way to learn new tools for relationships. I’m a certified Imago Couples
            and Singles Workshop Presenter (1994). Dates are shared here as soon as they’re scheduled.
          </p>
        }
        photo={photos.elderSmile}
      />

      <section className="relative isolate overflow-hidden bg-ivory py-20 sm:py-28">
        <Blobs tone="calm" />
        <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
          <SectionHeading eyebrow="Upcoming" title="Workshops on the *horizon*" from="left" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {EVENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.14}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-gold/25 bg-ivory shadow-soft transition-all duration-700 ease-soft hover:-translate-y-2 hover:shadow-bloom">
                  <ArchImage photo={e.photo} shape="soft" className="aspect-[16/10] w-full !rounded-b-none !shadow-none" />
                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-gold-ink">{e.book}</p>
                    <h3 className="mt-2 text-3xl">{e.title}</h3>
                    <p className="mt-3 flex-1 text-lg">{e.text}</p>
                    <p className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-4 py-2 text-[0.92rem] font-semibold text-evergreen">
                      <CalendarIcon width={18} height={18} /> Dates to be announced
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="interest" className="relative isolate overflow-hidden bg-cream py-20 sm:py-28" aria-labelledby="interest-title">
        <Blobs tone="glow" />
        <div className="relative mx-auto grid max-w-[88rem] items-start gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Stay in the loop" title="Express your *interest*" from="right" />
            <span id="interest-title" className="sr-only">Express interest</span>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg">
                Tell me which workshop you’re curious about and I’ll let you know when one is scheduled. There’s no
                commitment, and no pressure.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="rounded-[2rem] bg-ivory p-6 shadow-soft sm:p-9">
            <ConsultForm mode="workshop" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
