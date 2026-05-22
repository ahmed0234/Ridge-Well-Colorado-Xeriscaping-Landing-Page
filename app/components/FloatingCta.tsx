"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { PiPhoneCallFill, PiLeafFill } from "react-icons/pi";

// ─── Palette ──────────────────────────────────────────────────────────────────
const SAND  = "#F4DEBF";
const PLUM  = "#4C2733";
const DEEP  = "#461E2D";
const TERRA = "#E86240";

const PHONE_HREF    = "tel:+17208825772";
const PHONE_DISPLAY = "(720) 882-5772";
/** Width for hover phone panel — fits full PHONE_DISPLAY without clipping */
const PHONE_PANEL_WIDTH = 142;

// ─── Noise texture ────────────────────────────────────────────────────────────
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── Pulse ring ───────────────────────────────────────────────────────────────
function PulseRing({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{ border: `1px solid ${TERRA}` }}
      initial={{ scale: 1, opacity: 0.55 }}
      animate={{ scale: 2.4, opacity: 0 }}
      transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

// ─── Leaf sprout ──────────────────────────────────────────────────────────────
function LeafSprout() {
  return (
    <motion.div
      className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="w-px h-3 rounded-full"
        style={{ background: `linear-gradient(to top, ${TERRA}66, ${TERRA}cc)` }}
      />
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom center" }}
      >
        <PiLeafFill
          size={12}
          style={{ color: TERRA, filter: `drop-shadow(0 1px 3px ${TERRA}66)` }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FloatingCallCTA() {
  const [visible,  setVisible]  = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [pressed,  setPressed]  = useState(false);

  // ── Scroll visibility ───────────────────────────────────────────────────────
  useEffect(() => {
    const threshold =
      typeof window !== "undefined"
        ? Math.max(window.innerHeight * 0.6, 400)
        : 600;

    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── 3-D tilt on hover ──────────────────────────────────────────────────────
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 160, damping: 24 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-5,  5]), { stiffness: 160, damping: 24 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left)  / r.width  - 0.5) * 2);
    my.set(((e.clientY - r.top)   / r.height - 0.5) * 2);
  }
  function onMouseLeave() {
    mx.set(0); my.set(0);
    setExpanded(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="float-cta"
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-7 z-[99999] flex flex-col items-end"
          initial={{ opacity: 0, y: 56, scale: 0.88 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit =  {{ opacity: 0, y: 36, scale: 0.92  }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: "700px" }}
        >
          {/* Float + tilt wrapper */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <LeafSprout />

            {/* ── Pill ── */}
            <motion.a
              href={PHONE_HREF}
              aria-label={`Call Us Now — Ridgewell Landscape & Design at ${PHONE_DISPLAY}`}
              onMouseEnter={() => setExpanded(true)}
              onMouseDown ={() => setPressed(true)}
              onMouseUp   ={() => setPressed(false)}
              onTouchStart={() => setPressed(true)}
              onTouchEnd  ={() => setPressed(false)}
              animate={{ scale: pressed ? 0.95 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="relative flex items-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86240]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#461E2D] font-sans font-bold"
              style={{
                borderRadius: 999,
                minHeight: 60,
                background: expanded
                  ? `linear-gradient(130deg, ${DEEP} 0%, ${PLUM} 100%)`
                  : `linear-gradient(145deg, ${TERRA} 0%, #C94E2A 55%, ${DEEP} 100%)`,
                boxShadow: expanded
                  ? `0 0 0 1px rgba(244,222,191,0.14), 0 12px 40px rgba(70,30,45,0.55), 0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(244,222,191,0.08)`
                  : `0 0 0 1px rgba(244,222,191,0.1), 0 8px 28px rgba(70,30,45,0.4), 0 2px 6px rgba(232,98,64,0.2), inset 0 1px 0 rgba(244,222,191,0.12)`,
                transition: "background 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Noise grain */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-soft-light"
                style={{ backgroundImage: NOISE_SVG, backgroundSize: "160px" }}
              />

              {/* Top specular */}
              <div
                aria-hidden
                className="absolute top-0 left-[20%] right-[20%] h-px opacity-30 pointer-events-none"
                style={{ background: `linear-gradient(90deg, transparent, ${SAND}, transparent)` }}
              />

              {/* ── Icon area ── */}
              <div
                className="relative flex items-center justify-center shrink-0"
                style={{ width: 56, height: 60 }}
              >
                <div className="absolute inset-[11px] rounded-full">
                  <PulseRing delay={0} />
                  <PulseRing delay={1.2} />
                </div>

                <motion.div
                  animate={
                    expanded ? { scale: 0.9, rotate: 6 } : { scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PiPhoneCallFill
                    size={24}
                    aria-hidden
                    style={{
                      color: SAND,
                      filter: expanded
                        ? `drop-shadow(0 0 6px ${TERRA}55)`
                        : "none",
                      transition: "filter 0.4s ease",
                    }}
                  />
                </motion.div>
              </div>

              {/* ── Always-visible label ── */}
              <div className="flex flex-col justify-center pr-1 min-w-0">
                <span
                  className="font-sans font-bold leading-none tracking-tight whitespace-nowrap"
                  style={{
                    color: SAND,
                    fontSize: "clamp(0.9rem, 2.8vw, 1rem)",
                    textShadow: "0 1px 2px rgba(70,30,45,0.35)",
                  }}
                >
                  Call Us Now
                </span>
              </div>

              {/* ── Hover: phone number reveal ── */}
              <motion.div
                className="flex flex-col justify-center shrink-0 border-l"
                initial={false}
                animate={
                  expanded
                    ? {
                        width: PHONE_PANEL_WIDTH,
                        opacity: 1,
                        marginLeft: 10,
                        paddingLeft: 12,
                        paddingRight: 4,
                      }
                    : { width: 0, opacity: 0, marginLeft: 0, paddingLeft: 0, paddingRight: 0 }
                }
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  willChange: "width, opacity",
                  borderColor: expanded ? "rgba(244,222,191,0.18)" : "transparent",
                  overflow: expanded ? "visible" : "hidden",
                }}
              >
                <div className="flex flex-col gap-0.5 whitespace-nowrap w-max min-w-full pr-1">
                  <span
                    className="font-satoshi text-[9px] font-semibold tracking-[0.18em] uppercase"
                    style={{ color: `${SAND}70` }}
                  >
                    Free estimate
                  </span>
                  <span
                    className="font-sans text-[14px] sm:text-[15px] font-bold tabular-nums tracking-tight"
                    style={{ color: `${SAND}95` }}
                  >
                    {PHONE_DISPLAY}
                  </span>
                </div>
              </motion.div>

              <div className="w-3 shrink-0" aria-hidden />
            </motion.a>

            {/* Ground shadow */}
            <div
              aria-hidden
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width: expanded ? "85%" : "65%",
                height: 10,
                background: `radial-gradient(ellipse, rgba(70,30,45,0.3) 0%, transparent 70%)`,
                filter: "blur(4px)",
                transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </motion.div>

          {/* ── Trust nudge beneath pill ── */}
          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit   ={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, delay: 0.18, ease: "easeOut" }}
                className="mt-2.5 mr-1 text-[10px] font-medium tracking-wide text-right"
                style={{ color: `${SAND}55` }}
              >
                No pressure &nbsp;·&nbsp; No obligation
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}