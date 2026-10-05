import { useEffect } from "react";

/**
 * Sets a unique <title> + meta description (+ Open Graph) per page.
 * Keep titles under ~60 chars and descriptions under ~160 for search results.
 */
export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const set = (selector: string, attr: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    set('meta[name="description"]', "name", "description", description);
    set('meta[property="og:title"]', "property", "og:title", title);
    set('meta[property="og:description"]', "property", "og:description", description);
  }, [title, description]);
}
