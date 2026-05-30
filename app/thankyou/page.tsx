"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  PiCheckCircleFill,
  PiClipboardTextBold,
  PiUsersBold,
  PiChatTeardropTextBold,
  PiArrowLeftBold,
  PiLeafFill,
  PiHouseBold,
} from "react-icons/pi";

// ─── Palette ──────────────────────────────────────────────────────────────────
const SAND = "#F4DEBF";
const PLUM = "#4C2733";
const DEEP = "#461E2D";
const TERRA = "#E86240";

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.70' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const STEPS = [
  {
    icon: PiClipboardTextBold,
    number: "01",
    title: "Request Received",
    body: "Your submission is securely logged and ready for review.",
  },
  {
    icon: PiUsersBold,
    number: "02",
    title: "Team Review",
    body: "Our team will carefully review your project details.",
  },
  {
    icon: PiChatTeardropTextBold,
    number: "03",
    title: "We'll Be in Touch",
    body: "Expect to hear from us soon to discuss next steps.",
  },
];

// ─── Pulse icon ───────────────────────────────────────────────────────────────
function SuccessIcon() {
  return (
    <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0">
      {/* Outer pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `1.5px solid ${TERRA}` }}
        animate={{ scale: [1, 1.75], opacity: [0.5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      {/* Mid pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `1.5px solid ${TERRA}` }}
        animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      {/* Core bubble */}
      <motion.div
        className="relative w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(140deg, ${TERRA} 0%, #B83A18 100%)`,
          boxShadow: `0 6px 28px rgba(232,98,64,0.45), inset 0 1px 0 rgba(244,222,191,0.20)`,
        }}
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.25,
          type: "spring",
          stiffness: 260,
          damping: 16,
        }}
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.16) 0%, transparent 50%)",
          }}
        />
        <PiCheckCircleFill
          size={28}
          color="#fff"
          style={{ position: "relative", zIndex: 1 }}
        />
      </motion.div>
    </div>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────
function StepCard({
  icon: Icon,
  number,
  title,
  body,
  index,
}: {
  icon: React.ElementType;
  number: string;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <motion.div
      className="relative flex items-start gap-3 rounded-2xl px-4 py-4 overflow-hidden"
      style={{
        background: "rgba(244,222,191,0.07)",
        border: "1px solid rgba(244,222,191,0.13)",
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.55 + index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Top specular */}
      <div
        className="pointer-events-none absolute top-0 left-[15%] right-[15%] h-px opacity-20 rounded-full"
        style={{ background: SAND }}
      />
      {/* Icon */}
      <div
        className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
        style={{
          background: `rgba(232,98,64,0.18)`,
          border: `1px solid rgba(232,98,64,0.25)`,
        }}
      >
        <Icon size={17} style={{ color: TERRA }} />
      </div>
      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="font-satoshi font-bold"
            style={{
              fontSize: "9.5px",
              color: `${TERRA}cc`,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {number}
          </span>
          <span
            className="font-sans font-bold leading-tight"
            style={{
              fontSize: "13.5px",
              color: SAND,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </span>
        </div>
        <p
          className="font-sans leading-snug"
          style={{ fontSize: "14px", color: `rgba(244,222,191,0.75)` }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function ThankYouPage() {
  return (
    <main
      className="relative w-full h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6"
      style={{ background: DEEP }}
    >
      {/* ── Atmosphere ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.032] mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: "180px" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage: `radial-gradient(circle, ${SAND} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />
      {/* Terra bloom top */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(232,98,64,0.13) 0%, transparent 65%)`,
        }}
      />
      {/* Plum bloom bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-40 w-[480px] h-[480px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(76,39,51,0.5) 0%, transparent 70%)`,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-5">
        {/* Brand mark */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PiLeafFill size={12} style={{ color: TERRA }} />
          <span
            className="font-satoshi font-bold uppercase tracking-[0.22em]"
            style={{ fontSize: "10px", color: `rgba(244,222,191,0.65)` }}
          >
            Ridgewell Colorado
          </span>
          <PiLeafFill
            size={12}
            style={{ color: TERRA, transform: "scaleX(-1)" }}
          />
        </motion.div>

        {/* ── CARD ── */}
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl flex flex-col items-center gap-5 px-6 py-7 sm:px-8 sm:py-8"
          style={{
            background: "rgba(76,39,51,0.52)",
            border: "1px solid rgba(244,222,191,0.11)",
            backdropFilter: "blur(28px) saturate(1.35)",
            WebkitBackdropFilter: "blur(28px) saturate(1.35)",
            boxShadow: `
              0 0 0 1px rgba(244,222,191,0.06),
              0 28px 72px rgba(0,0,0,0.45),
              inset 0 1px 0 rgba(244,222,191,0.12),
              inset 0 -1px 0 rgba(0,0,0,0.22)
            `,
          }}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay rounded-3xl"
            style={{ backgroundImage: NOISE, backgroundSize: "140px" }}
          />
          {/* Top glow line */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-[12%] right-[12%] h-px"
            style={{
              background: `linear-gradient(to right, transparent, rgba(244,222,191,0.22), transparent)`,
            }}
          />
          {/* Terra bottom edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-[28%] right-[28%] h-px"
            style={{
              background: `linear-gradient(to right, transparent, rgba(232,98,64,0.45), transparent)`,
            }}
          />

          {/* Icon + heading row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full">
            <SuccessIcon />
            <motion.div
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1
                className="font-clash font-bold leading-[1.1] tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.1rem)", color: SAND }}
              >
                Thank You
                <br />
                <span style={{ color: TERRA }}>We've Got Your Request.</span>
              </h1>
              <p
                className="font-satoshi leading-relaxed"
                style={{ fontSize: "13.5px", color: `rgba(244,222,191,0.82)` }}
              >
                Your submission is in good hands. Our team will review your
                details and reach out shortly to get things moving.
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            className="w-full flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(244,222,191,0.10)" }}
            />
            <PiLeafFill
              size={10}
              style={{ color: `rgba(232,98,64,0.65)`, flexShrink: 0 }}
            />
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(244,222,191,0.10)" }}
            />
          </motion.div>

          {/* What happens next */}
          <motion.div
            className="w-full flex flex-col gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span
              className="font-satoshi font-bold uppercase tracking-[0.18em]"
              style={{ fontSize: "10.5px", color: `rgba(244,222,191,0.55)` }}
            >
              What happens next
            </span>
            <div className="flex flex-col gap-2.5">
              {STEPS.map((step, i) => (
                <StepCard
                  key={step.title}
                  icon={step.icon}
                  number={step.number}
                  title={step.title}
                  body={step.body}
                  index={i}
                />
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-full flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(244,222,191,0.10)" }}
            />
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(244,222,191,0.10)" }}
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-2.5 w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.92,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Primary */}
            <Link
              href="/"
              className="relative group inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-6 py-3 w-full focus-visible:outline-none focus-visible:ring-2"
              style={{
                background: `linear-gradient(138deg, ${TERRA} 0%, #CC4520 55%, #B83A18 100%)`,
                boxShadow: `0 8px 28px rgba(232,98,64,0.32), inset 0 1px 0 rgba(244,222,191,0.14), inset 0 -1px 0 rgba(0,0,0,0.18)`,
                flex: 1,
              }}
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-0 bottom-0 w-16"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(244,222,191,0.24), transparent)",
                  transform: "skewX(-16deg)",
                }}
                animate={{ x: ["-300%", "500%"] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  ease: "linear",
                }}
              />
              <span
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.09) 0%, transparent 55%)",
                }}
              />
              <PiHouseBold
                size={15}
                color="#fff"
                style={{ position: "relative", zIndex: 1 }}
              />
              <span
                className="relative z-10 font-clash font-bold"
                style={{
                  fontSize: "13.5px",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Return to Home
              </span>
            </Link>

            {/* Secondary */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 w-full focus-visible:outline-none focus-visible:ring-2 group"
              style={{
                background: "rgba(244,222,191,0.07)",
                border: "1px solid rgba(244,222,191,0.14)",
                flex: 1,
              }}
            >
              <PiArrowLeftBold
                size={13}
                style={{ color: `rgba(244,222,191,0.80)` }}
              />
              <span
                className="font-satoshi font-semibold"
                style={{ fontSize: "13.5px", color: `rgba(244,222,191,0.80)` }}
              >
                Back to Website
              </span>
            </Link>
          </motion.div>

          {/* Fine print */}
          <motion.p
            className="font-sans text-center"
            style={{
              fontSize: "16px",
              color: `rgba(244,222,191,0.50)`,
              lineHeight: 1.65,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
          >
            Questions? Call us directly at{" "}
            <a
              href="tel:+10000000000"
              className="underline underline-offset-2"
              style={{ color: `rgba(244,222,191,0.70)` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = SAND)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = `rgba(244,222,191,0.70)`)
              }
            >
              720-882-5772
            </a>{" "}
            · We look forward to speaking with you.
          </motion.p>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="font-satoshi text-center"
          style={{ fontSize: "10.5px", color: `rgba(244,222,191,0.28)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          © {new Date().getFullYear()} Ridgewell Landscaping &amp; Design, LLC.
          All rights reserved.
        </motion.p>
      </div>
    </main>
  );
}
