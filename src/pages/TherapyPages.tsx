import { ServicePage } from "./ServicePage";
import { Button } from "../components/ui/Button";
import { Reveal, SectionHeading } from "../components/ui/Motion";
import { ROUTES, SPECIALTIES, SITE, photos } from "../data/site";

// ===========================================================================
// COUPLES (Imago)
// NOTE: Imago descriptions are kept general; Carol to confirm her preferred wording.
// ===========================================================================
export function CouplesPage() {
  return (
    <ServicePage
      cfg={{
        seo: [
          "Couples Therapy & Imago Marriage Counseling in Fresno, CA | Carol A. Anderson, MS, LMFT",
          "Imago couples therapy and marriage counseling in Fresno, CA with a Certified Imago Therapist (Advanced Clinician). Premarital and marital support, in person or virtual. Free 15-minute consultation.",
        ],
        hero: {
          eyebrow: "Couples therapy · Imago",
          title: "Turn the distance between you into *connection*",
          intro: (
            <>
              <p>
                Feeling distant, stuck in the same argument, or preparing for marriage? Imago Relationship Therapy
                offers a kind, structured way to truly hear each other again.
              </p>
              <p>I would be honored to join you.</p>
            </>
          ),
          photo: photos.couple,
        },
        story: {
          eyebrow: "What is Imago?",
          title: "A way of *listening* that changes everything",
          photo: photos.laughing,
          paragraphs: [
            "Imago is based on the book “Getting the Love You Want.” At its heart is a simple, hopeful idea: the very things that frustrate us about our partners often point to places where we’re ready to grow.",
            "I’m a Certified Imago Therapist, an Advanced Clinician, and a Couples and Singles Workshop Presenter (certified 1994). In sessions, you’ll learn a calm, structured way of speaking and listening, so each of you feels safe, heard and understood.",
            "Whether you’re married, preparing for marriage, or working through family conflict, you’ll never be asked to take sides. Our work is about the two of you, as a fit for each other.",
          ],
        },
        points: {
          eyebrow: "What we’ll do together",
          title: "Practical tools for *real* life",
          items: [
            { title: "Be heard", text: "Learn a gentle way of talking and listening so each of you feels understood, even in hard moments." },
            { title: "Find the roadblocks", text: "Notice the patterns that keep repeating, without blame, and what they’re really asking for." },
            { title: "Practice new tools", text: "Take home simple skills to try between sessions, at the kitchen table, not just in my office." },
            { title: "Rebuild closeness", text: "Little by little, turn distance into a deeper, more playful and trusting connection." },
          ],
        },
        extras: (
          <section className="bg-ivory py-16 sm:py-20">
            <div className="mx-auto grid max-w-5xl gap-8 px-5 sm:px-8 md:grid-cols-2">
              <Reveal className="rounded-[2rem] bg-cream p-8">
                <h3 className="text-3xl">Sessions &amp; fees</h3>
                <p className="mt-3 text-lg">
                  Couples sessions are <strong>$135</strong> per session. 90-minute sessions are optional, but I
                  suggest them. Insurance is available through Headway, and a sliding scale is available.
                </p>
                <div className="mt-5">
                  <Button to={ROUTES.fees} variant="outline">Fees &amp; insurance</Button>
                </div>
              </Reveal>
              <Reveal delay={0.12} className="rounded-[2rem] bg-evergreen p-8 text-ivory">
                <h3 className="text-3xl !text-ivory">Couples workshops</h3>
                <p className="mt-3 text-lg text-ivory/90">
                  Prefer to learn alongside other couples? I present Imago couples workshops. Dates are announced
                  here when they’re scheduled.
                </p>
                <div className="mt-5">
                  <Button to={ROUTES.workshops} variant="gold">See workshops</Button>
                </div>
              </Reveal>
            </div>
          </section>
        ),
        cta: { label: "Fees & insurance", to: ROUTES.fees },
      }}
    />
  );
}

// ===========================================================================
// SINGLES (Imago Singles)
// ===========================================================================
export function SinglesPage() {
  return (
    <ServicePage
      cfg={{
        seo: [
          "Singles & Dating Therapy in Fresno, CA | Imago Singles | Carol A. Anderson, MS, LMFT",
          "Imago singles therapy and workshops in Fresno, CA. Understand your relationship patterns and build the lasting love you want, with a Certified Imago Therapist and Singles Workshop Presenter.",
        ],
        hero: {
          eyebrow: "Singles & dating · Imago Singles",
          title: "Find love that *lasts*, starting with you",
          intro: (
            <>
              <p>
                If you’re longing for a lasting relationship, the most hopeful place to begin is understanding
                yourself: what you’re really looking for, and how to keep the love you find.
              </p>
            </>
          ),
          photo: photos.journal,
        },
        story: {
          eyebrow: "Keeping the love you find",
          title: "Dating with *clarity* and kindness",
          photo: photos.coupleWalking,
          paragraphs: [
            "Imago for singles is based on the book “Keeping the Love You Find.” It helps you notice your own patterns in love, so that you can choose well, and grow in the relationships you choose.",
            "I’m a Certified Imago Therapist and a Singles Workshop Presenter. My approach is gentle and practical: no judgment, no pressure, just thoughtful reflection and tools you can use right away.",
          ],
        },
        points: {
          eyebrow: "What we might explore",
          title: "A clearer path to *lasting* love",
          items: [
            { title: "Your patterns", text: "Understand what keeps showing up in your relationships, and where it comes from." },
            { title: "What you truly want", text: "Get clear about what matters most to you in a partner and in a relationship." },
            { title: "Healthy connection", text: "Learn tools for communicating honestly and kindly as a relationship begins to deepen." },
          ],
        },
        extras: (
          <section className="bg-ivory py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
              <SectionHeading eyebrow="Learn alongside others" title="Singles *workshops*" align="center" from="left" />
              <Reveal delay={0.1}>
                <p className="mx-auto mt-5 max-w-2xl text-lg">
                  I present Imago workshops for singles. If you’d like to hear when the next one is scheduled,
                  you’re welcome to express interest. There’s no commitment.
                </p>
                <div className="mt-7">
                  <Button to={ROUTES.workshops}>Express interest in a workshop</Button>
                </div>
              </Reveal>
            </div>
          </section>
        ),
        cta: { label: "Explore workshops", to: ROUTES.workshops },
      }}
    />
  );
}

// ===========================================================================
// INDIVIDUAL + EMDR
// ===========================================================================
export function IndividualPage() {
  return (
    <ServicePage
      cfg={{
        seo: [
          "Individual Therapy & EMDR in Fresno, CA | Trauma, Anxiety, Grief | Carol A. Anderson, MS, LMFT",
          "Individual therapy and EMDR in Fresno, CA for anxiety, grief, trauma and PTSD, self-esteem and stress. Adults and elders (65+) welcome. In person or virtual. Free 15-minute consultation.",
        ],
        hero: {
          eyebrow: "Individual therapy · EMDR",
          title: "A steady place to *heal*, grow and feel like yourself",
          intro: (
            <>
              <p>
                Life’s hardest seasons can leave us tired, anxious or unsure of ourselves. Here you’ll find an
                unhurried, compassionate place where your story is heard, at your own pace.
              </p>
            </>
          ),
          photo: photos.officeLoveseat,
        },
        story: {
          eyebrow: "EMDR & talk therapy",
          title: "Gentle support for what feels *heavy*",
          photo: photos.officeWindows,
          paragraphs: [
            "I work with adults and elders (65+) on anxiety, grief, trauma and PTSD, self-esteem, stress, codependency and women’s issues, always at a pace that feels safe for you.",
            "I completed EMDR Institute training (Level 2) in 1992. EMDR can help painful memories feel less overwhelming. If it feels like a good fit, we’ll talk about it together first. It’s always your choice.",
            "Sessions are mostly in person at my Fresno office, with virtual sessions available if needed.",
          ],
        },
        points: {
          eyebrow: "What therapy can feel like",
          title: "Your pace. Your *story*. Your tools.",
          items: [
            { title: "Be truly heard", text: "A calm space where nothing is rushed and nothing you say is too small." },
            { title: "Understand the roadblocks", text: "Gently make sense of what’s been weighing on you, and where it began." },
            { title: "Gain practical tools", text: "Learn simple ways to steady yourself on hard days." },
            { title: "Grow", text: "Let the hardest season become a catalyst for growth and for a more peaceful life." },
          ],
        },
        extras: (
          <section className="bg-ivory py-16 sm:py-20">
            <div className="mx-auto max-w-5xl px-5 sm:px-8">
              <SectionHeading eyebrow="Areas of focus" title="What I *help* with" from="right" />
              <ul className="mt-8 flex flex-wrap gap-3">
                {SPECIALTIES.map((s, i) => (
                  <Reveal as="li" key={s} delay={i * 0.04} y={14}>
                    <span className="inline-flex min-h-[44px] items-center rounded-full border border-gold/40 bg-cream px-5 text-[0.98rem] font-medium text-evergreen">
                      {s}
                    </span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.1} className="mt-8">
                <p className="text-lg">
                  Individual sessions are <strong>$100</strong> per session (90-minute sessions are optional). Insurance
                  through Headway and a sliding scale are available.{" "}
                  <a className="font-semibold text-evergreen underline" href={SITE.phoneHref}>
                    Call {SITE.phone}
                  </a>{" "}
                  with any questions.
                </p>
              </Reveal>
            </div>
          </section>
        ),
        cta: { label: "Fees & insurance", to: ROUTES.fees },
      }}
    />
  );
}
