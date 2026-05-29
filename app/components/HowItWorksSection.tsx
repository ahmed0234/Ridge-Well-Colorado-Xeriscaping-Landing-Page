"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import styles from "./how-it-works.module.css";


function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() === true;
  const [visible, setVisible] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-40px", threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

type StepVariant = "sand" | "clay" | "plum";

const PROCESS_STEPS: {
  id: string;
  number: string;
  shortLabel: string;
  title: string;
  description: string;
  variant: StepVariant;
}[] = [
  {
    id: "consultation",
    number: "01",
    shortLabel: "Consult",
    title: "Free Design Consultation",
    description:
      "We learn about your space, goals, and what you want your yard to look like.",
    variant: "sand",
  },
  {
    id: "plan",
    number: "02",
    shortLabel: "Design",
    title: "Custom Xeriscape Plan",
    description:
      "We recommend a design built around your property and Colorado climate.",
    variant: "clay",
  },
  {
    id: "install",
    number: "03",
    shortLabel: "Build",
    title: "Professional Installation",
    description:
      "Our team handles everything from prep to completion.",
    variant: "plum",
  },
];

const VARIANT_CLASS: Record<StepVariant, string> = {
  sand: styles.stepSand,
  clay: styles.stepClay,
  plum: styles.stepPlum,
};

function ProcessStepCard({
  step,
  index,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
}) {
  return (
    <Reveal delay={100 + index * 90}>
      <article
        className={`${styles.step} ${VARIANT_CLASS[step.variant]}`}
        aria-labelledby={`process-${step.id}-title`}
      >
        <div className={styles.stepMarkerMobile} aria-hidden="true">
          <span className={`font-sans ${styles.stepMarkerDot}`}>
            {step.number}
          </span>
          <span className={styles.stepMarkerLine} />
        </div>

        <div className={styles.stepInner}>
          <span className={`font-sans ${styles.stepIndex}`}>
            Step {step.number}
          </span>
          <h3
            id={`process-${step.id}-title`}
            className={`font-sans ${styles.stepTitle}`}
          >
            {step.title}
          </h3>
          <p className={`font-satoshi ${styles.stepDesc}`}>{step.description}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function HowItWorksSection() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [pathDrawn, setPathDrawn] = useState(false);
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    if (reduceMotion) {
      setPathDrawn(true);
      return;
    }
    const el = journeyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPathDrawn(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px", threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className={styles.section}
    >
      {/* Warm atmospheric depth */}
      <div className={styles.ambient} aria-hidden="true">
        <div className={`${styles.ambient} ${styles.ambientGrain}`} />
        <div className={`${styles.ambient} ${styles.ambientGlowWarm}`} />
        <div className={`${styles.ambient} ${styles.ambientGlowEarth}`} />
        <div className={`${styles.ambient} ${styles.ambientGlowPlum}`} />
      </div>

      <div className={styles.topBlend} aria-hidden="true" />

      <div className={`${styles.inner} relative z-10`}>
        <Reveal>
          <header className={styles.header}>
            <h2 id="how-it-works-heading" className={`font-sans ${styles.headline}`}>
              Here&apos;s How It Works
            </h2>
          </header>
        </Reveal>

        <div
          ref={journeyRef}
          className={`${styles.journeyCanvas} ${pathDrawn ? styles.pathwayDrawn : ""}`}
        >
          <div className={styles.pathway} role="presentation" aria-hidden="true">
            <div className={styles.pathwayLine} />
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.id}
                className={`${styles.pathwayNode} ${
                  i === 2 ? styles.pathwayNodeFinish : ""
                }`}
              >
                <span className={`font-sans ${styles.pathwayDot}`}>
                  {step.number}
                </span>
                <span className={`font-satoshi ${styles.pathwayLabel}`}>
                  {step.shortLabel}
                </span>
              </div>
            ))}
          </div>

          <ol className={styles.journeySteps} role="list">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.id}>
                <ProcessStepCard step={step} index={i} />
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={400}>
          <div className={styles.ctaPanel}>
            <div>
              <span className={`font-sans ${styles.ctaEyebrow}`}>
                Start here
              </span>
              <p className={`font-satoshi ${styles.ctaCopy}`}>
                <strong>Ready when you are.</strong> Tell us about your property
                and we&apos;ll walk you through the process no pressure, no
                surprises.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link
                href="#Form"
                className={`font-satoshi ${styles.ctaPrimary} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86240] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a1018]`}
              >
                Get Your Free Design Consultation
                <ArrowRight
                  className={`w-4 h-4 ${styles.ctaArrow}`}
                  aria-hidden="true"
                />
              </Link>
              <p className={`font-satoshi ${styles.ctaNote}`}>
                Free visit · Honest recommendations · Licensed &amp; insured
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}