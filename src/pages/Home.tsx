import { useSeo } from "../lib/seo";
import { Approach, Empathy, Hero, MeetCarol, OfficeGallery, Services } from "../components/sections/HomeSections";
import { FirstStepBanner, ReassuranceStrip, ReviewsSection } from "../components/sections/Shared";

/**
 * HOME: Hero → Empathy → Three services → Approach (scrollytelling) → Meet Carol →
 * Office gallery → (hidden reviews) → First step → Practical reassurance.
 */
export default function Home() {
  useSeo(
    "Carol A. Anderson, MS, LMFT | Couples Therapy, Imago & EMDR in Fresno, CA",
    "Fresno marriage & family therapist with 40+ years of experience. Imago couples therapy, singles work, EMDR and individual therapy, in person and virtual. Book a free 15-minute consultation."
  );
  return (
    <>
      <Hero />
      <Empathy />
      <Services />
      <Approach />
      <MeetCarol />
      <OfficeGallery />
      <ReviewsSection />
      <FirstStepBanner />
      <ReassuranceStrip />
    </>
  );
}
