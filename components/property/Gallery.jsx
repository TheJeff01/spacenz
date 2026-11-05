"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <>
      {/* Main + thumbs */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_140px] gap-3">
        {/* Hero image */}
        <div
          className="relative overflow-hidden cursor-zoom-in"
          style={{ aspectRatio: "16/10" }}
          onClick={() => setLightbox(true)}
          role="button"
          tabIndex={0}
          aria-label="Open gallery"
          onKeyDown={(e) => e.key === "Enter" && setLightbox(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={images[active]}
                alt={`${name} — image ${active + 1}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#14110E]/60 hover:bg-[#14110E]/90 text-white transition-colors duration-200"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-[#14110E]/60 hover:bg-[#14110E]/90 text-white transition-colors duration-200"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>

          {/* Counter */}
          <span className="absolute bottom-4 right-4 label text-white/70 text-[0.6rem] bg-[#14110E]/60 px-2 py-1">
            {active + 1} / {images.length}
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`relative shrink-0 overflow-hidden transition-all duration-200 ${
                active === i
                  ? "ring-1 ring-[var(--gold)] opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ width: "100px", aspectRatio: "1", minWidth: "80px" }}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="100px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#14110E]/95 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-6 right-6 label text-white/60 hover:text-white transition-colors"
              onClick={() => setLightbox(false)}
              aria-label="Close"
            >
              ✕ Close
            </button>
            <div
              className="relative w-[90vw] max-w-5xl"
              style={{ aspectRatio: "16/10" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={`${name} — ${active + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:border-white/60 transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:border-white/60 transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
