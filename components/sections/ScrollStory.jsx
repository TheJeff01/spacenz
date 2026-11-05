"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const ROOMS = [
  {
    title: "The Grand Entrance",
    body: "Six metres of height and nothing else. The arrival sequence at Horizon Residence was designed to reset your sense of scale before you reach the principal rooms.",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1400&q=85",
    stat: { value: "6m", label: "Ceiling height" },
  },
  {
    title: "The Living Volume",
    body: "A single continuous room that runs the full southern elevation — east light in the morning, the lagoon catching afternoon sun through the western doors.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85",
    stat: { value: "120 m²", label: "Living area" },
  },
  {
    title: "The Master Suite",
    body: "A private floor. Two dressing rooms, a bathroom finished in Portoro marble, and a terrace with an unobstructed horizon that runs from Badagry to Epe.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85",
    stat: { value: "280°", label: "Panoramic view" },
  },
  {
    title: "The Pool Terrace",
    body: "The pool dissolves into the Lagos skyline — infinity edge, heated, twelve metres long. At dusk the water turns the colour of the city's lights.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=85",
    stat: { value: "12m", label: "Infinity pool" },
  },
];

export default function ScrollStory() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${ROOMS.length * 100}%`,
          scrub: 0.5,
          pin: pinRef.current,
          onUpdate: (self) => {
            const idx = Math.min(
              ROOMS.length - 1,
              Math.floor(self.progress * ROOMS.length)
            );
            setActiveIdx(idx);
          },
        },
      });

      imageRefs.current.forEach((el, i) => {
        if (i === 0) return;
        tl.fromTo(
          el,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1 },
          i
        ).to(el, { opacity: 0, duration: 0.5 }, i + 0.8);
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      aria-label="Property story"
      style={{ height: `${ROOMS.length * 100}vh` }}
    >
      {/* Pinned content */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left: image stack */}
        <div className="relative h-full overflow-hidden">
          {ROOMS.map((room, i) => (
            <div
              key={room.title}
              ref={(el) => (imageRefs.current[i] = el)}
              className="absolute inset-0"
              style={{
                opacity: i === 0 ? 1 : 0,
                zIndex: i === 0 ? 1 : i + 1,
              }}
            >
              <Image
                src={room.image}
                alt={room.title}
                fill
                sizes="50vw"
                className="object-cover object-center"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-[#14110E]/30" />
            </div>
          ))}

          {/* Progress dots */}
          <div className="absolute bottom-10 left-10 z-20 flex flex-col gap-2">
            {ROOMS.map((_, i) => (
              <span
                key={i}
                className="block w-px transition-all duration-500"
                style={{
                  height: activeIdx === i ? "32px" : "12px",
                  backgroundColor: activeIdx === i ? "var(--gold)" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: text */}
        <div className="flex flex-col justify-center px-10 md:px-14 lg:px-20 py-20 bg-[var(--bg)]">
          <SectionLabel className="mb-12">Horizon Residence</SectionLabel>

          <div className="relative overflow-hidden" style={{ minHeight: "280px" }}>
            {ROOMS.map((room, i) => (
              <div
                key={room.title}
                ref={(el) => (textRefs.current[i] = el)}
                className="transition-all duration-700"
                style={{
                  opacity: activeIdx === i ? 1 : 0,
                  transform: `translateY(${activeIdx === i ? 0 : activeIdx > i ? -20 : 20}px)`,
                  pointerEvents: activeIdx === i ? "auto" : "none",
                  position: i === 0 ? "relative" : "absolute",
                  top: i === 0 ? "auto" : 0,
                  left: i === 0 ? "auto" : 0,
                  right: i === 0 ? "auto" : 0,
                }}
              >
                <p className="label text-[var(--accent)] mb-4">
                  0{i + 1} / 0{ROOMS.length}
                </p>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,3.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-[var(--fg)] mb-6">
                  {room.title}
                </h2>
                <p className="text-[var(--muted)] leading-relaxed text-[0.9375rem] max-w-[400px] mb-10">
                  {room.body}
                </p>
                <div className="border-l-2 pl-6" style={{ borderColor: "var(--accent)" }}>
                  <p className="font-display text-3xl font-light text-[var(--fg)]">
                    {room.stat.value}
                  </p>
                  <p className="label text-[var(--muted)] mt-1">{room.stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint — only visible on desktop */}
          <p className="label text-[var(--muted)] mt-16 flex items-center gap-3 md:flex hidden">
            <span className="block h-px w-8 bg-current opacity-40" />
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}
