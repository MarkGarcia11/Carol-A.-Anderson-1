import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Photo } from "../ui/Photo";
import { PauseIcon, PlayIcon } from "../ui/Icons";
import { photos } from "../../data/site";

/**
 * Cloudinary cloud-hosted player embedded as a quiet hero background.
 * Params use Cloudinary's embed syntax: player[autoplay|muted|loop|controls].
 * Change CLOUD / PUBLIC_ID to swap the video.
 */
const CLOUD = "du3lmc1dx";
const PUBLIC_ID = "17759816-hd_1920_1080_24fps_uf0qqu";
const VIDEO_SRC =
  `https://player.cloudinary.com/embed/?cloud_name=${CLOUD}&public_id=${PUBLIC_ID}` +
  `&player%5Bautoplay%5D=true&player%5Bmuted%5D=true&player%5Bloop%5D=true` +
  `&player%5Bcontrols%5D=false&player%5BshowLogo%5D=false`;

export function HeroVideo() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  // Respect data-saver + reduced motion; otherwise mount the iframe after first paint
  // so the video never competes with the headline for bandwidth.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) {
      setPaused(true);
      return;
    }
    const t = window.setTimeout(() => setMount(true), 900);
    return () => window.clearTimeout(t);
  }, [reduce]);

  const playing = mount && !paused;

  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-cream" style={{ containerType: "size" }} aria-hidden="true">
        {/* Poster stays visible until the video has loaded (and when paused) */}
        <motion.div
          className="absolute inset-0 animate-breathe-slow"
          animate={{ opacity: playing && ready ? 0 : 1 }}
          transition={{ duration: 1.4 }}
        >
          <Photo photo={photos.heroPoster} priority />
        </motion.div>
        {playing && (
          <iframe
            title="Calm background video"
            src={VIDEO_SRC}
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
            tabIndex={-1}
            onLoad={() => window.setTimeout(() => setReady(true), 1400)}
            className="pointer-events-none absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
            // "cover" sizing for a 16:9 iframe at any aspect ratio (desktop or phone)
            style={{ width: "max(100cqw, 177.78cqh)", height: "max(100cqh, 56.25cqw)" }}
          />
        )}
      </div>
      {mount || paused ? (
        <button
          type="button"
          onClick={() => {
            setPaused((p) => !p);
            setReady(false);
          }}
          className="absolute bottom-24 right-4 z-30 inline-flex min-h-[48px] items-center gap-2 rounded-full border border-evergreen/20 bg-ivory/85 px-4 text-[0.85rem] font-semibold text-evergreen backdrop-blur transition-shadow hover:shadow-bloom sm:bottom-6 sm:right-6 lg:bottom-8"
          aria-pressed={paused}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={paused ? "p" : "q"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              {paused ? <PlayIcon width={18} height={18} /> : <PauseIcon width={18} height={18} />}
              {paused ? "Play background video" : "Pause background video"}
            </motion.span>
          </AnimatePresence>
        </button>
      ) : null}
    </>
  );
}
