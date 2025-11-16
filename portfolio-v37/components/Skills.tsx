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
        }

        .circuit-wires {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .wire-path {
          stroke: rgba(255, 255, 255, 0.06);
          stroke-width: 1;
          fill: none;
        }

        /* Connection dots at wire intersections */
        .connection-dot {
          fill: rgba(255, 255, 255, 0.15);
        }

        /* Traveling Light Particles - Smaller and more subtle */
        .light-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          opacity: 0;
        }

        .light-particle::before {
          content: '';
          position: absolute;
          inset: -4px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%);
          border-radius: 50%;
          filter: blur(6px);
        }

        .light-particle::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, #06b6d4 0%, #3b82f6 100%);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(6, 182, 212, 0.8), 0 0 12px rgba(59, 130, 246, 0.6);
        }

        /* Horizontal wire animation - travels left to right along the top wire */
        @keyframes travelHorizontal {
          0% {
            left: 0%;
            top: 80px;
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          97% {
            opacity: 1;
          }
          100% {
            left: 100%;
            top: 80px;
            opacity: 0;
          }
        }

        /* Vertical drop animations - lights travel down from horizontal wire to each card */
        @keyframes travelVerticalCard1 {
          0% {
            left: 12.5%;
            top: 80px;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            left: 12.5%;
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes travelVerticalCard2 {
          0% {
            left: 37.5%;
            top: 80px;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            left: 37.5%;
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes travelVerticalCard3 {
          0% {
            left: 62.5%;
            top: 80px;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            left: 62.5%;
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes travelVerticalCard4 {
          0% {
            left: 87.5%;
            top: 80px;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            left: 87.5%;
            top: 100%;
            opacity: 0;
          }
        }

        /* Activate animations when visible */
        .circuit-container.active .light-particle-horizontal {
          animation: travelHorizontal 4s linear infinite;
        }

        .circuit-container.active .light-particle-1 {
          animation: travelVerticalCard1 2s linear infinite;
          animation-delay: 0.5s;
        }

        .circuit-container.active .light-particle-2 {
          animation: travelVerticalCard2 2s linear infinite;
          animation-delay: 1s;
        }

        .circuit-container.active .light-particle-3 {
          animation: travelVerticalCard3 2s linear infinite;
          animation-delay: 1.5s;
        }

        .circuit-container.active .light-particle-4 {
          animation: travelVerticalCard4 2s linear infinite;
          animation-delay: 2s;
        }

        /* Desktop-only wires and particles (hidden on mobile/tablet) */
        @media (max-width: 1023px) {
          .circuit-wires,
          .light-particle,
          .powered-by-logo {
            display: none;
          }
        }

        /* Powered By logo styling */
        .powered-by-logo {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .powered-by-logo svg {
          filter: drop-shadow(0 0 10px rgba(3, 105, 161, 0.3));
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
              className="text-5xl sm:text-6xl font-bold text-white"
              style={{ marginBottom: 'var(--spacing-lg)' }}
            >
              Built on a foundation of
              <br />
              <span className="gradient-text">fast, production-grade tooling</span>
            </h2>
            <p className="text-xl text-gray-500">
              Modern technologies and expertise that power exceptional results
            </p>
          </div>

          {/* Skills Grid with Circuit Board Effect */}
          <div className={`circuit-container ${isVisible ? 'active' : ''}`}>
            {/* Powered By Logo */}
            <div className="powered-by-logo">
              <svg width="150" height="50" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Main gradient for logo */}
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0369a1"/>
                    <stop offset="100%" stopColor="#fbbf24"/>
                  </linearGradient>

                  {/* Glow gradient for outer ring */}
                  <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0369a1" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>

                {/* Outer hexagonal badge frame */}
                <path d="M 35 5 L 50 10 L 50 20 L 35 25 L 20 20 L 20 10 Z"
                      stroke="url(#logoGradient)"
                      strokeWidth="1.5"
                      fill="rgba(3, 105, 161, 0.05)"/>

                {/* Inner geometric "A" - Angular design */}
                <path d="M 30 19 L 35 11 L 40 19 M 32 17 L 38 17"
                      stroke="url(#logoGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>

                {/* Geometric "D" with circuit style */}
                <path d="M 60 11 L 60 19 M 60 15 L 65 11 L 68 15 L 65 19 L 60 19"
                      stroke="url(#logoGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"/>

                {/* Connection dots around the hexagon - like circuit nodes */}
                <circle cx="35" cy="5" r="2" fill="url(#logoGradient)"/>
                <circle cx="50" cy="10" r="2" fill="url(#logoGradient)"/>
                <circle cx="50" cy="20" r="2" fill="url(#logoGradient)"/>
                <circle cx="35" cy="25" r="2" fill="url(#logoGradient)"/>
                <circle cx="20" cy="20" r="2" fill="url(#logoGradient)"/>
                <circle cx="20" cy="10" r="2" fill="url(#logoGradient)"/>

                {/* Subtle text label beneath */}
                <text x="75" y="32"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontSize="7"
                      fontWeight="600"
                      letterSpacing="1.5"
                      fill="rgba(255, 255, 255, 0.35)">
                  TECH STACK
                </text>

                {/* Small accent dots */}
                <circle cx="75" cy="15" r="1" fill="url(#logoGradient)" opacity="0.4"/>
                <circle cx="130" cy="15" r="1" fill="url(#logoGradient)" opacity="0.4"/>
              </svg>
            </div>

            {/* SVG Circuit Wires - Desktop Only - Next.js Style */}
            <svg className="circuit-wires" viewBox="0 0 1000 600" preserveAspectRatio="none">
              {/* Main horizontal wire across the top */}
              <line x1="0" y1="80" x2="1000" y2="80" className="wire-path" />

              {/* Vertical wires dropping to each card (4 cards) */}
              {/* Card 1 - Left (12.5% position) */}
              <line x1="125" y1="80" x2="125" y2="600" className="wire-path" />

              {/* Card 2 - Mid-Left (37.5% position) */}
              <line x1="375" y1="80" x2="375" y2="600" className="wire-path" />

              {/* Card 3 - Mid-Right (62.5% position) */}
              <line x1="625" y1="80" x2="625" y2="600" className="wire-path" />

              {/* Card 4 - Right (87.5% position) */}
              <line x1="875" y1="80" x2="875" y2="600" className="wire-path" />

              {/* Connection dots at wire intersections */}
              {/* Center hub around "Powered By" label */}
              <circle cx="500" cy="80" r="3" className="connection-dot" />

              {/* Junction dots where vertical wires meet horizontal wire */}
              <circle cx="125" cy="80" r="3" className="connection-dot" />
              <circle cx="375" cy="80" r="3" className="connection-dot" />
              <circle cx="625" cy="80" r="3" className="connection-dot" />
              <circle cx="875" cy="80" r="3" className="connection-dot" />
            </svg>

            {/* Traveling Light Particles - Next.js Style */}
            {/* One horizontal light traveling along top wire */}
            <div className="light-particle light-particle-horizontal"></div>

            {/* Four vertical lights, one for each card */}
            <div className="light-particle light-particle-1"></div>
            <div className="light-particle light-particle-2"></div>
            <div className="light-particle light-particle-3"></div>
            <div className="light-particle light-particle-4"></div>

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
