'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';

interface Skill {
  category: string;
  items: string[];
  icon: ReactElement;
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const skills: Skill[] = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <defs>
            <linearGradient id="gradient1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0369a1"/>
              <stop offset="1" stopColor="#fbbf24"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      category: 'Backend',
      items: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="7" height="7" rx="1" stroke="url(#gradient2)" strokeWidth="2"/>
          <rect x="4" y="13" width="7" height="7" rx="1" stroke="url(#gradient2)" strokeWidth="2"/>
          <rect x="13" y="4" width="7" height="7" rx="1" stroke="url(#gradient2)" strokeWidth="2"/>
          <rect x="13" y="13" width="7" height="7" rx="1" stroke="url(#gradient2)" strokeWidth="2"/>
          <defs>
            <linearGradient id="gradient2" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0369a1"/>
              <stop offset="1" stopColor="#fbbf24"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      category: 'DevOps',
      items: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12l10 5 10-5" stroke="url(#gradient3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="gradient3" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0369a1"/>
              <stop offset="1" stopColor="#fbbf24"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      category: 'Finance',
      items: ['Value Investing', 'Financial Analysis', 'Portfolio Management'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17l6-6 4 4 8-8" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 7h4v4" stroke="url(#gradient4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="gradient4" x1="3" y1="7" x2="21" y2="17" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0369a1"/>
              <stop offset="1" stopColor="#fbbf24"/>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px',
        }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      id="skills"
      style={{
        paddingTop: 'var(--section-spacing-mobile)',
        paddingBottom: 'var(--section-spacing-mobile)',
      }}
    >
      {/* Responsive section spacing using CSS variables */}
      <style>{`
        @media (min-width: 768px) {
          #skills {
            padding-top: var(--section-spacing-tablet);
            padding-bottom: var(--section-spacing-tablet);
          }
        }
        @media (min-width: 1024px) {
          #skills {
            padding-top: var(--section-spacing-desktop);
            padding-bottom: var(--section-spacing-desktop);
          }
        }

        /* Circuit Board Wire Styles - Next.js Style */
        .circuit-container {
          position: relative;
          padding-top: 280px;
        }

        .circuit-wires {
          position: absolute;
          top: 160px;
          left: 0;
          width: 100%;
          height: 120px;
          pointer-events: none;
          z-index: 1;
        }

        .wire-path {
          stroke: rgba(255, 255, 255, 0.06);
          stroke-width: 1;
          fill: none;
        }

        /* Neural connection wires from GPU */
        .neural-wire {
          stroke: rgba(6, 182, 212, 0.3);
          stroke-width: 2;
          fill: none;
          filter: drop-shadow(0 0 4px rgba(6, 182, 212, 0.4));
        }

        .neural-dot {
          fill: rgba(6, 182, 212, 0.6);
          filter: drop-shadow(0 0 6px rgba(6, 182, 212, 0.8));
        }

        /* Fascicle light particles traveling along wires */
        .trail-dot {
          filter: url(#trailGlow);
        }

        /* Seamless gradient colors - orange to yellow to cyan to blue */
        .trail-dot-1 { fill: rgba(255, 159, 64, 1); opacity: 1; }    /* Orange */
        .trail-dot-2 { fill: rgba(255, 205, 86, 1); opacity: 0.9; }  /* Yellow */
        .trail-dot-3 { fill: rgba(54, 235, 235, 1); opacity: 0.7; }  /* Cyan */
        .trail-dot-4 { fill: rgba(54, 162, 235, 1); opacity: 0.5; }  /* Blue */
        .trail-dot-5 { fill: rgba(54, 162, 235, 1); opacity: 0.3; }  /* Blue fade */
        .trail-dot-6 { fill: rgba(54, 162, 235, 1); opacity: 0.15; } /* Blue fade */
        .trail-dot-7 { fill: rgba(54, 162, 235, 1); opacity: 0.05; } /* Blue fade */

        /* Desktop-only wires and particles (hidden on mobile/tablet) */
        @media (max-width: 1023px) {
          .circuit-wires,
          .fascicle-light,
          .neural-connections,
          .powered-by-logo {
            display: none;
          }
        }

        /* Powered By logo styling */
        .powered-by-logo {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
        }

        .powered-by-logo svg {
          filter: drop-shadow(0 0 20px rgba(3, 105, 161, 0.4));
        }

        /* Skill Card Styles */
        .skill-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: var(--spacing-xl);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: visible;
          z-index: 2;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
        }

        .skill-card:hover::before {
          opacity: 1;
        }

        /* Fade up animation for cards */
        @keyframes fadeUpCard {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .skill-card.visible {
          animation: fadeUpCard 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .skill-card:hover .icon-container {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }
      `}</style>

      <div className="container">
        <div className="max-w-7xl" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Header */}
          <div
            className="mb-6"
            style={{
              marginBottom: 'var(--spacing-3xl)',
              textAlign: 'center',
            }}
          >
            <h2
              className="text-5xl sm:text-6xl font-bold gradient-text"
              style={{ marginBottom: 'var(--spacing-lg)' }}
            >
              Built on a foundation of
              <br />
              fast, production-grade tooling
            </h2>
            <p className="text-xl text-gray-500">
              Modern technologies and expertise that power exceptional results
            </p>
          </div>

          {/* Skills Grid with Circuit Board Effect */}
          <div className={`circuit-container ${isVisible ? 'active' : ''}`}>
            {/* GPU/Neural Processor Logo */}
            <div className="powered-by-logo">
              <svg width="480" height="160" viewBox="0 0 280 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <defs>
                  {/* Main gradient for GPU */}
                  <linearGradient id="gpuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0369a1"/>
                    <stop offset="50%" stopColor="#3b82f6"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>

                  {/* Glow gradient */}
                  <linearGradient id="gpuGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0369a1" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6"/>
                  </linearGradient>

                  {/* Pulsing animation */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Main GPU chip body */}
                <rect x="90" y="20" width="100" height="60" rx="4"
                      stroke="url(#gpuGradient)"
                      strokeWidth="2"
                      fill="rgba(3, 105, 161, 0.08)"/>

                {/* Inner circuit details */}
                <rect x="100" y="30" width="35" height="15" rx="2"
                      stroke="url(#gpuGradient)"
                      strokeWidth="1"
                      fill="rgba(59, 130, 246, 0.1)"/>
                <rect x="145" y="30" width="35" height="15" rx="2"
                      stroke="url(#gpuGradient)"
                      strokeWidth="1"
                      fill="rgba(59, 130, 246, 0.1)"/>
                <rect x="100" y="55" width="35" height="15" rx="2"
                      stroke="url(#gpuGradient)"
                      strokeWidth="1"
                      fill="rgba(59, 130, 246, 0.1)"/>
                <rect x="145" y="55" width="35" height="15" rx="2"
                      stroke="url(#gpuGradient)"
                      strokeWidth="1"
                      fill="rgba(59, 130, 246, 0.1)"/>

                {/* Center core with pulsing effect */}
                <circle cx="140" cy="50" r="8"
                        fill="url(#gpuGradient)"
                        filter="url(#glow)">
                  <animate attributeName="opacity"
                           values="0.6;1;0.6"
                           dur="2s"
                           repeatCount="indefinite"/>
                </circle>

                {/* Left side output pins - 2 pins for Cards 1L & 1R */}
                <rect x="82" y="38" width="8" height="4" fill="url(#gpuGradient)" rx="1"/>
                <rect x="82" y="58" width="8" height="4" fill="url(#gpuGradient)" rx="1"/>

                {/* Right side output pins - 2 pins for Cards 4L & 4R */}
                <rect x="190" y="38" width="8" height="4" fill="url(#gpuGradient)" rx="1"/>
                <rect x="190" y="58" width="8" height="4" fill="url(#gpuGradient)" rx="1"/>

                {/* Bottom output pins - 5 pins symmetrical with top */}
                <rect x="100" y="80" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>
                <rect x="120" y="80" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>
                <rect x="138" y="80" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>
                <rect x="156" y="80" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>
                <rect x="176" y="80" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>

                {/* Top input pins - 5 pins */}
                <rect x="100" y="12" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>
                <rect x="120" y="12" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>
                <rect x="138" y="12" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>
                <rect x="156" y="12" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>
                <rect x="176" y="12" width="4" height="8" fill="url(#gpuGradient)" rx="1"/>

                {/* Corner decorative elements */}
                <circle cx="95" cy="25" r="2" fill="url(#gpuGradient)"/>
                <circle cx="185" cy="25" r="2" fill="url(#gpuGradient)"/>
                <circle cx="95" cy="75" r="2" fill="url(#gpuGradient)"/>
                <circle cx="185" cy="75" r="2" fill="url(#gpuGradient)"/>
              </svg>
            </div>

            {/* Neural Wire Grid - Independent wire routing */}
            <svg className="neural-connections" viewBox="0 -80 1280 360" preserveAspectRatio="xMidYMin meet"
                 style={{ position: 'absolute', top: -80, left: 0, width: '100%', height: '360px', pointerEvents: 'none', zIndex: 11 }}>

              <defs>
                {/* Soft glow filter for trail dots */}
                <filter id="trailGlow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Wire 1: Card 1 Left - from left pin 1 */}
              <path id="wire1" d="M 546 64 L 120 64 L 120 280"
                    className="neural-wire"
                    fill="none" />

              {/* Wire 2: Card 1 Right - from left pin 2 */}
              <path id="wire2" d="M 546 96 L 140 96 L 140 260 L 182 260 L 182 280"
                    className="neural-wire"
                    fill="none" />

              {/* Wire 3a: Card 2 Left - from card upward to first neural dot */}
              <path id="wire3a" d="M 446 280 L 446 215 L 429 215 L 429 110"
                    className="neural-wire"
                    fill="none" />
              <circle cx="429" cy="110" r="4" className="neural-dot"/>

              {/* Wire 3aa: From top munstycke 2 - emerges from "underground" at second neural dot */}
              <path id="wire3aa" d="M 611 19 L 611 -5 L 429 -5 L 429 50"
                    className="neural-wire"
                    fill="none" />
              <circle cx="429" cy="50" r="4" className="neural-dot"/>

              {/* Wire 3ab: From top munstycke 1 - mirror of 3b, bend upward */}
              <path id="wire3ab" d="M 579 19 L 579 5 L 500 5"
                    className="neural-wire"
                    fill="none" />
              <circle cx="500" cy="5" r="4" className="neural-dot"/>

              {/* Wire 3b: From bottom munstycke 1 - one bend then stop at neural dot */}
              <path id="wire3b" d="M 579 136 L 579 160 L 500 160"
                    className="neural-wire"
                    fill="none" />
              <circle cx="500" cy="160" r="4" className="neural-dot"/>

              {/* Wire 4: Card 2 Right - from bottom pin 3 (center) */}
              <path id="wire4" d="M 640 136 L 640 215 L 488 215 L 488 280"
                    className="neural-wire"
                    fill="none" />

              {/* Wire 4b: From bottom munstycke 2 - higher bend, longer wire with dot */}
              <path id="wire4b" d="M 611 136 L 611 180 L 480 180"
                    className="neural-wire"
                    fill="none" />
              <circle cx="480" cy="180" r="4" className="neural-dot"/>

              {/* Wire 5: Card 3 Left - from bottom pin 4 */}
              <path id="wire5" d="M 669 136 L 669 175 L 772 175 L 772 280"
                    className="neural-wire"
                    fill="none" />

              {/* Wire 5B: From bottom pin 5 - decorative wire ending in neural dot */}
              <path id="wire5b" d="M 701 136 L 701 155 L 800 155"
                    className="neural-wire"
                    fill="none" />
              <circle cx="800" cy="155" r="4" className="neural-dot"/>

              {/* Wire 5c: From top munstycke 5 - mirrored version of 3ab */}
              <path id="wire5c" d="M 702 19 L 702 5 L 800 5"
                    className="neural-wire"
                    fill="none" />
              <circle cx="800" cy="5" r="4" className="neural-dot"/>

              {/* Wire 5d: From top munstycke 3 - decorative wire pointing toward title */}
              <path id="wire5d" d="M 640 19 L 640 -20"
                    className="neural-wire"
                    fill="none" />
              <circle cx="640" cy="-20" r="4" className="neural-dot"/>

              {/* Wire 6: Card 3 Right - from right pin 2 */}
              <path id="wire6" d="M 734 96 L 834 96 L 834 280"
                    className="neural-wire"
                    fill="none" />

              {/* Wire 7: Card 4 Left - from right pin 1 */}
              <path id="wire7" d="M 734 64 L 1098 64 L 1098 280"
                    className="neural-wire"
                    fill="none" />

              {/* Wire 8: Card 4 Right - from top pin 4 */}
              <path id="wire8" d="M 669 19 L 669 -5 L 1160 -5 L 1160 280"
                    className="neural-wire"
                    fill="none" />

              {/* Connection dots removed for cleaner look */}

              {/* Fascicle lights traveling along each wire path */}
              {/* Wire 1 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="10s" repeatCount="indefinite" begin="0s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="10s" repeatCount="indefinite" begin="0.05s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="10s" repeatCount="indefinite" begin="0.10s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="10s" repeatCount="indefinite" begin="0.15s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="10s" repeatCount="indefinite" begin="0.20s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="10s" repeatCount="indefinite" begin="0.25s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="10s" repeatCount="indefinite" begin="0.30s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>

              {/* Wire 2 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="10s" repeatCount="indefinite" begin="15s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="10s" repeatCount="indefinite" begin="15.05s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="10s" repeatCount="indefinite" begin="15.10s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="10s" repeatCount="indefinite" begin="15.15s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="10s" repeatCount="indefinite" begin="15.20s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="10s" repeatCount="indefinite" begin="15.25s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="10s" repeatCount="indefinite" begin="15.30s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>

              {/* Wire 4 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="10s" repeatCount="indefinite" begin="45s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="10s" repeatCount="indefinite" begin="45.05s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="10s" repeatCount="indefinite" begin="45.10s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="10s" repeatCount="indefinite" begin="45.15s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="10s" repeatCount="indefinite" begin="45.20s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="10s" repeatCount="indefinite" begin="45.25s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="10s" repeatCount="indefinite" begin="45.30s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>

              {/* Wire 5 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="10s" repeatCount="indefinite" begin="60s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="10s" repeatCount="indefinite" begin="60.05s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="10s" repeatCount="indefinite" begin="60.10s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="10s" repeatCount="indefinite" begin="60.15s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="10s" repeatCount="indefinite" begin="60.20s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="10s" repeatCount="indefinite" begin="60.25s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="10s" repeatCount="indefinite" begin="60.30s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>

              {/* Wire 6 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="10s" repeatCount="indefinite" begin="75s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="10s" repeatCount="indefinite" begin="75.05s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="10s" repeatCount="indefinite" begin="75.10s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="10s" repeatCount="indefinite" begin="75.15s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="10s" repeatCount="indefinite" begin="75.20s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="10s" repeatCount="indefinite" begin="75.25s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="10s" repeatCount="indefinite" begin="75.30s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>

              {/* Wire 7 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="10s" repeatCount="indefinite" begin="90s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="10s" repeatCount="indefinite" begin="90.05s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="10s" repeatCount="indefinite" begin="90.10s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="10s" repeatCount="indefinite" begin="90.15s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="10s" repeatCount="indefinite" begin="90.20s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="10s" repeatCount="indefinite" begin="90.25s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="10s" repeatCount="indefinite" begin="90.30s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>

              {/* Wire 8 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="10s" repeatCount="indefinite" begin="105s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="10s" repeatCount="indefinite" begin="105.05s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="10s" repeatCount="indefinite" begin="105.10s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="10s" repeatCount="indefinite" begin="105.15s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="10s" repeatCount="indefinite" begin="105.20s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="10s" repeatCount="indefinite" begin="105.25s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="10s" repeatCount="indefinite" begin="105.30s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>

              {/* Decorative wire fascicles - meteor trails */}
              {/* Wire 3a - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.05s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.10s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.15s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.20s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.25s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.30s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>

              {/* Wire 3aa - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5s">
                  <mpath href="#wire3aa"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.05s">
                  <mpath href="#wire3aa"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.10s">
                  <mpath href="#wire3aa"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.15s">
                  <mpath href="#wire3aa"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.20s">
                  <mpath href="#wire3aa"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.25s">
                  <mpath href="#wire3aa"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="8s" repeatCount="indefinite" begin="5.30s">
                  <mpath href="#wire3aa"/>
                </animateMotion>
              </circle>

              {/* Wire 3ab - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="6s" repeatCount="indefinite" begin="2s">
                  <mpath href="#wire3ab"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="6s" repeatCount="indefinite" begin="2.05s">
                  <mpath href="#wire3ab"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="6s" repeatCount="indefinite" begin="2.10s">
                  <mpath href="#wire3ab"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="6s" repeatCount="indefinite" begin="2.15s">
                  <mpath href="#wire3ab"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="6s" repeatCount="indefinite" begin="2.20s">
                  <mpath href="#wire3ab"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="6s" repeatCount="indefinite" begin="2.25s">
                  <mpath href="#wire3ab"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="6s" repeatCount="indefinite" begin="2.30s">
                  <mpath href="#wire3ab"/>
                </animateMotion>
              </circle>

              {/* Wire 3b - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="6s" repeatCount="indefinite" begin="8s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="6s" repeatCount="indefinite" begin="8.05s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="6s" repeatCount="indefinite" begin="8.10s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="6s" repeatCount="indefinite" begin="8.15s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="6s" repeatCount="indefinite" begin="8.20s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="6s" repeatCount="indefinite" begin="8.25s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="6s" repeatCount="indefinite" begin="8.30s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>

              {/* Wire 4b - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="7s" repeatCount="indefinite" begin="12s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="7s" repeatCount="indefinite" begin="12.05s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="7s" repeatCount="indefinite" begin="12.10s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="7s" repeatCount="indefinite" begin="12.15s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="7s" repeatCount="indefinite" begin="12.20s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="7s" repeatCount="indefinite" begin="12.25s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="7s" repeatCount="indefinite" begin="12.30s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>

              {/* Wire 5b - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3.05s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3.10s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3.15s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3.20s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3.25s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="3.30s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>

              {/* Wire 5c - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="6s" repeatCount="indefinite" begin="9s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="6s" repeatCount="indefinite" begin="9.05s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="6s" repeatCount="indefinite" begin="9.10s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="6s" repeatCount="indefinite" begin="9.15s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="6s" repeatCount="indefinite" begin="9.20s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="6s" repeatCount="indefinite" begin="9.25s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="6s" repeatCount="indefinite" begin="9.30s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>

              {/* Wire 5d - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="7s" repeatCount="indefinite" begin="1s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="7s" repeatCount="indefinite" begin="1.05s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="7s" repeatCount="indefinite" begin="1.10s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="7s" repeatCount="indefinite" begin="1.15s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="7s" repeatCount="indefinite" begin="1.20s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="7s" repeatCount="indefinite" begin="1.25s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="7s" repeatCount="indefinite" begin="1.30s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
            </svg>

            {/* Skills Grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              style={{
                columnGap: 'var(--gap-lg)',
                rowGap: 'var(--gap-lg)',
                position: 'relative',
              }}
            >
              {skills.map((skill, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`skill-card ${visibleCards.has(index) ? 'visible' : ''}`}
                  style={{
                    opacity: 0,
                    textAlign: 'center',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      marginBottom: 'var(--spacing-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="icon-container"
                    >
                      {skill.icon}
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3
                    className="text-white font-semibold"
                    style={{
                      fontSize: '1.25rem',
                      marginBottom: 'var(--spacing-md)',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    {skill.category}
                  </h3>

                  {/* Items List */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-sm)',
                      alignItems: 'center',
                    }}
                  >
                    {skill.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-gray-400 hover:text-gray-300"
                        style={{
                          fontSize: '0.9375rem',
                          lineHeight: '1.6',
                          transition: 'color 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
