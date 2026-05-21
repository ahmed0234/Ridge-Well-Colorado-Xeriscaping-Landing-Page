"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  PiPlantLight,
  PiSquaresFourLight,
  PiDropLight,
  PiSunLight,
  PiLeafLight,
  PiPathLight,
  PiFireLight,
  PiWallLight,
  PiTreeLight,
  PiFlowerLight,
  PiGrainsLight,
  PiDropHalfBottomLight,
} from "react-icons/pi";
import styles from "./our-services.module.css";

/** Flip to true when landscaping & hardscaping cards should appear on the page */
const SHOW_SECONDARY_SERVICES = false;

/* ── Lightweight reveal (single IntersectionObserver, CSS transition) ── */
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
    if (reduceMotion) {
      setVisible(true);
      return;
    }
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

/* ── Types & data ─────────────────────────────────────────────────────── */
export interface ServiceCategory {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  plainEnglish: string;
  tagline: string;
  description: string;
  outcome: string;
  scanChips: string[];
  categories: ServiceCategory[];
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  featured?: boolean;
  stats?: { value: string; label: string }[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "xeriscaping",
    number: "01",
    title: "Xeriscaping",
    plainEnglish:
      "We replace high-water grass with drought-smart plants, gravel, and stone so your yard looks intentional, uses far less water, and needs minimal upkeep.",
    tagline:
      "Colorado-ready landscapes that use dramatically less water without looking sparse.",
    description:
      "Our core specialty. Every xeriscape is custom-designed for your lot, soil, sun exposure, and style then built with materials that thrive in dry climates.",
    outcome:
      "Lower water bills, less weekend maintenance, and a yard that looks designed not neglected.",
    scanChips: [
      "Less water",
      "Native plants",
      "Low maintenance",
      "Desert modern",
    ],
    categories: [
      {
        title: "Water-Smart Design",
        icon: PiDropHalfBottomLight,
        items: [
          "Water-efficient layout planning",
          "Irrigation optimization & zoning",
          "Turf removal & lawn conversion",
          "Hydrozoning by sun and slope",
        ],
      },
      {
        title: "Drought-Tolerant Planting",
        icon: PiLeafLight,
        items: [
          "Native & adaptive plant palettes",
          "Drought-tolerant shrubs & perennials",
          "Ornamental grasses & succulents",
          "Seasonal color without heavy watering",
        ],
      },
      {
        title: "Ground & Hard Materials",
        icon: PiGrainsLight,
        items: [
          "Decorative gravel & rock beds",
          "Mulch, boulders & river stone",
          "Permeable pathways & borders",
          "Weed barrier & proper base prep",
        ],
      },
      {
        title: "Lifestyle & Aesthetics",
        icon: PiSunLight,
        items: [
          "Low-maintenance yard design",
          "Desert-inspired modern aesthetics",
          "Sustainable outdoor living spaces",
          "Curb appeal that adds home value",
        ],
      },
    ],
    image: "/beforeandafter/after_1.png",
    imageAlt: "Finished xeriscape with gravel paths and native desert plants",
    icon: PiDropLight,
    featured: true,
    stats: [
      { value: "60%", label: "Avg. water savings" },
      { value: "4–6", label: "Weeks to completion" },
    ],
  },
  {
    id: "landscaping",
    number: "02",
    title: "Landscaping",
    plainEnglish:
      "We design and install the living parts of your yard — lawns, trees, garden beds, and planting — to make your entire property feel cohesive and beautiful.",
    tagline:
      "Complete outdoor transformations — from tired yards to cohesive, magazine-worthy spaces.",
    description:
      "Softscape design and installation that complements your home. We plan the layout, select the right plants for Colorado, and handle everything from grading to final planting.",
    outcome:
      "A polished outdoor space with structure, greenery, and seasonal interest — managed by one team.",
    scanChips: ["Planting", "Garden design", "Trees & beds", "Full-yard"],
    categories: [
      {
        title: "Design & Layout",
        icon: PiPlantLight,
        items: [
          "Full-property landscape design",
          "Garden layouts & bed shaping",
          "Lawn design & turf planning",
          "Outdoor beautification concepts",
        ],
      },
      {
        title: "Trees, Shrubs & Greenery",
        icon: PiTreeLight,
        items: [
          "Tree selection & installation",
          "Shrub masses & screening",
          "Flower beds & perennials",
          "Foundation & entryway planting",
        ],
      },
      {
        title: "Lawn & Ground Prep",
        icon: PiFlowerLight,
        items: [
          "Sod installation & lawn renovation",
          "Grading & soil preparation",
          "Edging & border definition",
          "Topsoil, compost & amendments",
        ],
      },
      {
        title: "Care & Finishing",
        icon: PiLeafLight,
        items: [
          "Mulching & bed finishing",
          "Seasonal color rotations",
          "Maintenance recommendations",
          "Irrigation coordination",
        ],
      },
    ],
    image: "/hero-bg.png",
    imageAlt: "Lush landscaped residential yard with trees and planting beds",
    icon: PiPlantLight,
  },
  {
    id: "hardscaping",
    number: "03",
    title: "Hardscaping",
    plainEnglish:
      "We build the permanent outdoor structures — patios, walkways, walls, and stone features — that define how you use and enjoy your yard year-round.",
    tagline:
      "Stone, pavers, and structural elements built to last through freeze-thaw cycles.",
    description:
      "Engineered hardscape for Colorado's climate. We handle footings, drainage, and material selection so your patio, paths, and walls stay level and beautiful for years.",
    outcome:
      "Defined outdoor rooms, durable access paths, and stone craftsmanship that anchors your entire landscape.",
    scanChips: ["Patios", "Walkways", "Stone walls", "Fire pits"],
    categories: [
      {
        title: "Outdoor Living",
        icon: PiFireLight,
        items: [
          "Patios & entertaining areas",
          "Fire pits & fire features",
          "Outdoor seating walls",
          "Steps & landing zones",
        ],
      },
      {
        title: "Paths & Paving",
        icon: PiPathLight,
        items: [
          "Walkways & garden paths",
          "Paver & flagstone installation",
          "Driveway borders & accents",
          "Proper base & compaction",
        ],
      },
      {
        title: "Structural Stone",
        icon: PiWallLight,
        items: [
          "Retaining walls & terracing",
          "Boulder placement & rock work",
          "Stone veneer & accents",
          "Drainage behind walls",
        ],
      },
      {
        title: "Built Features",
        icon: PiSquaresFourLight,
        items: [
          "Raised planters & garden walls",
          "Outdoor kitchen foundations",
          "Pergola & structure footings",
          "Custom stone detailing",
        ],
      },
    ],
    image: "/beforeandafter/before_1.png",
    imageAlt: "Stone patio and hardscape elements in a residential backyard",
    icon: PiSquaresFourLight,
  },
];

/* ── Scan chips ─────────────────────────────────────────────────────────── */
function ScanChips({ chips, dark = false }: { chips: string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2" role="list" aria-label="Service highlights">
      {chips.map((chip) => (
        <li key={chip}>
          <span className={dark ? styles.scanChipDark : styles.scanChip}>
            {chip}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── Benefit list (readable, scannable) ───────────────────────────────────── */
function BenefitList({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className={styles.benefitList} role="list">
      {items.map((item) => (
        <li
          key={item}
          className={`${styles.benefitRow} ${dark ? styles.benefitRowDark : ""}`}
        >
          <Check
            className={`${styles.benefitCheck} ${dark ? styles.benefitCheckDark : ""}`}
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <span
            className={`font-satoshi ${dark ? styles.benefitTextDark : styles.benefitText}`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ── What's included grid ───────────────────────────────────────────────── */
function WhatsIncluded({
  service,
  dark = false,
  featured = false,
}: {
  service: ServiceItem;
  dark?: boolean;
  featured?: boolean;
}) {
  const gridClass = featured
    ? styles.inclusionGridFeatured
    : styles.inclusionGridStandard;
  const cardClass = dark ? styles.inclusionCardDark : styles.inclusionCardLight;
  const headerBorder = dark ? styles.inclusionCardHeaderDark : "";

  return (
    <div className={featured ? styles.inclusionsSuite : "pt-6 sm:pt-8"}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-5 sm:mb-6">
        <div>
          <p className="font-satoshi text-[11px] uppercase tracking-[0.22em] font-bold text-[#E86240] mb-1">
            What&apos;s included
          </p>
          <h4
            className={`font-sans font-bold text-xl sm:text-2xl tracking-tight ${
              dark ? "text-[#F4DEBF]" : "text-[#461E2D]"
            }`}
          >
            Inside your {service.title.toLowerCase()} project
          </h4>
        </div>
        <p
          className={`font-satoshi text-sm sm:text-[15px] max-w-sm leading-relaxed ${
            dark ? "text-[#F4DEBF]/55" : "text-[#4C2733]/65"
          }`}
        >
          Typical scope tailored to your property at your free consultation.
        </p>
      </div>

      <div className={gridClass}>
        {service.categories.map((cat) => {
          const CatIcon = cat.icon;
          return (
            <article key={cat.title} className={cardClass}>
              <div
                className={`${styles.inclusionCardHeader} ${headerBorder}`}
              >
                <div
                  className={`${styles.inclusionIcon} ${dark ? styles.inclusionIconDark : ""}`}
                >
                  <CatIcon size={20} />
                </div>
                <h5
                  className={`font-sans font-bold text-base sm:text-[17px] tracking-tight leading-tight ${
                    dark ? "text-[#F4DEBF]" : "text-[#461E2D]"
                  }`}
                >
                  {cat.title}
                </h5>
              </div>
              <BenefitList items={cat.items} dark={dark} />
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ── Value strip ──────────────────────────────────────────────────────────── */
function ValueStrip({
  outcome,
  dark = false,
}: {
  outcome: string;
  dark?: boolean;
}) {
  return (
    <div className={dark ? styles.valueStripDark : styles.valueStrip}>
      <Sparkles
        className={`w-5 h-5 shrink-0 mt-0.5 ${dark ? "text-[#F2A07A]" : "text-[#E86240]"}`}
        aria-hidden="true"
      />
      <p
        className={`font-satoshi text-[15px] sm:text-base font-semibold leading-snug ${
          dark ? "text-[#F4DEBF]/90" : "text-[#4C2733]/95"
        }`}
      >
        <span className="font-bold text-[#E86240]">You get: </span>
        {outcome}
      </p>
    </div>
  );
}

/* ── Service image banner ─────────────────────────────────────────────────── */
function ServiceImageBanner({
  service,
  dark = false,
  priority = false,
}: {
  service: ServiceItem;
  dark?: boolean;
  priority?: boolean;
}) {
  return (
    <div
        className={`relative w-full rounded-2xl overflow-hidden ${styles.imageZoomWrap} ${styles.serviceImageBanner} ${
        dark ? styles.imageBannerDark : styles.imageBanner
      }`}
    >
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 1200px"
        className={`object-cover ${styles.imageZoom}`}
        priority={priority}
      />
      <div
        className={`absolute inset-0 pointer-events-none ${
          dark ? styles.imageOverlayDark : styles.imageOverlay
        }`}
        aria-hidden="true"
      />
      {dark && (
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4">
          <span
            className={`font-satoshi text-[10px] sm:text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full ${styles.imageCaption}`}
          >
            {service.scanChips.slice(0, 3).join(" · ")}
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Featured xeriscaping ─────────────────────────────────────────────────── */
function FeaturedServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <Reveal>
      <article
        className={`rounded-3xl overflow-hidden ${styles.featuredCard}`}
        aria-labelledby={`service-${service.id}-title`}
      >
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Hero row */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 lg:items-stretch">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-satoshi font-bold ${styles.featuredBadge}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E86240]" />
                  Our #1 Specialty
                </span>
                <span className="font-satoshi text-[10px] uppercase tracking-[0.18em] text-[#F4DEBF]/45 font-semibold">
                  Most requested
                </span>
              </div>

              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${styles.iconWell}`}
              >
                <Icon size={22} className="text-[#E86240]" />
              </div>

              <h3
                id={`service-${service.id}-title`}
                className="font-sans font-bold text-[clamp(1.85rem,4.5vw,2.85rem)] text-[#F4DEBF] tracking-tight leading-[1.06] mb-3"
              >
                {service.title}
              </h3>

              <div className="h-px w-20 bg-[#E86240]/50 mb-4" />

              <div className={`mb-4 ${styles.plainEnglishDark}`}>
                <p className="font-satoshi text-[11px] uppercase tracking-[0.18em] text-[#E86240] font-bold mb-1.5">
                  In plain English
                </p>
                <p className="font-satoshi text-base sm:text-lg text-[#F4DEBF]/92 leading-relaxed font-semibold">
                  {service.plainEnglish}
                </p>
              </div>

              <p className="font-satoshi text-sm sm:text-[15px] text-[#F4DEBF]/55 leading-relaxed mb-4">
                {service.description}
              </p>

              <ScanChips chips={service.scanChips} dark />

              {service.stats && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {service.stats.map((stat) => (
                    <div key={stat.label} className={styles.statBlock}>
                      <span className="font-sans font-bold text-2xl text-[#E86240] tabular-nums leading-none block">
                        {stat.value}
                      </span>
                      <span className="font-satoshi text-[10px] uppercase tracking-[0.14em] text-[#F4DEBF]/50 mt-1 block">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <ValueStrip outcome={service.outcome} dark />
              </div>

              <Link
                href="#consultation"
                className={`inline-flex w-fit items-center justify-center gap-2.5 rounded-2xl px-7 py-3.5 mt-6 text-sm font-satoshi font-bold text-[#F4DEBF] ${styles.ctaPrimary} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86240] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a1018]`}
              >
                Get a Free Xeriscape Quote
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div
              className={`relative rounded-2xl overflow-hidden ${styles.imageZoomWrap} lg:min-h-[340px] ${styles.featuredImage} ${styles.imageBannerDark}`}
            >
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover ${styles.imageZoom}`}
                priority
              />
              <div
                className={`absolute inset-0 pointer-events-none ${styles.imageOverlayDark}`}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Redesigned inclusion suite — connected panel */}
          <WhatsIncluded service={service} dark featured />
        </div>
      </article>
    </Reveal>
  );
}

/* ── Landscaping / Hardscaping — stacked layout (no dead space) ─────────── */
function ServiceDetailSection({
  service,
  delay = 0,
}: {
  service: ServiceItem;
  delay?: number;
}) {
  const Icon = service.icon;
  const surfaceVariant =
    service.id === "hardscaping"
      ? styles.serviceCardClay
      : styles.serviceCardSage;

  return (
    <Reveal delay={delay}>
      <article
        className={`rounded-3xl overflow-hidden ${styles.serviceCard} ${surfaceVariant}`}
        aria-labelledby={`service-${service.id}-title`}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center ${styles.iconWell}`}
              >
                <Icon size={22} className="text-[#E86240]" />
              </div>
              <span className="font-satoshi text-[11px] uppercase tracking-[0.2em] text-[#4C2733]/65 font-bold">
                Service {service.number}
              </span>
            </div>

            <h3
              id={`service-${service.id}-title`}
              className="font-sans font-bold text-[clamp(1.65rem,3.5vw,2.25rem)] text-[#461E2D] tracking-tight leading-tight mb-3"
            >
              {service.title}
            </h3>

            <div className="h-px w-16 bg-[#E86240]/45 mb-4" />

            <div className={`mb-4 max-w-3xl ${styles.plainEnglish}`}>
              <p className="font-satoshi text-[11px] uppercase tracking-[0.18em] text-[#E86240] font-bold mb-1.5">
                In plain English
              </p>
              <p className="font-sans  text-base sm:text-xl text-[#461E2D] leading-relaxed font-semibold">
                {service.plainEnglish}
              </p>
            </div>

            <p className="font-satoshi text-sm sm:text-[16px] text-[#4C2733]/70 leading-relaxed max-w-2xl mb-4">
              {service.description}
            </p>

            <ScanChips chips={service.scanChips} />
          </header>

          {/* Full-width image — eliminates side-column dead space */}
          <div className="mb-8 sm:mb-10">
            <ServiceImageBanner service={service} />
          </div>

          {/* Full-width inclusions */}
          <WhatsIncluded service={service} />

          {/* Footer CTA block */}
          <div className="mt-8 flex flex-col gap-5 sm:gap-6">
            <ValueStrip outcome={service.outcome} />
            <Link
              href="#consultation"
              className={`inline-flex items-center gap-2 font-satoshi text-[15px] font-bold text-[#E86240] w-fit ${styles.ctaLink} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86240]/50 rounded-md`}
            >
              Get a quote for {service.title.toLowerCase()}
              <ArrowRight
                className={`w-4 h-4 ${styles.ctaLinkIcon}`}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ── Section header ───────────────────────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={`pt-20 pb-10 lg:pt-24 lg:pb-14 ${styles.reveal} ${inView ? styles.revealVisible : ""}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
        <div className="flex-1 max-w-2xl">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[12px] uppercase tracking-[0.28em] text-[#E86240] border border-[#E86240]/22 bg-[#E86240]/7 mb-6 font-sans font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E86240] shrink-0" />
            What We Do
          </span>

          <h2
            id="services-heading"
            className="font-sans font-bold text-[clamp(2rem,5vw,3.25rem)] text-[#461E2D] tracking-tight leading-[1.08]"
          >
            Our services.{" "}
            <span className="text-[#E86240]">One clear explanation</span> of
            what you get.
          </h2>

          <ul
            className="flex flex-wrap gap-2 sm:gap-3 mt-6"
            role="list"
            aria-label="Core capabilities"
          >
            {[
              "Xeriscaping specialists",
              "Full-yard design",
              "Stone & pavers",
              "Colorado-built",
            ].map((label) => (
              <li key={label}>
                <span
                  className={`font-satoshi text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] px-3.5 py-2 rounded-full ${styles.capabilityPill}`}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-satoshi text-base lg:text-lg text-[#4C2733]/70 leading-relaxed lg:max-w-md lg:pb-2">
          Not sure what xeriscaping means — or how it differs from landscaping?
          Each service below explains{" "}
          <strong className="text-[#461E2D] font-semibold">
            exactly what&apos;s included
          </strong>{" "}
          in a typical Ridgewell project.
        </p>
      </div>

      <div className="origin-left mt-8 h-px bg-gradient-to-r from-[#E86240]/35 via-[#4C2733]/10 to-transparent" />
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
export default function OurServicesSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  const featured = SERVICES.find((s) => s.featured)!;
  const secondary = SHOW_SECONDARY_SERVICES
    ? SERVICES.filter((s) => !s.featured)
    : [];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F4DEBF 0%, #ECD4B0 48%, #F4DEBF 100%)",
      }}
    >
      {/* Static ambient — no blur filters */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 15% 0%, rgba(232,98,64,0.06), transparent 50%), radial-gradient(ellipse 50% 35% at 95% 90%, rgba(76,39,51,0.05), transparent 45%)",
        }}
        aria-hidden="true"
      />

      <p
        className="absolute top-16 left-1/2 -translate-x-1/2 font-sans font-bold text-[clamp(3rem,12vw,8rem)] uppercase tracking-[0.08em] text-[#461E2D]/[0.04] whitespace-nowrap pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        Our Services
      </p>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeader />

        <div className="flex flex-col gap-10 lg:gap-12 pb-12 lg:pb-16">
          <FeaturedServiceCard service={featured} />

          {/* Landscaping & hardscaping — hidden via SHOW_SECONDARY_SERVICES */}
          {SHOW_SECONDARY_SERVICES &&
            secondary.map((service, i) => (
              <ServiceDetailSection
                key={service.id}
                service={service}
                delay={80 + i * 60}
              />
            ))}
        </div>

        <div
          ref={ctaRef}
          className={`pb-12 lg:pb-8 text-center  ${styles.reveal} ${ctaInView ? styles.revealVisible : ""}`}
        >
          <div className="inline-flex flex-col items-center gap-5 max-w-xl mx-auto">
            <p className="font-satoshi text-sm uppercase tracking-[0.2em] text-[#4C2733]/55 font-semibold">
              Not sure which service fits your yard?
            </p>
            <p className="font-sans font-bold text-xl sm:text-2xl text-[#461E2D] tracking-tight leading-snug">
              We&apos;ll walk your property and recommend the right mix — often
              xeriscaping plus hardscape or planting.
            </p>
            <Link
              href="#consultation"
              className={`inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-sm font-satoshi font-bold text-[#F4DEBF] ${styles.ctaPrimary} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86240] focus-visible:ring-offset-2`}
            >
              Book Your Free Consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <p className="font-satoshi text-sm text-[#4C2733]/55 font-medium">
              Free on-site visit · No pressure · Licensed &amp; insured
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
