import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { Blobs, Reveal } from "../components/ui/Motion";
import { PageHero } from "../components/sections/Shared";
import { ROUTES, SITE } from "../data/site";

/**
 * Legal pages. These are sensible plain-language starting points and should be
 * reviewed by Carol (and, ideally, an attorney) before launch.
 */
function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-ivory py-16 sm:py-24">
      <Blobs tone="calm" />
      <div className="relative mx-auto max-w-3xl space-y-10 px-5 sm:px-8 [&_h2]:mb-3 [&_h2]:text-3xl [&_li]:ml-5 [&_li]:list-disc [&_li]:py-1 [&_p+p]:mt-3">
        {children}
      </div>
    </section>
  );
}

export function Privacy() {
  useSeo(
    "Privacy Policy | Carol A. Anderson, MS, LMFT",
    "How Carol A. Anderson, MS, LMFT handles the information you share through this website, including forms, cookies and third-party services."
  );
  return (
    <>
      <PageHero eyebrow="Privacy" title="Your *privacy* matters" intro={<p>Last updated: [date to be added]. A plain-language summary of how this website handles your information.</p>} />
      <LegalLayout>
        <Reveal><h2>What I collect</h2>
          <p>If you use the consultation, workshop or newsletter forms, I receive the details you type: your name, email, phone number, preferred contact method and any message. I use them only to reply to you and to schedule or follow up.</p></Reveal>
        <Reveal><h2>Please keep it general</h2>
          <p><strong>Please don’t share sensitive medical details in the website forms.</strong> Forms and email are not a secure way to share clinical information. We can talk privately on our call.</p></Reveal>
        <Reveal><h2>Cookies and storage</h2>
          <p>This site uses only essential browser storage, for example to remember that you’ve seen the cookie notice. It does not use advertising cookies.</p></Reveal>
        <Reveal><h2>Third-party services</h2>
          <ul>
            <li>Google Maps (the map on the Contact page).</li>
            <li>Cloudinary (the background video on the home page).</li>
            <li>Google Fonts (the typefaces).</li>
            <li>A form-delivery service that sends your message to me by email.</li>
            <li>Links to Psychology Today and Headway, which have their own privacy policies.</li>
          </ul></Reveal>
        <Reveal><h2>Your choices</h2>
          <p>You can ask me to delete anything you’ve sent through this site. Call <a className="font-semibold underline" href={SITE.phoneHref}>{SITE.phone}</a>.</p></Reveal>
        <Reveal><h2>Questions</h2>
          <p>Please reach out through the <Link className="font-semibold underline" to={ROUTES.contact}>contact page</Link>.</p></Reveal>
      </LegalLayout>
    </>
  );
}

export function Terms() {
  useSeo(
    "Terms & Disclaimer | Carol A. Anderson, MS, LMFT",
    "Website terms and disclaimer for Carol A. Anderson, MS, LMFT: no emergency services, no therapeutic relationship until services begin, and crisis resources."
  );
  return (
    <>
      <PageHero eyebrow="Terms & disclaimer" title="Important *information*" intro={<p>Last updated: [date to be added]. Please read this short disclaimer about using this website.</p>} />
      <LegalLayout>
        <Reveal><h2>In a crisis</h2>
          <p className="rounded-2xl bg-cream p-5 font-semibold text-evergreen">If you are in crisis or need immediate help, call or text 988 or dial 911.</p></Reveal>
        <Reveal><h2>No emergency services</h2>
          <p>This website and its forms do not provide emergency services. Messages are not monitored around the clock.</p></Reveal>
        <Reveal><h2>No therapeutic relationship yet</h2>
          <p>Visiting this site, sending a message, or requesting a free consultation does not create a therapeutic relationship. A therapeutic relationship begins only when services begin.</p></Reveal>
        <Reveal><h2>Information, not advice</h2>
          <p>Content on this site is for general information and is not a substitute for professional diagnosis, treatment or advice.</p></Reveal>
        <Reveal><h2>Licensure</h2>
          <p>{SITE.fullName} is licensed by the State of California ({SITE.license}).</p></Reveal>
        <Reveal><h2>External links</h2>
          <p>Links to other sites (such as Psychology Today and Headway) are provided for your convenience. I’m not responsible for their content.</p></Reveal>
        <Reveal><h2>Photos</h2>
          <p>Some images on this site are royalty-free stock photographs and are not pictures of clients.</p></Reveal>
      </LegalLayout>
    </>
  );
}
