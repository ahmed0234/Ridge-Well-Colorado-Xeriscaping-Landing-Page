"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
  const [position, setPosition] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const start = 80;
      const end = 50;
      const duration = 1400;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setPosition(start + (end - start) * eased);
        if (progress < 1) requestAnimationFrame(animate);
      };

    
      setTimeout(() => requestAnimationFrame(animate), 300);
    }
  }, [isInView, hasAnimated]);

  const updatePosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setPosition(percentage);
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
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    };
    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div ref={containerRef} className="group relative">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
        className="relative"
      >
      
        <div
          ref={sliderRef}
          className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-black/8 cursor-ew-resize select-none ring-1 ring-black/5"
          onMouseDown={(e) => {
            e.preventDefault();
            handleStart(e.clientX);
          }}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        >
     
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            draggable={false}
          />

      
          <div
            className="absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={afterImage}
              alt={afterAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              draggable={false}
            />
          </div>


          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-body font-semibold bg-night-desert/60 text-warm-white/90 backdrop-blur-md border border-white/10">
              Before
            </span>
          </div>

 
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-body font-semibold bg-sunset-gold/85 text-night-desert backdrop-blur-md">
              After
            </span>
          </div>

  
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
            >
              <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-body font-medium bg-white/80 text-night-desert/70 backdrop-blur-md shadow-lg">
                ← Drag to compare →
              </span>
            </motion.div>
          )}

 
          <div
            className="absolute top-0 bottom-0 z-20 pointer-events-none will-change-[left]"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
  
            <div className="w-px h-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />


            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-ew-resize"
              animate={
                !isDragging && !hasInteracted
                  ? { scale: [1, 1.08, 1] }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className={`w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center border-2 transition-shadow duration-300 ${
                  isDragging
                    ? "shadow-2xl shadow-black/40 border-sunset-gold/40"
                    : "shadow-xl shadow-black/20 border-white/60"
                }`}
              >
                <div className="flex items-center gap-0.5">
                  <svg
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                  >
                    <path
                      d="M6 1L1.5 6L6 11"
                      stroke="#1C1A17"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="w-px h-4 bg-night-desert/20 mx-0.5 rounded-full" />
                  <svg
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                  >
                    <path
                      d="M1 1L5.5 6L1 11"
                      stroke="#1C1A17"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

 
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-night-desert/40 to-transparent z-[5] pointer-events-none" />
        </div>


        <div className="mt-4 px-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-night-desert">
                {title}
              </h3>
              <p className="text-xs text-stone-gray font-body mt-0.5">
                {location}
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage/10 border border-sage/20">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A8F7A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <span className="text-xs font-body font-semibold text-cactus">
                {waterSaved}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
