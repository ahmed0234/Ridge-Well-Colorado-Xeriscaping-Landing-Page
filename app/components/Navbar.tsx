"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { motion } from "motion/react";

const PHONE_DISPLAY = "+(1)720-882-5772";
const PHONE_HREF = "tel:+17208825772";

/* ─────────────────────────────────────────────────────────
   CONTACT BUTTON
───────────────────────────────────────────────────────── */
function ContactButton() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <motion.a
      href={PHONE_HREF}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      aria-label={`Call Ridgewell Landscaping at ${PHONE_DISPLAY}`}
      className="group relative overflow-hidden rounded-xl font-sans sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 outline-none focus-visible:ring-2 focus-visible:ring-[#F4DEBF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#461E2D] font-satoshi flex-shrink-0 inline-flex items-center"
      animate={{
        scale: pressed ? 0.97 : hovered ? 1.03 : 1,
        y: pressed ? 1 : hovered ? -2 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
    >
      {/* Base fill — orange only, no cream wash */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-300"
        style={{
          background: hovered
            ? "linear-gradient(145deg, #E86240 0%, color-mix(in srgb, #E86240 75%, #4C2733) 100%)"
            : "linear-gradient(145deg, #E86240 0%, color-mix(in srgb, #E86240 82%, #461E2D) 100%)",
        }}
      />

      {/* Depth — plum shadows only */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl"
        style={{
          boxShadow: hovered
            ? "inset 0 2px 6px color-mix(in srgb, #461E2D 40%, transparent), inset 0 -1px 0 color-mix(in srgb, #4C2733 30%, transparent)"
            : "inset 0 1px 3px color-mix(in srgb, #461E2D 32%, transparent)",
        }}
      />

      {/* Outer glow — terracotta + plum, no light center */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl sm:rounded-2xl"
        animate={{
          boxShadow: hovered
            ? "0 0 0 1px color-mix(in srgb, #E86240 60%, transparent), 0 0 24px color-mix(in srgb, #E86240 45%, transparent), 0 6px 28px color-mix(in srgb, #461E2D 65%, transparent)"
            : "0 0 0 1px color-mix(in srgb, #4C2733 50%, transparent), 0 4px 18px color-mix(in srgb, #461E2D 50%, transparent)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      {/* Label */}
      <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
        <motion.span
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex-shrink-0"
          style={{
            background: "color-mix(in srgb, #461E2D 28%, transparent)",
          }}
          animate={{
            x: hovered ? 2 : 0,
            scale: hovered ? 1.08 : 1,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        >
          <Phone
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4DEBF]"
            strokeWidth={2.25}
            aria-hidden
          />
        </motion.span>

        <span className="flex flex-col items-start leading-tight min-w-0">
          <span
            className="text-[11px] font-sans sm:text-[15px] font-bold tracking-[0.06em] sm:tracking-[0.08em] whitespace-nowrap text-[#F4DEBF] transition-[text-shadow,transform] duration-300"
            style={{
              textShadow:
                "0 1px 2px color-mix(in srgb, #461E2D 85%, transparent), 0 0 1px color-mix(in srgb, #4C2733 70%, transparent)",
              transform: hovered ? "translateY(-0.5px)" : "none",
            }}
          >
            {PHONE_DISPLAY}
          </span>
          <span
            className={`font-sans hidden md:block text-[8px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#F4DEBF] transition-opacity duration-300 ${
              hovered ? "opacity-95" : "opacity-80"
            }`}
            style={{
              textShadow:
                "0 1px 2px color-mix(in srgb, #461E2D 75%, transparent)",
            }}
          >
            Call now
          </span>
        </span>
      </span>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────────
   BRAND MARK
───────────────────────────────────────────────────────── */
function BrandMark() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/"
      className="flex items-center gap-2 sm:gap-3 md:gap-3.5 outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-[#F4DEBF]/40 min-w-0 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Ridgewell Landscaping & Design — Home"
    >
      {/* Logo — scale only the mark, not the type */}
      <motion.div
        className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex-shrink-0"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: hovered
              ? "0 0 16px color-mix(in srgb, #E86240 50%, transparent), 0 0 32px color-mix(in srgb, #E86240 18%, transparent)"
              : "0 0 0 transparent",
          }}
          transition={{ duration: 0.35 }}
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
      <div
        className="h-6 sm:h-7 md:h-8 w-px flex-shrink-0 transition-colors duration-300"
        style={{
          background: hovered
            ? "color-mix(in srgb, #F4DEBF 45%, transparent)"
            : "color-mix(in srgb, #F4DEBF 22%, transparent)",
        }}
      />

      {/* Type lockup — fixed height prevents layout shift */}
      <div className="flex flex-col justify-center min-w-0 h-8 sm:h-9 md:h-10 gap-0.5 sm:gap-1">
        <span
          className={`font-sans text-[11px] sm:text-sm md:text-base lg:text-xl font-semibold tracking-[0.16em] sm:tracking-[0.20em] uppercase truncate transition-all duration-300 ${
            hovered ? "text-[#F4DEBF]" : "text-[#F4DEBF]/90"
          }`}
          style={{
            textShadow: hovered
              ? "0 0 24px color-mix(in srgb, #E86240 35%, transparent)"
              : "none",
          }}
        >
          Ridgewell
        </span>
        <span
          className={`font-satoshi hidden sm:block text-[8px] md:text-[9px] lg:text-[11px] font-semibold tracking-wide sm:tracking-[0.30em] uppercase truncate transition-all duration-300 ${
            hovered ? "text-[#F4DEBF]/95" : "text-[#F4DEBF]/72"
          }`}
        >
          Landscaping &amp; Design
        </span>
      </div>
    </a>
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
      className="sticky top-0 left-0 right-0 z-50 h-0 overflow-visible pointer-events-none"
      aria-label="Site navigation"
    >
      <div className="px-2.5 sm:px-3 md:px-4 lg:px-5 pt-1.5 sm:pt-2 md:pt-2.5 pointer-events-none w-full">
        <motion.nav
          className="
            relative pointer-events-auto w-full
            flex items-center justify-between gap-3
            rounded-xl sm:rounded-2xl
            px-3 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8
            backdrop-blur-2xl
            bg-[#461E2D]
            ring-1 ring-[#F4DEBF]/10
            shadow-[
              0_0_0_1px_color-mix(in_srgb,#F4DEBF_8%,transparent),
              0_8px_48px_color-mix(in_srgb,#4C2733_65%,transparent),
              0_2px_12px_color-mix(in_srgb,#461E2D_50%,transparent),
              0_1px_0_color-mix(in_srgb,#F4DEBF_10%,transparent)_inset,
              0_-1px_0_color-mix(in_srgb,#4C2733_40%,transparent)_inset,
              0_4px_24px_color-mix(in_srgb,#461E2D_75%,transparent)
            ]
          "
          style={{
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: -18, rotateX: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glass overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl bg-[#4C2733]/15"
          />

          {/* 3D depth face */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[3px] left-[6px] right-[6px] h-[3px] rounded-b-xl sm:rounded-b-2xl opacity-50"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in srgb, #461E2D 80%, #4C2733), color-mix(in srgb, #461E2D 95%, #4C2733))",
              transform: "rotateX(-90deg)",
              transformOrigin: "top center",
            }}
          />

          {/* Noise grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px",
            }}
          />

          {/* Top specular highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-6 right-6 h-px rounded-full bg-gradient-to-r from-transparent via-[#F4DEBF]/25 to-transparent"
          />

          {/* Bottom depth edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#4C2733]/60 to-transparent"
          />

          {/* Accent warmth — center bottom */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#E86240]/20 to-transparent"
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
            className="flex-shrink-0"
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
