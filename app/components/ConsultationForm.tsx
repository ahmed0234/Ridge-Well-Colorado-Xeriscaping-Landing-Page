"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PiCheckCircle, PiLeafLight } from "react-icons/pi";

// ─── Color Palette ──────────────────────────────────────────────────────────
const C = {
  sand: "#F4DEBF",
  sandLight: "#FAF0E3",
  plum: "#4C2733",
  deepPlum: "#461E2D",
  terra: "#E86240",
  terraGlow: "rgba(232, 98, 64, 0.15)",
  white: "#FFFFFF",
};

const SERVICES = [
  "Front Yard Xeriscape",
  "Backyard Xeriscape",
  "Full Property Transformation",
  "Replace Grass / Lower Maintenance",
  "Not Sure Yet",
] as const;

/** JSON body sent to POST /api/consultation */
export type ConsultationRequestBody = {
  /** Full name (2–80 characters) */
  name: string;
  /** Phone as entered by the user (10–15 digits when normalized) */
  phone: string;
  /** Valid email address */
  email: string;
  /** 5-digit US ZIP, e.g. "80202" */
  zip: string;
  /** One of the SERVICES options */
  service: string;
  /** Optional comments from the user */
  comments: string;
};

const CONSULTATION_API = "http://localhost:3001/api/contact";

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function validateForm(form: ConsultationRequestBody): Record<string, string> {
  const e: Record<string, string> = {};
  const name = form.name.trim();
  const phoneDigits = normalizePhone(form.phone);
  const email = form.email.trim();
  const zip = form.zip.trim();

  if (!name) e.name = "Please enter your name.";
  else if (name.length < 2) e.name = "Name should be at least 2 characters.";
  else if (name.length > 80) e.name = "Name is a bit long — please shorten it.";

  if (!form.phone.trim()) e.phone = "Please enter a phone number.";
  else if (phoneDigits.length < 10)
    e.phone = "Please enter a valid 10-digit phone number.";
  else if (phoneDigits.length > 15) e.phone = "Phone number looks too long.";

  if (!email) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email))
    e.email = "Please enter a valid email address.";
  else if (email.length > 120) e.email = "Email address is too long.";

  if (!zip) e.zip = "Please enter your ZIP code.";
  else if (!/^\d{5}$/.test(zip)) e.zip = "ZIP should be 5 digits (e.g. 80202).";

  if (!form.service) e.service = "Please select a service.";
  else if (!SERVICES.includes(form.service as (typeof SERVICES)[number]))
    e.service = "Please choose a service option.";

  return e;
}

function buildPayload(form: ConsultationRequestBody): ConsultationRequestBody {
  return {
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    zip: form.zip.trim(),
    service: form.service,
    comments: form.comments.trim(),
  };
}

// ─── Field Wrapper ────────────────────────────────────────────────────────────
function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={id}
        className="font-satoshi text-[12.5px] font-bold tracking-wider text-foreground/85 uppercase"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            className="font-satoshi text-xs font-semibold text-[#E86240] mt-1.5 block"
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
function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  ...rest
}: any) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className="w-full bg-background/40 hover:bg-background/60 focus:bg-background/80 text-foreground placeholder:text-foreground/45 border border-foreground/15 hover:border-foreground/30 focus:border-[#E86240] focus:ring-4 focus:ring-[#E86240]/15 transition-all duration-200 rounded-xl px-4 py-3.5 outline-none font-satoshi text-[13.5px] shadow-[inset_0_1.5px_3px_rgba(70,30,45,0.04)]"
      {...rest}
    />
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
function Select({ id, value, onChange, onFocus, onBlur, ...rest }: any) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className="w-full bg-background/40 hover:bg-background/60 focus:bg-background/80 text-foreground border border-foreground/15 hover:border-foreground/30 focus:border-[#E86240] focus:ring-4 focus:ring-[#E86240]/15 transition-all duration-200 rounded-xl px-4 py-3.5 pr-9 outline-none font-satoshi text-[13.5px] shadow-[inset_0_1.5px_3px_rgba(70,30,45,0.04)] appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='rgba(70,30,45,0.55)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "calc(100% - 13px) center",
      }}
      {...rest}
    >
      <option value="" disabled className="text-foreground/45 bg-[#FAF0E3]">
        Select a service…
      </option>
      {SERVICES.map((s) => (
        <option key={s} value={s} className="text-foreground bg-[#FAF0E3]">
          {s}
        </option>
      ))}
    </select>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
function Textarea({
  id,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  rows = 4,
  ...rest
}: any) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      rows={rows}
      className="w-full bg-background/40 hover:bg-background/60 focus:bg-background/80 text-foreground placeholder:text-foreground/45 border border-foreground/15 hover:border-foreground/30 focus:border-[#E86240] focus:ring-4 focus:ring-[#E86240]/15 transition-all duration-200 rounded-xl px-4 py-3.5 outline-none font-satoshi text-[13.5px] shadow-[inset_0_1.5px_3px_rgba(70,30,45,0.04)] resize-y"
      {...rest}
    />
  );
}


// ─── Main Component ───────────────────────────────────────────────────────────
export default function ConsultationForm() {
  const uid = useId();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    zip: "",
    service: "",
    comments: "",
  });
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set =
    (k: keyof ConsultationRequestBody) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [k]: value }));
      setErrors((prev) => {
        if (!prev[k]) return prev;
        const next = { ...prev };
        delete next[k];
        return next;
      });
      setSubmitError(null);
    };

  const setZip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
    setForm((f) => ({ ...f, zip: digits }));
    setErrors((prev) => {
      if (!prev.zip) return prev;
      const next = { ...prev };
      delete next.zip;
      return next;
    });
    setSubmitError(null);
  };

  const on = (k: string) => () => setFocused((f) => ({ ...f, [k]: true }));
  const off = (k: string) => () => setFocused((f) => ({ ...f, [k]: false }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const payload = buildPayload(form);
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(CONSULTATION_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok) {
        if (data.errors && typeof data.errors === "object") {
          setErrors(data.errors);
        }
        setSubmitError(
          data.message ??
            "We couldn't send your request. Please try again or call us directly.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Network error — please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
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
        src="/CtaForm/Leafs_Strans.png"
        alt=""
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
        src="/CtaForm/leaf_3rd.png"
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
        src="/CtaForm/Leaf_Stran.png"
        alt=""
        className="absolute pointer-events-none select-none"
        style={{
          top: "25%",
          right: "-28px",
          width: "52px",
          opacity: 0.6,
          zIndex: 29,
          filter: "drop-shadow(0 2px 8px rgba(40,80,40,0.08))",
          transformOrigin: "top center",
          willChange: "transform",
        }}
        animate={{ rotate: [2, -1, 2], y: [0, 6, 0] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* ══ BOTANICAL LAYER 4 — Fern growing from bottom-right ══════════
          greenfern.png rises up from outside the bottom-right card edge.
      */}
      <motion.img
        src="/CtaForm/greenfern.png"
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
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* ══ INNER GLASS CARD ════════════════════════════════════════════
            Sits on top of the rotating border (z-10), isolates blur so
            the backdrop-filter only applies inside the card.
        */}
        <div
          className="relative overflow-hidden rounded-[21px]"
          style={{
            background: "rgba(244, 222, 191, 0.88)",
            backdropFilter: "blur(26px) saturate(1.45)",
            WebkitBackdropFilter: "blur(26px) saturate(1.45)",
            zIndex: 10,
            boxShadow:
              "0 2px 0 rgba(255,255,255,0.6) inset," +
              "0 24px 56px rgba(76,39,51,0.12)," +
              "0 4px 14px rgba(76,39,51,0.06)",
          }}
        >
          {/* Subtle interior ghost plants — blurred through glass layer */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 1 }}
          >
            <img
              src="/CtaForm/Leafs_Strans.png"
              alt=""
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
              src="/CtaForm/leaf_3rd.png"
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
                  transition={{
                    delay: 0.12,
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  }}
                  className="flex items-center justify-center w-16 h-16 rounded-full"
                  style={{ background: "rgba(232,98,64,0.10)" }}
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
                      color: "rgba(76,39,51,0.75)",
                      fontFamily: "'Satoshi', sans-serif",
                      maxWidth: 268,
                      margin: "0 auto",
                    }}
                  >
                    We'll reach out within 1 business day to schedule your free
                    xeriscape design consultation.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* ── FORM STATE ── */
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ zIndex: 2, position: "relative" }}
              >
                {/* ── HEADER ──────────────────────────────────────────── */}
                <div
                  className="px-7 pt-8 pb-5"
                  style={{ borderBottom: "1px solid rgba(70,30,45,0.07)" }}
                >
                  {/* Eyebrow tag */}
                  <div className="flex items-center gap-2 mb-3.5">
                    <div
                      className="flex items-center justify-center w-5 h-5 rounded-full"
                      style={{ background: "rgba(232,98,64,0.12)" }}
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
                      fontSize: "clamp(1.5rem, 2.2vw, 1.65rem)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: C.deepPlum,
                    }}
                    className="font-clash "
                  >
                    Get Your Free
                    <br />
                    Design Consultation
                  </h2>
                </div>

                {/* ── FORM FIELDS ──────────────────────────────────────── */}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="px-7 py-5 flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="Full Name"
                        id={`${uid}-name`}
                        error={errors.name}
                      >
                        <Input
                          id={`${uid}-name`}
                          placeholder="Jane Smith"
                          autoComplete="name"
                          value={form.name}
                          onChange={set("name")}
                          onFocus={on("name")}
                          onBlur={off("name")}
                          aria-invalid={!!errors.name}
                        />
                      </Field>
                      <Field
                        label="Phone"
                        id={`${uid}-phone`}
                        error={errors.phone}
                      >
                        <Input
                          id={`${uid}-phone`}
                          type="tel"
                          placeholder="(720) 555-0100"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={set("phone")}
                          onFocus={on("phone")}
                          onBlur={off("phone")}
                          aria-invalid={!!errors.phone}
                        />
                      </Field>
                    </div>

                    <Field
                      label="Email Address"
                      id={`${uid}-email`}
                      error={errors.email}
                    >
                      <Input
                        id={`${uid}-email`}
                        type="email"
                        placeholder="jane@example.com"
                        autoComplete="email"
                        value={form.email}
                        onChange={set("email")}
                        onFocus={on("email")}
                        onBlur={off("email")}
                        aria-invalid={!!errors.email}
                      />
                    </Field>

                    <Field
                      label="ZIP Code"
                      id={`${uid}-zip`}
                      error={errors.zip}
                    >
                      <Input
                        id={`${uid}-zip`}
                        placeholder="80202"
                        inputMode="numeric"
                        maxLength={5}
                        value={form.zip}
                        onChange={setZip}
                        onFocus={on("zip")}
                        onBlur={off("zip")}
                        aria-invalid={!!errors.zip}
                      />
                    </Field>

                    <Field
                      label="What Are You Looking For?"
                      id={`${uid}-service`}
                      error={errors.service}
                    >
                      <Select
                        id={`${uid}-service`}
                        value={form.service}
                        onChange={set("service")}
                        onFocus={on("service")}
                        onBlur={off("service")}
                        aria-invalid={!!errors.service}
                      />
                    </Field>

                    <Field
                      label="Comments"
                      id={`${uid}-comments`}
                      error={errors.comments}
                    >
                      <Textarea
                        id={`${uid}-comments`}
                        placeholder="Tell us about your project, timing, budget, or any specific ideas you have..."
                        value={form.comments}
                        onChange={set("comments")}
                        onFocus={on("comments")}
                        onBlur={off("comments")}
                        aria-invalid={!!errors.comments}
                        rows={2}
                      />
                    </Field>
                  </div>

                  {/* ── FOOTER / CTA ──────────────────────────────────── */}
                  <div className="px-7 pb-7 flex flex-col gap-4">
                    <AnimatePresence>
                      {submitError && (
                        <motion.p
                          role="alert"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="font-satoshi text-sm font-semibold text-center px-4 py-3 rounded-xl"
                          style={{
                            color: C.deepPlum,
                            background: "rgba(232,98,64,0.12)",
                            border: "1px solid rgba(232,98,64,0.28)",
                          }}
                        >
                          {submitError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={loading ? {} : { scale: 1.04, y: -2 }}
                      whileTap={loading ? {} : { scale: 0.96 }}
                      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl px-8 py-4.5 disabled:opacity-75 disabled:cursor-not-allowed"
                      style={{
                        background:
                          "linear-gradient(135deg, #D94F2B 0%, #E86240 45%, #C63E1D 100%)",
                        boxShadow:
                          "0 12px 35px rgba(232,98,64,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
                      }}
                    >
                      {/* deep inner gloss */}
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.10), transparent 35%, transparent 65%, rgba(0,0,0,0.12))",
                        }}
                      />

                      {/* razor sharp moving glaze */}
                      <motion.div
                        className="absolute top-0 bottom-0 w-20 hidden"
                        animate={{
                          x: ["-150%", "420%"],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 0.6,
                        }}
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(252, 223, 184, 0.2) 10%, rgba(252, 223, 184, 0.75) 50%, rgba(252, 223, 184, 0.2) 70%, transparent 100%)",
                          transform: "skewX(-24deg)",
                          filter: "blur(0.5px)",
                          mixBlendMode: "screen",
                        }}
                      />

                      {/* subtle animated glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{
                          opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{
                          background:
                            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16), transparent 45%)",
                        }}
                      />

                      {/* edge highlight */}
                      <div
                        className="absolute inset-[1px] rounded-[15px] pointer-events-none"
                        style={{
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />

                      {/* text */}
                      <span
                        className="relative z-10 flex items-center gap-3 text-base font-bold tracking-[0.03em]"
                        style={{
                          color: "#fff",
                          fontFamily: "Satoshi, sans-serif",
                        }}
                      >
                        {loading
                          ? "Sending…"
                          : "Get Your Free Design Consultation"}
                        {!loading && (
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="text-lg"
                            aria-hidden
                          >
                            →
                          </motion.span>
                        )}
                      </span>
                    </motion.button>

                    <p
                      className="text-center"
                      style={{
                        fontSize: 11,
                        lineHeight: 1.65,
                        color: "rgba(76,39,51,0.65)",
                        fontFamily: "'Satoshi', sans-serif",
                      }}
                    >
                      No pressure. We'll learn about your space, goals, and what
                      makes sense for your property.
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
