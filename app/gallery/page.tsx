"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY_SHOTS } from "@/lib/menu";
import Reveal from "@/components/Reveal";
import { Script } from "@/components/SectionHead";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const step = (dir: 1 | -1) => {
    setLightbox((cur) =>
      cur === null ? cur : (cur + dir + GALLERY_SHOTS.length) % GALLERY_SHOTS.length,
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14">
      <Reveal>
        <p className="text-[11px] font-bold tracking-[0.28em] text-ketchup uppercase text-center">Food Gallery</p>
        <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-center">
          Feast Your <Script>Eyes</Script>
        </h1>
        <p className="mt-3 text-center text-sm text-ink-soft/70 max-w-lg mx-auto">
          A little preview of the happiness waiting for you. Warning: extreme cravings ahead.
        </p>
      </Reveal>

      <div className="mt-10 columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        {GALLERY_SHOTS.map((shot, i) => (
          <Reveal key={shot.label + i} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
            <button
              onClick={() => setLightbox(i)}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ketchup"
            >
              <img
                src={shot.src}
                alt={shot.label}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  shot.tall ? "aspect-[3/4]" : "aspect-square"
                }`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 transition-all group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <span className="font-script text-2xl text-white">{shot.label}</span>
                <Expand size={18} className="text-white" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-ketchup transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>
            <button
              aria-label="Previous photo"
              className="absolute left-3 md:left-8 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-ketchup transition-colors"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
            >
              <ChevronLeft size={22} />
            </button>
            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="max-h-[85vh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_SHOTS[lightbox].src}
                alt={GALLERY_SHOTS[lightbox].label}
                className="max-h-[78vh] w-auto rounded-[1.5rem] object-contain shadow-2xl"
              />
              <figcaption className="mt-3 text-center font-script text-3xl text-mustard">
                {GALLERY_SHOTS[lightbox].label}
              </figcaption>
            </motion.figure>
            <button
              aria-label="Next photo"
              className="absolute right-3 md:right-8 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-ketchup transition-colors"
              onClick={(e) => { e.stopPropagation(); step(1); }}
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
