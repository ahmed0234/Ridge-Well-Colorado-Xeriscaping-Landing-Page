"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "motion/react";

/* ── Types ────────────────────────────────────────── */
interface MetricCardProps {
  index: number;
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  sublabel: string;
  detail: string;
  accentColor: string;
  barWidth: number; // 0-100
  inView: boolean;
}

/* ── Tilt card hook ───────────────────────────────── */
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glowX   = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY   = useTransform(y, [-0.5, 0.5], [0, 100]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return { rotateX, rotateY, glowX, glowY, onMouseMove, onMouseLeave };
}

/* ── Single metric card ───────────────────────────── */
function MetricCard({
  index, icon, label, value, unit, sublabel, detail, accentColor, barWidth, inView,
}: MetricCardProps) {
  const [hovered, setHovered] = useState(false);
  const { rotateX, rotateY, glowX, glowY, onMouseMove, onMouseLeave } = useTilt();

  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(140px circle at ${gx}% ${gy}%, ${accentColor}18, transparent 70%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800 }}
      className="w-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { onMouseLeave(); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        className="relative rounded-2xl border border-foreground/8 bg-background/80 overflow-hidden cursor-default select-none h-full"
        animate={{ boxShadow: hovered
          ? `0 20px 60px -12px ${accentColor}28, 0 4px 20px -4px rgba(0,0,0,0.10)`
          : "0 4px 24px -4px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)"
        }}
        transition={{ boxShadow: { duration: 0.3 } }}
      >
        {/* Dynamic glow follow */}
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ background: glowBg }} />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-px">
          <motion.div
            className="h-full"
            style={{ background: accentColor, opacity: 0.4 }}
            animate={{ opacity: hovered ? 0.8 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="relative z-10 p-6 lg:p-7 flex flex-col gap-5">

          {/* Icon + label row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: `${accentColor}14` }}
                animate={{ scale: hovered ? 1.1 : 1, background: hovered ? `${accentColor}22` : `${accentColor}14` }}
                transition={{ duration: 0.25 }}
              >
                {icon}
              </motion.div>
              <span className="text-[13px] uppercase tracking-wider font-semibold text-foreground/65 font-clash">
                {label}
              </span>
            </div>
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: accentColor }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
              />
              <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/70 font-semibold font-clash">Live</span>
            </div>
          </div>

          {/* Primary value */}
          <div>
            <div className="flex items-baseline gap-2 leading-none">
              <motion.span
                className="font-heading font-bold text-foreground tracking-wide font-clash"
                style={{ fontSize: "clamp(2rem,3.5vw,2.75rem)", fontVariantNumeric: "tabular-nums" }}
                animate={{ color: hovered ? accentColor : "var(--foreground)" }}
                transition={{ duration: 0.3 }}
              >
                {value}
              </motion.span>
              <span className="text-sm lg:text-lg font-semibold text-foreground/65 pb-0.5 font-clash tracking-wide">{unit}</span>
            </div>
            <p className="text-[12px] text-foreground/75 font-medium mt-1.5 leading-snug font-satoshi">{sublabel}</p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="h-1.5 rounded-full bg-foreground/7 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${accentColor}aa, ${accentColor})` }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${barWidth}%` } : { width: 0 }}
                transition={{ duration: 1.1, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-foreground/65 uppercase tracking-[0.12em] font-satoshi font-semibold">Impact scale</span>
              <span className="text-[13px] tracking-wider tabular-nums font-semibold font-satoshi" style={{ color: accentColor }}>{barWidth}%</span>
            </div>
          </div>

          {/* Detail footer */}
          <motion.div
            className="pt-4 border-t border-foreground/6"
            animate={{ borderColor: hovered ? `${accentColor}30` : "rgba(var(--foreground-rgb),0.06)" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[13px] text-foreground/55 leading-normal font-semibold font-satoshi">{detail}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Environmental tag ────────────────────────────── */
function EnvTag({ emoji, label, delay, inView }: { emoji: string; label: string; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0"
    >
      <motion.div
        className="flex items-center justify-center text-center gap-2.5 px-4 py-2.5 rounded-full border border-foreground/10 bg-background/60 backdrop-blur-sm cursor-default "
        animate={{
          borderColor: hovered ? "#E8624035" : "rgba(var(--foreground-rgb,70,30,45),0.10)",
          background: hovered ? "rgba(232,98,64,0.06)" : "rgba(var(--background-rgb,244,222,191),0.60)",
          y: hovered ? -2 : 0,
          boxShadow: hovered
            ? "0 8px 24px -4px rgba(232,98,64,0.14), 0 0 0 1px rgba(232,98,64,0.12)"
            : "none",
        }}
        transition={{ duration: 0.22 }}
      >
        <span className="text-md leading-none">{emoji}</span>
        <span className="text-[15x] font-semibold text-foreground/55 tracking-wide whitespace-nowrap font-satoshi ">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────── */
export default function TransformationMetricsDashboard() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const ribbonRef   = useRef<HTMLDivElement>(null);
  const isInView    = useInView(sectionRef, { once: true, margin: "-60px" });
  const ribbonInView = useInView(ribbonRef, { once: true, margin: "-40px" });

  const metrics: Omit<MetricCardProps, "inView">[] = [
    {
      index: 0,
      icon: <span className="text-[18px]">💧</span>,
      label: "Water Saved",
      value: "18,420",
      unit: "gal/yr",
      sublabel: "Annual reduction vs. traditional lawn",
      detail: "Equivalent to 276 full bathtubs of water preserved every single year — and it compounds over time.",
      accentColor: "#4A9EBF",
      barWidth: 84,
    },
    {
      index: 1,
      icon: <span className="text-[18px]">🌿</span>,
      label: "Maintenance Cut",
      value: "−62",
      unit: "%",
      sublabel: "Fewer hours per month, starting week one",
      detail: "From bi-weekly mowing and watering schedules down to a seasonal walkthrough. More weekend, less yardwork.",
      accentColor: "#5E8A4A",
      barWidth: 62,
    },
    {
      index: 2,
      icon: <span className="text-[18px]">🌱</span>,
      label: "Native Species",
      value: "24",
      unit: "plants",
      sublabel: "Colorado-native selections curated for your zone",
      detail: "Each species chosen for drought tolerance, seasonal interest, and pollinator value — thriving without irrigation.",
      accentColor: "#E86240",
      barWidth: 72,
    },
    {
      index: 3,
      icon: <span className="text-[18px]">📅</span>,
      label: "Project Duration",
      value: "14",
      unit: "days",
      sublabel: "Full transformation, start to finish",
      detail: "Minimal disruption. Your property is fully installed, mulched, and walkthrough-ready within two weeks.",
      accentColor: "#A0845C",
      barWidth: 48,
    },
  ];

  const envTags = [
    { emoji: "🌎", label: "Supports Local Ecosystems" },
    { emoji: "💧", label: "Conserves Water" },
    { emoji: "☀️", label: "Climate Resilient" },
    { emoji: "🐝", label: "Pollinator Friendly" },
    { emoji: "🌱", label: "Sustainable Materials" },
    { emoji: "🦋", label: "Wildlife Habitat" },
    { emoji: "🏔️", label: "Colorado Certified" },
  ];

  return (
    <div className="w-full bg-background">

      {/* ── Section header ──────────────────────────────── */}
      <div ref={sectionRef} className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-10 pb-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.24em] font-semibold text-[#E86240] border border-[#E86240]/22 bg-[#E86240]/7 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E86240]" />
              Project Impact
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-2xl lg:text-4xl font-bold text-foreground tracking-normal leading-tight font-clash"
            >
              Transformation Outcomes
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm lg:text-lg text-foreground/65 mt-2 max-w-lg leading-relaxed font-satoshi font-semibold"
            >
              Real results from a completed Colorado xeriscape project. Every number is measured, not estimated.
            </motion.p>
          </div>

          {/* Dashboard badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-foreground/8 bg-foreground/[0.03] self-start sm:self-auto"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-[#07a527]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] uppercase tracking-[0.16em] text-foreground/75 font-semibold font-clash">
              Live project data
            </span>
          </motion.div>
        </div>

        {/* ── Metric cards grid ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} inView={isInView} />
          ))}
        </div>

        {/* ── Summary strip ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 rounded-2xl border border-foreground/8 bg-gradient-to-r from-foreground/[0.025] via-[#E86240]/[0.03] to-foreground/[0.025] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style={{ background: "rgba(232,98,64,0.10)" }}>
              📊
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/35 font-semibold mb-0.5">
                ROI Estimate
              </p>
              <p className="text-lg font-semibold text-foreground/75 font-satoshi">
                Average homeowner recovers install cost in{" "}
                <span className="text-[#E86240] font-bold">3.2 years</span>{" "}
                through water savings alone.
              </p>
            </div>
          </div>
          <div className="h-px sm:h-8 sm:w-px w-full bg-foreground/8" />
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ background: "rgba(74,158,191,0.10)" }}>
              🌊
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.16em] text-foreground/55 font-semibold mb-0.5 font-clash">
                10-Year Impact
              </p>
              <p className="text-sm font-semibold text-foreground/70 font-clash">
                <span className="text-[#4A9EBF] font-bold">184,200 gal</span>{" "}
                preserved from this single yard
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Environmental Benefits Ribbon ────────────────── */}
      <div ref={ribbonRef} className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-12">

        {/* Divider with label */}
        <div className="flex items-center gap-4 mb-7">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={ribbonInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="origin-left flex-1 h-px bg-gradient-to-r from-[#E86240]/25 to-transparent"
          />
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={ribbonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.22em] font-semibold text-foreground/35 whitespace-nowrap flex-shrink-0"
          >
            Environmental Benefits
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={ribbonInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="origin-right flex-1 h-px bg-gradient-to-l from-[#E86240]/25 to-transparent"
          />
        </div>

        {/* Tags — overflow scroll on mobile, wrap on desktop */}
        <div className="flex flex-wrap gap-6 lg:gap-3 items-center justify-center">
          {envTags.map((tag, i) => (
            <EnvTag
              key={tag.label}
              emoji={tag.emoji}
              label={tag.label}
              delay={0.06 * i + 0.25}
              inView={ribbonInView}
            />
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={ribbonInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[16px] text-foreground/65 mt-5 leading-relaxed max-w-xl font-clash font-semibold"
        >
          All ecological designations verified by the Colorado Native Plant Society and aligned with Denver Water's
          Xeriscape Program guidelines.
        </motion.p>
      </div>
    </div>
  );
}