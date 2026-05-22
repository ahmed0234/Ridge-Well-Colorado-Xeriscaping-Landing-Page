"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const faqs: FAQItem[] = [
  {
    id: 1,
    question: "How much does xeriscaping cost in Denver?",
    answer:
      "Every project is different depending on size, materials, and design. We provide free consultations so you know exactly what makes sense for your property and budget.",
  },
  {
    id: 2,
    question: "Does xeriscaping really reduce maintenance?",
    answer:
      "Yes. Most homeowners spend significantly less time watering, mowing, and maintaining their landscaping.",
  },
  {
    id: 3,
    question: "Can xeriscaping still look beautiful?",
    answer:
      "Absolutely. Modern xeriscaping combines decorative stone, premium plants, and thoughtful design to create landscaping that looks clean and attractive year-round.",
  },
  {
    id: 4,
    question: "How long does a xeriscaping project take?",
    answer:
      "Most projects are completed within days depending on project size.",
  },
  {
    id: 5,
    question: "Do you also build patios and walkways?",
    answer:
      "Yes. We can incorporate patios, walkways, and outdoor features into your xeriscape design.",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── FAQ Item Component ───────────────────────────────────────────────────────
function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.li
      variants={itemVariants}
      className="border-b border-[#F4DEBF]/10"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group w-full flex items-start gap-5 py-8 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E86240]/50"
      >
        {/* Number */}
        <span className="font-sans text-[16px] font-semibold text-[#E86240]/95 min-w-[28px] pt-[3px] tracking-wider hidden sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span
          className={`flex-1 font-sans text-[17px] sm:text-[22px] font-medium leading-snug transition-colors duration-200 ${
            open
              ? "text-white"
              : "text-[#F4DEBF] group-hover:text-white"
          }`}
        >
          {item.question}
        </span>

        {/* Icon */}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className={`mt-[3px] flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            open
              ? "border-[#E86240]/40 bg-[#E86240]/10"
              : "border-[#F4DEBF]/20 group-hover:border-[#E86240]/30"
          }`}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 14 14"
            className={`w-3 h-3 transition-colors duration-200 ${open ? "stroke-[#E86240]" : "stroke-[#F4DEBF]/60 group-hover:stroke-[#E86240]"}`}
            strokeWidth="2"
            fill="none"
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[15px] sm:text-[18px] font-normal leading-[1.75] text-[#F4DEBF]/70 pb-8 sm:pl-[44px]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────
function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-[#461E2D] py-[100px] px-6 overflow-hidden"
      aria-labelledby="faq-title"
    >
      {/* Background glows */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 10% 20%, rgba(232,98,64,0.06) 0%, transparent 70%), radial-gradient(ellipse 500px 500px at 90% 80%, rgba(76,39,51,0.8) 0%, transparent 60%)",
        }}
      />
      {/* Noise grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[760px] mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 font-sans text-[18px] font-medium tracking-[0.22em] uppercase text-[#E86240] mb-5"
        >
          FAQ
          <span className="block w-8 h-px bg-[#E86240] opacity-60" aria-hidden="true" />
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="faq-title"
          variants={headingVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-sans text-4xl lg:text-7xl font-semibold leading-[1.08] text-background mb-12 tracking-[-0.01em]"
        >
          Questions,{" "}
          <em className="font-light italic text-[#F4DEBF]/60">answered</em>
          <br />honestly.
        </motion.h2>

        {/* Accordion */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="list-none border-t border-[#F4DEBF]/10"
          role="list"
        >
          {faqs.map((item, i) => (
            <FAQRow key={item.id} item={item} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

// ─── Trust Strip ─────────────────────────────────────────────────────────────
function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const items = ["Serving Denver & the Front Range", "Free Consultations", "Licensed & Insured"];

  return (
    <div
      ref={ref}
      className="relative z-10 flex flex-wrap items-center justify-center gap-3 px-6 py-5 bg-[#461E2D]/60 border-t border-b border-[#F4DEBF]/[0.07]"
    >
      {items.map((text, i) => (
        <motion.span
          key={text}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="flex items-center gap-3 font-sans text-[16px] uppercase tracking-wide text-[#F4DEBF]/75"
        >
          {text}
          {i < items.length - 1 && (
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#E86240] opacity-50" aria-hidden="true" />
          )}
        </motion.span>
      ))}
    </div>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────
function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] flex items-center justify-center py-[100px] px-6 overflow-hidden"
      aria-labelledby="cta-headline"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-[-10%] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')",
          y: bgY,
          filter: "saturate(0.75)",
        }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(165deg, rgba(70,30,45,0.94) 0%, rgba(70,30,45,0.88) 35%, rgba(76,39,51,0.75) 65%, rgba(20,8,14,0.94) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 800px 600px at 15% 50%, rgba(232,98,64,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[720px] text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-3 font-sans text-[13px] font-medium tracking-[0.22em] uppercase text-[#E86240] mb-7"
        >
          <span className="block w-6 h-px bg-[#E86240] opacity-70" aria-hidden="true" />
          Ridgewell Landscape &amp; Design
          <span className="block w-6 h-px bg-[#E86240] opacity-70" aria-hidden="true" />
        </motion.p>

        {/* Headline */}
        <motion.h2
          id="cta-headline"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-3xl lg:text-6xl font-semibold leading-[1.1] text-background mb-6 tracking-[-0.01em]"
        >
          Stop Spending Time And Money On{" "}
          <strong className="font-semibold italic text-[#E86240]">
            Landscaping That Constantly Needs Work
          </strong>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-lg lg:text-xl font-normal leading-tight lg:leading-[1.75] text-[#F4DEBF]/85 max-w-[560px] mx-auto mb-[40px]"
        >
          Get a custom xeriscape designed for Colorado living and finally enjoy
          a yard that looks good without the constant maintenance.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Primary CTA */}
          <motion.a
            href="#"
            whileHover={{
              y: -2,
              scale: 1.012,
              boxShadow:
                "0 8px 40px rgba(232,98,64,0.45), 0 0 0 4px rgba(232,98,64,0.12)",
            }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-3 font-sans text-[15px] font-medium tracking-wide text-white bg-[#E86240] rounded-[3px] px-10 py-[18px] no-underline"
            style={{
              boxShadow: "0 4px 24px rgba(232,98,64,0.25)",
            }}
          >
            Get Your Free Design Consultation
            <motion.svg
              viewBox="0 0 16 16"
              className="w-4 h-4 stroke-white"
              strokeWidth="2"
              fill="none"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              aria-hidden="true"
            >
              <line x1="2" y1="8" x2="13" y2="8" />
              <polyline points="9,4 13,8 9,12" />
            </motion.svg>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="tel:+17208825772"
            whileHover={{
              color: "#E86240", // Terra (prominent callout color)
              backgroundColor: "rgba(244,222,191,0.11)", // soft sand hover glow
              borderColor: "#E86240",
              boxShadow:
                "0 4px 24px 0 rgba(232,98,64,0.19), 0 0 0 2px rgba(244,222,191,0.20)"
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 font-sans text-[16px] font-medium text-[#F4DEBF] bg-transparent border border-[#F4DEBF]/32 rounded-[4px] px-6 py-2 transition-all duration-200 shadow-none hover:shadow-md focus:outline-none"
            style={{
              boxShadow: "0 1px 8px 0 rgba(244,222,191,0.08)",
            }}
          >
            <span className="text-lg">📞</span>
            <span>
              Call Ridgewell&nbsp;Landscape &amp;&nbsp;Design&nbsp;
              <span
                className="font-bold text-[#E86240] whitespace-nowrap"
                style={{
                  letterSpacing: "0.03em",
                  fontFamily: "inherit"
                }}
              >
                +<span className="not-italic">(1)</span> 720-882-5772
              </span>
            </span>
          </motion.a>
        </motion.div>
   
      </div>
    </section>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function RidgewellFAQCTA() {
  return (
    <>
      <FAQSection />
      <TrustStrip />
      <CTASection />
    </>
  );
}