"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { FiPhone, FiChevronDown } from "react-icons/fi";
import {
  PiLeafLight,
  PiDropLight,
  PiSunLight,
  PiPlantLight,
  PiShieldCheckLight,
} from "react-icons/pi";
import ConsultationForm from "./ConsultationForm";

// ─── Font imports (add to your layout.tsx / globals.css) ──────────────────
// @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap');

// ─── Palette ───────────────────────────────────────────────────────────────
// Background / surfaces : #F4DEBF  (warm sand — light)
// Primary text          : #461E2D  (deep plum — dark)
// Secondary text        : #4C2733  (plum — dark)
// Accent / CTA          : #E86240  (terracotta — warm pop)

const C = {
  sand: "#F4DEBF", // bg, surfaces
  sandLight: "#FAF0E3", // lighter surface tint
  sandDark: "#E8CBAA", // dividers, borders
  plum: "#4C2733", // headings, body text
  deepPlum: "#461E2D", // darkest text, overlays
  terra: "#e04f2b", // CTA, accent, highlights
  terraLight: "#F2A07A", // softer accent
  white: "#FFFFFF",
};

// ─── Floating Insight Card ─────────────────────────────────────────────────
function InsightCard({
  icon: Icon,
  title,
  body,
  delay,
  floatAmp = 10,
  floatDuration = 8,
}) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={
          shouldReduce
            ? {}
            : {
                y: [0, -floatAmp, 0, floatAmp * 0.6, 0],
              }
        }
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.1,
        }}
        className="relative flex items-start gap-3 px-4 py-3.5 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(1px) saturate(1.6)",
          WebkitBackdropFilter: "blur(1px) saturate(1.6)",
          border: "1px solid rgba(232,98,64,0.14)",
          boxShadow:
            "0 8px 32px rgba(70,30,45,0.10), 0 2px 8px rgba(70,30,45,0.06), 0 0 0 0.5px rgba(255,255,255,0.7) inset",
          minWidth: 200,
          maxWidth: 230,
        }}
      >
        {/* Icon dot */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
          style={{ background: "rgba(232,98,64,0.10)" }}
        >
          <Icon size={15} style={{ color: C.terra }} />
        </div>
        <div className="flex flex-col">
          <span
            className="text-[12px] font-semibold leading-tight mb-0.5 font-satoshi"
            style={{
              color: C.deepPlum,
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </span>
          <span
            className="text-[11px] leading-snug font-satoshi"
            style={{
              color: "rgba(70,30,45,0.7)",
            }}
          >
            {body}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Feature Item (Premium Strip) ──────────────────────────────────────────
function FeatureItem({ icon: Icon, title, body, delay }) {
  return (
    <motion.div
      className="flex flex-col items-start p-3 sm:p-4 md:p-5 rounded-2xl relative overflow-hidden cursor-default group"
      style={{
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(20px) saturate(1.6)",
        WebkitBackdropFilter: "blur(20px) saturate(1.6)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderBottomColor: "rgba(70,30,45,0.1)",
        boxShadow: "0 8px 32px rgba(70,30,45,0.05), inset 0 1px 0 rgba(255,255,255,0.6)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        background: "rgba(255, 255, 255, 0.4)",
        boxShadow: "0 14px 40px rgba(70,30,45,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
        borderColor: "rgba(232,98,64,0.25)",
      }}
    >
      {/* Soft internal glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 75%)" }} />
      
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 sm:mb-4 transition-colors duration-400 group-hover:bg-opacity-25 relative z-10"
        style={{ background: "rgba(232,98,64,0.15)" }}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-400 group-hover:scale-110" style={{ color: C.terra }} />
      </div>
      <h4 className="text-[11.5px] sm:text-[13.5px] font-bold font-satoshi mb-1 sm:mb-1.5 leading-tight tracking-normal relative z-10" style={{ color: C.deepPlum }}>
        {title}
      </h4>
      <p className="text-[9.5px] sm:text-[11.5px] font-medium font-satoshi opacity-90 leading-[1.4] relative z-10 tracking" style={{ color: C.plum }}>
        {body}
      </p>
    </motion.div>
  );
}

// ─── Main Hero ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollY } = useScroll();
  const bgY = useTransform(
    scrollY,
    [0, 700],
    shouldReduce ? [0, 0] : ["0%", "14%"],
  );
  const bgScale = useTransform(
    scrollY,
    [0, 700],
    shouldReduce ? [1, 1] : [1, 1.07],
  );

  const ease = [0.22, 1, 0.36, 1];
  const reveal = (i) => ({ duration: 0.82, delay: 0.18 + i * 0.13, ease });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex items-stretch font-satoshi "
      style={{ background: C.sandLight }}
    >
      {/* ══ BACKGROUND PHOTO WITH PARALLAX ══════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale, willChange: "transform" }}
      >
        <img
          src="/hero-bg.png"
          alt="Colorado xeriscaped home at golden hour"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />

        {/* Gradient Scrim — Darker edges for readability, lighter center for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              108deg,
              rgba(225,198,168,0.8) 0%,
              rgba(244,222,191,0.7) 15%,
              rgba(244,222,191,0.40) 50%,
              rgba(244,222,191,0.4) 75%,
              rgba(225,198,168,0.4) 100%
            )`,
          }}
        />
        {/* Bottom fade into sand */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: `linear-gradient(to top, rgba(250, 240, 227, 0.2), transparent)`,
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute top-0 left-0 right-0 h-28"
          style={{
            background: `linear-gradient(to bottom, rgba(250,240,227,0.1), transparent)`,
          }}
        />
      </motion.div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      {/* ══ FLOATING INSIGHT CARDS ════════════════════════════════════════
          Positioned intentionally: 3 cards in the visual mid-field
          – Left of form (credibility anchor near CTA)
          – Above form top-right (reinforces trust)
          – Lower left area (supporting left copy)
      ════════════════════════════════════════════════════════════════════ */}

      {/* Card A — sits bottom-left of hero, near stats area */}
      <div className="absolute left-[2%] bottom-[18%] z-20 hidden xl:block">
        <InsightCard
          icon={PiDropLight}
          title="Up to 60% less water usage"
          body="Colorado-native plants need a fraction of irrigation"
          delay={1.1}
          floatAmp={9}
          floatDuration={9}
        />
      </div>

      {/* Card B — floats in center-right, above the form */}
      <div className="absolute right-[5%] top-[8%] z-20 hidden lg:block">
        <InsightCard
          icon={PiSunLight}
          title="Climate-optimized design"
          body="Built for Colorado's harsh sun, dry summers & cold winters"
          delay={1.3}
          floatAmp={8}
          floatDuration={11}
        />
      </div>

      {/* Card C — floats lower-right near form bottom edge */}
      <div className="absolute right-[2%] bottom-[7%] z-20 hidden lg:block">
        <InsightCard
          icon={PiPlantLight}
          title="Low maintenance year-round"
          body="No weekly mowing. No monthly watering bills."
          delay={1.55}
          floatAmp={11}
          floatDuration={10}
        />
      </div>

      {/* Card D — mid-left floating (optional depth layer) */}
      <div className="absolute left-[2%] top-[30%] z-20 hidden 2xl:block">
        <InsightCard
          icon={PiLeafLight}
          title="Native Colorado plant selection"
          body="Curated species that thrive without extra care"
          delay={1.75}
          floatAmp={7}
          floatDuration={13}
        />
      </div>

      {/* ══ CONTENT GRID ═════════════════════════════════════════════════ */}
      <div
        className="relative z-20 w-full mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-between min-h-screen"
        style={{
          maxWidth: "1560px",
          padding: "0 clamp(24px, 4vw, 56px)",
          gap: "clamp(32px, 4vw, 64px)",
        }}
      >
        {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
        <div
          className="flex-1 flex flex-col justify-center pb-2 lg:pb-[clamp(60px,8vh,100px)]"
          style={{
            paddingTop: "clamp(80px, 10vh, 120px)",
          }}
        >
          {/* Eyebrow pill */}
          <motion.div
            className="inline-flex items-center gap-2 self-start mb-7 px-3.5 py-1.5 rounded-full"
            style={{
              background: "rgba(232,98,64,0.09)",
              border: "1px solid rgba(232,98,64,0.22)",
            }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reveal(0)}
          >
            <PiLeafLight size={13} style={{ color: C.terra }} />
            <span
              className="text-[11px] font-bold tracking-[0.16em] uppercase font-satoshi"
              style={{ color: C.deepPlum }}
            >
              Colorado's Premier Xeriscaping Studio
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal(1)}
            style={{
              fontSize: "clamp(2.8rem, 5.8vw, 4.6rem)",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.028em",
              color: C.deepPlum,
              marginBottom: "1.4rem",
              maxWidth: "800px",
            }}
            className="font-clash"
          >
            Beautiful Colorado{" "}
            <span style={{ color: C.terra }}>Landscaping</span> Without Constant
            Maintenance
          </motion.h1>

          {/* Sub 1 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal(2)}
            style={{
              fontSize: "clamp(1.1rem, 1.6vw, 1.25rem)",
              lineHeight: 1.6,
              color: C.deepPlum,
              opacity: 1,
              marginBottom: "0.85rem",
              maxWidth: "48ch",
            }}
            className="font-satoshi font-medium"
          >
            Lower water bills, less upkeep, and a yard that actually looks good
            year round.
          </motion.p>

          {/* Sub 2 */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal(3)}
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              lineHeight: 1.65,
              color: "rgba(70,30,45,0.85)",
              marginBottom: "2.5rem",
              maxWidth: "46ch",
            }}
            className="font-satoshi font-medium"
          >
            Ridgewell Landscape &amp; Design creates custom xeriscapes built
            specifically for Colorado homes and climate.
          </motion.p>

          {/* CTA Row */}
         <motion.div
  className="flex flex-col sm:flex-row gap-4 mb-6"
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={reveal(4)}
>

  {/* PRIMARY CTA */}
  <motion.a
    href="#consultation"
    className="relative inline-flex items-center justify-center px-8 py-4 rounded-2xl text-sm font-satoshi overflow-hidden"
    style={{
      background: C.terra,
      color: C.white,
      fontWeight: 700,
      letterSpacing: "0.02em",
      textDecoration: "none",
      boxShadow: "0 10px 30px rgba(232,98,64,0.25)",
    }}
    whileHover={{
      scale: 1.04,
      y: -2,
      boxShadow: "0 18px 50px rgba(232,98,64,0.38)",
    }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 420, damping: 22 }}
  >
    {/* subtle glow layer */}
    <span
      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 55%)",
      }}
    />

    <span className="relative z-10 font-satoshi font-semibold text-white tracking-wider">
      Get Your Free Design Consultation
    </span>
  </motion.a>

  {/* SECONDARY CTA */}
  <motion.a
    href="tel:+1"
    className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl text-sm font-satoshi"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(70,30,45,0.18)",
      color: C.deepPlum,
      backdropFilter: "blur(10px)",
      textDecoration: "none",
    }}
    whileHover={{
      scale: 1.02,
      borderColor: "rgba(232,98,64,0.35)",
      background: "rgba(255,255,255,0.07)",
    }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 380, damping: 24 }}
  >
    <motion.span
      animate={{ rotate: [0, 6, -6, 0] }}
      transition={{
        repeat: Infinity,
        repeatDelay: 4,
        duration: 0.6,
      }}
      style={{ display: "flex" }}
    >
      <FiPhone size={15} style={{ color: C.terra }} />
    </motion.span>

    <span className="flex flex-col leading-tight">
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          opacity: 1,
          color: C.terra,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Prefer to talk?
      </span>

      <span style={{ color: C.deepPlum, fontWeight: 600 }}>
        Call Ridgewell Landscape & Design
      </span>
    </span>
  </motion.a>
</motion.div>

          {/* Premium Feature Strip */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 mt-2 w-full max-w-[720px] font-satoshi tracking-wide"
            style={{ borderTop: "2px solid rgba(70,30,45,0.2)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <FeatureItem
              icon={PiPlantLight}
              title="Native Plants"
              body="Colorado species that naturally thrive."
              delay={1.15}
            />
            <FeatureItem
              icon={PiDropLight}
              title="Water Smart Design"
              body="Reduce water usage without sacrificing beauty."
              delay={1.25}
            />
            <FeatureItem
              icon={PiSunLight}
              title="Climate Ready"
              body="Built for harsh summers and cold winters."
              delay={1.35}
            />
            <FeatureItem
              icon={PiShieldCheckLight}
              title="Low Maintenance"
              body="Beautiful landscaping with less upkeep."
              delay={1.45}
            />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — FORM ───────────────────────────────────────── */}
        <motion.div
          className="flex items-center justify-center w-full pt-0 lg:pt-[clamp(10px,8vh,100px)]"
          style={{
            width: "clamp(340px, 36vw, 500px)",
            flexShrink: 0,
            paddingBottom: "clamp(60px, 8vh, 100px)",
          }}
          initial={{ opacity: 0, y: 36, x: 18 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
        >
          <ConsultationForm />
        </motion.div>
      </div>

      {/* ══ SCROLL INDICATOR ═════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 font-satoshi"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.6 }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(70,30,45,0.35)",
          }}
        >
          Explore
        </span>
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiChevronDown size={17} style={{ color: "rgba(70,30,45,0.3)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
