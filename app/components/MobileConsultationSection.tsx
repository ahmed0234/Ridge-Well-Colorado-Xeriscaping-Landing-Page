"use client";

import { motion } from "motion/react";
import ConsultationForm from "./ConsultationForm";
import { useIsLg } from "../hooks/useIsLg";
import { PiLeafLight } from "react-icons/pi";

const C = {
  sand: "#F4DEBF",
  deepPlum: "#461E2D",
  plum: "#4C2733",
  terra: "#E86240",
};

/**
 * Mobile-only consultation block at the end of the page.
 * Desktop form stays in the hero (see HeroSection).
 * `lg:hidden` ensures no flash at the bottom on large screens during hydration.
 */
export default function MobileConsultationSection() {
  const isLg = useIsLg();

  return (
    <section
      id={isLg ? undefined : "consultation"}
      aria-labelledby="mobile-consultation-heading"
      className="relative w-full scroll-mt-24 overflow-hidden lg:hidden"
      style={{
        background: `linear-gradient(180deg, ${C.sand} 0%, color-mix(in srgb, ${C.sand} 88%, ${C.deepPlum}) 100%)`,
      }}
    >
      {!isLg && (
        <>
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, color-mix(in srgb, ${C.deepPlum} 6%, transparent), transparent)`,
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-lg px-5 sm:px-8 py-14 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center mb-8 sm:mb-10"
            >
              <span
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full font-satoshi text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{
                  color: C.terra,
                  background: "color-mix(in srgb, #E86240 12%, transparent)",
                  border: "1px solid color-mix(in srgb, #E86240 28%, transparent)",
                }}
              >
                <PiLeafLight size={14} aria-hidden />
                Ready when you are
              </span>

              <h2
                id="mobile-consultation-heading"
                className="font-sans font-extrabold leading-[1.1] tracking-tight mb-3"
                style={{
                  color: C.deepPlum,
                  fontSize: "clamp(1.65rem, 5vw, 2.1rem)",
                }}
              >
                Start your free{" "}
                <span style={{ color: C.terra }}>design consultation</span>
              </h2>

              <p
                className="font-satoshi font-medium leading-relaxed max-w-md"
                style={{
                  color: "color-mix(in srgb, #4C2733 82%, #461E2D)",
                  fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)",
                }}
              >
                You&apos;ve seen what&apos;s possible — tell us about your property
                and we&apos;ll map out a xeriscape plan built for Colorado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex justify-center"
            >
              <ConsultationForm />
            </motion.div>

            <p
              className="mt-6 text-center font-satoshi text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "color-mix(in srgb, #4C2733 55%, transparent)" }}
            >
              No commitment · Free consultation · Colorado-focused
            </p>
          </div>
        </>
      )}
    </section>
  );
}
