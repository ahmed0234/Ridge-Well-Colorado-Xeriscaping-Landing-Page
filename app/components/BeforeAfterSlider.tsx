"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  title: string;
  location: string;
  waterSaved: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before transformation",
  afterAlt = "After transformation",
  title,
  location,
  waterSaved,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(78);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  /* Auto-reveal animation on scroll into view */
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const start = 78;
      const end = 48;
      const duration = 1600;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setPosition(start + (end - start) * eased);
        if (progress < 1) requestAnimationFrame(animate);
      };
      setTimeout(() => requestAnimationFrame(animate), 400);
    }
  }, [isInView, hasAnimated]);

  const updatePosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(3, Math.min(97, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleStart = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      setHasInteracted(true);
      updatePosition(clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    };
    const onTouch = (e: TouchEvent) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    };
    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", onEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div ref={containerRef} className="w-full">
      {/* ── Image arena ─────────────────────────────────── */}
      <div
        ref={sliderRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none ring-1 ring-foreground/8 shadow-2xl shadow-foreground/10"
        onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      >
        {/* BEFORE layer */}
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
          priority
        />

        {/* AFTER layer — clipped */}
        <div
          className="absolute inset-0 will-change-[clip-path] transition-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
            priority
          />
          {/* Subtle color warmth over 'after' */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Bottom cinematic scrim */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-foreground/50 to-transparent z-10 pointer-events-none" />

        {/* BEFORE label */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold bg-foreground/70 text-background/90 backdrop-blur-md border border-white/10">
            Before
          </span>
        </div>

        {/* AFTER label */}
        <div
          className="absolute top-4 z-20 pointer-events-none"
          style={{ left: `calc(${position}% + 16px)` }}
        >
          <span
            className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold backdrop-blur-md"
            style={{ background: "#E86240", color: "#fff" }}
          >
            After
          </span>
        </div>

        {/* Drag hint */}
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20"
          >
            <span className="px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold bg-background/85 text-foreground/70 backdrop-blur-md shadow-lg border border-foreground/8 whitespace-nowrap">
              ← Drag to compare →
            </span>
          </motion.div>
        )}

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none will-change-[left]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-px h-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.35)]" />

          {/* Handle */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-ew-resize"
            animate={!isDragging && !hasInteracted ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className={`w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 transition-all duration-200 ${
                isDragging
                  ? "scale-110 shadow-2xl shadow-black/40 border-[#E86240]/50"
                  : "shadow-xl shadow-black/20 border-white/70"
              }`}
            >
              <div className="flex items-center gap-0.5">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path d="M6 1L1.5 6L6 11" stroke="#461E2D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="w-px h-4 bg-foreground/20 mx-0.5 rounded-full" />
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                  <path d="M1 1L5.5 6L1 11" stroke="#461E2D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Card footer ──────────────────────────────────── */}
      <div className="mt-5 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight leading-snug">
            {title}
          </h3>
          <p className="text-sm text-foreground/50 mt-0.5 font-medium">{location}</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full bg-foreground/6 border border-foreground/10">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E86240" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
          <span className="text-xs font-bold text-foreground/70 tabular-nums">{waterSaved}</span>
        </div>
      </div>
    </div>
  );
}