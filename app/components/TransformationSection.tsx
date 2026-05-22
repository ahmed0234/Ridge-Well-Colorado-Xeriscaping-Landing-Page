"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import DesertHorizonEdge from "./Deserthorizon";

/* ── Cactus border (preserved exactly) ─────────────────────────────────── */

/* ── Data ───────────────────────────────────────────────────────────────── */
const transformations = [
  {
    beforeImage: "/beforeandafter/after_1.png",
    afterImage: "/beforeandafter/before_1.png",
    beforeAlt: "Dry patchy lawn before xeriscaping",
    afterAlt: "Modern xeriscape with gravel and native plants",
    title: "Xeriscaping with Smart Water Saving Irrigation",
    location: "Denver, CO",
    waterSaved: "-62% Water",
  },
  {
    beforeImage: "/beforeandafter/after_2.png",
    afterImage: "/beforeandafter/before_2.png",
    beforeAlt: "Overgrown backyard before redesign",
    afterAlt: "Elegant courtyard with succulents and fire pit",
    title: "Xeriscaping with Elegant Walkways",
    location: "Lakewood, CO",
    waterSaved: "-55% Water",
  },
  {
    beforeImage: "/beforeandafter/after_3.png",
    afterImage: "/beforeandafter/before_3.png",
    beforeAlt: "Bare entrance with dead grass",
    afterAlt: "Architectural desert garden with ornamental grasses",
    title: "Drought Resistant Plants and Walkways",
    location: "Aurora, CO",
    waterSaved: "-71% Water",
  },
  {
    beforeImage: "/beforeandafter/after_4.png",
    afterImage: "/beforeandafter/before_4.png",
    beforeAlt: "Bare entrance with dead grass",
    afterAlt: "Architectural desert garden with ornamental grasses",
    title: "Paver Patios with Premium Outdoor Features",
    location: "Broomfield, CO",
    waterSaved: "-71% Water",
  },
];

const stats = [
  { value: "60%", label: "Avg. Water Reduction" },
  { value: "150+", label: "Projects Completed" },
  { value: "12+", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

/* ── Stat card ──────────────────────────────────────────────────────────── */
function StatCard({
  value,
  label,
  index,
  inView,
}: {
  value: string;
  label: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.25, 0.8, 0.25, 1] }}
      className="group relative flex flex-col items-center justify-center py-8 px-4 text-center"
    >
      {/* Vertical divider (all except first) */}
      {index > 0 && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-foreground/10" />
      )}

      {/* Glowing dot accent */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#E86240] mb-4 opacity-70" />

      <span className="block font-heading text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-none mb-2"
        style={{ fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 font-medium leading-tight max-w-[10ch] mx-auto">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────────────────── */
export default function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  const isInView    = useInView(sectionRef, { once: true, margin: "-60px" });
  const headInView  = useInView(headRef,    { once: true, margin: "-40px" });
  const statsInView = useInView(statsRef,   { once: true, margin: "-40px" });
  const ctaInView   = useInView(ctaRef,     { once: true, margin: "-40px" });

  return (
    <>
      {/* Preserved cactus border */}
      <DesertHorizonEdge />

      <section
        ref={sectionRef}
        id="transformations"
        className="relative bg-background overflow-hidden"
      >
        {/* ── Ambient background depth ────────────────────────────────── */}
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Radial warmth glows */}
        <div className="absolute -top-60 left-1/4 w-[700px] h-[700px] rounded-full bg-[#E86240]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-[#F4DEBF]/20 blur-3xl pointer-events-none" />

        {/* ── HEADER ──────────────────────────────────────────────────── */}
        <div ref={headRef} className="pt-20 pb-8 lg:pt-16 lg:pb-12 px-6 lg:px-10 max-w-[1400px] mx-auto">

          {/* Two-column header: left = eyebrow+headline, right = descriptor */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-8">

            {/* Left */}
            <div className="flex-1 max-w-2xl">


              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                animate={headInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.25, 0.8, 0.25, 1] }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-wide leading-[1.06] font-clash"
              >
               Our Work Speaks<br className="hidden sm:block" /> to{" "}
                <span className="text-[#E86240]">for itself</span>
              </motion.h2>
            </div>

            {/* Right — descriptor + metric pill */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={headInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
              className="lg:max-w-sm pb-1"
            >
              <p className="text-base lg:text-xl text-foreground/55 font-body leading-normal font-satoshi">
                Real transformations proving xeriscaping isn't just sustainable
                it's a complete elevation of outdoor living.{" "}
                <strong className="text-foreground/80 font-semibold font-satoshi">Less water. More beauty. Zero compromise.</strong>
              </p>
            </motion.div>
          </div>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            className="origin-left mt-6 h-px bg-linear-to-r from-[#E86240]/30 via-foreground/10 to-transparent"
          />
        </div>

        {/* ── SLIDERS ─────────────────────────────────────────────────── */}
        <div className="px-6 lg:px-10 max-w-[1400px] mx-auto pb-8 lg:pb-16">

          {/* ── FEATURED (first slide) — full width, large ─────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
            className="mb-6 lg:mb-8"
          >
            {/* Framing card */}
            <div className="relative rounded-3xl bg-foreground/[0.03] border border-foreground/8 p-4 lg:p-6 shadow-xl shadow-foreground/5">
              {/* Subtle inset glow top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#E86240]/25 to-transparent" />

              {/* Slider — large aspect */}
              <div className="w-full">
                <div className="[&_.aspect-\[4\/3\]]:aspect-[16/9] lg:[&_.aspect-\[4\/3\]]:aspect-[21/9]">
                  <BeforeAfterSlider {...transformations[0]} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── SECONDARY PAIR — side by side ──────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {transformations.slice(1).map((project, i) => (
              <motion.div
  key={project.title}
  className={
    transformations.slice(1).length % 2 !== 0 &&
    i === transformations.slice(1).length - 1
      ? "md:col-span-2 flex justify-center"
      : ""
  }
  initial={{ opacity: 0, y: 44 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{
    duration: 0.8,
    delay: 0.4 + i * 0.14,
    ease: [0.25, 0.8, 0.25, 1],
  }}
>
  <div className="relative rounded-3xl bg-foreground/[0.03] border border-foreground/8 p-4 lg:p-5 shadow-lg shadow-foreground/4 md:max-w-[700px] w-full">
    <BeforeAfterSlider {...project} />
  </div>
</motion.div>
            ))}
          </div>
        </div>

        {/* ── STATS BAND ──────────────────────────────────────────────── */}
      {/* <TransformationMetricsDashboard /> */}

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="pb-24 lg:pb-12 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.8, 0.25, 1] }}
            className="inline-flex flex-col items-center gap-5"
          >
            {/* Heading nudge */}
            <p className="text-lg text-foreground/85 uppercase tracking-wide font-semibold font-sans">
              Ready to transform your yard?
            </p>

            {/* CTA button */}
            <motion.a
              href="#quote"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-full text-sm font-semibold tracking-wide text-white overflow-hidden shadow-2xl shadow-[#E86240]/25"
              style={{ background: "linear-gradient(135deg,#E86240 0%,#c94d28 100%)" }}
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              Start Your Transformation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <p className="text-md text-foreground/65 font-body font-satoshi font-semibold">
              Free consultation &nbsp;·&nbsp; No commitment &nbsp;·&nbsp; Results in 4–6 weeks
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}