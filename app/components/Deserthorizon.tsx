import styles from "./whats-included.module.css";

export default function DesertHorizonEdge() {
  return (
    <div
      className={`${styles.topEdge} ${styles.topEdgeFade}`}
      aria-hidden="true"
    >
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
          <radialGradient id="bloom-lavender" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B7BB0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6B5890" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* Base */}
        <rect width="1440" height="108" fill="url(#wi-sky)" />

        {/* Topographic contours */}
        <g opacity="0.45">
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
        <g>
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

        {/* Rock formations */}
        <g opacity="0.5">
          <ellipse cx="120" cy="86" rx="28" ry="7" fill="url(#wi-rock)" />
          <ellipse cx="380" cy="88" rx="22" ry="5" fill="url(#wi-rock)" />
          <ellipse cx="620" cy="84" rx="34" ry="8" fill="url(#wi-rock)" />
          <ellipse cx="900" cy="87" rx="26" ry="6" fill="url(#wi-rock)" />
          <ellipse cx="1180" cy="85" rx="30" ry="7" fill="url(#wi-rock)" />
          <ellipse
            cx="1320"
            cy="89"
            rx="18"
            ry="4"
            fill="#461E2D"
            fillOpacity="0.06"
          />
        </g>

        {/* ── PLANT LAYER — 9 unique species, zero cactus ────────────── */}

        {/* 1. Lavender — single cluster, x=90 */}
        <g opacity="0.52">
          <g transform="translate(90, 54)">
            {[-5, -2, 0, 2, 5].map((dx, i) => (
              <g key={i} transform={`translate(${dx}, 0)`}>
                <line
                  x1="0"
                  y1="32"
                  x2="0"
                  y2="8"
                  stroke="#6B8A4A"
                  strokeOpacity="0.5"
                  strokeWidth="0.7"
                />
                <rect
                  x="-1.5"
                  y="5"
                  width="3"
                  height="12"
                  rx="1.5"
                  fill="url(#bloom-lavender)"
                />
                <rect
                  x="-1"
                  y="3"
                  width="2"
                  height="5"
                  rx="1"
                  fill="#9B8BC0"
                  fillOpacity="0.6"
                />
              </g>
            ))}
          </g>
        </g>

        {/* 2. Gaillardia (Blanket Flower) — bold bi-color, x=240 */}
        <g opacity="0.7">
          <g transform="translate(240, 0)">
            <line
              x1="0"
              y1="82"
              x2="0"
              y2="56"
              stroke="#5A7A3A"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <ellipse
              cx="6"
              cy="72"
              rx="5"
              ry="2"
              fill="#5A7A3A"
              fillOpacity="0.3"
              transform="rotate(28 6 72)"
            />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const px = Math.cos(angle) * 9;
              const py = 56 + Math.sin(angle) * 7;
              return (
                <ellipse
                  key={i}
                  cx={px}
                  cy={py}
                  rx="4"
                  ry="1.6"
                  fill={i % 3 === 0 ? "#E8A030" : "#C84820"}
                  fillOpacity="0.65"
                  transform={`rotate(${(angle * 180) / Math.PI + 90} ${px} ${py})`}
                />
              );
            })}
            <circle cx="0" cy="56" r="4.5" fill="#7A2A10" fillOpacity="0.7" />
            <circle cx="0" cy="56" r="2.5" fill="#9A3A18" fillOpacity="0.45" />
          </g>
        </g>

        {/* 3. Ornamental Grass — single tuft, x=420 */}
        <g stroke="#7A9A5A" strokeOpacity="0.42" strokeWidth="0.9" fill="none">
          <g transform="translate(420, 80)">
            {[-14, -10, -6, -2, 2, 6, 10, 14].map((dx, i) => {
              const h = 22 + (i % 3) * 6;
              return (
                <path
                  key={i}
                  d={`M ${dx} 0 Q ${dx * 1.4} ${-h * 0.5} ${dx + (i % 2 === 0 ? 8 : -8)} ${-h}`}
                  strokeOpacity={0.35 + (i % 2) * 0.1}
                />
              );
            })}
            <ellipse
              cx="0"
              cy="-28"
              rx="3"
              ry="5"
              fill="#B09060"
              fillOpacity="0.35"
              transform="rotate(-8)"
            />
          </g>
        </g>

        {/* 4. Echinacea (Purple Coneflower) — single bloom, x=580 */}
        <g opacity="0.72">
          <g transform="translate(580, 0)">
            <line
              x1="0"
              y1="82"
              x2="0"
              y2="52"
              stroke="#5A7A3A"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
            <ellipse
              cx="-5"
              cy="68"
              rx="6"
              ry="2.5"
              fill="#5A7A3A"
              fillOpacity="0.35"
              transform="rotate(-30 -5 68)"
            />
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              return (
                <path
                  key={i}
                  d={`M ${Math.cos(angle) * 4} ${52 + Math.sin(angle) * 4} Q ${Math.cos(angle) * 8} ${52 + Math.sin(angle) * 9 + 2} ${Math.cos(angle) * 11} ${52 + Math.sin(angle) * 11 + 4}`}
                  stroke="#C96B52"
                  strokeOpacity="0.55"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
            <ellipse
              cx="0"
              cy="52"
              rx="4.5"
              ry="4"
              fill="#A84A30"
              fillOpacity="0.75"
            />
            <ellipse
              cx="0"
              cy="51"
              rx="3"
              ry="2.5"
              fill="#C07050"
              fillOpacity="0.5"
            />
          </g>
        </g>

        {/* 5. Russian Sage — single wispy cluster, x=730 */}
        <g opacity="0.55">
          <g transform="translate(730, 78)">
            {[-8, -3, 2, 7].map((dx, i) => {
              const h = 28 + (i % 2) * 8;
              return (
                <g key={i}>
                  <path
                    d={`M ${dx} 0 Q ${dx + (i % 2 === 0 ? 4 : -4)} ${-h * 0.6} ${dx + (i % 2 === 0 ? 2 : -2)} ${-h}`}
                    stroke="#7A6A9A"
                    strokeOpacity="0.45"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  {[0.5, 0.65, 0.8].map((t, j) => (
                    <circle
                      key={j}
                      cx={dx + (i % 2 === 0 ? 2 : -2) * t}
                      cy={-h * t}
                      r="1.4"
                      fill="#8B7BB0"
                      fillOpacity="0.6"
                    />
                  ))}
                </g>
              );
            })}
          </g>
        </g>

        {/* 6. Black-eyed Susan — single bloom, x=880 */}
        <g opacity="0.68">
          <g transform="translate(880, 0)">
            <line
              x1="0"
              y1="82"
              x2="2"
              y2="55"
              stroke="#5A7A3A"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <ellipse
              cx="-6"
              cy="70"
              rx="5"
              ry="2"
              fill="#5A7A3A"
              fillOpacity="0.3"
              transform="rotate(-25 -6 70)"
            />
            {Array.from({ length: 10 }).map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              return (
                <ellipse
                  key={i}
                  cx={2 + Math.cos(angle) * 7}
                  cy={55 + Math.sin(angle) * 6}
                  rx="3.5"
                  ry="1.5"
                  fill="#C9A24A"
                  fillOpacity="0.65"
                  transform={`rotate(${(angle * 180) / Math.PI + 90} ${2 + Math.cos(angle) * 7} ${55 + Math.sin(angle) * 6})`}
                />
              );
            })}
            <circle cx="2" cy="55" r="4" fill="#3A2010" fillOpacity="0.6" />
            <circle cx="2" cy="55" r="2.5" fill="#4A2818" fillOpacity="0.4" />
          </g>
        </g>

        {/* 7. Yarrow (Achillea) — flat-topped corymb, x=1040 */}
        <g opacity="0.6">
          <g transform="translate(1040, 76)">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-30"
              stroke="#6A8A4A"
              strokeOpacity="0.4"
              strokeWidth="0.9"
            />
            {[
              [-8, -28],
              [-4, -31],
              [0, -33],
              [4, -31],
              [8, -28],
              [-6, -30],
              [6, -30],
              [2, -32],
              [-2, -32],
            ].map(([dx, dy], i) => (
              <circle
                key={i}
                cx={dx}
                cy={dy}
                r="2.2"
                fill="#E8D8B0"
                fillOpacity={0.55 + (i % 2) * 0.1}
              />
            ))}
            {[
              [-8, -28],
              [0, -33],
              [8, -28],
            ].map(([dx, dy], i) => (
              <circle
                key={i}
                cx={dx}
                cy={dy}
                r="1"
                fill="#C8A870"
                fillOpacity="0.5"
              />
            ))}
          </g>
        </g>

        {/* 8. Catmint (Nepeta) — low mounding, tiny violet whorls, x=1200 */}
        <g opacity="0.6">
          <g transform="translate(1200, 76)">
            {[-12, -7, -2, 3, 8, 13].map((dx, i) => {
              const h = 12 + (i % 3) * 5;
              return (
                <g key={i}>
                  <path
                    d={`M ${dx} 0 Q ${dx + (i % 2 === 0 ? 3 : -3)} ${-h * 0.5} ${dx} ${-h}`}
                    stroke="#7A9A5A"
                    strokeOpacity="0.38"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  {[0.4, 0.65, 0.88].map((t, j) => (
                    <circle
                      key={j}
                      cx={dx + (j % 2 === 0 ? 1.5 : -1.5)}
                      cy={-h * t}
                      r="1.6"
                      fill="#7A68B0"
                      fillOpacity={0.52 - j * 0.06}
                    />
                  ))}
                </g>
              );
            })}
          </g>
        </g>

        {/* 9. Creeping Thyme — ground-hugging mat, tiny pink florets, x=1360 */}
        <g opacity="0.62">
          <g transform="translate(1360, 84)">
            {[
              [-10, 0],
              [-5, -2],
              [0, -3],
              [5, -2],
              [10, 0],
              [-7, -5],
              [7, -5],
              [0, -6],
              [-3, -1],
              [3, -1],
            ].map(([dx, dy], i) => (
              <circle
                key={i}
                cx={dx}
                cy={dy}
                r="2.2"
                fill={i % 2 === 0 ? "#C878A0" : "#D490B0"}
                fillOpacity={0.45 + (i % 3) * 0.08}
              />
            ))}
            {[
              [-9, 0],
              [-3, 0],
              [3, 0],
              [9, 0],
            ].map(([dx, dy], i) => (
              <line
                key={i}
                x1={dx}
                y1={dy}
                x2={dx * 0.3}
                y2={-5}
                stroke="#6A8A4A"
                strokeOpacity="0.3"
                strokeWidth="0.7"
              />
            ))}
          </g>
        </g>

        {/* Gravel scatter */}
        <g fill="#4C2733" opacity="0.12">
          {[80, 160, 280, 410, 550, 680, 820, 1010, 1150, 1280, 1380].map(
            (x, i) => (
              <circle
                key={x}
                cx={x}
                cy={92 + (i % 3)}
                r={1.2 + (i % 2) * 0.4}
              />
            ),
          )}
        </g>

        {/* Luxury horizon accent lines */}
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
