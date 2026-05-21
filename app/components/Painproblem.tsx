"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   PALETTE (Strictly Respected)
   #F4DEBF  sand        → background surfaces, light fills
   #4C2733  plum        → secondary text, borders
   #E86240  terracotta  → accent, CTA, "solution" highlights
   #461E2D  deep plum   → headings, primary text
───────────────────────────────────────────────────────────── */

/* ── SVG Multi-line Sketchy Underline Wrapper ── */
function CurlyUnderlineText({
  children,
  inView,
}: {
  children: React.ReactNode;
  inView: boolean;
}) {
  return (
    <span className="relative inline-block w-full font-sans font-bold italic sm:text-xl">
      {children}
      <span className="absolute left-0 right-0 -bottom-2 h-[12px] pointer-events-none block overflow-hidden">
        <motion.svg
          viewBox="0 0 600 12"
          preserveAspectRatio="none"
          className="w-full h-full"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.65 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          <motion.path
            d="M4 7 Q 75 2, 150 7 T 300 7 T 450 7 T 596 7"
            fill="none"
            stroke="#E86240"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </motion.svg>
      </span>
    </span>
  );
}

/* ── SVG scratch / scribble highlight ── */
function ScribbleUnderline({
  color = "#E86240",
  opacity = 0.55,
  delay = 0,
  inView = false,
}: {
  color?: string;
  opacity?: number;
  delay?: number;
  inView?: boolean;
}) {
  return (
    <span className="absolute -bottom-1 left-0 w-full h-[10px] pointer-events-none block">
      <motion.svg
        viewBox="0 0 220 14"
        className="w-full h-full"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity } : {}}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
        aria-hidden
      >
        <motion.path
          d="M3 9 C30 3, 70 11, 110 7 C150 3, 185 11, 218 6"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
        <motion.path
          d="M5 12 C50 8, 100 14, 150 10 C180 8, 205 12, 218 10"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeOut" }}
        />
      </motion.svg>
    </span>
  );
}

/* ── SVG angry X marker for pain items ── */
function PainX({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5"
      initial={{ scale: 0, rotate: -30 }}
      animate={inView ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 18, delay }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="rgba(70,30,45,0.10)"
        stroke="#461E2D"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, delay }}
      />
      <motion.line
        x1="8"
        y1="8"
        x2="16"
        y2="16"
        stroke="#461E2D"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.15 }}
      />
      <motion.line
        x1="16"
        y1="8"
        x2="8"
        y2="16"
        stroke="#461E2D"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.22 }}
      />
    </motion.svg>
  );
}

/* ── SVG check marker for solution items ── */
function SolutionCheck({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5"
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 360, damping: 18, delay }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="rgba(232,98,64,0.12)"
        stroke="#E86240"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, delay }}
      />
      <motion.polyline
        points="7.5,12.5 10.5,15.5 16.5,9"
        fill="none"
        stroke="#E86240"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.18 }}
      />
    </motion.svg>
  );
}

/* ── 3D tilt card wrapper ── */
function TiltCard({
  children,
  className = "",
  intensity = 5,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ rotateX: -y * intensity, rotateY: x * intensity });
  }
  function onLeave() {
    setStyle({ rotateX: 0, rotateY: 0 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateX: style.rotateX, rotateY: style.rotateY }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Animated count-up number ── */
function CountUp({
  end,
  suffix = "",
  inView,
  delay,
}: {
  end: number;
  suffix?: string;
  inView: boolean;
  delay: number;
}) {
  const [value, setVal] = useState(0);
  const started = useRef(false);

  if (inView && !started.current) {
    started.current = true;
    const duration = 1400;
    const start = performance.now() + delay * 1000;
    function tick(now: number) {
      if (now < start) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function PainProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const paraInView = useInView(paraRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  /* Parallax on the decorative depth blobs */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const pain = [
    {
      text: "High water bills every summer",
      subtext: "Average CO home spends $900+/yr on lawn irrigation",
    },
    {
      text: "Dead or patchy grass",
      subtext: "Colorado's climate kills traditional turf within weeks",
    },
    {
      text: "Constant watering schedules",
      subtext: "Time spent babysitting sprinklers instead of living",
    },
    {
      text: "Endless weekend maintenance",
      subtext: "Mowing, reseeding, fertilizing — every single month",
    },
  ];

  const solution = [
    {
      text: "Lower water usage by up to 60%",
      subtext: "Native plants built for Colorado's dry climate",
    },
    {
      text: "Clean, modern landscaping",
      subtext: "Designed to look premium year-round, zero effort",
    },
    {
      text: "Maintenance cut by over half",
      subtext: "Seasonal walkthrough replaces weekly upkeep",
    },
    {
      text: "A yard built for Colorado weather",
      subtext: "Hardy, beautiful, and permanently thriving",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4DEBF] py-24 lg:py-36 text-[#461E2D]"
    >
      {/* ── Ambient depth blobs ─────────────────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          y: blobY1,
          opacity: 0.08,
          background: "radial-gradient(circle, #461E2D 0%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{
          y: blobY2,
          opacity: 0.07,
          background: "radial-gradient(circle, #E86240 0%, transparent 70%)",
        }}
      />

      {/* Organic Micro-Grain Overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── EYEBROW ────────────────────────────────────────── */}
        <div ref={headRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8
                       border border-[#461E2D]/20 bg-[#461E2D]/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E86240] flex-shrink-0" />
            <span className="text-sm font-bold uppercase tracking-wide text-[#461E2D]/80 font-sans">
              The Real Problem
            </span>
          </motion.div>

          {/* ── MAIN HEADLINE ─────────────────────────────────── */}
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 48 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="leading-[1.1] tracking-tight text-[#461E2D] text-3xl lg:text-6xl"
              style={{
                fontWeight: 800,
              }}
            >
              Colorado Landscaping{" "}
              <span className="relative inline-block pr-2">
                Shouldn't Feel
                <ScribbleUnderline
                  color="#E86240"
                  opacity={0.7}
                  delay={0.7}
                  inView={headInView}
                />
              </span>{" "}
              Like A{" "}
              <span className="relative inline-block pr-2">
                Second Job
                <ScribbleUnderline
                  color="#4C2733"
                  opacity={0.4}
                  delay={1.0}
                  inView={headInView}
                />
              </span>
            </motion.h2>
          </div>

          {/* ── BODY COPY ─────────────────────────────────────── */}
          {/* ── BODY COPY ─────────────────────────────────────── */}
          <div ref={paraRef} className="max-w-2xl mb-14">
            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={paraInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[#461E2D]/85 text-sm sm:text-xl leading-relaxed mb-6 font-sans font-semibold"
            >
              Between rising water bills, harsh dry summers, patchy lawns, and
              constant upkeep, traditional yards in Colorado can become
              expensive headaches fast.
            </motion.p>

            {/* Paragraph 2 - FULLY HIGHLIGHTED WITH CURLY UNDERLINE */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={paraInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[#461E2D]/85 text-sm sm:text-base font-medium leading-relaxed mb-8 pb-2"
            >
              <CurlyUnderlineText inView={paraInView}>
                Most homeowners end up spending thousands of dollars annually on
                irrigation and treatments for a yard that still doesn't thrive.
              </CurlyUnderlineText>
            </motion.p>

            {/* Paragraph 3 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={paraInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.36,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[#E86240] font-bold text-base sm:text-xl mt-6 leading-relaxed mb-4 font-sans"
            >
              That's why more Colorado homeowners are switching to modern
              xeriscaping a cleaner, lower-maintenance landscape engineered to
              look premium year-round without constant watering.
            </motion.p>
          </div>
        </div>

        {/* ── STATS STRIP ───────────────────────────────────── */}
        <div ref={statsRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-3 sm:gap-6 p-6 sm:p-8 rounded-2xl
                       border border-[#461E2D]/10 bg-[#461E2D]/[0.03]"
          >
            {[
              {
                val: 900,
                suffix: "+",
                unit: "$/yr wasted",
                label: "on lawn water bills",
              },
              {
                val: 60,
                suffix: "%",
                unit: "water saved",
                label: "with xeriscaping",
              },
              {
                val: 14,
                suffix: "",
                unit: "days total",
                label: "full transformation",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`text-center ${
                  i > 0 ? "border-l border-[#461E2D]/10" : ""
                }`}
              >
                <div
                  className="font-bold leading-none mb-1 text-[#461E2D]"
                  style={{ fontSize: "clamp(1.5rem, 3.8vw, 2.6rem)" }}
                >
                  <CountUp
                    end={s.val}
                    suffix={s.suffix}
                    inView={statsInView}
                    delay={0.2 + i * 0.15}
                  />
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#E86240] mb-0.5">
                  {s.unit}
                </div>
                <div className="text-[9px] sm:text-[11px] text-[#461E2D]/50 tracking-wide hidden sm:block">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── PAIN ↔ SOLUTION GRID ──────────────────────────── */}
        <div ref={gridRef} className="relative">
          {/* Section Divider Text Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-[#461E2D]/20 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#461E2D]/40 font-bold whitespace-nowrap">
              The Before &amp; After Comparison
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-[#461E2D]/20 to-transparent" />
          </motion.div>

          {/* Cards container wrapper holding structural elements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative">
            {/* ── PAIN CARD ─────────────────────────────────── */}
            <TiltCard intensity={4}>
              <motion.div
                initial={{ opacity: 0, x: -40, rotateY: -8 }}
                animate={gridInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-2xl overflow-hidden border border-[#461E2D]/15 flex flex-col justify-between
                           shadow-[0_12px_40px_rgba(70,30,45,0.04),0_2px_8px_rgba(70,30,45,0.02)] bg-gradient-to-br from-[#461E2D]/[0.02] to-[#4C2733]/[0.05]"
              >
                <div>
                  {/* Card header */}
                  <div className="px-6 py-5 border-b border-[#461E2D]/10 bg-[#461E2D]/[0.03]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#461E2D]/10 flex-shrink-0">
                        <svg viewBox="0 0 20 20" className="w-4 h-4">
                          <line
                            x1="4"
                            y1="4"
                            x2="16"
                            y2="16"
                            stroke="#461E2D"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="16"
                            y1="4"
                            x2="4"
                            y2="16"
                            stroke="#461E2D"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#461E2D]/50 font-bold mb-0.5">
                          Sound familiar?
                        </p>
                        <h3 className="text-xl font-extrabold text-[#461E2D] tracking-tight">
                          The Traditional Way
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Pain items list */}
                  <ul className="px-6 py-6 space-y-5">
                    {pain.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={gridInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.55,
                          delay: 0.28 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-start gap-4"
                      >
                        <PainX inView={gridInView} delay={0.3 + i * 0.08} />
                        <div className="min-w-0">
                          <span className="text-sm sm:text-base font-bold text-[#461E2D] block leading-snug ">
                            {item.text}
                          </span>
                          <span className="text-xs text-[#461E2D]/60 mt-0.5 block leading-normal">
                            {item.subtext}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Distress decorative graphical element container */}
                <div className="px-6 pb-6 mt-4">
                  <svg
                    viewBox="0 0 300 28"
                    className="w-full h-5 opacity-[0.15]"
                    aria-hidden
                  >
                    <path
                      d="M0 14 C20 6, 50 20, 80 10 C110 2, 130 18, 160 12 C190 6, 220 20, 250 8 C270 2, 285 16, 300 14"
                      fill="none"
                      stroke="#461E2D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </TiltCard>

            {/* ── SOLUTION CARD ─────────────────────────────── */}
            <TiltCard intensity={4}>
              <motion.div
                initial={{ opacity: 0, x: 40, rotateY: 8 }}
                animate={gridInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{
                  duration: 0.85,
                  delay: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-2xl overflow-hidden border border-[#E86240]/25 flex flex-col justify-between
                           shadow-[0_12px_40px_rgba(232,98,64,0.05),0_2px_8px_rgba(232,98,64,0.02)] bg-gradient-to-br from-[#E86240]/[0.03] to-[#E86240]/[0.07]"
              >
                <div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#E86240]/40 to-transparent" />

                  {/* Card header */}
                  <div className="px-6 py-5 border-b border-[#E86240]/15 bg-[#E86240]/[0.04]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#E86240]/15 flex-shrink-0">
                        <svg viewBox="0 0 20 20" className="w-4 h-4">
                          <polyline
                            points="3.5,10.5 8,15 16.5,5.5"
                            fill="none"
                            stroke="#E86240"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#E86240]/70 font-bold mb-0.5">
                          The Ridgewell difference
                        </p>
                        <h3 className="text-xl font-extrabold text-[#461E2D] tracking-tight">
                          The Modern Solution
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Solution items list */}
                  <ul className="px-6 py-6 space-y-5">
                    {solution.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={gridInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.55,
                          delay: 0.38 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-start gap-4"
                      >
                        <SolutionCheck
                          inView={gridInView}
                          delay={0.4 + i * 0.08}
                        />
                        <div className="min-w-0">
                          <span className="text-sm sm:text-base font-bold text-[#461E2D] block leading-snug">
                            {item.text}
                          </span>
                          <span className="text-xs text-[#461E2D]/60 mt-0.5 block leading-normal">
                            {item.subtext}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Bottom elegant micro line spacer structure */}
                <div className="px-6 pb-6 mt-4">
                  <div className="h-px bg-gradient-to-r from-[#E86240]/30 via-[#E86240]/10 to-transparent rounded-full" />
                </div>
              </motion.div>
            </TiltCard>

            {/* ── ARROW CONNECTOR DESKTOP OVERLAY ── */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={gridInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="w-11 h-11 rounded-full border-2 border-[#E86240]/40 bg-[#F4DEBF]
                           flex items-center justify-center shadow-md"
              >
                <ArrowRight className="w-5 h-5 text-[#E86240]" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── TRUST MICRO-COPY ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5"
        >
          {[
            "300+ Colorado yards transformed",
            "15 years local expertise",
            "Free design consultation layout",
          ].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-xs font-medium text-[#461E2D]/60"
            >
              <span className="w-1 h-1 rounded-full bg-[#E86240] flex-shrink-0" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* ── CTA BUTTON INTERACTIVE ZONE ────────────────────── */}
        <div ref={ctaRef} className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex flex-col items-center gap-4"
          >
            <p className="text-xs font-bold text-[#E86240] uppercase tracking-[0.2em]">
              Ready for the switch?
            </p>

            <motion.a
              href="#consultation"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-8 py-4 sm:px-10 sm:py-4.5 bg-[#E86240]"
              whileHover={{
                scale: 1.03,
                y: -1,
                boxShadow: "0 12px 30px rgba(232,98,64,0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Subtle hover sweep element anim layout */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="relative text-sm sm:text-base font-bold tracking-[0.03em] text-white">
                Get Your Free Design Consultation
              </span>
              <ArrowRight className="relative w-4 h-4 text-white/90 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <p className="text-[11px] text-[#461E2D]/50 mt-1">
              No commitment &nbsp;·&nbsp; Property assessment included
              &nbsp;·&nbsp; Timeline 4–6 weeks
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
