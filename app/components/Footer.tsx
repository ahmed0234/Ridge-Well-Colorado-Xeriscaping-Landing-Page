"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  PiInstagramLogoBold,
  PiFacebookLogoBold,
  PiPinterestLogoBold,
  PiYoutubeLogoBold,
  PiPhoneCallFill,
  PiLeafFill,
  PiArrowUpRightBold,
  PiMapPinLineBold,
} from "react-icons/pi";

// ─── Palette ──────────────────────────────────────────────────────────────────
const SAND = "#F4DEBF";
const PLUM = "#4C2733";
const DEEP = "#461E2D";
const TERRA = "#E86240";

const PHONE_DISPLAY = "720-882-5772";
const PHONE_HREF = "tel:+17208825772";

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const SOCIALS = [
  { icon: PiInstagramLogoBold, label: "Instagram", href: "#" },
  { icon: PiFacebookLogoBold, label: "Facebook", href: "#" },
  { icon: PiPinterestLogoBold, label: "Pinterest", href: "#" },
  { icon: PiYoutubeLogoBold, label: "YouTube", href: "#" },
];

// ─── Social button ────────────────────────────────────────────────────────────
function SocialBtn({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center w-10 h-10 rounded-2xl group overflow-hidden focus-visible:outline-none focus-visible:ring-2"
      style={{
        background: "rgba(244,222,191,0.06)",
        border: "1px solid rgba(244,222,191,0.11)",
      }}
      whileHover={{ scale: 1.12, y: -3 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      {/* Terra fill on hover */}
      <motion.span
        className="absolute inset-0 rounded-2xl"
        style={{ background: `rgba(232,98,64,0.22)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
      />
      {/* Top highlight */}
      <span
        className="pointer-events-none absolute top-0 left-[20%] right-[20%] h-px opacity-20 rounded-full"
        style={{ background: SAND }}
      />
      <Icon
        size={17}
        style={{ color: `${SAND}88`, position: "relative", zIndex: 1 }}
      />
    </motion.a>
  );
}

// ─── Call CTA button ──────────────────────────────────────────────────────────
function CallButton() {
  return (
    <motion.a
      href={PHONE_HREF}
      aria-label="Call Ridgewell Landscaping for a free consultation"
      className="relative inline-flex items-center gap-3.5 overflow-hidden rounded-2xl px-6 py-3.5 focus-visible:outline-none focus-visible:ring-2 w-full sm:w-auto"
      style={{
        background: `linear-gradient(138deg, ${TERRA} 0%, #CC4520 55%, #B83A18 100%)`,
        boxShadow: `0 10px 36px rgba(232,98,64,0.32), inset 0 1px 0 rgba(244,222,191,0.14), inset 0 -1px 0 rgba(0,0,0,0.20)`,
      }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      {/* Shimmer */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 w-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(244,222,191,0.25), transparent)",
          transform: "skewX(-16deg)",
        }}
        animate={{ x: ["-300%", "500%"] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: "linear",
        }}
      />
      {/* Inner gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, transparent 55%)",
        }}
      />
      {/* Icon badge */}
      <span
        className="relative flex items-center justify-center w-8 h-8 rounded-xl flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.14)" }}
      >
        <PiPhoneCallFill size={16} color="#fff" />
      </span>
      {/* Text */}
      <span className="relative flex flex-col leading-none gap-[3px]">
        <span
          className="font-satoshi text-[9.5px] font-bold tracking-[0.18em] uppercase"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Speak with an expert
        </span>
        <span
          className="font-clash font-bold text-[15px] tracking-[-0.01em]"
          style={{ color: "#fff" }}
        >
          {PHONE_DISPLAY}
        </span>
      </span>
      <PiArrowUpRightBold
        size={14}
        color="rgba(255,255,255,0.60)"
        className="ml-auto flex-shrink-0"
      />
    </motion.a>
  );
}

// ─── Leaf divider ─────────────────────────────────────────────────────────────
function LeafDivider() {
  return (
    <div className="w-full flex items-center gap-4">
      <div
        className="flex-1 h-px"
        style={{ background: "rgba(244,222,191,0.08)" }}
      />
      <PiLeafFill size={11} style={{ color: `${TERRA}55`, flexShrink: 0 }} />
      <div
        className="flex-1 h-px"
        style={{ background: "rgba(244,222,191,0.08)" }}
      />
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: DEEP }}
      aria-label="Site footer"
    >
      {/* Noise grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: "180px" }}
      />
      {/* Dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `radial-gradient(circle, ${SAND} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Top terra glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${TERRA}50, transparent)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[500px] h-56 rounded-full opacity-[0.06]"
        style={{
          background: `radial-gradient(circle, ${TERRA}, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        {/* ── MAIN BODY ────────────────────────────────────────────────── */}
        <div className="pt-16 pb-14 sm:pt-20 sm:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-0">
          {/* ── LEFT — Brand ── */}
          <motion.div
            className="flex flex-col gap-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo lockup */}
            <div className="flex items-center gap-4">
              <div
                className="relative w-12 h-12 flex-shrink-0 rounded-full"
                style={{
                  boxShadow: `0 0 0 1.5px rgba(244,222,191,0.13), 0 6px 20px rgba(70,30,45,0.55)`,
                }}
              >
                <Image
                  src="/NavLogo.png"
                  alt="Ridgewell Landscaping logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div
                className="h-10 w-px"
                style={{ background: "rgba(244,222,191,0.12)" }}
              />
              <div className="flex flex-col leading-none gap-1">
                <span
                  className="font-clash font-bold uppercase"
                  style={{
                    fontSize: "18px",
                    letterSpacing: "0.18em",
                    color: SAND,
                  }}
                >
                  Ridgewell
                </span>
                <span
                  className="font-satoshi font-semibold uppercase"
                  style={{
                    fontSize: "9.5px",
                    letterSpacing: "0.30em",
                    color: `${SAND}55`,
                  }}
                >
                  Colorado
                </span>
              </div>
            </div>

            {/* Headline copy — large, bold, impactful */}
            <div className="flex flex-col gap-2">
              <h2
                className="font-clash font-bold leading-[1.1] tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.65rem, 3vw, 2.1rem)", color: SAND }}
              >
                Landscapes Built to
                <br />
                <span style={{ color: TERRA }}>Last. Not to Water.</span>
              </h2>
              <p
                className="font-satoshi leading-relaxed max-w-[320px]"
                style={{ fontSize: "13.5px", color: `${SAND}90` }}
              >
                Xeriscape design rooted in Colorado's climate where beauty and
                sustainability grow side by side.
              </p>
            </div>

            {/* Location pill */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 self-start"
              style={{
                background: "rgba(244,222,191,0.055)",
                border: "1px solid rgba(244,222,191,0.10)",
              }}
            >
              <PiMapPinLineBold size={12} style={{ color: `${TERRA}cc` }} />
              <span
                className="font-satoshi text-[11.5px] font-semibold tracking-wide"
                style={{ color: `${SAND}85` }}
              >
                Serving Greater Denver, Colorado
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT — Social + CTA ── */}
          <motion.div
            className="flex flex-col justify-center gap-9 lg:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.65,
              delay: 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Social block */}
            <div className="flex flex-col gap-3.5 lg:items-end">
              <span
                className="font-satoshi font-bold uppercase tracking-[0.2em]"
                style={{ fontSize: "10px", color: `${SAND}40` }}
              >
                Follow the Transformation
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIALS.map((s) => (
                  <SocialBtn
                    key={s.label}
                    icon={s.icon}
                    label={s.label}
                    href={s.href}
                  />
                ))}
              </div>
            </div>

            {/* Thin rule */}
            <div
              className="w-full lg:w-56 h-px"
              style={{ background: "rgba(244,222,191,0.07)" }}
            />

            {/* CTA block */}
            <div className="flex flex-col gap-3.5 lg:items-end w-full">
              <div className="flex flex-col gap-1 lg:items-end">
                <span
                  className="font-clash font-bold"
                  style={{
                    fontSize: "17px",
                    color: SAND,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Ready to transform your yard?
                </span>
                <span
                  className="font-satoshi text-[12.5px]"
                  style={{ color: `${SAND}55` }}
                >
                  One call. No pressure. Just clarity.
                </span>
              </div>
              <CallButton />
              {/* Trust signal */}
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#5DBE7A" }}
                />
                <span
                  className="font-satoshi text-[15px]"
                  style={{ color: `${SAND}90` }}
                >
                  Free consultation &middot; No obligation
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM BAR ─────────────────────────────────────────────── */}
        <LeafDivider />

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="font-satoshi text-center sm:text-left"
            style={{ fontSize: "11px", color: `${SAND}35` }}
          >
            © {year} Ridgewell Landscaping &amp; Design, LLC. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-satoshi transition-colors duration-150"
                style={{ fontSize: "11px", color: `${SAND}35` }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = `${SAND}80`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = `${SAND}35`)
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
