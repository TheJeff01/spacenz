"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden"
      id="about"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-start">

          {/* Left: editorial statement */}
          <div className="lg:col-span-6 lg:pr-16 lg:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <SectionLabel className="mb-10">Our philosophy</SectionLabel>
            </motion.div>

            <motion.h2
              className="font-display text-[clamp(2.25rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-[var(--fg)] mb-10"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Property is not
              <br />
              an asset. It is a
              <br />
              <em className="not-italic text-[var(--accent)]">way of living.</em>
            </motion.h2>

            <motion.div
              className="space-y-6 max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <p className="text-[var(--muted)] leading-relaxed text-[0.9375rem]">
                We work with a small number of exceptional properties — chosen
                not because they have the highest price per square metre, but
                because they represent a point of view. An architect who solved
                a problem nobody else noticed. A site that has an effect on the
                light at a particular hour. A material palette that improves
                with age.
              </p>
              <p className="text-[var(--muted)] leading-relaxed text-[0.9375rem]">
                Our clients come to us when they want something that cannot be
                found through a conventional search — and when they are prepared
                to wait for the right one.
              </p>
            </motion.div>

            {/* Stat row */}
            <motion.div
              className="mt-14 grid grid-cols-3 gap-8 border-t border-[var(--border-light)] pt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {[
                { value: "12+", label: "Years in the market" },
                { value: "240", label: "Residences placed" },
                { value: "6", label: "African capitals" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl md:text-4xl font-light text-[var(--fg)] mb-1">
                    {stat.value}
                  </p>
                  <p className="label text-[var(--muted)] normal-case tracking-wide text-[0.7rem]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: image */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1000&q=85"
                alt="Spacenz — architectural interior with warm light"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Hairline frame */}
              <div className="absolute inset-0 ring-1 ring-inset ring-[var(--border-light)]" />
            </div>

            {/* Floating caption */}
            <div className="absolute -bottom-6 -left-6 bg-[var(--bg)] border border-[var(--border)] px-6 py-5 hidden lg:block">
              <p className="label text-[var(--accent)] mb-1">Est. 2012</p>
              <p className="text-[var(--fg)] text-sm font-light">
                Lagos · Nairobi · Cape Town
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
