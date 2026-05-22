import styles from "./whats-included.module.css";
export default function DesertHorizonEdge() {
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
  