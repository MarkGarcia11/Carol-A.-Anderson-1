import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { MapPinIcon, MailIcon, PhoneIcon, ShieldIcon } from "./ui/Icons";
import { ROUTES, SITE } from "../data/site";
import { submitForm } from "../lib/forms";
import { Reveal } from "./ui/Motion";

/** "Verified by Psychology Today" badge (text badge, no logo files copied). */
export function PTBadge({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={SITE.psychologyToday}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "group inline-flex min-h-[48px] items-center gap-2.5 rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-shadow duration-500 hover:shadow-[0_10px_34px_-8px_rgba(201,162,75,0.7)] " +
        (dark
          ? "border-honey/50 bg-evergreen-deep/60 text-ivory"
          : "border-gold/50 bg-ivory/80 text-evergreen backdrop-blur")
      }
      aria-label="Verified by Psychology Today (opens Carol's profile in a new tab)"
    >
      <ShieldIcon width={20} height={20} className={dark ? "text-honey" : "text-gold-ink"} />
      <span className="leading-tight">
        Verified by <span className="font-bold">Psychology Today</span>
      </span>
    </a>
  );
}

const Col = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="!font-sans text-[0.75rem] font-bold uppercase tracking-[0.22em] !text-honey">{title}</h3>
    <div className="mt-4">{children}</div>
  </div>
);

const linkCls =
  "inline-flex min-h-[40px] items-center text-[0.98rem] text-ivory/90 underline-offset-4 transition-colors hover:text-honey hover:underline";

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  const onSub = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    setErr("");
    setState("sending");
    try {
      await submitForm("Gentle reminders signup", { email });
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <footer className="on-dark relative bg-evergreen pb-28 pt-20 text-ivory lg:pb-10" aria-label="Site footer">
      {/* soft gold top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1 */}
          <Reveal className="lg:col-span-3">
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-[1rem] text-ivory/90">
              A calm, hopeful place for couples and individuals to find clarity, connection and growth.
            </p>
            <div className="mt-5">
              <PTBadge dark />
            </div>
          </Reveal>

          {/* Column 2 */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <Col title="Services">
              <ul>
                <li><Link className={linkCls} to={ROUTES.couples}>Couples Therapy</Link></li>
                <li><Link className={linkCls} to={ROUTES.singles}>Singles &amp; Dating</Link></li>
                <li><Link className={linkCls} to={ROUTES.individual}>Individuals &amp; EMDR</Link></li>
                <li><Link className={linkCls} to={ROUTES.workshops}>Workshops</Link></li>
              </ul>
            </Col>
          </Reveal>

          {/* Column 3 */}
          <Reveal delay={0.16} className="lg:col-span-2">
            <Col title="Quick links">
              <ul>
                <li><Link className={linkCls} to={ROUTES.about}>About Carol</Link></li>
                <li><Link className={linkCls} to={ROUTES.fees}>Fees &amp; Insurance</Link></li>
                <li><Link className={linkCls} to={ROUTES.faq}>FAQ</Link></li>
                <li><Link className={linkCls} to={ROUTES.reflections}>Reflections</Link></li>
                <li><Link className={linkCls} to={ROUTES.contact}>Contact</Link></li>
              </ul>
            </Col>
          </Reveal>

          {/* Column 4 */}
          <Reveal delay={0.24} className="lg:col-span-3">
            <Col title="Visit & contact">
              <address className="space-y-3 text-[0.98rem] not-italic text-ivory/90">
                <p className="flex gap-3">
                  <MapPinIcon className="mt-1 shrink-0 text-honey" width={20} height={20} />
                  <span>
                    {SITE.address.line1}
                    <br />
                    {SITE.address.city}
                    <br />
                    <span className="text-sage">{SITE.address.neighborhood}</span>
                  </span>
                </p>
                <p className="flex gap-3">
                  <PhoneIcon className="mt-1 shrink-0 text-honey" width={20} height={20} />
                  <a className="font-semibold text-ivory underline-offset-4 hover:text-honey hover:underline" href={SITE.phoneHref}>
                    {SITE.phone}
                  </a>
                </p>
                <p className="flex gap-3">
                  <MailIcon className="mt-1 shrink-0 text-honey" width={20} height={20} />
                  {SITE.email ? (
                    <a className="underline-offset-4 hover:text-honey hover:underline" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  ) : (
                    <span className="text-ivory/75">[Email address to be added]</span>
                  )}
                </p>
                <p className="pl-8 text-ivory/75">Office hours: [to be added by Carol]</p>
                <a
                  className="ml-8 inline-flex min-h-[44px] items-center font-semibold text-honey underline underline-offset-4"
                  href={SITE.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open map &amp; directions
                </a>
              </address>
            </Col>
          </Reveal>

          {/* Column 5 */}
          <Reveal delay={0.32} className="sm:col-span-2 lg:col-span-2">
            <Col title="Gentle reminders">
              <p className="text-[0.95rem] text-ivory/90">
                An occasional, kind note of encouragement. (Optional.)
              </p>
              {state === "done" ? (
                <p role="status" className="mt-4 rounded-2xl bg-evergreen-deep/60 p-4 text-[0.95rem] text-ivory">
                  Thank you. A gentle note will find you soon.
                </p>
              ) : (
                <form onSubmit={onSub} className="mt-4" noValidate>
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!err}
                    className="field !border-ivory/30 !bg-evergreen-deep/60 !text-ivory placeholder:text-ivory/60"
                  />
                  {(err || state === "error") && (
                    <p role="alert" className="mt-2 text-sm text-clay">
                      {err || "Something went wrong. Please try again."}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="mt-3 min-h-[48px] w-full rounded-full bg-gold px-5 text-[0.95rem] font-semibold text-evergreen-deep transition-colors hover:bg-honey disabled:opacity-60"
                  >
                    {state === "sending" ? "Sending…" : "Sign me up"}
                  </button>
                </form>
              )}
              {/* Social placeholders: add real links when Carol has profiles */}
              <p className="mt-5 text-sm text-ivory/70">Social links coming soon.</p>
            </Col>
          </Reveal>
        </div>

        {/* Crisis + disclaimer */}
        <div className="mt-14 rounded-3xl border border-honey/30 bg-evergreen-deep/50 p-6 text-[0.95rem] text-ivory/95">
          <p className="font-semibold text-honey">
            If you are in crisis or need immediate help, call or text 988 or dial 911.
          </p>
          <p className="mt-2 text-ivory/85">
            This website does not provide emergency services, and visiting it or sending a message does not create a
            therapeutic relationship. A therapeutic relationship begins only when services begin.{" "}
            <Link to={ROUTES.terms} className="underline underline-offset-4 hover:text-honey">
              Read the full disclaimer
            </Link>
            .
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-sm text-ivory/80 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.fullName}. Licensed by the State of California, {SITE.license}.
          </p>
          <ul className="flex flex-wrap gap-x-6">
            <li><Link className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-honey hover:underline" to={ROUTES.privacy}>Privacy Policy</Link></li>
            <li><Link className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-honey hover:underline" to={ROUTES.terms}>Terms &amp; Disclaimer</Link></li>
            <li><span className="inline-flex min-h-[44px] items-center font-semibold text-honey">Crisis: call or text 988</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
