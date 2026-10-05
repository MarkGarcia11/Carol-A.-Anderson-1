import type { ReactNode } from "react";
import { Button } from "../components/ui/Button";
import { ArchImage } from "../components/ui/Photo";
import { Blobs, Reveal, SectionHeading } from "../components/ui/Motion";
import { FirstStepBanner, PageHero } from "../components/sections/Shared";
import { useSeo } from "../lib/seo";
import { ROUTES, type PhotoAsset } from "../data/site";
import { cn } from "../utils/cn";

export interface ServiceConfig {
  seo: [string, string];
  hero: { eyebrow: string; title: string; intro: ReactNode; photo: PhotoAsset; shape?: "arch" | "round" };
  story: { eyebrow: string; title: string; paragraphs: ReactNode[]; photo: PhotoAsset };
  points: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  extras?: ReactNode;
  cta: { label: string; to: string };
}

/**
 * Shared template for the three therapy pages so they stay consistent:
 * PageHero → story (image + text) → numbered "what we'll do" cards → extras → first-step banner.
 */
export function ServicePage({ cfg }: { cfg: ServiceConfig }) {
  useSeo(cfg.seo[0], cfg.seo[1]);
  const { hero, story, points } = cfg;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
        photo={hero.photo}
        shape={hero.shape}
        actions={
          <>
            <Button to={ROUTES.contact} breathe>
              Book Your Free 15-Minute Consultation
            </Button>
            <Button to={cfg.cta.to} variant="outline">
              {cfg.cta.label}
            </Button>
          </>
        }
      />

      <section className="relative isolate overflow-hidden bg-ivory py-20 sm:py-28">
        <Blobs tone="calm" />
        <div className="relative mx-auto grid max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1">
            <ArchImage photo={story.photo} shape="round" className="aspect-[5/4] w-full" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow={story.eyebrow} title={story.title} from="right" />
            <div className="mt-6 space-y-4 text-lg">
              {story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-cream py-20 sm:py-28">
        <Blobs tone="glow" />
        <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
          <SectionHeading eyebrow={points.eyebrow} title={points.title} from="left" align="center" />
          <ol className={cn("mt-12 grid gap-6 sm:grid-cols-2", points.items.length > 3 && "lg:grid-cols-4", points.items.length === 3 && "lg:grid-cols-3")}>
            {points.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 0.12}>
                <div className="group h-full rounded-[2rem] border border-gold/25 bg-ivory p-7 transition-all duration-700 ease-soft hover:-translate-y-2 hover:shadow-bloom">
                  <span className="font-serif text-5xl italic text-gold">0{i + 1}</span>
                  <h3 className="mt-3 text-[1.7rem] leading-tight">{it.title}</h3>
                  <p className="mt-3 text-[1.02rem] text-charcoal">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {cfg.extras}
      <FirstStepBanner />
    </>
  );
}
