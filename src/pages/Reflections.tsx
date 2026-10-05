import { useSeo } from "../lib/seo";
import { Blobs, Reveal, SectionHeading } from "../components/ui/Motion";
import { ArchImage } from "../components/ui/Photo";
import { PageHero } from "../components/sections/Shared";
import { REFLECTION_TOPICS, ROUTES, photos } from "../data/site";
import { Button } from "../components/ui/Button";

// Simple blog layout, ready for future articles. Replace the placeholder cards
// with real posts later (title, date, excerpt, link). No articles are invented.
const IMAGES = [photos.sprouts, photos.elderHands, photos.journal, photos.coupleWalking];

export default function Reflections() {
  useSeo(
    "Reflections: Relationship Insights from Carol A. Anderson, MS, LMFT",
    "Gentle reflections on relationships, growth and healing from Fresno therapist Carol A. Anderson, MS, LMFT. Articles coming soon."
  );
  return (
    <>
      <PageHero
        eyebrow="Reflections"
        title="Small *thoughts* for big seasons"
        intro={<p>A quiet corner for short, kind reflections on relationships, growth and healing. New writing is on its way.</p>}
        photo={photos.sprout}
        shape="round"
      />
      <section className="relative isolate overflow-hidden bg-ivory py-20 sm:py-28">
        <Blobs tone="calm" />
        <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
          <SectionHeading eyebrow="Coming soon" title="What I’m *writing* about" from="left" />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {REFLECTION_TOPICS.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.1}>
                <article className="group h-full overflow-hidden rounded-[2rem] border border-gold/25 bg-ivory shadow-soft transition-all duration-700 ease-soft hover:-translate-y-2 hover:shadow-bloom">
                  <ArchImage photo={IMAGES[i % IMAGES.length]} shape="soft" className="aspect-[4/3] w-full !rounded-b-none !shadow-none" />
                  <div className="p-6">
                    <span className="inline-block rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold-ink">Coming soon</span>
                    <h3 className="mt-3 text-[1.55rem] leading-tight">{t}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal className="rounded-[2rem] bg-ivory p-7 text-center shadow-soft sm:p-10">
            <h2 className="text-3xl sm:text-4xl">Want a gentle note when something new is posted?</h2>
            <p className="mb-6 mt-2">Use the “Gentle reminders” sign-up in the footer below, or reach out any time.</p>
            <Button to={ROUTES.contact}>Say hello</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
