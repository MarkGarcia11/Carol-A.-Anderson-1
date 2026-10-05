import { useSeo } from "../lib/seo";
import { Blobs, Reveal, SectionHeading } from "../components/ui/Motion";
import { Button } from "../components/ui/Button";
import { PageHero } from "../components/sections/Shared";
import { CardIcon, CheckIcon } from "../components/ui/Icons";
import { ROUTES, SITE, photos } from "../data/site";

const ROWS = [
  { service: "Free consultation", fee: "Free", note: "15 minutes by phone or email. A relaxed way to see if we’re a fit for each other." },
  { service: "Individual session", fee: "$100", note: "Per session. 90-minute sessions are optional." },
  { service: "Couples session", fee: "$135", note: "Per session. 90-minute sessions are optional, but suggested." },
  { service: "Sliding scale", fee: "Available", note: "If cost is a concern, please call or apply and we’ll talk about it." },
];

// Verify exact Headway steps with Carol before launch.
const HEADWAY_STEPS = [
  { t: "Join Headway", d: "Create your free account at headway.co." },
  { t: "Add your insurance", d: "Enter your plan details so Headway can confirm your coverage." },
  { t: "Request Carol", d: "Search for or request Carol A. Anderson, MS, LMFT in Fresno." },
  { t: "Say hello", d: "Call or message me for your free 15-minute consultation, and we’ll go from there." },
];

const PAY = ["Cash", "Check", "Credit card", "Apple Pay / Apple Cash", "Venmo", "PayPal"];

export default function Fees() {
  useSeo(
    "Fees, Insurance & Sliding Scale | Carol A. Anderson, MS, LMFT, Fresno, CA",
    "Therapy fees in Fresno, CA: individual $100, couples $135 per session. Insurance through Headway, sliding scale available, and a free 15-minute consultation."
  );
  return (
    <>
      <PageHero
        eyebrow="Fees & insurance"
        title="Clear, *honest* and flexible"
        intro={<p>Cost shouldn’t be a mystery or a barrier. Here’s everything in plain language, and if something doesn’t fit, please ask me.</p>}
        photo={photos.officeLoveseat}
        shape="round"
      />

      <section className="relative isolate overflow-hidden bg-ivory py-20 sm:py-28" aria-labelledby="fee-table">
        <Blobs tone="calm" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading eyebrow="Session fees" title="What to *expect*" from="left" />
          <span id="fee-table" className="sr-only">Session fees</span>

          {/* Desktop table */}
          <Reveal className="mt-10 hidden overflow-hidden rounded-[2rem] border border-gold/30 bg-white/80 shadow-soft md:block">
            <table className="w-full text-left">
              <caption className="sr-only">Therapy fees</caption>
              <thead className="bg-evergreen text-ivory">
                <tr>
                  <th scope="col" className="px-8 py-5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.18em]">Service</th>
                  <th scope="col" className="px-8 py-5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.18em]">Fee</th>
                  <th scope="col" className="px-8 py-5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.18em]">Good to know</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-evergreen/10">
                {ROWS.map((r) => (
                  <tr key={r.service} className="transition-colors hover:bg-cream/60">
                    <th scope="row" className="px-8 py-6 font-serif text-2xl font-semibold text-evergreen">{r.service}</th>
                    <td className="px-8 py-6 font-serif text-3xl text-gold-ink">{r.fee}</td>
                    <td className="px-8 py-6 text-[1.02rem]">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* Mobile cards (same data, easy to scan) */}
          <ul className="mt-10 space-y-4 md:hidden">
            {ROWS.map((r, i) => (
              <Reveal as="li" key={r.service} delay={i * 0.08}>
                <div className="rounded-3xl border border-gold/30 bg-white/80 p-6 shadow-soft">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl">{r.service}</h3>
                    <p className="font-serif text-3xl text-gold-ink">{r.fee}</p>
                  </div>
                  <p className="mt-2">{r.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-4">
            <Button to={ROUTES.contact}>Book your free consultation</Button>
            <Button href={SITE.phoneHref} variant="outline" arrow={false}>Call {SITE.phone}</Button>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-cream py-20 sm:py-28" aria-labelledby="headway">
        <Blobs tone="glow" />
        <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
          <SectionHeading eyebrow="Using insurance" title="How to use *Headway*" from="right" align="center"
            intro={<p>I accept insurance through Headway. Here’s the simple path.</p>} />
          <span id="headway" className="sr-only">How to use Headway</span>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HEADWAY_STEPS.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.12}>
                <div className="h-full rounded-[2rem] border border-gold/25 bg-ivory p-7 transition-all duration-700 ease-soft hover:-translate-y-2 hover:shadow-bloom">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-lg font-bold text-evergreen-deep">{i + 1}</span>
                  <h3 className="mt-4 text-2xl">{s.t}</h3>
                  <p className="mt-2">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 text-center">
            <Button href={SITE.headway} variant="outline">Visit Headway.co</Button>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-ivory py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 sm:px-8 md:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-cream p-8">
            <h2 className="flex items-center gap-3 text-3xl"><CardIcon className="text-gold-ink" /> Private pay</h2>
            <p className="mt-3">I accept:</p>
            <ul className="mt-4 grid gap-2.5">
              {PAY.map((p) => (
                <li key={p} className="flex items-center gap-3 text-lg">
                  <CheckIcon className="shrink-0 text-gold-ink" width={22} height={22} /> {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="rounded-[2rem] bg-evergreen p-8 text-ivory">
            <h2 className="text-3xl !text-ivory">Sliding scale</h2>
            <p className="mt-3 text-lg text-ivory/90">
              If the standard fee is out of reach right now, please don’t let that stop you from reaching out. A
              sliding scale is available.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button to={ROUTES.contact} variant="gold">Apply or ask</Button>
              <Button href={SITE.phoneHref} variant="light" arrow={false}>Call to apply</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
