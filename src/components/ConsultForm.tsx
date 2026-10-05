import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/Button";
import { submitForm } from "../lib/forms";
import { SITE } from "../data/site";
import { cn } from "../utils/cn";

type Mode = "full" | "compact" | "workshop";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Values {
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  who: string;
  time: string;
  message: string;
  website: string; // honeypot, must stay empty
}

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  contactMethod: "Phone call",
  who: "",
  time: "",
  message: "",
  website: "",
};

function Field({
  label,
  error,
  optional,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  htmlFor: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.95rem] font-semibold text-evergreen">
        {label}
        {optional && <span className="ml-1.5 text-sm font-normal text-charcoal/75">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-err`} role="alert" className="mt-1.5 text-sm font-medium text-[#8f2424]">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Consultation / interest form.
 *  - validation with friendly messages (aria-invalid + role="alert")
 *  - spam protection: honeypot + time trap (see lib/forms.ts)
 *  - delivery through VITE_FORM_ENDPOINT (see README)
 *  - warm confirmation animation on success
 */
export function ConsultForm({ mode = "full", className }: { mode?: Mode; className?: string }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const openedAt = useRef(Date.now());

  const set = (k: keyof Values) => (e: { target: { value: string } }) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const er: typeof errors = {};
    if (!v.name.trim()) er.name = "Please tell me your name so I know who to greet.";
    if (!EMAIL_RE.test(v.email.trim())) er.email = "Please enter an email address like name@example.com.";
    if (v.phone && v.phone.replace(/\D/g, "").length < 10) er.phone = "Please enter a 10-digit phone number, or leave it blank.";
    if (mode !== "workshop" && !v.who) er.who = "Please choose couple or individual.";
    if (mode === "workshop" && !v.who) er.who = "Please choose which workshop interests you.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    // Honeypot or too-fast submit: pretend success, send nothing.
    if (v.website || Date.now() - openedAt.current < 3000) {
      setStatus("done");
      return;
    }
    setStatus("sending");
    try {
      const { website: _hp, ...payload } = v;
      void _hp;
      await submitForm(mode === "workshop" ? "Workshop interest" : "Free consultation request", payload);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const first = v.name.trim().split(" ")[0];

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col items-center px-4 py-10 text-center"
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                stroke="#C9A24B"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: EASE }}
              />
              <motion.path
                d="M38 62l15 15 30-34"
                stroke="#24403A"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
              />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.circle
                  key={i}
                  cx={60 + Math.cos((i / 6) * Math.PI * 2) * 58}
                  cy={60 + Math.sin((i / 6) * Math.PI * 2) * 58}
                  r="3"
                  fill="#E9B949"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
                  transition={{ duration: 1.6, delay: 1.5 + i * 0.1, ease: EASE }}
                />
              ))}
            </svg>
            <h3 className="mt-5 text-3xl">
              Thank you{first ? `, ${first}` : ""}. <span className="accent">You took a brave first step.</span>
            </h3>
            <p className="mt-3 max-w-md text-charcoal">
              Your message is on its way to me. I’ll reach out as soon as I can. If you’d rather talk now, you’re
              welcome to call <a className="font-semibold text-evergreen underline" href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid gap-5"
            aria-label={mode === "workshop" ? "Workshop interest form" : "Free consultation request form"}
          >
            {/* Honeypot: hidden from people and assistive tech, bots fill it in */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor={id("website")}>Leave this field empty</label>
              <input
                id={id("website")}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={v.website}
                onChange={set("website")}
              />
            </div>

            <div className={cn("grid gap-5", mode !== "compact" && "sm:grid-cols-2")}>
              <Field label="Your name" htmlFor={id("name")} error={errors.name}>
                <input
                  id={id("name")}
                  name="name"
                  autoComplete="name"
                  className="field"
                  value={v.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${id("name")}-err` : undefined}
                />
              </Field>
              <Field label="Email" htmlFor={id("email")} error={errors.email}>
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="field"
                  value={v.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${id("email")}-err` : undefined}
                />
              </Field>
            </div>

            <div className={cn("grid gap-5", mode === "full" && "sm:grid-cols-2")}>
              {mode !== "workshop" && (
                <Field label="Phone" htmlFor={id("phone")} error={errors.phone} optional>
                  <input
                    id={id("phone")}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="field"
                    value={v.phone}
                    onChange={set("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? `${id("phone")}-err` : undefined}
                  />
                </Field>
              )}
              {mode === "full" && (
                <Field label="Best way to reach you" htmlFor={id("method")}>
                  <select id={id("method")} className="field" value={v.contactMethod} onChange={set("contactMethod")}>
                    <option>Phone call</option>
                    <option>Email</option>
                    <option>Text message</option>
                  </select>
                </Field>
              )}
            </div>

            <fieldset>
              <legend className="mb-2 text-[0.95rem] font-semibold text-evergreen">
                {mode === "workshop" ? "Which are you curious about?" : "Is this for a couple or an individual?"}
              </legend>
              <div className="flex flex-wrap gap-3" role="radiogroup">
                {(mode === "workshop"
                  ? ["Couples workshop", "Singles workshop", "Either / not sure"]
                  : ["Couple", "Individual", "Not sure yet"]
                ).map((opt) => (
                  <label
                    key={opt}
                    className={cn(
                      "flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded-full border-[1.5px] px-5 transition-colors duration-300",
                      v.who === opt
                        ? "border-evergreen bg-evergreen text-ivory"
                        : "border-evergreen/30 bg-white/70 text-evergreen hover:border-evergreen/60",
                      "focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-evergreen"
                    )}
                  >
                    <input
                      type="radio"
                      name="who"
                      value={opt}
                      checked={v.who === opt}
                      onChange={set("who")}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full border-2",
                        v.who === opt ? "border-honey" : "border-evergreen/50"
                      )}
                    >
                      {v.who === opt && <span className="h-2 w-2 rounded-full bg-honey" />}
                    </span>
                    <span className="text-[0.95rem] font-medium">{opt}</span>
                  </label>
                ))}
              </div>
              {errors.who && (
                <p role="alert" className="mt-1.5 text-sm font-medium text-[#8f2424]">
                  {errors.who}
                </p>
              )}
            </fieldset>

            {mode === "full" && (
              <Field label="Preferred time to connect" htmlFor={id("time")} optional>
                <select id={id("time")} className="field" value={v.time} onChange={set("time")}>
                  <option value="">No preference</option>
                  <option>Weekday mornings</option>
                  <option>Weekday afternoons</option>
                  <option>Weekday evenings</option>
                  <option>Flexible</option>
                </select>
              </Field>
            )}

            {mode !== "compact" && (
              <Field
                label={mode === "workshop" ? "Anything you’d like me to know?" : "A few words about what brings you here"}
                htmlFor={id("msg")}
                optional
              >
                <textarea
                  id={id("msg")}
                  name="message"
                  rows={4}
                  className="field resize-y"
                  value={v.message}
                  onChange={set("message")}
                />
              </Field>
            )}

            <p className="rounded-2xl bg-cream px-4 py-3 text-[0.92rem] text-charcoal">
              <strong className="font-semibold text-evergreen">Please don’t share sensitive medical details in this form.</strong>{" "}
              We can talk privately on our call.
            </p>

            {status === "error" && (
              <p role="alert" className="text-sm font-medium text-[#8f2424]">
                I’m sorry, something went wrong sending that. Please try again, or call me at {SITE.phone}.
              </p>
            )}

            <div>
              <Button type="submit" breathe disabled={status === "sending"} full={mode === "compact"}>
                {status === "sending"
                  ? "Sending…"
                  : mode === "workshop"
                    ? "Express interest"
                    : "Request my free consultation"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
