"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredProperties, formatPrice } from "@/data/properties";

gsap.registerPlugin(ScrollTrigger);

const featured = featuredProperties[0];

export default function Hero() {
  const imgRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(imgRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative h-screen min-h-[700px] max-h-[1080px] overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={featured.images[0]}
          alt={`${featured.name} — ${featured.location.area}`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14110E]/85 via-[#14110E]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center">
          <div className="mx-auto max-w-[1320px] w-full px-6 md:px-10 lg:px-16 pt-28 md:pt-32">
            <div className="max-w-[680px]">
              {/* Eyebrow */}
              <motion.span
                className="label text-[var(--gold)] mb-6 flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="block h-px w-8 bg-[var(--gold)]" />
                Exceptional Residences
              </motion.span>

              {/* Headline */}
              <motion.h1
                className="font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[0.95] tracking-[-0.02em] text-[var(--paper)] mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Living beyond
                <br />
                the expected
              </motion.h1>

              {/* Sub */}
              <motion.p
                className="text-[var(--body-dark)] text-base md:text-lg leading-relaxed max-w-[440px] mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
              >
                Curated residences across the continent's most coveted
                addresses — each one chosen for architecture that endures.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <Link
                  href="/properties"
                  className="label border border-[var(--paper)]/30 px-7 py-3.5 text-[var(--paper)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300"
                >
                  Explore Properties
                </Link>
                <Link
                  href="/#contact"
                  className="label text-[var(--body-dark)] hover:text-[var(--paper)] transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="block h-px w-6 bg-current" />
                  Book a Viewing
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Featured property card — bottom right */}
        <motion.div
          className="mx-auto max-w-[1320px] w-full px-6 md:px-10 lg:px-16 pb-10 md:pb-14 flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <Link
            href={`/properties/${featured.slug}`}
            className="group flex items-stretch gap-0 border border-[var(--paper)]/15 hover:border-[var(--gold)]/40 transition-all duration-500 max-w-sm w-full"
            aria-label={`View ${featured.name}`}
          >
            {/* Gold accent bar */}
            <span className="block w-px bg-[var(--gold)] opacity-60 group-hover:opacity-100 transition-opacity duration-500 shrink-0" />

            <div className="flex items-center gap-5 px-5 py-4 bg-[var(--ink)]/60 backdrop-blur-sm w-full">
              {/* Thumbnail */}
              <div className="relative w-14 h-14 shrink-0 overflow-hidden">
                <Image
                  src={featured.images[1]}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="min-w-0">
                <p className="label text-[var(--gold)] mb-1">Featured Residence</p>
                <p className="font-display text-base font-light text-[var(--paper)] truncate">
                  {featured.name}
                </p>
                <p className="text-xs text-[var(--body-dark)] mt-0.5">
                  {featured.location.area}, {featured.location.city} &mdash;{" "}
                  {formatPrice(featured.price)}
                </p>
              </div>

              <svg
                className="shrink-0 ml-auto text-[var(--body-dark)] group-hover:text-[var(--gold)] group-hover:translate-x-1 transition-all duration-300"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden
      >
        <span className="label text-[var(--body-dark)] text-[0.6rem]">Scroll</span>
        <motion.span
          className="block w-px h-10 bg-[var(--body-dark)]/40"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
