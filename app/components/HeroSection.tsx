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
  PiMedalLight,
  PiStarLight,
  PiMountainsLight,
} from "react-icons/pi";
import ConsultationForm from "./ConsultationForm";
import { useIsLg } from "../hooks/useIsLg";

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
  terra: "#E86240", // CTA, accent, highlights
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
      className="hidden"
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
          background: "rgba(252, 223, 184, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(76, 39, 51, 0.12)",
          boxShadow:
            "0 8px 32px rgba(76, 39, 51, 0.08), 0 2px 8px rgba(76, 39, 51, 0.04), 0 0 0 1px rgba(255,255,255,0.5) inset",
          minWidth: 200,
          maxWidth: 240,
        }}
      >
        {/* Icon dot */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
          style={{ background: "rgba(232,98,64,0.12)" }}
        >
          <Icon size={15} style={{ color: C.terra }} />
        </div>
        <div className="flex flex-col">
          <span
            className="text-[12.5px] font-bold leading-tight mb-0.5 font-satoshi"
            style={{
              color: C.deepPlum,
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </span>
          <span
            className="text-[11px] leading-snug font-satoshi font-medium"
            style={{
              color: "rgba(76, 39, 51, 0.8)",
            }}
          >
            {body}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeatureItem({ icon: Icon, title, body, delay }) {
  return (
    <motion.div
      className="group relative flex flex-col items-start p-4 rounded-[2rem] transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
    >
      {/* Glass Background Layer */}
      <div
        className="absolute inset-0 rounded-[2rem] border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:backdrop-blur-md"
        style={{
          background:
            "linear-gradient(145deg, rgba(70, 30, 45, 0.9) 0%, rgba(45, 20, 30, 0.95) 100%)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      />

      {/* Animated Accent Border (Glow effect) */}
      <div
        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(232, 98, 64, 0.5) 0%, transparent 40%, rgba(232, 98, 64, 0.1) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Icon Container with Soft Glow */}
      <div className="relative z-10 mb-6">
        <div className="absolute inset-0 bg-[#E86240] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-[#E86240]/20 bg-[#E86240]/5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Icon
            size={22}
            className="text-[#E86240] transition-colors duration-300"
          />
        </div>
      </div>

      {/* Content Block */}
      <div className="relative z-10">
        <h4 className="text-xl font-semibold tracking-tight text-[#F4DEBF] mb-3 group-hover:text-white transition-colors duration-300">
          {title}
        </h4>
        <div className="h-px w-8 bg-[#E86240]/40 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-[#E86240]" />
        <p className="text-sm leading-relaxed text-[#F4DEBF]/60 group-hover:text-[#F4DEBF]/90 transition-colors duration-300">
          {body}
        </p>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <Icon size={40} className="text-[#F4DEBF]" />
      </div>
    </motion.div>
  );
}

// ─── Main Hero ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef(null);
  const shouldReduce = useReducedMotion();
  const isLg = useIsLg();

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
      className="relative w-full min-h-0 lg:min-h-screen overflow-hidden flex items-stretch font-satoshi pt-4 pb-12 lg:pb-0 "
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
              rgba(252, 223, 184, 0.88) 0%,
              rgba(252, 223, 184, 0.9) 10%,
              rgba(252, 223, 184, 0.40) 65%,
              rgba(252, 223, 184, 0.15) 100%
            )`,
          }}
        />
        {/* Bottom fade into sand */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36"
          style={{
            background: `linear-gradient(to top, rgba(250, 240, 227, 0.4), transparent)`,
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute top-0 left-0 right-0 h-28"
          style={{
            background: `linear-gradient(to bottom, rgba(250,240,227,0.15), transparent)`,
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

      {/* ══ FLOATING INSIGHT CARDS ════════════════════════════════════════ */}
      <div className="absolute left-[1%] bottom-[25%] z-20 hidden xl:block">
        <InsightCard
          icon={PiDropLight}
          title="Up to 60% less water usage"
          body="Colorado-native plants need a fraction of irrigation"
          delay={1.1}
          floatAmp={9}
          floatDuration={9}
        />
      </div>

      <div className="absolute right-[5%] top-[8%] z-20 hidden lg:hidden">
        <InsightCard
          icon={PiSunLight}
          title="Climate-optimized design"
          body="Built for Colorado's harsh sun, dry summers & cold winters"
          delay={1.3}
          floatAmp={8}
          floatDuration={11}
        />
      </div>

      {/* ══ CONTENT GRID ═════════════════════════════════════════════════ */}
      <div
        className="relative z-20 w-full mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-between min-h-0 lg:min-h-screen"
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
            className="inline-flex items-center gap-2 self-start mb-6 px-4 py-2 rounded-full"
            style={{
              background: "rgba(232,98,64,0.12)",
              border: "1px solid rgba(232,98,64,0.25)",
            }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={reveal(0)}
          >
            <PiLeafLight size={14} style={{ color: C.terra }} />
            <span
              className="text-[11.5px] 2xl:text-sm font-bold tracking-[0.18em] uppercase font-satoshi"
              style={{ color: C.deepPlum }}
            >
              Colorado's Premier Xeriscaping Company
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal(1)}
            style={{
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: C.deepPlum,
              marginBottom: "1.1rem",
              maxWidth: "850px",
            }}
            className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl"
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
              lineHeight: 1.2,
              color: C.deepPlum,
              marginBottom: "1rem",
              maxWidth: "48ch",
            }}
            className="font-satoshi font-bold text-lg lg:text-xl"
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
              lineHeight: 1.6,
              color: C.plum,
              marginBottom: "1rem",
              maxWidth: "60ch",
            }}
            className="font-satoshi font-bold italic text-lg lg:text-lg"
          >
            Ridgewell Landscape & Design helps Denver homeowners transform high maintenance yards into beautiful outdoor spaces that need less water, less upkeep, and still look amazing year round
          </motion.p>

                    <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal(3)}
            style={{
              lineHeight: 1.6,
              color: C.plum,
              marginBottom: "1rem",
              maxWidth: "60ch",
            }}
            className="font-satoshi font-bold italic text-lg lg:text-lg"
          >
            Through custom xeriscaping, drought-tolerant plants, decorative stone, smart irrigation, and premium outdoor features, we create landscapes built specifically for Colorado homes and climate
          </motion.p>

          {/* CTA Row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reveal(4)}
          >
            {/* PRIMARY CTA */}

            <motion.a
              href="#consultation"
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-8 py-4.5"
              style={{
                background:
                  "linear-gradient(135deg, #D94F2B 0%, #E86240 45%, #C63E1D 100%)",
                boxShadow:
                  "0 12px 35px rgba(232,98,64,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* deep inner gloss */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.10), transparent 35%, transparent 65%, rgba(0,0,0,0.12))",
                }}
              />

              {/* razor sharp moving glaze */}
              <motion.div
                className="absolute top-0 bottom-0 w-20 hidden"
                animate={{
                  x: ["-150%", "420%"],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0.6,
                }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(252, 223, 184, 0.2) 10%, rgba(252, 223, 184, 0.75) 50%, rgba(252, 223, 184, 0.2) 70%, transparent 100%)",
                  transform: "skewX(-24deg)",
                  filter: "blur(0.5px)",
                  mixBlendMode: "screen",
                }}
              />

              {/* subtle animated glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16), transparent 45%)",
                }}
              />

              {/* edge highlight */}
              <div
                className="absolute inset-[1px] rounded-[15px] pointer-events-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />

              {/* text */}
              <span
                className="relative z-10 flex items-center gap-3 text-base font-bold tracking-[0.03em]"
                style={{
                  color: "#fff",
                  fontFamily: "Satoshi, sans-serif",
                }}
              >
                Get Your Free Design Consultation
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-lg"
                >
                  →
                </motion.span>
              </span>
            </motion.a>

            {/* SECONDARY CTA */}
            <motion.a
              href="tel:+1"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-7 py-4.5"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                y: 1,
                scale: 0.985,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
              }}
              style={{
                textDecoration: "none",

                /* premium layered background */
                background: `
      linear-gradient(
        180deg,
        rgba(255,245,232,0.95) 0%,
        rgba(252,223,184,0.92) 48%,
        rgba(236,201,160,0.95) 100%
      )
    `,

                border: "1px solid rgba(76,39,51,0.16)",

                /* REAL 3D DEPTH */
                boxShadow: `
      inset 0 1px 0 rgba(255,255,255,0.85),
      inset 0 -2px 4px rgba(76,39,51,0.08),
      0 3px 0 rgba(180,140,105,0.95),
      0 10px 24px rgba(76,39,51,0.10),
      0 18px 45px rgba(76,39,51,0.06)
    `,

                backdropFilter: "blur(10px)",
              }}
            >
              {/* moving razor glaze */}
              <motion.div
                className="absolute inset-y-0 w-24 hidden"
                animate={{
                  x: ["-180%", "420%"],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1.2,
                }}
                style={{
                  background: `
        linear-gradient(
          90deg,
          transparent,
          rgba(70,30,45,0.04),
          rgba(255,255,255,0.75),
          rgba(255,255,255,0.04),
          transparent
        )
      `,
                  transform: "skewX(-22deg)",
                  filter: "blur(0.4px)",
                  mixBlendMode: "screen",
                }}
              />

              {/* top gloss */}
              <div
                className="absolute inset-x-0 top-0 h-[48%] rounded-t-2xl"
                style={{
                  background: `
        linear-gradient(
          to bottom,
          rgba(255,255,255,0.45),
          rgba(255,255,255,0.08),
          transparent
        )
      `,
                }}
              />

              {/* subtle inner edge */}
              <div
                className="absolute inset-[1px] rounded-[15px]"
                style={{
                  border: "1px solid rgba(255,255,255,0.35)",
                }}
              />

              {/* icon container */}
              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 4,
                  duration: 0.7,
                }}
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background: `
        linear-gradient(
          180deg,
          rgba(255,255,255,0.95),
          rgba(252,223,184,0.75)
        )
      `,
                  boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.8),
        0 4px 10px rgba(76,39,51,0.08)
      `,
                  border: "1px solid rgba(76,39,51,0.08)",
                }}
              >
                <FiPhone
                  size={16}
                  style={{
                    color: C.terra,
                  }}
                />
              </motion.div>

              {/* text */}
              <span className="relative z-10 flex flex-col leading-tight">
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: C.terra,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                  className="font-satoshi"
                >
                  Prefer to talk?
                </span>
              <a href="tel:+17208825772">
                <span
                  className="text-base font-sans"
                  style={{
                    color: C.deepPlum,
                    fontWeight: 700,
                    textShadow: "0 1px 0 rgba(255,255,255,0.45)",
                  }}
                >
                  720-882-5772
                </span>
              </a>
              </span>
            </motion.a>
          </motion.div>

          {/* Premium Feature Strip */}
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-4 w-full max-w-[720px] font-satoshi tracking-wide"
            style={{ borderTop: "3px solid rgba(76,39,51,0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <FeatureItem
              icon={PiMedalLight}
              title="15+ Years of Experience"
              body="Proven craftsmanship and expert landscape design across Colorado."
              delay={1.25}
            />
            <FeatureItem
              icon={PiStarLight}
              title="5-Star Rated Local Company"
              body="Highly rated by your neighbors in Denver and the Front Range."
              delay={1.35}
            />
            <FeatureItem
              icon={PiMountainsLight}
              title="Built For Colorado’s Climate"
              body="Drought-resilient xeriscaping designed to thrive year-round."
              delay={1.45}
            />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — FORM (desktop only) ─────────────────────────── */}
        {isLg && (
          <motion.div
            id="consultation"
            className="flex items-center justify-center w-full pt-0 lg:pt-[clamp(10px,8vh,100px)] scroll-mt-24"
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
        )}
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
