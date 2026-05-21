"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/* ─────────────────────────────────────────────────────────
   CONTACT BUTTON
───────────────────────────────────────────────────────── */
function ContactButton() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 200, damping: 22 });
  const sy = useSpring(my, { stiffness: 200, damping: 22 });

  const glowBg = useTransform(
    [sx, sy],
    ([gx, gy]: number[]) =>
      `radial-gradient(56px circle at ${gx * 100}% ${gy * 100}%, color-mix(in srgb, var(--color-foreground) 30%, transparent) 0%, transparent 72%)`
  );

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  }

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseMove={onMouseMove}
      aria-label="Contact Ridgewell Landscaping"
      className="relative overflow-hidden rounded-xl px-3 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 font-satoshi flex-shrink-0"
      animate={{
        scale: pressed ? 0.95 : hovered ? 1.04 : 1,
        y: pressed ? 1 : hovered ? -2 : 0,
      }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {/* Base fill */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-xl transition-colors duration-300 ${
          hovered ? "bg-foreground/20" : "bg-foreground/8"
        }`}
      />

      {/* Border ring */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-xl ring-inset transition-all duration-300 ${
          hovered
            ? "ring-1 ring-foreground/50 shadow-[0_0_20px_color-mix(in_srgb,var(--color-foreground)_18%,transparent),0_8px_28px_color-mix(in_srgb,var(--color-background)_60%,transparent)]"
            : "ring-1 ring-background/14 shadow-[0_4px_16px_color-mix(in_srgb,var(--color-background)_55%,transparent)]"
        }`}
      />

      {/* Inset top highlight */}
      <span className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-background)_12%,transparent)]" />

      {/* Cursor glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ background: glowBg }}
      />

      {/* Shimmer sweep on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="sweep"
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ x: "-110%", opacity: 1 }}
            animate={{ x: "110%", opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.52, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(105deg, transparent 28%, color-mix(in srgb, var(--color-background) 18%, transparent) 50%, transparent 72%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Label */}
      <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
        {/* Accent dot — hidden on very small screens to save space */}
        <motion.span
          className="hidden sm:block w-1.5 h-1.5 rounded-full flex-shrink-0 bg-background"
          animate={{
            scale: hovered ? [1, 1.7, 1] : 1,
            opacity: hovered ? [1, 0.6, 1] : 0.8,
          }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
        <span
          className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.10em] sm:tracking-[0.13em] uppercase transition-colors duration-200 whitespace-nowrap ${
            hovered ? "text-background" : "text-background/75"
          }`}
        >
          Contact Us
        </span>
      </span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────
   BRAND MARK
───────────────────────────────────────────────────────── */
function BrandMark() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="/"
      className="flex items-center gap-2 sm:gap-3 md:gap-3.5 outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-foreground/40 min-w-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ opacity: hovered ? 1 : 0.9 }}
      transition={{ duration: 0.22 }}
      aria-label="Ridgewell Landscaping & Design — Home"
    >
      {/* Logo */}
      <motion.div
        className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex-shrink-0"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: hovered
              ? "0 0 14px color-mix(in srgb, var(--color-foreground) 45%, transparent), 0 0 28px color-mix(in srgb, var(--color-foreground) 12%, transparent)"
              : "none",
          }}
          transition={{ duration: 0.3 }}
        />
        <Image
          src="/NavLogo.png"
          alt="Ridgewell logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Vertical divider */}
      <div className="h-6 sm:h-7 md:h-8 w-px flex-shrink-0 bg-background/18" />

      {/* Type lockup */}
      <div className="flex flex-col leading-none gap-[2px] sm:gap-[3px] font-clash min-w-0">
        <span
          className={`text-[11px] sm:text-sm md:text-base lg:text-lg font-clash font-semibold tracking-[0.16em] sm:tracking-[0.20em] uppercase transition-colors duration-200 truncate ${
            hovered ? "text-background" : "text-background/88"
          }`}
        >
          Ridgewell
        </span>
        {/* Sub-label: hidden on xs, visible sm+ */}
        <span
          className={`hidden sm:block text-[8px] md:text-[9px] lg:text-xs font-medium tracking-[0.24em] sm:tracking-[0.32em] uppercase transition-colors duration-200 truncate ${
            hovered ? "text-foreground" : "text-background/80"
          }`}
        >
          Landscaping &amp; Design
        </span>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────
   NAVBAR SHELL
───────────────────────────────────────────────────────── */
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  return (
    <header
      ref={navRef}
      className="absolute top-0 left-0 right-0 z-50 pointer-events-none"
      aria-label="Site navigation"
    >
      {/* Tighter top padding on mobile so it eats less vertical space */}
      <div className="px-2.5 sm:px-4 md:px-5 pt-1.5 sm:pt-2 pointer-events-none">
        <motion.nav
          className="
            relative pointer-events-auto mx-auto
            flex items-center justify-between
            rounded-xl sm:rounded-2xl
            px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3
            max-w-[1400px]
            backdrop-blur-2xl
            [background:rgb(70,30,45)]
            ring-1 ring-background/10
            shadow-[
              0_0_0_1.5px_color-mix(in_srgb,var(--color-background)_8%,transparent),
              0_8px_48px_color-mix(in_srgb,var(--color-foreground)_45%,transparent),
              0_2px_12px_color-mix(in_srgb,var(--color-foreground)_28%,transparent),
              0_1px_0_color-mix(in_srgb,var(--color-background)_10%,transparent)_inset,
              0_-1px_0_color-mix(in_srgb,var(--color-foreground)_30%,transparent)_inset,
              0_4px_24px_rgba(0,0,0,0.55),
              0_1.5px_0_rgba(255,255,255,0.08)_inset
            ]
          "
          style={{
            /* 3-D lift: perspective on the parent so the nav card tilts in on arrival */
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: -18, rotateX: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── 3D depth face: bottom bevel ── */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[3px] left-[6px] right-[6px] h-[3px] rounded-b-xl sm:rounded-b-2xl opacity-60"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in srgb, rgb(70,30,45) 80%, black), rgba(0,0,0,0.85))",
              transform: "rotateX(-90deg)",
              transformOrigin: "top center",
            }}
          />

          {/* Noise grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl opacity-[0.022] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px",
            }}
          />

          {/* Top specular highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-6 right-6 h-px rounded-full bg-gradient-to-r from-transparent via-background/22 to-transparent"
          />

          {/* Bottom depth edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent"
          />

          {/* Center-bottom warmth */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-foreground/12 to-transparent"
          />

          {/* LEFT — Brand */}
          <motion.div
            className="min-w-0 flex-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandMark />
          </motion.div>

          {/* RIGHT — Contact */}
          <motion.div
            className="flex-shrink-0 ml-2 sm:ml-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactButton />
          </motion.div>
        </motion.nav>
      </div>
    </header>
  );
}