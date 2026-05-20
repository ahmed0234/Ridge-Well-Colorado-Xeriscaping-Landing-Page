"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PiCheckCircle, PiLeafLight } from "react-icons/pi";

// ─── Color Palette ──────────────────────────────────────────────────────────
const C = {
  sand:       "#F4DEBF",
  sandLight:  "#FAF0E3",
  plum:       "#4C2733",
  deepPlum:   "#461E2D",
  terra:      "#e04f2b",
  terraGlow:  "rgba(224, 79, 43, 0.13)",
  white:      "#FFFFFF",
};

const SERVICES = [
  "Front Yard Xeriscape",
  "Backyard Xeriscape",
  "Full Property Transformation",
  "Replace Grass / Lower Maintenance",
  "Not Sure Yet",
];

// ─── Input Styles ────────────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.82)",
  border: "1.5px solid rgba(70,30,45,0.11)",
  borderRadius: "11px",
  color: C.deepPlum,
  fontFamily: "'Satoshi', sans-serif",
  fontSize: "13.5px",
  padding: "11px 13px",
  outline: "none",
  width: "100%",
  transition: "border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease",
};
const focusStyle: React.CSSProperties = {
  borderColor: C.terra,
  background: C.white,
  boxShadow: `0 0 0 4px ${C.terraGlow}`,
};

// ─── Field Wrapper ────────────────────────────────────────────────────────────
function Field({ label, id, error, children }: {
  label: string; id: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={id}
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.09em",
          color: "rgba(70,30,45,0.58)",
          fontFamily: "'Satoshi', sans-serif",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            style={{ fontSize: 11, color: C.terra, fontFamily: "'Satoshi', sans-serif", fontWeight: 500 }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
function Input({ id, type = "text", placeholder, value, onChange, onFocus, onBlur, focused, ...rest }: any) {
  return (
    <input
      id={id} type={type} placeholder={placeholder} value={value}
      onChange={onChange} onFocus={onFocus} onBlur={onBlur}
      style={{ ...inputBase, ...(focused ? focusStyle : {}) }}
      autoComplete="off"
      {...rest}
    />
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
function Select({ id, value, onChange, onFocus, onBlur, focused }: any) {
  return (
    <select
      id={id} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur}
      style={{
        ...inputBase,
        ...(focused ? focusStyle : {}),
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='rgba(70,30,45,0.38)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(100% - 13px) center",
        paddingRight: "36px",
        cursor: "pointer",
      }}
    >
      <option value="" disabled style={{ color: "rgba(70,30,45,0.38)" }}>Select a service…</option>
      {SERVICES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ConsultationForm() {
  const uid = useId();
  const [form, setForm] = useState({ name: "", phone: "", email: "", zip: "", service: "" });
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const set = (k: string) => (e: any) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const on  = (k: string) => ()      => setFocused((f) => ({ ...f, [k]: true }));
  const off = (k: string) => ()      => setFocused((f) => ({ ...f, [k]: false }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())                           e.name    = "Name is required";
    if (!form.phone.trim())                          e.phone   = "Phone number is required";
    if (!form.email.includes("@"))                   e.email   = "Valid email required";
    if (!form.zip.trim() || form.zip.length < 5)    e.zip     = "Valid ZIP required";
    if (!form.service)                               e.service = "Please select a service";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    /*
     * Outer shell — overflow-visible so plant assets can bleed outside card bounds.
     * Plants are z-20+ to float visually over the card without clipping.
     */
    <div className="relative w-full" style={{ isolation: "isolate" }}>

      {/* ══ BOTANICAL LAYER 1 — Cascading string vines from top ══════════
          Leafs Strans.png hangs from the very top of the card, draping
          organically into the header area for a "garden trellis" effect.
      */}
      <motion.img
        src="/Ctaform/Leafs Strans.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          top: "-4px",
          right: "-8px",
          width: "130px",
          opacity: 0.82,
          zIndex: 30,
          filter: "drop-shadow(0 6px 16px rgba(40,80,40,0.12))",
          transformOrigin: "top center",
          willChange: "transform",
        }}
        animate={{ rotate: [-1, 2, -1], y: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ══ BOTANICAL LAYER 2 — Branching vine from bottom-left ══════════
          leaf 3rd.png sweeps diagonally up from the bottom-left corner.
      */}
      <motion.img
        src="/Ctaform/leaf 3rd.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          bottom: "-44px",
          left: "-42px",
          width: "156px",
          opacity: 0.78,
          zIndex: 30,
          filter: "drop-shadow(0 4px 12px rgba(40,80,40,0.10))",
          transform: "rotate(-18deg) scaleX(-1)",
          transformOrigin: "bottom right",
          willChange: "transform",
        }}
        animate={{ rotate: [-18, -15, -18], x: [0, 3, 0], y: [0, -4, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ══ BOTANICAL LAYER 3 — Slim watercolor strand along right side ══
          Leaf Stran.png runs vertically along the right edge as a draping accent.
      */}
      <motion.img
        src="/Ctaform/Leaf Stran.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          top: "25%",
          right: "-28px",
          width: "52px",
          opacity: 0.60,
          zIndex: 29,
          filter: "drop-shadow(0 2px 8px rgba(40,80,40,0.08))",
          transformOrigin: "top center",
          willChange: "transform",
        }}
        animate={{ rotate: [2, -1, 2], y: [0, 6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ══ BOTANICAL LAYER 4 — Fern growing from bottom-right ══════════
          greenfern.png rises up from outside the bottom-right card edge.
      */}
      <motion.img
        src="/Ctaform/greenfern.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          bottom: "-52px",
          right: "-36px",
          width: "110px",
          opacity: 0.72,
          zIndex: 30,
          filter: "drop-shadow(0 4px 14px rgba(40,80,40,0.12))",
          transformOrigin: "bottom center",
          willChange: "transform",
        }}
        animate={{ rotate: [-2, 2, -2], y: [0, -3, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ══ ANIMATED GLOW BORDER SHELL ════════════════════════════════════
          A rotating conic-gradient sits BEHIND the card (z-0) and bleeds
          through the 1.5px transparent padding ring, creating an organic
          sweeping terra-green glow. GPU-only (transform: rotate).
      */}
      <div
        className="relative rounded-[22px] p-[1.5px]"
        style={{ zIndex: 10 }}
      >
        {/* Rotating conic light-ray — GPU composited via rotate transform */}
        <motion.div
          className="absolute inset-0 rounded-[22px]"
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0%,
              transparent 38%,
              rgba(224,79,43,0.55) 48%,
              rgba(244,160,90,0.35) 52%,
              transparent 62%,
              transparent 100%
            )`,
            filter: "blur(5px)",
            zIndex: 0,
            willChange: "transform",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />

        {/* ══ INNER GLASS CARD ════════════════════════════════════════════
            Sits on top of the rotating border (z-10), isolates blur so
            the backdrop-filter only applies inside the card.
        */}
        <div
          className="relative overflow-hidden rounded-[21px]"
          style={{
            background: "rgba(255,255,255,0.74)",
            backdropFilter: "blur(26px) saturate(1.45)",
            WebkitBackdropFilter: "blur(26px) saturate(1.45)",
            zIndex: 10,
            boxShadow:
              "0 2px 0 rgba(255,255,255,0.9) inset," +
              "0 24px 56px rgba(70,30,45,0.10)," +
              "0 4px 14px rgba(70,30,45,0.05)",
          }}
        >
          {/* Subtle interior ghost plants — blurred through glass layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            <img
              src="/Ctaform/Leafs Strans.png"
              alt=""
              aria-hidden="true"
              className="absolute select-none"
              style={{
                top: "-30px",
                left: "-30px",
                width: "120px",
                opacity: 0.07,
                transform: "rotate(-8deg)",
              }}
            />
            <img
              src="/Ctaform/leaf 3rd.png"
              alt=""
              aria-hidden="true"
              className="absolute select-none"
              style={{
                bottom: "-20px",
                right: "-20px",
                width: "130px",
                opacity: 0.07,
                transform: "rotate(12deg)",
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            {/* ── SUCCESS STATE ── */}
            {submitted ? (
              <motion.div
                key="success"
                className="relative flex flex-col items-center justify-center text-center gap-6 py-14 px-10"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.12, type: "spring", stiffness: 220, damping: 14 }}
                  className="flex items-center justify-center w-16 h-16 rounded-full"
                  style={{ background: "rgba(224,79,43,0.10)" }}
                >
                  <PiCheckCircle size={40} style={{ color: C.terra }} />
                </motion.div>
                <div className="flex flex-col gap-2">
                  <h3
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: "1.55rem",
                      fontWeight: 700,
                      color: C.deepPlum,
                      letterSpacing: "-0.018em",
                    }}
                  >
                    You're on the list!
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: "rgba(70,30,45,0.62)",
                      fontFamily: "'Satoshi', sans-serif",
                      maxWidth: 268,
                      margin: "0 auto",
                    }}
                  >
                    We'll reach out within 1 business day to schedule your free xeriscape design consultation.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* ── FORM STATE ── */
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 2, position: "relative" }}>

                {/* ── HEADER ──────────────────────────────────────────── */}
                <div
                  className="px-7 pt-8 pb-5"
                  style={{ borderBottom: "1px solid rgba(70,30,45,0.07)" }}
                >
                  {/* Eyebrow tag */}
                  <div className="flex items-center gap-2 mb-3.5">
                    <div
                      className="flex items-center justify-center w-5 h-5 rounded-full"
                      style={{ background: "rgba(224,79,43,0.12)" }}
                    >
                      <PiLeafLight size={11} style={{ color: C.terra }} />
                    </div>
                    <span
                      style={{
                        fontSize: 10.5,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: C.terra,
                        fontFamily: "'Satoshi', sans-serif",
                      }}
                    >
                      Free Consultation
                    </span>
                  </div>

                  {/* Heading */}
                  <h2
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: "clamp(1.3rem, 2.2vw, 1.65rem)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "-0.024em",
                      color: C.deepPlum,
                    }}
                  >
                    Get Your Free<br />Design Consultation
                  </h2>
                </div>

                {/* ── FORM FIELDS ──────────────────────────────────────── */}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="px-7 py-5 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Full Name" id={`${uid}-name`} error={errors.name}>
                        <Input
                          id={`${uid}-name`} placeholder="Jane Smith"
                          value={form.name} onChange={set("name")}
                          onFocus={on("name")} onBlur={off("name")} focused={focused.name}
                        />
                      </Field>
                      <Field label="Phone" id={`${uid}-phone`} error={errors.phone}>
                        <Input
                          id={`${uid}-phone`} type="tel" placeholder="(720) 555-0100"
                          value={form.phone} onChange={set("phone")}
                          onFocus={on("phone")} onBlur={off("phone")} focused={focused.phone}
                        />
                      </Field>
                    </div>

                    <Field label="Email Address" id={`${uid}-email`} error={errors.email}>
                      <Input
                        id={`${uid}-email`} type="email" placeholder="jane@example.com"
                        value={form.email} onChange={set("email")}
                        onFocus={on("email")} onBlur={off("email")} focused={focused.email}
                      />
                    </Field>

                    <Field label="ZIP Code" id={`${uid}-zip`} error={errors.zip}>
                      <Input
                        id={`${uid}-zip`} placeholder="80202" maxLength={5}
                        value={form.zip} onChange={set("zip")}
                        onFocus={on("zip")} onBlur={off("zip")} focused={focused.zip}
                      />
                    </Field>

                    <Field label="What Are You Looking For?" id={`${uid}-service`} error={errors.service}>
                      <Select
                        id={`${uid}-service`} value={form.service} onChange={set("service")}
                        onFocus={on("service")} onBlur={off("service")} focused={focused.service}
                      />
                    </Field>
                  </div>

                  {/* ── FOOTER / CTA ──────────────────────────────────── */}
                  <div className="px-7 pb-7 flex flex-col gap-4">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl text-sm font-bold tracking-wide"
                      style={{
                        background: loading ? "rgba(224,79,43,0.6)" : C.terra,
                        color: C.white,
                        fontFamily: "'Satoshi', sans-serif",
                        fontWeight: 700,
                        letterSpacing: "0.025em",
                        cursor: loading ? "wait" : "pointer",
                        border: "none",
                        boxShadow: loading
                          ? "none"
                          : "0 6px 22px rgba(224,79,43,0.30), 0 2px 6px rgba(224,79,43,0.18)",
                      }}
                      whileHover={loading ? {} : {
                        scale: 1.025,
                        y: -2,
                        boxShadow: "0 12px 32px rgba(224,79,43,0.38), 0 3px 10px rgba(224,79,43,0.2)",
                      }}
                      whileTap={loading ? {} : { scale: 0.97, y: 0 }}
                      transition={{ type: "spring", stiffness: 440, damping: 22 }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2.5">
                          <motion.span
                            className="inline-block w-4 h-4 rounded-full border-2"
                            style={{ borderColor: "rgba(255,255,255,0.28)", borderTopColor: "#fff" }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.72, repeat: Infinity, ease: "linear" }}
                          />
                          Sending…
                        </span>
                      ) : (
                        "Get My Free Consultation →"
                      )}
                    </motion.button>

                    <p
                      className="text-center"
                      style={{
                        fontSize: 11,
                        lineHeight: 1.65,
                        color: "rgba(70,30,45,0.42)",
                        fontFamily: "'Satoshi', sans-serif",
                      }}
                    >
                      No pressure. We'll learn about your space, goals, and what makes sense for your property.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
