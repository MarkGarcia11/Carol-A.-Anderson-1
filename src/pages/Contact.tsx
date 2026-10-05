import { useSeo } from "../lib/seo";
import { Blobs, Reveal, SectionHeading } from "../components/ui/Motion";
import { Button } from "../components/ui/Button";
import { ArchImage } from "../components/ui/Photo";
import { ConsultForm } from "../components/ConsultForm";
import { CalendarIcon, MailIcon, MapPinIcon, PhoneIcon } from "../components/ui/Icons";
import { SITE, photos } from "../data/site";
import { PageHero } from "../components/sections/Shared";

const CALENDLY = import.meta.env.VITE_CALENDLY_URL as string | undefined;

export default function Contact() {
  useSeo(
    "Contact & Free 15-Minute Consultation | Carol A. Anderson, MS, LMFT, Fresno, CA",
    "Book a free 15-minute consultation with Carol A. Anderson, MS, LMFT. 6777 N. Willow Ave, Suite 139, Fresno, CA 93710. Call (559) 484-2078. In person or virtual."
  );
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s take a calm *first step*"
        intro={
          <p>
            A free 15-minute consultation, by phone or email, is the easiest way to begin. There’s no pressure; we’ll
            simply see if we’re a fit for each other.
          </p>
        }
        actions={
          <Button href={SITE.phoneHref} arrow={false} breathe>
            <PhoneIcon width={20} height={20} /> Call {SITE.phone}
          </Button>
        }
      />

      <section className="relative isolate overflow-hidden bg-ivory pb-24 pt-6 sm:pb-32" id="form">
        <Blobs tone="calm" />
        <div className="relative mx-auto grid max-w-[88rem] items-start gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal className="rounded-[2rem] border border-gold/25 bg-ivory p-6 shadow-soft sm:p-10">
            <h2 className="text-3xl sm:text-4xl">Request your free consultation</h2>
            <p className="mb-7 mt-2">Share as much or as little as you like. I’ll reach out in the way you prefer.</p>
            <ConsultForm mode="full" />
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1} className="rounded-[2rem] bg-evergreen p-7 text-ivory sm:p-9">
              <h2 className="text-3xl !text-ivory">Visit or call</h2>
              <address className="mt-5 space-y-4 not-italic">
                <p className="flex gap-3">
                  <MapPinIcon className="mt-1 shrink-0 text-honey" />
                  <span>
                    {SITE.address.line1}
                    <br />
                    {SITE.address.city} <span className="text-sage">({SITE.address.neighborhood})</span>
                  </span>
                </p>
                <p className="flex gap-3">
                  <PhoneIcon className="mt-1 shrink-0 text-honey" />
                  <a className="text-xl font-semibold underline-offset-4 hover:text-honey hover:underline" href={SITE.phoneHref}>
                    {SITE.phone}
                  </a>
                </p>
                <p className="flex gap-3">
                  <MailIcon className="mt-1 shrink-0 text-honey" />
                  {SITE.email ? (
                    <a className="underline-offset-4 hover:text-honey hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  ) : (
                    <span className="text-ivory/80">[Email address to be added]</span>
                  )}
                </p>
                <p className="pl-9 text-ivory/80">Office hours: [to be added by Carol]</p>
              </address>
              <p className="mt-5 text-ivory/90">Mostly in person in Fresno, with virtual sessions available if needed.</p>
            </Reveal>

            <Reveal delay={0.15}>
              <ArchImage photo={photos.officeBookshelf} shape="round" className="aspect-[16/10] w-full" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative bg-cream py-20 sm:py-28" aria-labelledby="map-title">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
          <SectionHeading eyebrow="Find me" title="Hoover neighborhood, *Fresno*" from="right" />
          <span id="map-title" className="sr-only">Map and directions</span>
          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[2rem] border border-gold/30 bg-ivory shadow-soft">
            <iframe
              title="Map showing 6777 North Willow Avenue, Suite 139, Fresno, CA 93710"
              src={SITE.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full border-0 sm:h-[440px]"
              allowFullScreen
            />
          </Reveal>
          <p className="mt-5 text-center">
            <Button href={SITE.mapLink} variant="outline">Open in Google Maps</Button>
          </p>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28" aria-labelledby="sched">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading eyebrow="Online scheduling" title="Pick a *time* that suits you" align="center" from="left" />
          <span id="sched" className="sr-only">Online scheduling</span>
          <Reveal delay={0.1} className="mt-10">
            {CALENDLY ? (
              <iframe title="Schedule a free consultation" src={CALENDLY} loading="lazy" className="h-[700px] w-full rounded-[2rem] border border-gold/30" />
            ) : (
              // SCHEDULING EMBED PLACEHOLDER: set VITE_CALENDLY_URL (or paste any scheduler iframe here).
              <div className="flex flex-col items-center rounded-[2rem] border-2 border-dashed border-gold/60 bg-cream/60 px-6 py-14 text-center">
                <CalendarIcon className="text-gold-ink" width={40} height={40} />
                <p className="mt-4 font-serif text-3xl text-evergreen">Online scheduling coming soon</p>
                <p className="mt-2 max-w-md">
                  Placeholder for a Calendly (or similar) calendar. Until then, please call or send the form above.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
