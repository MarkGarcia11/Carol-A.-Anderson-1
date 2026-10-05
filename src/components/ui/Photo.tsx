import { useState } from "react";
import { motion } from "framer-motion";
import type { PhotoAsset } from "../../data/site";
import { cn } from "../../utils/cn";

/**
 * <Photo>: lazy-loaded image with automatic fallback.
 * Tries Carol's file in /public/images first; if it isn't there yet, quietly
 * swaps to a royalty-free stand-in so the layout never breaks.
 */
export function Photo({
  photo,
  className,
  priority = false,
  sizes,
}: {
  photo: PhotoAsset;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [src, setSrc] = useState(photo.src);
  return (
    <img
      src={src}
      alt={photo.alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      onError={() => src !== photo.fallback && setSrc(photo.fallback)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

/**
 * <ArchImage>: image revealed through a soft curtain wipe, shaped as an arch or
 * a rounded rectangle, with a gentle hover zoom (4%). Only transform + opacity animate.
 */
export function ArchImage({
  photo,
  shape = "arch",
  className,
  imgClassName,
  priority,
  delay = 0,
  zoom = true,
  label,
}: {
  photo: PhotoAsset;
  shape?: "arch" | "round" | "soft";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  delay?: number;
  zoom?: boolean;
  /** Visible placeholder label, e.g. "REPLACE WITH CAROL'S REAL PHOTO" */
  label?: string;
}) {
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-cream shadow-soft",
        shape === "arch" && "arch",
        shape === "round" && "rounded-[2rem]",
        shape === "soft" && "rounded-[1.5rem]",
        className
      )}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.6, delay, ease }}
      >
        <div
          className={cn(
            "h-full w-full transition-transform duration-[1200ms] ease-soft",
            zoom && "group-hover:scale-[1.04]"
          )}
        >
          <Photo photo={photo} priority={priority} className={imgClassName} />
        </div>
      </motion.div>
      {/* curtain wipe */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-10 origin-top bg-cream"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, delay, ease }}
      />
      {label && (
        <span className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-evergreen/90 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ivory backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
