"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const cities = [
  { name: "Denver" },
  { name: "Arvada" },
  { name: "Aurora" },
  { name: "Brighton" },
  { name: "Broomfield" },
  { name: "Centennial" },
  { name: "Parker" },
  { name: "Lakewood" },
];

const TopoLines = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="topoFade" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#F4DEBF" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#F4DEBF" stopOpacity="0" />
      </radialGradient>
    </defs>
    {[
      "M-100,180 Q200,120 500,200 Q800,280 1100,160 Q1400,40 1700,180",
      "M-100,240 Q150,180 450,260 Q750,340 1050,220 Q1350,100 1700,240",
      "M-100,300 Q180,240 480,310 Q780,380 1080,270 Q1380,160 1700,290",
      "M-100,360 Q200,300 520,370 Q840,440 1140,310 Q1440,180 1700,350",
      "M-100,420 Q220,360 540,430 Q860,500 1160,370 Q1460,240 1700,410",
      "M-100,480 Q160,420 460,490 Q760,560 1060,430 Q1360,300 1700,470",
      "M-100,540 Q190,480 500,545 Q810,610 1110,480 Q1410,350 1700,530",
      "M-100,600 Q210,540 530,605 Q850,670 1150,540 Q1450,410 1700,590",
      "M-100,120 Q230,60 540,140 Q850,220 1150,100 Q1450,-20 1700,120",
      "M-100,60 Q250,0 560,80 Q870,160 1170,40 Q1470,-80 1700,60",
    ].map((d, i) => (
      <path
        key={i}
        d={d}
        fill="none"
        stroke="#F4DEBF"
        strokeWidth="0.75"
        strokeOpacity={0.06 - i * 0.003}
      />
    ))}
    <rect width="100%" height="100%" fill="url(#topoFade)" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z"
      fill="#E86240"
      fillOpacity="0.9"
    />
    <circle cx="7" cy="5" r="1.4" fill="#461E2D" />
  </svg>
);

const CityCard = ({ city, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{
      duration: 0.6,
      delay: index * 0.07,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{
      y: -5,
      transition: { duration: 0.22, ease: "easeOut" },
    }}
    className="group relative cursor-default"
  >
    {/* Bottom glow on hover */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(ellipse at 50% 110%, rgba(232,98,64,0.2) 0%, transparent 70%)",
        filter: "blur(10px)",
        transform: "translateY(6px) scaleX(0.88)",
      }}
    />

    {/* Card surface */}
    <div
      className="relative rounded-2xl flex items-center gap-4 transition-all duration-300"
      style={{
        padding: "clamp(1rem, 2vw, 1.35rem) clamp(1.1rem, 2.5vw, 1.6rem)",
        background: "rgba(76, 39, 51, 0.42)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(244, 222, 191, 0.08)",
        boxShadow:
          "0 4px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(244,222,191,0.06)",
      }}
    >
      {/* Hover border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: "1px solid rgba(232,98,64,0.38)" }}
      />

      {/* Animated pin */}
      <motion.div
        animate={{ y: [0, -2.5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.28,
        }}
        className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0"
        style={{
          background: "rgba(232,98,64,0.1)",
          border: "1px solid rgba(232,98,64,0.18)",
        }}
      >
        <PinIcon />
      </motion.div>

      {/* City name */}
      <span
        className="font-sans font-bold tracking-tight leading-none"
        style={{
          color: "#F4DEBF",
          fontSize: "clamp(1.05rem, 2vw, 1.4rem)",
          letterSpacing: "-0.01em",
        }}
      >
        {city.name}
      </span>
    </div>
  </motion.div>
);

export default function AreasServed() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#461E2D" }}
    >
      <TopoLines />

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(232,98,64,0.1) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10 max-w-8xl mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-20">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-black text-center leading-[1.05] tracking-tight mb-6"
          style={{
            color: "#F4DEBF",
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
          }}
        >
          Proudly Serving Denver
          <br />
          <span
            style={{
              color: "#F4DEBF",
              opacity: 0.6,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "0.72em",
            }}
          >
            & Surrounding Areas
          </span>
        </motion.h2>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-12"
          style={{ transformOrigin: "center" }}
        >
          <div
            className="h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, #E86240, transparent)",
            }}
          />
        </motion.div>

        {/* City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 mb-16">
          {cities.map((city, i) => (
            <CityCard key={city.name} city={city} index={i} />
          ))}
        </div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <div
            className="w-full max-w-xs h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(244,222,191,0.15), transparent)",
            }}
          />

          <div className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2C5 2 2 6 2 10c0 2 1 3.5 2.5 4.5C5.5 15.5 7 16 9 16s3.5-.5 4.5-1.5C15 13.5 16 12 16 10c0-4-3-8-7-8z"
                fill="rgba(232,98,64,0.25)"
                stroke="#E86240"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
              <path
                d="M9 2 Q9 9 9 16"
                stroke="#E86240"
                strokeWidth="0.7"
                strokeOpacity="0.4"
              />
            </svg>

            <p
              className="font-satoshi font-semibold text-center tracking-wide"
              style={{
                color: "rgba(244,222,191,0.45)",
                fontSize: "clamp(0.78rem, 1.4vw, 0.88rem)",
                letterSpacing: "0.04em",
              }}
            >
              Built for Colorado climate and crafted for lasting beauty.
            </p>

            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2C5 2 2 6 2 10c0 2 1 3.5 2.5 4.5C5.5 15.5 7 16 9 16s3.5-.5 4.5-1.5C15 13.5 16 12 16 10c0-4-3-8-7-8z"
                fill="rgba(232,98,64,0.25)"
                stroke="#E86240"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
              <path
                d="M9 2 Q9 9 9 16"
                stroke="#E86240"
                strokeWidth="0.7"
                strokeOpacity="0.4"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
