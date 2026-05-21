"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PiDropHalfBottomLight } from "react-icons/pi";
import styles from "./whats-included.module.css";

/* ── Reveal (IntersectionObserver + CSS — no Framer per-card) ─────────── */
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
      { rootMargin: "-48px", threshold: 0.06 }
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

/* ── Content data ─────────────────────────────────────────────────────── */
type CardVariant = "hero" | "heroAlt" | "standard" | "compact";

interface IncludedItem {
  id: string;
  title: string;
  description: string;
  hook?: string;
  tag?: string;
  variant: CardVariant;
  image?: string;
  imageAlt?: string;
  splitImages?: { before: string; after: string; beforeAlt: string; afterAlt: string };
  graphic?: boolean;
}

const INCLUDED_ITEMS: IncludedItem[] = [
  {
    id: "design",
    title: "Custom Xeriscape Design",
    description:
      "We create low-water landscape designs built specifically for your property, style, and Colorado climate.",
    tag: "Core service",
    variant: "hero",
    image: "/beforeandafter/after_1.png",
    imageAlt: "Beautiful finished xeriscape with gravel and native plants",
  },
  {
    id: "conversion",
    title: "Lawn To Xeriscape Conversion",
    hook: "Still paying to water grass you barely use?",
    description:
      "We replace traditional lawns with beautiful low-maintenance landscapes designed to thrive in Colorado.",
    tag: "Most popular",
    variant: "heroAlt",
    splitImages: {
      before: "/beforeandafter/before_1.png",
      after: "/beforeandafter/after_1.png",
      beforeAlt: "Patchy lawn before xeriscape conversion",
      afterAlt: "Low-water landscape after lawn replacement",
    },
  },
  {
    id: "rock",
    title: "Decorative Rock & Gravel Landscaping",
    description:
      "Replace patchy grass with decorative stone and clean, modern landscaping that stays beautiful year-round.",
    variant: "standard",
    image: "/beforeandafter/after_1.png",
    imageAlt: "River rock and decorative gravel in a modern yard",
  },
  {
    id: "plants",
    title: "Drought-Resistant Plants",
    hook: "A low-water yard doesn't have to look boring.",
    description:
      "We install Colorado-friendly plants that thrive with less water while keeping your landscaping beautiful.",
    variant: "standard",
    image: "/hero-bg.png",
    imageAlt: "Premium drought-resistant plants integrated in landscape",
  },
  {
    id: "irrigation",
    title: "Smart Irrigation Systems",
    description:
      "Use less water without sacrificing healthy plants. Efficient drip systems help reduce waste and simplify maintenance.",
    variant: "standard",
    graphic: true,
  },
  {
    id: "walkways",
    title: "Walkways & Outdoor Features",
    hook: "Want to take things further?",
    description:
      "We can incorporate walkways, patios, edging, and outdoor features that blend naturally into your xeriscape — without shifting focus away from water-smart design.",
    tag: "Optional add-on",
    variant: "compact",
    image: "/beforeandafter/before_1.png",
    imageAlt: "Stone pathway blending into xeriscape design",
  },
];

const SLOT_CLASS: Record<CardVariant, string> = {
  hero: styles.slotHero,
  heroAlt: styles.slotHeroAlt,
  standard: styles.slotStandard,
  compact: styles.slotCompact,
};

/* ── Organic desert horizon — premium top edge (SVG, no clipart) ───────── */
function DesertHorizonEdge() {
  return (
    <div className={`${styles.topEdge} ${styles.topEdgeFade}`} aria-hidden="true">
      <svg
        className={styles.topEdgeSvg}
        viewBox="0 0 1440 108"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wi-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F4DEBF" />
            <stop offset="100%" stopColor="#ECD4B0" />
          </linearGradient>
          <linearGradient id="wi-dune-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8CBAA" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ECD4B0" />
          </linearGradient>
          <linearGradient id="wi-dune-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4B896" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F4DEBF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wi-rock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4C2733" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#4C2733" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Base — blends with Our Services section above */}
        <rect width="1440" height="108" fill="url(#wi-sky)" />

        {/* Topographic contours — architectural, subtle */}
        <g className={styles.contourDrift} opacity="0.45">
          <path
            d="M0 52 Q180 44 360 50 Q540 56 720 48 Q900 40 1080 52 Q1260 64 1440 46"
            fill="none"
            stroke="#4C2733"
            strokeOpacity="0.08"
            strokeWidth="0.8"
          />
          <path
            d="M0 58 Q200 50 400 56 Q600 62 800 54 Q1000 46 1200 58 Q1320 64 1440 52"
            fill="none"
            stroke="#4C2733"
            strokeOpacity="0.06"
            strokeWidth="0.6"
          />
          <path
            d="M0 64 Q240 58 480 62 Q720 66 960 60 Q1200 54 1440 62"
            fill="none"
            stroke="#E86240"
            strokeOpacity="0.12"
            strokeWidth="0.5"
          />
        </g>

        {/* Layered dune terrain */}
        <g className={styles.duneDrift}>
          <path
            d="M0 72 C120 58 240 68 360 54 C480 40 600 62 720 48 C840 34 960 56 1080 44 C1200 32 1320 52 1440 40 L1440 108 L0 108 Z"
            fill="url(#wi-dune-a)"
          />
          <path
            d="M0 82 C160 70 320 78 480 66 C640 54 800 74 960 62 C1120 50 1280 68 1440 58 L1440 108 L0 108 Z"
            fill="#ECD4B0"
            opacity="0.92"
          />
          <path
            d="M0 90 C200 82 400 88 600 80 C800 72 1000 86 1200 78 C1320 74 1440 80 1440 108 L0 108 Z"
            fill="url(#wi-dune-b)"
          />
        </g>

        {/* Rock formations — ground line */}
        <g opacity="0.5">
          <ellipse cx="120" cy="86" rx="28" ry="7" fill="url(#wi-rock)" />
          <ellipse cx="380" cy="88" rx="22" ry="5" fill="url(#wi-rock)" />
          <ellipse cx="620" cy="84" rx="34" ry="8" fill="url(#wi-rock)" />
          <ellipse cx="900" cy="87" rx="26" ry="6" fill="url(#wi-rock)" />
          <ellipse cx="1180" cy="85" rx="30" ry="7" fill="url(#wi-rock)" />
          <ellipse cx="1320" cy="89" rx="18" ry="4" fill="#461E2D" fillOpacity="0.06" />
        </g>

        {/* Minimal agave silhouettes — geometric, not cartoon */}
        <g fill="#461E2D" opacity="0.2">
          <g transform="translate(200, 52)">
            <path d="M0 28 L-6 0 L0 10 L6 0 Z" />
            <path d="M0 28 L-14 8 L-4 12 L0 10 Z" opacity="0.85" />
            <path d="M0 28 L14 8 L4 12 L0 10 Z" opacity="0.85" />
          </g>
          <g transform="translate(520, 48) scale(0.9)">
            <path d="M0 30 L-7 0 L0 11 L7 0 Z" />
            <path d="M0 30 L-15 10 L-5 13 L0 11 Z" opacity="0.8" />
            <path d="M0 30 L15 10 L5 13 L0 11 Z" opacity="0.8" />
          </g>
          <g transform="translate(1080, 50) scale(1.05)">
            <path d="M0 28 L-6 0 L0 10 L6 0 Z" />
            <path d="M0 28 L-14 8 L-4 12 L0 10 Z" opacity="0.85" />
            <path d="M0 28 L14 8 L4 12 L0 10 Z" opacity="0.85" />
          </g>
        </g>

        {/* Columnar cactus — matches site language (Transformation border) */}
        <g fill="#4C2733" opacity="0.18">
          <g transform="translate(340, 38)">
            <rect x="-3" y="0" width="6" height="36" rx="3" />
            <path d="M-3 14 C-12 14 -14 6 -14 6 L-11 6 C-11 6 -10 12 -3 12" />
            <rect x="-13" y="2" width="5" height="10" rx="2.5" />
            <path d="M3 18 C12 18 14 10 14 10 L11 10 C11 10 10 16 3 16" />
            <rect x="8" y="4" width="5" height="9" rx="2.5" />
          </g>
          <g transform="translate(760, 42) scale(0.85)">
            <rect x="-3" y="0" width="6" height="32" rx="3" />
            <path d="M3 16 C11 16 13 8 13 8 L10 8 C10 8 9 14 3 14" />
          </g>
          <g transform="translate(1240, 40) scale(0.75)">
            <rect x="-3" y="0" width="6" height="30" rx="3" />
            <path d="M-3 12 C-11 12 -13 5 -13 5 L-10 5 C-10 5 -9 11 -3 11" />
          </g>
        </g>

        {/* Barrel cactus accents */}
        <g fill="#4C2733" opacity="0.14">
          <ellipse cx="450" cy="78" rx="9" ry="12" />
          <ellipse cx="442" cy="66" rx="7" ry="9" transform="rotate(-12 442 66)" />
          <ellipse cx="458" cy="64" rx="7" ry="9" transform="rotate(12 458 64)" />
          <ellipse cx="950" cy="76" rx="8" ry="11" />
          <ellipse cx="944" cy="66" rx="6" ry="8" transform="rotate(-10 944 66)" />
          <ellipse cx="956" cy="65" rx="6" ry="8" transform="rotate(10 956 65)" />
        </g>

        {/* Gravel scatter — subtle dots */}
        <g fill="#4C2733" opacity="0.12">
          {[80, 160, 280, 410, 550, 680, 820, 1010, 1150, 1280, 1380].map(
            (x, i) => (
              <circle
                key={x}
                cx={x}
                cy={92 + (i % 3)}
                r={1.2 + (i % 2) * 0.4}
              />
            )
          )}
        </g>

        {/* Luxury horizon accent */}
        <path
          d="M0 78 Q240 68 480 74 Q720 80 960 70 Q1200 60 1440 72"
          fill="none"
          stroke="#E86240"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <path
          d="M0 80 Q360 72 720 76 Q1080 80 1440 74"
          fill="none"
          stroke="#F4DEBF"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />

        {/* Soft crest highlight */}
        <path
          d="M0 68 Q360 52 720 58 Q1080 64 1440 50 L1440 78 Q1080 72 720 66 Q360 60 0 68 Z"
          fill="#F4DEBF"
          fillOpacity="0.12"
        />
      </svg>
    </div>
  );
}

/* ── Media block ────────────────────────────────────────────────────────── */
function CardMedia({ item }: { item: IncludedItem }) {
  if (item.graphic) {
    return (
      <div className={`${styles.media} ${styles.mediaGraphic}`} aria-hidden="true">
        <div className={styles.graphicIcon}>
          <PiDropHalfBottomLight size={32} />
        </div>
      </div>
    );
  }

  if (item.splitImages) {
    return (
      <div className={`${styles.media} ${styles.mediaSplit}`}>
        <span className={styles.beforeAfterBadge}>Before → After</span>
        <div className="relative h-full overflow-hidden">
          <Image
            src={item.splitImages.before}
            alt={item.splitImages.beforeAlt}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className={`object-cover ${styles.imageZoom}`}
          />
          <span className={`${styles.splitLabel} ${styles.splitLabelBefore}`}>
            Before
          </span>
        </div>
        <div className="relative h-full overflow-hidden border-l border-[#461E2D]/15">
          <Image
            src={item.splitImages.after}
            alt={item.splitImages.afterAlt}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className={`object-cover ${styles.imageZoom}`}
          />
          <span className={`${styles.splitLabel} ${styles.splitLabelAfter}`}>
            After
          </span>
        </div>
        <div className={styles.mediaOverlay} aria-hidden="true" />
      </div>
    );
  }

  const isFeatured = item.variant === "hero" || item.variant === "heroAlt";
  const isCompact = item.variant === "compact";

  return (
    <div
      className={`${styles.media} ${
        isFeatured
          ? styles.mediaFeatured
          : isCompact
            ? styles.mediaCompact
            : styles.mediaStandard
      }`}
    >
      <Image
        src={item.image!}
        alt={item.imageAlt!}
        fill
        sizes={
          isFeatured
            ? "(max-width: 1024px) 100vw, 55vw"
            : isCompact
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 1024px) 100vw, 33vw"
        }
        className={`object-cover ${styles.imageZoom}`}
      />
      <div
        className={isCompact ? styles.mediaOverlayLight : styles.mediaOverlay}
        aria-hidden="true"
      />
    </div>
  );
}

/* ── Bento card ─────────────────────────────────────────────────────────── */
function BentoCard({ item, delay }: { item: IncludedItem; delay: number }) {
  const isFeatured = item.variant === "hero" || item.variant === "heroAlt";
  const isCompact = item.variant === "compact";

  return (
    <Reveal delay={delay} className={SLOT_CLASS[item.variant]}>
      <article
        className={`${styles.card} h-full ${
          isFeatured ? styles.cardFeatured : ""
        } ${isCompact ? styles.cardCompact : ""}`}
        aria-labelledby={`included-${item.id}-title`}
      >
        <CardMedia item={item} />

        <div
          className={`${styles.body} ${
            isFeatured ? styles.bodyFeatured : isCompact ? styles.bodyCompact : ""
          }`}
        >
          {item.tag && (
            <span
              className={`font-satoshi ${styles.tag} ${
                isCompact ? styles.tagMuted : ""
              }`}
            >
              {item.tag}
            </span>
          )}

          {item.hook && (
            <p className={`font-satoshi ${styles.hook}`}>{item.hook}</p>
          )}

          <h3
            id={`included-${item.id}-title`}
            className={`font-sans ${styles.title} ${
              isFeatured
                ? styles.titleFeatured
                : isCompact
                  ? styles.titleCompact
                  : styles.titleStandard
            }`}
          >
            {item.title}
          </h3>

          <p
            className={`font-satoshi ${
              isCompact ? styles.descCompact : styles.desc
            }`}
          >
            {item.description}
          </p>

          {!isCompact && (
            <div className={styles.cardFooter}>
              <span
                className={`font-satoshi ${styles.learnMore}`}
                aria-hidden="true"
              >
                Learn more
                <ArrowRight className={`w-3.5 h-3.5 ${styles.learnArrow}`} />
              </span>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */
export default function WhatsIncludedSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    if (reduceMotion) {
      setHeaderVisible(true);
      return;
    }
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-40px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section
      id="whats-included"
      aria-labelledby="whats-included-heading"
      className={`relative overflow-hidden ${styles.section}`}
    >
      <DesertHorizonEdge />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 80% 10%, rgba(232,98,64,0.08), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(76,39,51,0.05), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 sm:pt-14 lg:pt-16 pb-20 lg:pb-28">
        {/* Header */}
        <div
          ref={headerRef}
          className={`max-w-3xl mb-10 lg:mb-14 ${styles.reveal} ${
            headerVisible ? styles.revealVisible : ""
          }`}
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[12px] uppercase tracking-[0.28em] text-[#E86240] border border-[#E86240]/22 bg-[#E86240]/7 mb-6 font-sans font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E86240] shrink-0" />
            Project scope
          </span>

          <h2
            id="whats-included-heading"
            className="font-sans font-bold text-[clamp(1.75rem,4.5vw,2.85rem)] text-[#461E2D] tracking-tight leading-[1.1] mb-4"
          >
            What&apos;s Included In A Xeriscaping Project?
          </h2>

          <p className="font-satoshi text-base sm:text-lg lg:text-xl text-[#4C2733]/80 leading-relaxed font-semibold max-w-2xl">
            Everything designed to reduce maintenance, lower water use, and
            create a yard that actually looks good year-round.
          </p>

        </div>

        {/* Bento grid */}
        <div className={styles.bento}>
          {INCLUDED_ITEMS.map((item, i) => (
            <BentoCard key={item.id} item={item} delay={60 + i * 50} />
          ))}
        </div>

        {/* Conversion CTA */}
        <Reveal delay={380}>
          <div className={styles.ctaBar}>
            <p className="font-satoshi text-[15px] sm:text-base text-[#4C2733]/85 font-semibold leading-snug max-w-xl">
              <span className="font-bold text-[#461E2D]">
                Ready to see what&apos;s possible on your property?
              </span>{" "}
              We&apos;ll map out a custom xeriscape plan during your free
              consultation.
            </p>
            <Link
              href="#consultation"
              className={`font-satoshi ${styles.ctaPrimary} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86240] focus-visible:ring-offset-2`}
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
