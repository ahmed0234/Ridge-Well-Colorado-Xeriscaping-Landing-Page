"use client";

import { useState, useEffect, useCallback } from "react";
import "./opening-animation.css";

/**
 * Module-level flag: persists across component remounts within the same
 * client session. Prevents the animation from replaying on soft navigations
 * back to the homepage. Resets on full page refresh (desired behavior).
 */
let hasPlayed = false;

/**
 * OpeningAnimation — Cinematic leaf-parting reveal
 *
 * Architecture:
 * - 8 layered elements using only GPU-composited CSS animations
 * - ~15 total DOM nodes, auto-removed after completion
 * - Zero JavaScript animation frames — pure CSS keyframes
 * - Click-to-skip for UX convenience
 * - prefers-reduced-motion respected
 *
 * Layer stack (bottom → top):
 * 1. Champagne radial-gradient background wash
 * 2. Blurred atmospheric leaf layer (depth/parallax)
 * 3. Four clipped leaf quadrants (primary cover, sweep outward)
 * 4. Line-art botanical accents (multiply-blended, drift away)
 * 5. Warm desert tint overlay (unifies white/champagne palette)
 * 6. Brand text "RIDGEWELL" (fade in → hold → fade out)
 * 7. Desert dust particles (thermal updraft motion)
 * 8. Skip hint text
 */
export default function OpeningAnimation() {
  const [isDone, setIsDone] = useState(hasPlayed);

  useEffect(() => {
    if (hasPlayed) {
      setIsDone(true);
      return;
    }

    // Add class to body to completely hide background content
    document.body.classList.add("opening-animation-active");
    hasPlayed = true;

    // Remove overlay from DOM after all animations complete.
    // Longest animation chain: particles at ~3.2s delay+duration.
    const timer = setTimeout(() => {
      setIsDone(true);
      document.body.classList.remove("opening-animation-active");
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("opening-animation-active");
    };
  }, []);

  const handleSkip = useCallback(() => {
    setIsDone(true);
    hasPlayed = true;
    document.body.classList.remove("opening-animation-active");
  }, []);

  if (isDone) return null;

  // Particle drift vectors — upward bias mimics desert thermal updrafts
  const particles = [
    { x: "-35px", y: "-70px", delay: "1.1s" },
    { x: "45px", y: "-85px", delay: "1.3s" },
    { x: "-20px", y: "-55px", delay: "1.0s" },
    { x: "30px", y: "-90px", delay: "1.4s" },
    { x: "-50px", y: "-60px", delay: "1.15s" },
    { x: "25px", y: "-75px", delay: "1.25s" },
    { x: "-40px", y: "-80px", delay: "1.35s" },
    { x: "55px", y: "-65px", delay: "1.2s" },
  ];

  return (
    <div
      className="opening-overlay"
      onClick={handleSkip}
      aria-hidden="true"
      role="presentation"
    >
      {/* L1 — Warm champagne background wash with mauve vignette */}
      <div className="opening-wash" />

      {/* L2 — Blurred atmospheric leaf layer for parallax depth */}
      <div className="leaf-deep" />

      {/* L3 — Primary leaf cover: 4 quadrants that sweep outward
           like desert wind parting drought-resistant foliage */}
      <div className="leaf-quad leaf-quad-tl" />
      <div className="leaf-quad leaf-quad-tr" />
      <div className="leaf-quad leaf-quad-bl" />
      <div className="leaf-quad leaf-quad-br" />

      {/* L4 — Hand-drawn line-art accents for layered botanical depth */}
      <div className="leaf-accent leaf-accent-3" />

      {/* L5 — Desert warmth tint film */}
      <div className="opening-tint" />

      {/* L6 — Brand reveal */}
      <div className="brand-text">
        <span>RIDGEWELL</span>
      </div>

      {/* L7 — Desert dust particles with thermal updraft motion */}
      <div className="particles">
        {particles.map((p, i) => (
          <span
            key={i}
            style={
              {
                "--x": p.x,
                "--y": p.y,
                "--delay": p.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* L8 — Skip interaction hint */}
      <div className="skip-hint text-2xl">Click anywhere to skip</div>
    </div>
  );
}
