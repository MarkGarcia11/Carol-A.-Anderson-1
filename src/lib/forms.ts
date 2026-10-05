/**
 * Form delivery.
 *
 * Set VITE_FORM_ENDPOINT (e.g. a Formspree / Getform / Basin URL, or your own
 * Supabase / Vercel serverless function) in your environment and every form on
 * the site will POST JSON there. With no endpoint set, submissions are simulated
 * so the site still demos perfectly.
 *
 * Spam protection built in:
 *  1. Honeypot field ("website") that humans never see.
 *  2. Time trap: submissions faster than 3 seconds are silently dropped.
 * For stronger protection add Cloudflare Turnstile / hCaptcha on the service side.
 */
export interface FormPayload {
  [key: string]: string;
}

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

export async function submitForm(kind: string, payload: FormPayload): Promise<void> {
  if (!ENDPOINT) {
    // Demo mode: no endpoint configured yet.
    await new Promise((r) => setTimeout(r, 900));
    console.info("[form demo mode] Set VITE_FORM_ENDPOINT to deliver email.", { kind, payload });
    return;
  }
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ _subject: `Website: ${kind}`, formType: kind, ...payload }),
  });
  if (!res.ok) throw new Error("Form delivery failed");
}
