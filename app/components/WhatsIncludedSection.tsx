"use client";

/**
 * ServicesSection.jsx — Ridgewell Landscape & Design
 *
 * IMAGE PROPS GUIDE
 * -----------------
 * Every <img> uses a named `src` prop so you can drop in real photography
 * without touching layout logic. Pass paths via the `images` prop at the
 * top of the file, or replace the placeholder strings directly.
 *
 * Default images (public/services — override via `images` prop if needed):
 *   design        → /services/xeriscaping_land.png
 *   beforeLawn    → /services/Before_xesriscape_image.png
 *   afterXeri     → /services/After_xeriscape_image.png
 *   rockGravel    → /services/Decorative_rock_gravel.png
 *   plants        → /services/Drought_resistant_plants.png
 *   irrigation    → /services/Smart_irrigation_system.png
 *   walkway       → /services/Walkways_outdoor_features.png
 *
 * Recommended image dimensions:
 *   design / plants → minimum 1400 × 900 px
 *   rock / irrigation / walkway → minimum 900 × 700 px
 *   before / after → minimum 900 × 640 px each, same aspect ratio
 */

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DesertHorizonEdge from "./Deserthorizon";

/** Default service images — paths match public/services filenames exactly */
const DEFAULT_IMAGES = {
  design: "/services/xeriscaping_land.png",
  beforeLawn: "/services/After_xeriscape_image.png",
  afterXeri: "/services/Before_xesriscape_image.png",
  rockGravel: "/services/Decorative_rock_gravel.png",
  plants: "/services/Drought_resistant_plants.png",
  irrigation: "/services/Smart_irrigation_system.png",
  walkway: "/services/Walkways_outdoor_features.png",
} as const;

// ─── Topo background lines (decorative only, no illustrations) ───────────────

const TopoLines = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none select-none"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {[
      "M-200,80  Q400,30  900,100 Q1400,170 1900,60  Q2200,0   2600,80",
      "M-200,160 Q350,110 850,180 Q1350,250 1850,140 Q2150,80  2600,160",
      "M-200,240 Q370,190 870,255 Q1370,320 1870,210 Q2170,150 2600,240",
      "M-200,320 Q390,270 890,335 Q1390,400 1890,285 Q2190,225 2600,320",
      "M-200,400 Q360,350 860,415 Q1360,480 1860,365 Q2160,305 2600,400",
      "M-200,480 Q380,430 880,495 Q1380,560 1880,440 Q2180,380 2600,480",
      "M-200,30  Q420,−20 920,50  Q1420,120 1920,10  Q2220,−50 2600,30",
    ].map((d, i) => (
      <path
        key={i}
        d={d}
        fill="none"
        stroke="#F4DEBF"
        strokeWidth="0.65"
        strokeOpacity={0.038}
      />
    ))}
  </svg>
);

// ─── Shared overlay gradient for images ──────────────────────────────────────

const IMG_OVERLAY =
  "linear-gradient(to top, rgba(70,30,45,0.82) 0%, rgba(70,30,45,0.28) 50%, rgba(70,30,45,0.06) 100%)";

const IMG_OVERLAY_SIDE =
  "linear-gradient(to right, rgba(70,30,45,0.75) 0%, rgba(70,30,45,0.1) 60%, transparent 100%)";

// ─── Accent pill ─────────────────────────────────────────────────────────────

const AccentPill = ({ children }) => (
  <span
    className="inline-flex items-center gap-1.5 font-satoshi text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full w-fit"
    style={{
      color: "#E86240",
      background: "rgba(232,98,64,0.13)",
      border: "1px solid rgba(232,98,64,0.28)",
    }}
  >
    <span
      className="block w-1.5 h-1.5 rounded-full shrink-0"
      style={{ background: "#E86240" }}
    />
    {children}
  </span>
);

// ─── Image placeholder (replace src with real photo path) ────────────────────

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
};

const Photo = ({
  src,
  alt,
  className = "",
  style = {},
  priority = false,
}: PhotoProps) => (
  <img
    src={src}
    alt={alt}
    className={`block w-full h-full min-h-full min-w-full object-cover object-center ${className}`}
    style={style}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
    draggable={false}
  />
);

// ─── BLOCK 1 — Full-width hero service (Custom Design) ───────────────────────

const HeroServiceBlock = ({ service, index }) => {
  const photoSrc = service.image?.src ?? DEFAULT_IMAGES.design;
  const photoAlt = service.image?.alt ?? "Custom Xeriscape Design";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative w-full overflow-hidden rounded-3xl"
      style={{
        height: "clamp(380px, 55vw, 620px)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
      }}
    >
      {/* Real photo */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        <Photo src={photoSrc} alt={photoAlt} priority />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: IMG_OVERLAY }}
      />

      {/* Side vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(70,30,45,0.35) 0%, transparent 45%, rgba(70,30,45,0.35) 100%)",
        }}
      />

      {/* Content — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] p-8 lg:p-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="flex flex-col gap-4 max-w-xl">
          <h3
            className="font-sans font-black leading-tight"
            style={{
              color: "#F4DEBF",
              fontSize: "clamp(1.85rem, 3.8vw, 2.8rem)",
              letterSpacing: "-0.025em",
              textShadow: "0 2px 24px rgba(0,0,0,0.5)",
            }}
          >
            {service.title}
          </h3>
          <p
            className="font-satoshi font-medium leading-relaxed max-w-md"
            style={{
              color: "rgba(244,222,191,0.72)",
              fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            {service.body}
          </p>
        </div>

        {/* Service number */}
        <div
          className="font-sans font-black self-end lg:self-auto flex-shrink-0"
          style={{
            color: "rgba(244,222,191,0.08)",
            fontSize: "clamp(5rem, 10vw, 9rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}
        >
          {service.number}
        </div>
      </div>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"
        style={{ background: "linear-gradient(90deg, #E86240, transparent)" }}
      />
    </motion.div>
  );
};

// ─── Before / After drag compare slider ──────────────────────────────────────

type CompareImage = { src: string; alt: string };

const BeforeAfterCompareSlider = ({
  beforeImage,
  afterImage,
}: {
  beforeImage: CompareImage;
  afterImage: CompareImage;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX =
        "touches" in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (clientX != null) updateFromClientX(clientX);
    };

    const onEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    window.addEventListener("touchcancel", onEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("touchcancel", onEnd);
    };
  }, [isDragging, updateFromClientX]);

  const startDrag = (clientX: number) => {
    setIsDragging(true);
    updateFromClientX(clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 4));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl select-none touch-none"
      style={{
        height: "clamp(280px, 42vw, 520px)",
        boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
        cursor: isDragging ? "ew-resize" : "col-resize",
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        startDrag(e.clientX);
      }}
      onTouchStart={(e) => {
        startDrag(e.touches[0].clientX);
      }}
      role="slider"
      aria-label="Compare before and after xeriscape transformation. Drag or use arrow keys."
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Before — full width base layer */}
      <div className="absolute inset-0 z-0">
        <Photo src={beforeImage.src} alt={beforeImage.alt} priority />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(70,30,45,0.55) 0%, rgba(70,30,45,0.08) 45%, transparent 100%)",
          }}
        />
      </div>

      {/* After — clipped from the left */}
      <div
        className="absolute inset-0 z-[1] overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - position}% 0 0)`,
          transition: isDragging ? "none" : "clip-path 0.08s ease-out",
        }}
      >
        <Photo src={afterImage.src} alt={afterImage.alt} priority />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(70,30,45,0.5) 0%, rgba(70,30,45,0.06) 45%, transparent 100%)",
          }}
        />
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          transition: isDragging ? "none" : "left 0.08s ease-out",
        }}
      >
        <div
          className="absolute top-0 bottom-0 w-0.5"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #F4DEBF 15%, #F4DEBF 85%, transparent)",
            boxShadow: "0 0 12px rgba(70,30,45,0.65)",
          }}
        />
        <div
          className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full pointer-events-auto"
          style={{
            background: "rgba(70,30,45,0.88)",
            border: "2px solid rgba(244,222,191,0.35)",
            boxShadow:
              "0 4px 24px rgba(70,30,45,0.55), 0 0 0 4px rgba(232,98,64,0.15)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <ChevronLeft
            className="w-4 h-4 text-[#F4DEBF] -mr-1"
            strokeWidth={2.5}
            aria-hidden
          />
          <ChevronRight
            className="w-4 h-4 text-[#F4DEBF] -ml-1"
            strokeWidth={2.5}
            aria-hidden
          />
        </div>
      </div>

      {/* Before badge */}
      <div className="absolute top-5 left-5 z-10 pointer-events-none">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "rgba(70,30,45,0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(244,222,191,0.12)",
          }}
        >
          <span
            className="block w-2 h-2 rounded-full shrink-0"
            style={{ background: "rgba(244,222,191,0.5)" }}
          />
          <span
            className="font-satoshi font-bold text-xs tracking-widest uppercase"
            style={{ color: "rgba(244,222,191,0.75)" }}
          >
            Before
          </span>
        </div>
      </div>

      {/* After badge */}
      <div className="absolute top-5 right-5 z-10 pointer-events-none">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: "rgba(232,98,64,0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(232,98,64,0.4)",
          }}
        >
          <span
            className="block w-2 h-2 rounded-full shrink-0"
            style={{ background: "#E86240" }}
          />
          <span
            className="font-satoshi font-bold text-xs tracking-widest uppercase"
            style={{ color: "#E86240" }}
          >
            After
          </span>
        </div>
      </div>

      {/* Drag hint */}
      <p
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 font-satoshi text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase pointer-events-none px-4 py-1.5 rounded-full"
        style={{
          color: "rgba(244,222,191,0.7)",
          background: "rgba(70,30,45,0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(244,222,191,0.1)",
        }}
      >
        Drag to compare
      </p>
    </div>
  );
};

// ─── BLOCK 2 — Before / After Conversion (Signature Block) ───────────────────

const BeforeAfterBlock = ({ beforeImage, afterImage, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full pt-4"
    >
      {/* Title row */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h3
            className="font-sans font-black leading-tight mb-3"
            style={{
              color: "#F4DEBF",
              fontSize: "clamp(1.65rem, 3.2vw, 2.45rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Lawn to Xeriscape Conversion
          </h3>
          <p
            className="font-satoshi font-medium leading-relaxed max-w-lg"
            style={{
              color: "rgba(244,222,191,0.55)",
              fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
            }}
          >
            Still paying to water grass you barely use? We replace traditional
            lawns with beautiful low-maintenance landscapes designed to thrive
            in Colorado.
          </p>
        </div>
        <AccentPill>Before → After</AccentPill>
      </div>

      {/* Interactive before / after compare slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <BeforeAfterCompareSlider
          beforeImage={{
            src: beforeImage.src,
            alt: beforeImage.alt ?? "Before: traditional grass lawn",
          }}
          afterImage={{
            src: afterImage.src,
            alt: afterImage.alt ?? "After: completed xeriscape conversion",
          }}
        />
      </motion.div>

      {/* Captions below slider */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
        <p
          className="font-satoshi font-semibold text-sm leading-snug"
          style={{ color: "rgba(244,222,191,0.6)" }}
        >
          <span className="text-[#F4DEBF]/45 uppercase text-xs tracking-widest font-bold mr-2">
            Before
          </span>
          High-water grass lawn ongoing cost, seasonal maintenance, patchy
          results.
        </p>
        <p
          className="font-satoshi font-semibold text-sm leading-snug sm:text-right"
          style={{ color: "rgba(244,222,191,0.75)" }}
        >
          <span className="text-[#E86240] uppercase text-xs tracking-widest font-bold mr-2">
            After
          </span>
          Water smart xeriscape beautiful year round, low maintenance, built for
          Colorado.
        </p>
      </div>
    </motion.div>
  );
};

// ─── BLOCK 3 — Standard image card (medium) ──────────────────────────────────

const StandardServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{
      duration: 0.72,
      delay: index * 0.09,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="group relative overflow-hidden rounded-2xl"
    style={{
      height: "clamp(320px, 42vw, 520px)",
      boxShadow: "0 12px 48px rgba(0,0,0,0.38)",
      border: "1px solid rgba(244,222,191,0.06)",
    }}
  >
    {/* Photo — fills the entire card */}
    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
      <Photo src={service.image.src} alt={service.image.alt} />
    </div>

    {/* Existing image overlay */}
    <div className="absolute inset-0" style={{ background: IMG_OVERLAY }} />

    {/* Deep gradient scrim anchored to the bottom — gives text a clean stage */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, rgba(76,39,51,0.7) 0%, rgba(76,39,51,0.5) 32%, rgba(76,39,51,0.1) 58%, transparent 20%)",
      }}
    />

    {/* Number watermark — top-right, same as before */}
    <div
      className="absolute top-4 right-5 font-sans font-black leading-none select-none"
      style={{
        color: "rgba(244,222,191,0.07)",
        fontSize: "4.5rem",
        letterSpacing: "-0.04em",
      }}
    >
      {service.number}
    </div>

    {/* Hover glow line — bottom edge */}
    <div
      className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"
      style={{ background: "linear-gradient(90deg, #E86240, transparent)" }}
    />

    {/* Text content — overlaid at the bottom of the image */}
    <div
      className="absolute bottom-0 left-0 right-0 flex flex-col gap-3"
      style={{ padding: "clamp(1.25rem, 3vw, 1.75rem)" }}
    >
      <h3
        className="font-sans font-bold leading-tight"
        style={{
          color: "#F4DEBF",
          fontSize: "clamp(1.15rem, 2vw, 1.6rem)",
        }}
      >
        {service.title}
      </h3>

      <div
        className="w-8 h-px"
        style={{ background: "rgba(232,98,64,0.55)" }}
      />

      <p
        className="font-satoshi font-medium leading-relaxed"
        style={{
          color: "rgba(244,222,191,0.72)",
          fontSize: "clamp(0.83rem, 1.4vw, 0.93rem)",
          /* Clamp to two lines on small cards so text never crowds the image */
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {service.body}
      </p>
    </div>

    {/* Hover border */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ border: "1px solid rgba(232,98,64,0.32)" }}
    />
  </motion.div>
);
// ─── BLOCK 4 — Wide landscape card (full-width single service) ───────────────

// const WideServiceCard = ({ service, index }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 32 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, margin: "-70px" }}
//     transition={{
//       duration: 0.78,
//       delay: index * 0.08,
//       ease: [0.22, 1, 0.36, 1],
//     }}
//     className="group relative w-full overflow-hidden rounded-2xl grid grid-cols-1 lg:grid-cols-2"
//     style={{
//       background: "rgba(76,39,51,0.45)",
//       backdropFilter: "blur(20px)",
//       WebkitBackdropFilter: "blur(20px)",
//       border: "1px solid rgba(244,222,191,0.07)",
//       boxShadow: "0 16px 56px rgba(0,0,0,0.38)",
//       minHeight: "clamp(200px, 24vw, 300px)",
//     }}
//   >
//     {/* Image — right side on desktop, top on mobile */}
//     <div
//       className="order-1 lg:order-2 relative overflow-hidden"
//       style={{ minHeight: "220px" }}
//     >
//       <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
//         <Photo src={service.image.src} alt={service.image.alt} />
//       </div>
//       <div
//         className="absolute inset-0 lg:hidden"
//         style={{
//           background:
//             "linear-gradient(to top, rgba(76,39,51,1) 0%, rgba(76,39,51,0.1) 100%)",
//         }}
//       />
//       {/* Desktop: fade left into content panel */}
//       <div
//         className="absolute inset-0 hidden lg:block"
//         style={{ background: IMG_OVERLAY_SIDE }}
//       />
//       {/* Number */}
//       <div
//         className="absolute bottom-4 right-5 font-sans font-black leading-none select-none"
//         style={{
//           color: "rgba(244,222,191,0.06)",
//           fontSize: "5.5rem",
//           letterSpacing: "-0.04em",
//         }}
//       >
//         {service.number}
//       </div>
//     </div>

//     {/* Text — left on desktop, bottom on mobile */}
//     <div className="order-2 lg:order-1 flex flex-col justify-center gap-4 p-7 lg:p-10">
//       <AccentPill>{service.accent}</AccentPill>
//       <h3
//         className="font-sans font-bold leading-tight"
//         style={{
//           color: "#F4DEBF",
//           fontSize: "clamp(1.28rem, 2.2vw, 2rem)",
//           letterSpacing: "-0.015em",
//         }}
//       >
//         {service.title}
//       </h3>
//       <div
//         className="w-8 h-px"
//         style={{ background: "rgba(232,98,64,0.45)" }}
//       />
//       <p
//         className="font-satoshi font-medium leading-relaxed max-w-sm"
//         style={{
//           color: "rgba(244,222,191,0.58)",
//           fontSize: "clamp(0.85rem, 1.5vw, 0.96rem)",
//         }}
//       >
//         {service.body}
//       </p>
//     </div>

//     {/* Hover border */}
//     <div
//       className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
//       style={{ border: "1px solid rgba(232,98,64,0.3)" }}
//     />
//   </motion.div>
// );

// ─── Section header ───────────────────────────────────────────────────────────

const SectionDivider = ({ label, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-4"
  >
    <div className="h-px w-8" style={{ background: "#E86240", opacity: 0.5 }} />
    <span
      className="font-satoshi text-xs font-bold tracking-[0.2em] uppercase"
      style={{ color: "rgba(232,98,64,0.8)" }}
    >
      {label}
    </span>
    <div
      className="h-px flex-1"
      style={{ background: "rgba(244,222,191,0.07)" }}
    />
  </motion.div>
);

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Usage:
 *   import ServicesSection from "@/components/ServicesSection";
 *
 *   <ServicesSection
 *     images={{
 *       design:     "/images/xeriscape-design.jpg",
 *       rockGravel: "/images/rock-gravel.jpg",
 *       plants:     "/images/drought-plants.jpg",
 *       irrigation: "/images/drip-irrigation.jpg",
 *       walkway:    "/images/walkway-outdoor.jpg",
 *       beforeLawn: "/images/before-lawn.jpg",
 *       afterXeri:  "/images/after-xeriscape.jpg",
 *     }}
 *   />
 */

export default function ServicesSection({
  images = {},
}: {
  images?: Partial<typeof DEFAULT_IMAGES>;
} = {}) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const img = (key: keyof typeof DEFAULT_IMAGES, alt: string) => ({
    src: images[key] || DEFAULT_IMAGES[key],
    alt,
  });

  const heroService = {
    number: "01",
    title: "Custom Xeriscape Design",
    body: "We create low-water landscape designs built specifically for your property, style, and Colorado climate.",
    accent: "Design + Planning",
    image: img("design", "Custom Xeriscape Design"),
  };

  const standardServices = [
    {
      number: "03",
      title: "Decorative Rock & Gravel Landscaping",
      body: "Replace patchy grass with decorative stone and clean, modern landscaping that stays beautiful year-round.",
      accent: "Permanent Beauty",
      image: img("rockGravel", "Decorative Rock and Gravel"),
    },
    {
      number: "04",
      title: "Drought Resistant Plants",
      body: "A low-water yard doesn't have to look boring. We install Colorado-friendly plants that thrive with less water while keeping your landscaping beautiful.",
      accent: "Native + Thriving",
      image: img("plants", "Drought Resistant Native Plants"),
    },
    {
      number: "05",
      title: "Smart Irrigation Systems",
      body: "Use less water without sacrificing healthy plants. Efficient drip systems help reduce waste and simplify maintenance.",
      accent: "Water Smart",
      image: img("irrigation", "Smart Drip Irrigation System"),
    },
    {
      number: "06",
      title: "Walkways & Outdoor Features",
      body: "We can incorporate walkways, patios, edging, and outdoor features that blend naturally into your xeriscape.",
      accent: "Finishing Touch",
      image: img("walkway", "Walkway and Outdoor Features"),
    },
  ];


  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(155deg, #4C2733 0%, #461E2D 45%, #3a1825 100%)",
      }}
    >
      <TopoLines />

      {/* Ambient top glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(232,98,64,0.09) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-12">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-20 lg:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.78,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-sans font-black text-center leading-[1.05] mb-7"
            style={{
              color: "#F4DEBF",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              letterSpacing: "-0.028em",
            }}
          >
            What's Included In A{" "}
            <span style={{ color: "#E86240" }}>Xeriscaping</span> Project?
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="flex justify-center mb-7"
            style={{ transformOrigin: "center" }}
          >
            <div
              className="h-px w-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #E86240, transparent)",
              }}
            />
          </motion.div>
        </div>

        {/* ── BLOCK 1: Hero service — full width ─────────────────────────────── */}
        <div className="mb-6 lg:mb-7">
          <div className="mt-5">
            <HeroServiceBlock service={heroService} index={0} />
          </div>
        </div>

        {/* ── BLOCK 2: Before / After — full width ────────────────────────────── */}
        <div className="mb-6 lg:mb-7">
          <div className="mt-5">
            <BeforeAfterBlock
              beforeImage={img("beforeLawn", "Before — Traditional Grass Lawn")}
              afterImage={img("afterXeri", "After — Xeriscape Conversion")}
              index={1}
            />
          </div>
        </div>

        {/* ── BLOCK 3: Two standard cards side by side ────────────────────────── */}
        <div className="mb-6 lg:mb-7">
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {standardServices.map((s, i) => (
              <StandardServiceCard key={s.number} service={s} index={i + 2} />
            ))}
          </div>
        </div>

        {/* ── BLOCK 4: Two wide landscape cards stacked ───────────────────────── */}
        {/* <div className="mb-0">
          <div className="mt-5 flex flex-col gap-5 lg:gap-6">
            {wideServices.map((s, i) => (
              <WideServiceCard key={s.number} service={s} index={i + 4} />
            ))}
          </div>
        </div> */}

        {/* ── Trust Strip ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-20 lg:mt-16 flex flex-col items-center gap-8"
        >
          <div
            className="w-full max-w-sm h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(244,222,191,0.14), transparent)",
            }}
          />
          <div className="flex flex-wrap justify-center gap-10 lg:gap-20">
            {[
              { value: "Up to 60%", label: "Water Savings" },
              { value: "100%", label: "Colorado Native Focus" },
              { value: "Year-Round", label: "Curb Appeal" },
            ].map(({ value, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className="font-sans font-black leading-none"
                  style={{
                    color: "#E86240",
                    fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                  }}
                >
                  {value}
                </span>
                <span
                  className="font-satoshi text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(244,222,191,0.38)" }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
