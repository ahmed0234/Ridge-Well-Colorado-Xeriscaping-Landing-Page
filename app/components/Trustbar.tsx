"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaShieldAlt, FaAward, FaLeaf } from "react-icons/fa";
import { GiCactus, GiWateringCan } from "react-icons/gi";
import { GiMountains } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";

// ── palette ────────────────────────────────────────────────────────────────
// #F4DEBF  sandy cream   (used for wave edge & text)
// #4C2733  deep plum     (section bg mid)
// #E86240  terracotta    (accent)
// #461E2D  darkest plum  (section bg base)
// #2a1018  near-black    (deepest bg)

const TRUST_ITEMS = [
  {
    id: "01", icon: FaStar,
    label: "5-Star Rated on Google", sub: "Google Reviews",
    pill: "500+ Clients", pillAccent: true, stars: true,
  },
  {
    id: "02", icon: GiMountains,
    label: "15+ Years of Experience", labelSup: true,
    sub: "in Colorado",
    pill: "Est. 2009",
  },
  {
    id: "03", icon: GiCactus,
    label: "Climate-Smart",
    sub: "Built for Colorado's harsh seasons",
    pill: "Water-wise",
  },
  {
    id: "04", icon: FaMapMarkerAlt,
    label: "Denver & Beyond",
    sub: "Serving the entire Front Range",
    pill: "50-mi radius",
  },
  {
    id: "05", icon: FaAward,
    label: "Award-Winning",
    sub: "ALCC Certified Professionals",
    pill: "Licensed & Insured", pillAccent: true,
  },
  {
    id: "06", icon: GiWateringCan,
    label: "60% Less Water Usage",
    sub: "Guaranteed xeriscaping results",
    pill: "Guaranteed", pillAccent: true,
  },
];

// ── Leaf border SVG (hand-illustrated hanging leaf clusters) ───────────────
function LeafBorderSVG() {
  const clusters = [
    { x: 40,  tall: 70,  r1: -18 }, { x: 62,  tall: 54,  r1: 12  },
    { x: 25,  tall: 46,  r1: -15 },
    { x: 180, tall: 75,  r1: 0   }, { x: 200, tall: 60,  r1: 8   },
    { x: 162, tall: 42,  r1: -20 },
    { x: 340, tall: 82,  r1: 0   }, { x: 362, tall: 66,  r1: 10  },
    { x: 322, tall: 48,  r1: -12 },
    { x: 500, tall: 72,  r1: 0   }, { x: 520, tall: 57,  r1: 14  },
    { x: 660, tall: 90,  r1: 0   }, { x: 685, tall: 75,  r1: 9   },
    { x: 638, tall: 52,  r1: -16 },
    { x: 810, tall: 78,  r1: 0   }, { x: 832, tall: 60,  r1: 11  },
    { x: 791, tall: 45,  r1: -18 },
    { x: 960, tall: 75,  r1: 0   }, { x: 980, tall: 56,  r1: 13  },
    { x: 1110,tall: 82,  r1: 0   }, { x: 1132,tall: 64,  r1: 10  },
    { x: 1090,tall: 45,  r1: -14 },
    { x: 1280,tall: 76,  r1: 0   }, { x: 1300,tall: 60,  r1: 9   },
    { x: 1400,tall: 68,  r1: -10 }, { x: 1420,tall: 52,  r1: 6   },
  ];
  const colors = ["#3a1e10","#4C2733","#461E2D"];

  return (
    <svg
      viewBox="0 0 1440 110"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="w-full block"
      style={{ lineHeight: 0, display: "block" }}
      aria-hidden="true"
    >
      {/* cream wave that transitions from the hero above */}
      <path
        d="M0 0 L1440 0 L1440 40 Q1320 80 1200 50 Q1080 20 960 55 Q840 90 720 50 Q600 10 480 55 Q360 100 240 60 Q120 20 0 50 Z"
        fill="#F4DEBF"
      />
      {/* vine accent line */}
      <path
        d="M0 2 Q100 8 200 3 Q300 -2 400 5 Q500 12 600 4 Q700 -3 800 6 Q900 15 1000 5 Q1100 -4 1200 4 Q1300 12 1440 2"
        fill="none" stroke="rgba(232,98,64,0.22)" strokeWidth="1.2"
      />
      {/* leaf clusters */}
      {clusters.map((c, i) => {
        const col = colors[i % colors.length];
        const w = c.tall * 0.38;
        return (
          <g key={i} transform={`translate(${c.x},${i % 3 === 0 ? 6 : i % 2 === 0 ? 12 : 8})`}>
            <path
              d={`M0 0 C-${w} ${c.tall * 0.28} -${w + 2} ${c.tall * 0.7} 0 ${c.tall} C${w + 2} ${c.tall * 0.7} ${w} ${c.tall * 0.28} 0 0Z`}
              fill={col} fillOpacity={0.55 + (i % 3) * 0.07}
              transform={`rotate(${c.r1})`}
            />
            {i % 4 === 0 && (
              <line x1="0" y1="0" x2="0" y2={c.tall}
                stroke="#2a1018" strokeWidth="0.6" strokeOpacity="0.4"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── Single trust card ─────────────────────────────────────────────────────
function TrustCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col gap-3 lg:gap-4 px-5 py-7 lg:py-10 lg:px-9
                 bg-[#2c1219] hover:bg-[#381a22]
                 transition-colors duration-300 cursor-default overflow-hidden cursor-pointer
                 ${index >= 3 ? "lg:border-t-[2px] lg:border-t-[#E86240]/20" : ""}`}
    >
      {/* ghost watermark number */}
      <span
        className="absolute -top-2 lg:-top-4 right-2 lg:right-4 font-serif text-[68px] lg:text-[100px] font-black italic leading-none
                   pointer-events-none select-none transition-all duration-300
                   text-transparent"
        style={{ WebkitTextStroke: "1px rgba(244,222,191,0.05)" }}
        aria-hidden="true"
      >
        {item.id}
      </span>

      {/* bottom terracotta line reveal */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] lg:h-[3px] bg-gradient-to-r from-transparent via-[#E86240] to-transparent
                      scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-[380ms] ease-out" />

      {/* icon */}
      <Icon
        className="text-[36px] lg:text-[48px] text-[#F4DEBF]/55 transition-all duration-300
                   group-hover:text-[#E86240] group-hover:scale-110 group-hover:-rotate-3"
      />

      {/* text */}
      <div className="mt-1 lg:mt-2">
        <p className="text-[19px] lg:text-[24px] font-semibold text-[#F4DEBF] leading-relaxed tracking-wide font-clash">
          {item.label}
          {item.labelSup && <sup className="text-[#E86240] text-[11px] lg:text-[14px] ml-0.5">+</sup>}
        </p>
        <p className="text-[11.5px] lg:text-[14px] font-light text-[#F4DEBF]/50 leading-snug mt-0.5 lg:mt-1.5 tracking-[0.03em]">
          {item.sub}
        </p>
      </div>

      {/* bottom elements (stars & pill) */}
      <div className="mt-auto flex flex-col items-start gap-2 lg:gap-3 pt-2 lg:pt-4">
        {/* stars */}
        {item.stars && (
          <div className="flex gap-1 lg:gap-1.5">
            {[0,1,2,3,4].map(i => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 300 }}
                className="text-[#E86240] text-[18px] lg:text-[22px]"
              >★</motion.span>
            ))}
          </div>
        )}

        {/* pill */}
        <span
          className={`text-[12px] lg:text-[13px] font-bold tracking-[0.16em] uppercase
                      px-2.5 py-1 lg:px-4 lg:py-1.5 rounded-full border
                      ${item.pillAccent
                        ? "bg-[#E86240]/15 text-[#E86240] border-[#E86240]/30"
                        : "bg-[#F4DEBF]/10 text-[#F4DEBF]/70 border-[#F4DEBF]/20"
                      }`}
        >
          {item.pill}
        </span>
      </div>
    </motion.div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export default function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-label="Why choose Ridgewell Landscape & Design"
      className="relative w-full overflow-hidden"
      style={{ background: "#2a1018" }}
    >
      {/* radial glow */}
      <div
        className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(232,98,64,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.045'/%3E%3C/svg%3E")`,
          backgroundSize: "512px 512px",
        }}
        aria-hidden="true"
      />

      {/* leaf border */}
      <LeafBorderSVG />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-24 lg:pb-32">

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex items-center justify-center gap-3 lg:gap-5 mb-5 lg:mb-8"
        >
          <span className="block w-20 lg:w-32 h-px bg-gradient-to-r from-transparent to-[#E86240]/50" />
          <span className="text-[13px] lg:text-[15px] font-semibold tracking-[0.28em] uppercase text-[#E86240]">
            Why Ridgewell
          </span>
          <span className="block w-20 lg:w-32 h-px bg-gradient-to-l from-transparent to-[#E86240]/50" />
        </motion.div>

        {/* headline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 lg:mb-20"
        >
          <h2 className="font-clash text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-wide text-[#F4DEBF]">
            Colorado's Most Trusted{" "}
            <em
              className="not-italic block lg:inline-block"
              style={{
                background: "linear-gradient(90deg,#E86240,#c8431e 50%,#E86240)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                animation: "shimmer 3.5s linear infinite",
              }}
            >
              Xeriscape Studio
            </em>
          </h2>
          <p className="mt-4 lg:mt-6 text-[14px] lg:text-[18px] font-light text-[#F4DEBF]/60 tracking-[0.06em]">
            Drought-resilient landscapes as beautiful as the Rockies
          </p>
        </motion.div>

        {/* trust grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] border border-[#F4DEBF]/[0.1] rounded-2xl lg:rounded-3xl overflow-hidden bg-[#F4DEBF]/[0.08]">
          {TRUST_ITEMS.map((item, i) => (
            <TrustCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* credential strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.82 }}
          className="mt-12 lg:mt-20 flex flex-wrap items-center justify-center gap-3 lg:gap-8 sm:gap-y-4 sm:gap-x-0"
        >
          {[
            { icon: FaShieldAlt, text: "Licensed & Insured" },
            { icon: FaLeaf,      text: "Certified Xeriscape Pro" },
            { icon: HiSparkles,  text: "Free Design Consult" },
            { icon: GiCactus,    text: "Eco-Conscious Design" },
          ].map(({ icon: Icon, text }, i) => (
            <motion.span
              key={text}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.06 }}
              className="flex items-center gap-2 lg:gap-3 text-[10px] sm:text-[11px] lg:text-[13px] font-semibold tracking-[0.12em] lg:tracking-[0.2em]
                         uppercase text-[#F4DEBF]/50 px-3 py-2 sm:py-0 sm:px-6 lg:px-8 
                         bg-[#F4DEBF]/[0.04] sm:bg-transparent rounded-lg sm:rounded-none
                         sm:border-r border-[#F4DEBF]/[0.1]
                         last:border-r-0 hover:text-[#F4DEBF]/80 transition-colors duration-200"
            >
              <Icon className="text-[#E86240] text-sm lg:text-lg shrink-0" />
              <span>{text}</span>
            </motion.span>
          ))}
        </motion.div>

        {/* pulse CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="mt-8 lg:mt-12 flex items-center justify-center gap-3 lg:gap-4"
        >
          <span className="relative flex h-2 w-2 lg:h-3 lg:w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#E86240] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 lg:h-3 lg:w-3 bg-[#E86240]" />
          </span>
          <span className="text-[10.5px] lg:text-[13px] font-bold tracking-[0.16em] lg:tracking-[0.2em] uppercase text-[#F4DEBF]/60">
            Now accepting new clients Denver &amp; Front Range
          </span>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
      `}</style>
    </section>
  );
}