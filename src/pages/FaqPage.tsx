import { useEffect } from "react";
import { useSeo } from "../lib/seo";
import { Faq } from "../components/Faq";
import { Blobs, Reveal } from "../components/ui/Motion";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/sections/Shared";
import { FAQS, ROUTES, SITE, photos } from "../data/site";

export default function FaqPage() {
  useSeo(
    "FAQ: Imago, EMDR, Insurance & Free Consultation | Carol A. Anderson, MS, LMFT",
    "Answers to common questions about Imago therapy, EMDR, the free 15-minute consultation, insurance through Headway, virtual sessions and session length in Fresno, CA."
  );

  // FAQPage structured data for search engines
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Gentle answers to *common* questions"
        intro={<p>Wondering what to expect? You’re not alone. If your question isn’t here, please ask. I’m always glad to talk.</p>}
        photo={photos.sprout}
        shape="round"
      />
      <section className="relative isolate overflow-hidden bg-ivory py-20 sm:py-28">
        <Blobs tone="calm" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Faq items={FAQS} />
          <Reveal className="on-dark mt-14 rounded-[2rem] bg-evergreen p-8 text-center text-ivory sm:p-12">
            <h2 className="text-3xl !text-ivory sm:text-4xl">Still wondering? <span className="accent">Let’s talk.</span></h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-ivory/90">The free 15-minute consultation is a perfect place to ask anything.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Button to={ROUTES.contact} variant="gold" breathe>Book a free consultation</Button>
              <Button href={SITE.phoneHref} variant="light" arrow={false}>Call {SITE.phone}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
