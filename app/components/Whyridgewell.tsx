"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

// ─── Background SVG ───────────────────────────────────────────────────────────

const FieldTexture = () => (
  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fieldCenter" cx="62%" cy="44%" r="52%">
        <stop offset="0%" stopColor="#E86240" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#F4DEBF" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#fieldCenter)" />
    {/* Horizontal terrain strokes */}
    {Array.from({ length: 18 }).map((_, i) => {
      const y = 60 + i * 50;
      const opacity = 0.025 + (i % 3) * 0.008;
      return (
        <path
          key={i}
          d={`M-100,${y} Q400,${y - 20 + (i % 4) * 10} 900,${y + 10} Q1400,${y + 30} 1900,${y - 10} Q2300,${y - 25} 2600,${y}`}
          fill="none"
          stroke="#F4DEBF"
          strokeWidth="0.7"
          strokeOpacity={opacity}
        />
      );
    })}
    {/* Diagonal accent lines top-right */}
    {[0, 1, 2, 3].map((i) => (
      <line
        key={`d${i}`}
        x1={900 + i * 60}
        y1="0"
        x2={600 + i * 60}
        y2="500"
        stroke="#E86240"
        strokeWidth="0.5"
        strokeOpacity="0.06"
      />
    ))}
  </svg>
);

// ─── Craftsmanship Mark SVG ───────────────────────────────────────────────────

const CraftsmanshipMark = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer ring */}
    <circle cx="36" cy="36" r="33" stroke="#E86240" strokeWidth="0.8" strokeOpacity="0.4" />
    <circle cx="36" cy="36" r="28" stroke="#F4DEBF" strokeWidth="0.4" strokeOpacity="0.12" />
    {/* Mountain motif */}
    <path d="M18,50 L30,30 L36,38 L44,24 L54,50 Z" fill="#E86240" fillOpacity="0.18" stroke="#E86240" strokeWidth="0.8" strokeOpacity="0.5" />
    <path d="M18,50 L30,30 L36,38 L44,24 L54,50" fill="none" stroke="#E86240" strokeWidth="1" strokeOpacity="0.6" />
    {/* Sun */}
    <circle cx="44" cy="27" r="4" fill="#E86240" fillOpacity="0.35" />
    <circle cx="44" cy="27" r="2" fill="#E86240" fillOpacity="0.6" />
    {/* R monogram */}
    <text x="36" y="66" fill="#F4DEBF" fillOpacity="0.18" fontSize="7" textAnchor="middle" fontFamily="serif" letterSpacing="4">RIDGEWELL</text>
  </svg>
);

// ─── Trust Pillars ────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L4 8v7c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V8L14 3z"
          fill="#E86240" fillOpacity="0.15" stroke="#E86240" strokeWidth="1" strokeOpacity="0.6" />
        <path d="M9,14 L12.5,17.5 L19,10.5" stroke="#E86240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    heading: "Done Right, The First Time",
    body: "No redos. No surprises. Every project is planned with precision before a single stone is placed.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#E86240" strokeWidth="1" strokeOpacity="0.6" fill="#E86240" fillOpacity="0.1" />
        <path d="M14 8v6l4 2.5" stroke="#E86240" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    heading: "Built For Colorado Conditions",
    body: "Our designs account for altitude, sun intensity, freeze-thaw cycles, and HOA requirements specific to the Front Range.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5,20 Q14,6 23,20" stroke="#E86240" strokeWidth="1" strokeOpacity="0.6" fill="#E86240" fillOpacity="0.1" />
        <path d="M7,20 Q14,9 21,20 Z" fill="#E86240" fillOpacity="0.12" />
        <circle cx="14" cy="9" r="3" fill="#E86240" fillOpacity="0.4" />
        <path d="M5,22 H23" stroke="#F4DEBF" strokeWidth="0.8" strokeOpacity="0.2" />
      </svg>
    ),
    heading: "Lower Water, Higher Standards",
    body: "We prove that low-maintenance doesn't mean low-quality. Your neighbors will ask who did the work.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="10" width="20" height="14" rx="3" stroke="#E86240" strokeWidth="1" strokeOpacity="0.6" fill="#E86240" fillOpacity="0.1" />
        <path d="M9,10 V7 Q9,4 14,4 Q19,4 19,7 V10" stroke="#E86240" strokeWidth="1" strokeOpacity="0.6" fill="none" />
        <circle cx="14" cy="17" r="2.5" fill="#E86240" fillOpacity="0.5" />
      </svg>
    ),
    heading: "One Relationship, Soup to Nuts",
    body: "Design, install, and follow-up — all under one roof. No juggling contractors or managing sub-trades yourself.",
  },
];

// ─── Large Pullquote ──────────────────────────────────────────────────────────

const pullLines = [
  { text: "You're not looking for", weight: "font-normal", opacity: 0.45 },
  { text: "'just another landscaper.'", weight: "font-black", opacity: 1, italic: true },
  { text: "You want a yard done right", weight: "font-normal", opacity: 0.45 },
  { text: "the first time.", weight: "font-black", opacity: 0.9 },
];

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function WhyRidgewell() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#F4DEBF" }}
    >
      {/* Light texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M-100,${80 + i * 65} Q500,${60 + i * 65 + (i % 3) * 15} 1100,${80 + i * 65} Q1700,${100 + i * 65} 2200,${80 + i * 65}`}
              fill="none"
              stroke="#4C2733"
              strokeWidth="0.5"
              strokeOpacity={0.04 + (i % 2) * 0.02}
            />
          ))}
        </svg>

        {/* Top right decorative glow */}
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(232,98,64,0.07) 0%, transparent 65%)" }}
        />
        {/* Bottom left glow */}
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(76,39,51,0.06) 0%, transparent 65%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-44">

        {/* ── Section Label ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 12 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-4 mb-16 lg:mb-24"
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(232,98,64,0.35)" }} />
          <span
            className="font-satoshi text-xs font-bold tracking-[0.22em] uppercase"
            style={{ color: "#E86240" }}
          >
            Why Ridgewell
          </span>
        </motion.div>

        {/* ── Editorial Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24 lg:mb-36">

          {/* LEFT: Large pullquote + body */}
          <div>
            {/* Pull quote lines */}
            <div className="mb-10">
              {pullLines.map(({ text, weight, opacity, italic }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className={`font-sans ${weight} leading-tight block`}
                    style={{
                      color: "#461E2D",
                      opacity,
                      fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)",
                      fontStyle: italic ? "italic" : "normal",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Accent divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
              style={{ transformOrigin: "left" }}
            >
              <div className="h-px w-16" style={{ background: "#E86240" }} />
            </motion.div>

            {/* Supporting copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col gap-4"
            >
              {[
                "One that looks great, fits your property, and doesn't turn into another expensive maintenance problem.",
                "That's exactly what we focus on.",
              ].map((line, i) => (
                <p
                  key={i}
                  className="font-satoshi font-medium leading-relaxed"
                  style={{
                    color: i === 1 ? "#4C2733" : "rgba(70,30,45,0.6)",
                    fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)",
                    fontWeight: i === 1 ? 700 : 500,
                  }}
                >
                  {line}
                </p>
              ))}
            </motion.div>

            {/* Craftsmanship mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.65 }}
              className="mt-10"
              style={{
                background: "rgba(76,39,51,0.07)",
                border: "1px solid rgba(76,39,51,0.1)",
                borderRadius: "20px",
                padding: "20px 28px",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <CraftsmanshipMark />
              <div>
                <p
                  className="font-sans font-black text-sm leading-tight mb-1"
                  style={{ color: "#461E2D" }}
                >
                  Ridgewell Landscape & Design
                </p>
                <p
                  className="font-satoshi text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(70,30,45,0.4)" }}
                >
                  Colorado Xeriscape Specialists
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Trust pillars */}
          <div className="flex flex-col gap-5 lg:pt-4">
            {pillars.map(({ icon, heading, body }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="group flex gap-5 items-start p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(76,39,51,0.05)",
                  border: "1px solid rgba(76,39,51,0.08)",
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(232,98,64,0.08)",
                    border: "1px solid rgba(232,98,64,0.15)",
                  }}
                >
                  {icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5 pt-0.5">
                  <h4
                    className="font-sans font-bold leading-tight"
                    style={{
                      color: "#461E2D",
                      fontSize: "clamp(0.95rem, 1.6vw, 1.06rem)",
                    }}
                  >
                    {heading}
                  </h4>
                  <p
                    className="font-satoshi font-medium leading-relaxed"
                    style={{
                      color: "rgba(70,30,45,0.55)",
                      fontSize: "clamp(0.82rem, 1.4vw, 0.9rem)",
                    }}
                  >
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Full-width cinematic statement bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl px-8 sm:px-14 py-12 lg:py-16"
          style={{
            background: "linear-gradient(135deg, #461E2D 0%, #4C2733 60%, #3a1825 100%)",
            border: "1px solid rgba(244,222,191,0.07)",
          }}
        >
          {/* Inner topo lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.5 }}>
            {[60, 120, 180].map((y, i) => (
              <path key={i} d={`M-50,${y} Q300,${y - 15} 700,${y + 10} Q1100,${y + 25} 1500,${y}`}
                fill="none" stroke="#F4DEBF" strokeWidth="0.5" strokeOpacity="0.07" />
            ))}
          </svg>

          {/* Right glow */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,98,64,0.15) 0%, transparent 65%)" }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-3">
              <p
                className="font-satoshi text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: "rgba(232,98,64,0.75)" }}
              >
                The Ridgewell Standard
              </p>
              <h3
                className="font-sans font-black leading-tight"
                style={{
                  color: "#F4DEBF",
                  fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  maxWidth: "560px",
                }}
              >
                A yard that works with Colorado,
                <br />
                <span style={{ color: "#E86240" }}>not against it.</span>
              </h3>
            </div>

            {/* Stats cluster */}
            <div className="flex gap-8 sm:gap-12 flex-shrink-0">
              {[
                { n: "100%", label: "Colorado Focused" },
                { n: "0", label: "Cookie-Cutter Designs" },
              ].map(({ n, label }, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span
                    className="font-sans font-black leading-none"
                    style={{
                      color: i === 1 ? "#E86240" : "#F4DEBF",
                      fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                    }}
                  >
                    {n}
                  </span>
                  <span
                    className="font-satoshi text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "rgba(244,222,191,0.35)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}