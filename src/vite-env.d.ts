/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Form delivery endpoint (e.g. a Formspree URL). Optional. */
  readonly VITE_FORM_ENDPOINT?: string;
  /** Set to "browser" to use clean URLs (needs the included vercel.json rewrite). */
  readonly VITE_ROUTER?: string;
  /** Optional Calendly (or similar) scheduling URL for the Contact page. */
  readonly VITE_CALENDLY_URL?: string;
  /** Public contact email shown on the site and footer. Optional. */
  readonly VITE_CONTACT_EMAIL?: string;
}
