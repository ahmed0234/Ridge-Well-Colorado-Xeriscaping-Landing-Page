/**
 * FAQBottomEdge
 * Sits directly below the FAQSection.
 * Renders a curly arch wave in the FAQ background color (#461E2D)
 * that flows down into the next section.
 *
 * Usage — place immediately after </section> in FAQSection:
 *   <FAQBottomEdge />
 *
 * The parent section should have `overflow-hidden` removed, or simply
 * let this component sit outside it in the page layout.
 */
export default function FAQBottomEdge() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "block",
        lineHeight: 0,
        overflow: "hidden",
        /* Pulls up flush against the FAQ section bottom */
        marginTop: "-1px",
      }}
    >
      <svg
        viewBox="0 0 1440 96"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: "clamp(48px, 7vw, 96px)",
        }}
      >
        <defs>
          {/* Fill matches FAQ bg exactly */}
          <linearGradient id="faq-edge-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#461E2D" />
            <stop offset="100%" stopColor="#461E2D" />
          </linearGradient>

          {/* Subtle inner glow on the curl crests — echoes the section's E86240 accent */}
          <filter id="crest-glow" x="-5%" y="-80%" width="110%" height="260%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="1.8"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/*
          The wave is built from a single filled path.
          Four arch "curls" of varying depth create an organic,
          hand-drawn rhythm — not a mechanical sine wave.
          The path starts top-left, rides across curly arches,
          then fills down to the bottom edge.
        */}
        <path
          d="
            M0,0
            C60,0 80,52 180,52
            C280,52 300,8 420,8
            C540,8 560,60 680,60
            C800,60 820,12 940,12
            C1060,12 1080,56 1200,56
            C1320,56 1360,4 1440,4
            L1440,96 L0,96 Z
          "
          fill="#461E2D"
        />

        {/*
          Crest accent line — a hairline that rides the
          exact top curve of the wave, giving it a refined
          lit-edge quality without any color clash.
        */}
        <path
          d="
            M0,0
            C60,0 80,52 180,52
            C280,52 300,8 420,8
            C540,8 560,60 680,60
            C800,60 820,12 940,12
            C1060,12 1080,56 1200,56
            C1320,56 1360,4 1440,4
          "
          fill="none"
          stroke="#E86240"
          strokeOpacity="0.28"
          strokeWidth="1.2"
          filter="url(#crest-glow)"
        />

        {/*
          Second, slightly offset echo line for depth —
          sits 3–4px below the primary crest.
        */}
        <path
          d="
            M0,4
            C60,4 80,55 180,55
            C280,55 300,12 420,12
            C540,12 560,63 680,63
            C800,63 820,16 940,16
            C1060,16 1080,59 1200,59
            C1320,59 1360,8 1440,8
          "
          fill="none"
          stroke="#F4DEBF"
          strokeOpacity="0.06"
          strokeWidth="0.7"
        />
      </svg>
    </div>
  );
}
