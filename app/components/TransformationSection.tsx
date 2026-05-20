"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

const transformations = [
  {
    beforeImage: "/transformations/before-1.jpg",
    afterImage: "/transformations/after-1.jpg",
    beforeAlt: "Dry patchy lawn before xeriscaping",
    afterAlt: "Modern xeriscape with gravel and native plants",
    title: "Desert Oasis Residence",
    location: "Scottsdale, AZ",
    waterSaved: "-62% Water",
  },
  {
    beforeImage: "/transformations/before-2.jpg",
    afterImage: "/transformations/after-2.jpg",
    beforeAlt: "Overgrown backyard before redesign",
    afterAlt: "Elegant courtyard with succulents and fire pit",
    title: "Mesa Verde Courtyard",
    location: "Sedona, AZ",
    waterSaved: "-55% Water",
  },
  {
    beforeImage: "/transformations/before-3.jpg",
    afterImage: "/transformations/after-3.jpg",
    beforeAlt: "Bare entrance with dead grass",
    afterAlt: "Architectural desert garden with ornamental grasses",
    title: "Saguaro Estate Gardens",
    location: "Paradise Valley, AZ",
    waterSaved: "-71% Water",
  },
];

const stats = [
  { value: "60%", label: "Avg. Water Reduction" },
  { value: "150+", label: "Projects Completed" },
  { value: "12+", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function TransformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section
      ref={sectionRef}
      id="transformations"
      className="relative py-24 lg:py-24 bg-warm-white overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,163,115,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,216,195,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-sunset-gold/20 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.3em] font-body font-medium text-sunset-gold border border-sunset-gold/20 bg-sunset-gold/5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sunset-gold" />
            Visual Proof
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-night-desert tracking-tight mb-5"
          >
            From Ordinary Yards to
            <br />
            <span className="text-gradient-gold">Desert Masterpieces</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="text-base lg:text-lg text-stone-gray font-body max-w-2xl mx-auto leading-relaxed"
          >
            Witness real transformations that prove xeriscaping isn&apos;t just
            sustainable — it&apos;s a complete elevation of outdoor living. Less
            water. More beauty. Zero compromise.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20 lg:mb-28">
          {transformations.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              <BeforeAfterSlider {...project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="relative"
        >
          <div className="rounded-2xl border border-sand/50 bg-gradient-to-br from-sand-light/50 via-warm-white to-sand-light/30 overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.15 * index,
                    ease: [0.25, 0.8, 0.25, 1],
                  }}
                  className={`relative p-6 lg:p-8 text-center ${
                    index > 0 ? "stats-divider" : ""
                  }`}
                >
                  <span className="block text-3xl lg:text-4xl font-heading font-bold text-gradient-gold mb-1.5">
                    {stat.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-stone-gray font-body font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className="text-center mt-14"
        >
          <motion.a
            href="#quote"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-body font-semibold tracking-wide text-night-desert bg-gradient-to-r from-sunset-gold via-desert-tan to-sunset-gold bg-[length:200%_100%] hover:bg-right transition-all duration-700 shadow-xl shadow-sunset-gold/20"
          >
            Start Your Transformation
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
          <p className="text-xs text-stone-gray/60 font-body mt-4">
            Free consultation · No commitment · Results in 4–6 weeks
          </p>
        </motion.div>
      </div>
    </section>
  );
}
