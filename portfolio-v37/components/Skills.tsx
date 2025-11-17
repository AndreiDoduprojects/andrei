'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Skill {
  category: string;
  items: string[];
  icon: ReactElement;
}

export default function Skills() {
  const { t } = useLanguage();
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
      category: 'ML & AI',
      items: ['Training', 'Fine-tuning', 'Optimization', 'Model Deployment'],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" stroke="url(#gradient3)" strokeWidth="2"/>
          <circle cx="6" cy="6" r="2" stroke="url(#gradient3)" strokeWidth="2"/>
          <circle cx="18" cy="6" r="2" stroke="url(#gradient3)" strokeWidth="2"/>
          <circle cx="6" cy="18" r="2" stroke="url(#gradient3)" strokeWidth="2"/>
          <circle cx="18" cy="18" r="2" stroke="url(#gradient3)" strokeWidth="2"/>
          <line x1="8" y1="7" x2="10" y2="10" stroke="url(#gradient3)" strokeWidth="2"/>
          <line x1="16" y1="7" x2="14" y2="10" stroke="url(#gradient3)" strokeWidth="2"/>
          <line x1="8" y1="17" x2="10" y2="14" stroke="url(#gradient3)" strokeWidth="2"/>
          <line x1="16" y1="17" x2="14" y2="14" stroke="url(#gradient3)" strokeWidth="2"/>
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
              // Staggered delay: 150ms per card for more noticeable effect
              setTimeout(() => {
                setVisibleCards((prev) => new Set(prev).add(index));
              }, index * 150);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '100px', // Trigger earlier
        }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [skills.length]);

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
          stroke: rgba(255, 255, 255, 0.08);
          stroke-width: 1;
          fill: none;
        }

        .neural-dot {
          fill: rgba(255, 255, 255, 0.4);
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
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

        /* Responsive neural wires - scale down on smaller screens */
        .neural-connections {
          position: absolute;
          top: -80px;
          left: 0;
          width: 100%;
          height: 360px;
          pointer-events: none;
          z-index: 11;
        }

        @media (max-width: 1279px) {
          .circuit-container {
            padding-top: 260px;
          }

          .circuit-wires {
            top: 160px;
          }

          .neural-connections {
            top: -70px;
          }
        }

        @media (max-width: 768px) {
          .circuit-container {
            padding-top: 240px;
          }

          .circuit-wires {
            top: 140px;
          }

          .neural-connections {
            top: -60px;
          }
        }

        /* Powered By logo styling */
        .powered-by-logo {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          transition: transform 0.3s ease;
        }

        .powered-by-logo svg {
          filter: drop-shadow(0 0 20px rgba(3, 105, 161, 0.4));
          width: 480px;
          height: 160px;
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
              {t.skills.title}
            </h2>
            <p className="text-xl text-gray-500">
              {t.skills.subtitle}
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
            <svg className="neural-connections" viewBox="0 -80 1280 360" preserveAspectRatio="xMidYMin slice">

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
              <path id="wire2" d="M 546 96 L 250 96 L 250 260 L 182 260 L 182 280"
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
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.00s; 240.00s; 480.00s; 720.00s; 960.00s; 1200.00s; 1440.00s; 1680.00s; 1920.00s; 2160.00s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.05s; 240.05s; 480.05s; 720.05s; 960.05s; 1200.05s; 1440.05s; 1680.05s; 1920.05s; 2160.05s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.10s; 240.10s; 480.10s; 720.10s; 960.10s; 1200.10s; 1440.10s; 1680.10s; 1920.10s; 2160.10s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.15s; 240.15s; 480.15s; 720.15s; 960.15s; 1200.15s; 1440.15s; 1680.15s; 1920.15s; 2160.15s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.20s; 240.20s; 480.20s; 720.20s; 960.20s; 1200.20s; 1440.20s; 1680.20s; 1920.20s; 2160.20s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.25s; 240.25s; 480.25s; 720.25s; 960.25s; 1200.25s; 1440.25s; 1680.25s; 1920.25s; 2160.25s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="0.30s; 240.30s; 480.30s; 720.30s; 960.30s; 1200.30s; 1440.30s; 1680.30s; 1920.30s; 2160.30s">
                  <mpath href="#wire1"/>
                </animateMotion>
              </circle>

              {/* Wire 2 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="37.00s; 277.00s; 517.00s; 757.00s; 997.00s; 1237.00s; 1477.00s; 1717.00s; 1957.00s; 2197.00s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="37.05s; 277.05s; 517.05s; 757.05s; 997.05s; 1237.05s; 1477.05s; 1717.05s; 1957.05s; 2197.05s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="37.10s; 277.10s; 517.10s; 757.10s; 997.10s; 1237.10s; 1477.10s; 1717.10s; 1957.10s; 2197.10s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="37.15s; 277.15s; 517.15s; 757.15s; 997.15s; 1237.15s; 1477.15s; 1717.15s; 1957.15s; 2197.15s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="37.20s; 277.20s; 517.20s; 757.20s; 997.20s; 1237.20s; 1477.20s; 1717.20s; 1957.20s; 2197.20s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="37.25s; 277.25s; 517.25s; 757.25s; 997.25s; 1237.25s; 1477.25s; 1717.25s; 1957.25s; 2197.25s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="37.30s; 277.30s; 517.30s; 757.30s; 997.30s; 1237.30s; 1477.30s; 1717.30s; 1957.30s; 2197.30s">
                  <mpath href="#wire2"/>
                </animateMotion>
              </circle>

              {/* Wire 4 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="81.00s; 321.00s; 561.00s; 801.00s; 1041.00s; 1281.00s; 1521.00s; 1761.00s; 2001.00s; 2241.00s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="81.05s; 321.05s; 561.05s; 801.05s; 1041.05s; 1281.05s; 1521.05s; 1761.05s; 2001.05s; 2241.05s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="81.10s; 321.10s; 561.10s; 801.10s; 1041.10s; 1281.10s; 1521.10s; 1761.10s; 2001.10s; 2241.10s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="81.15s; 321.15s; 561.15s; 801.15s; 1041.15s; 1281.15s; 1521.15s; 1761.15s; 2001.15s; 2241.15s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="81.20s; 321.20s; 561.20s; 801.20s; 1041.20s; 1281.20s; 1521.20s; 1761.20s; 2001.20s; 2241.20s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="81.25s; 321.25s; 561.25s; 801.25s; 1041.25s; 1281.25s; 1521.25s; 1761.25s; 2001.25s; 2241.25s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="81.30s; 321.30s; 561.30s; 801.30s; 1041.30s; 1281.30s; 1521.30s; 1761.30s; 2001.30s; 2241.30s">
                  <mpath href="#wire4"/>
                </animateMotion>
              </circle>

              {/* Wire 5 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="129.00s; 369.00s; 609.00s; 849.00s; 1089.00s; 1329.00s; 1569.00s; 1809.00s; 2049.00s; 2289.00s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="129.05s; 369.05s; 609.05s; 849.05s; 1089.05s; 1329.05s; 1569.05s; 1809.05s; 2049.05s; 2289.05s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="129.10s; 369.10s; 609.10s; 849.10s; 1089.10s; 1329.10s; 1569.10s; 1809.10s; 2049.10s; 2289.10s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="129.15s; 369.15s; 609.15s; 849.15s; 1089.15s; 1329.15s; 1569.15s; 1809.15s; 2049.15s; 2289.15s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="129.20s; 369.20s; 609.20s; 849.20s; 1089.20s; 1329.20s; 1569.20s; 1809.20s; 2049.20s; 2289.20s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="129.25s; 369.25s; 609.25s; 849.25s; 1089.25s; 1329.25s; 1569.25s; 1809.25s; 2049.25s; 2289.25s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="129.30s; 369.30s; 609.30s; 849.30s; 1089.30s; 1329.30s; 1569.30s; 1809.30s; 2049.30s; 2289.30s">
                  <mpath href="#wire5"/>
                </animateMotion>
              </circle>

              {/* Wire 6 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="183.00s; 423.00s; 663.00s; 903.00s; 1143.00s; 1383.00s; 1623.00s; 1863.00s; 2103.00s; 2343.00s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="183.05s; 423.05s; 663.05s; 903.05s; 1143.05s; 1383.05s; 1623.05s; 1863.05s; 2103.05s; 2343.05s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="183.10s; 423.10s; 663.10s; 903.10s; 1143.10s; 1383.10s; 1623.10s; 1863.10s; 2103.10s; 2343.10s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="183.15s; 423.15s; 663.15s; 903.15s; 1143.15s; 1383.15s; 1623.15s; 1863.15s; 2103.15s; 2343.15s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="183.20s; 423.20s; 663.20s; 903.20s; 1143.20s; 1383.20s; 1623.20s; 1863.20s; 2103.20s; 2343.20s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="183.25s; 423.25s; 663.25s; 903.25s; 1143.25s; 1383.25s; 1623.25s; 1863.25s; 2103.25s; 2343.25s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="183.30s; 423.30s; 663.30s; 903.30s; 1143.30s; 1383.30s; 1623.30s; 1863.30s; 2103.30s; 2343.30s">
                  <mpath href="#wire6"/>
                </animateMotion>
              </circle>

              {/* Wire 7 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire7"/>
                </animateMotion>
              </circle>

              {/* Wire 8 - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire8"/>
                </animateMotion>
              </circle>

              {/* Decorative wire fascicles - meteor trails */}
              {/* Wire 3a - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3a"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
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
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire3b"/>
                </animateMotion>
              </circle>

              {/* Wire 4b - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire4b"/>
                </animateMotion>
              </circle>

              {/* Wire 5b - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5b"/>
                </animateMotion>
              </circle>

              {/* Wire 5c - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5c"/>
                </animateMotion>
              </circle>

              {/* Wire 5d - meteor trail (7 dots for seamless gradient) */}
              <circle r="2.5" className="trail-dot trail-dot-1">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-2">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-3">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-4">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-5">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-6">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
                  <mpath href="#wire5d"/>
                </animateMotion>
              </circle>
              <circle r="2.5" className="trail-dot trail-dot-7">
                <animateMotion dur="5s" repeatCount="indefinite" begin="9999s">
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
