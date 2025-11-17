'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Slight delay for dramatic entrance
            setTimeout(() => {
              setIsVisible(true);
            }, 100);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Trigger well before entering viewport
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      id="contact"
      style={{
        paddingTop: 'var(--section-spacing-mobile)',
        paddingBottom: 'calc(var(--section-spacing-mobile) + 100px)',
      }}
    >
      {/* Mobile: 64px, Tablet: 96px, Desktop: 128px */}
      <style>{`
        @media (min-width: 768px) {
          #contact {
            padding-top: var(--section-spacing-tablet);
            padding-bottom: calc(var(--section-spacing-tablet) + 100px);
          }
        }
        @media (min-width: 1024px) {
          #contact {
            padding-top: var(--section-spacing-desktop);
            padding-bottom: calc(var(--section-spacing-desktop) + 100px);
          }
        }

        @keyframes revealContactCard {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.92);
            filter: blur(8px);
          }
          40% {
            filter: blur(3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .contact-card-reveal {
          animation: revealContactCard 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div className="container">
        <div className="max-w-4xl" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Floating Card */}
          <div
            ref={cardRef}
            className={isVisible ? 'contact-card-reveal' : ''}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '6px',
              padding: 'var(--spacing-3xl)',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              opacity: isVisible ? 1 : 0,
            }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-white" style={{ marginBottom: 'var(--spacing-lg)' }}>{t.contact.title}</h2>
            <p className="text-xl text-gray-500" style={{ marginBottom: 'var(--spacing-3xl)' }}>{t.contact.subtitle}</p>

            <a
              href="mailto:me@andreidodu.se"
              className="block text-xl sm:text-3xl md:text-4xl font-medium text-white/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#0369a1] hover:to-[#fbbf24]"
              style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)', marginBottom: 'var(--spacing-2xl)' }}
            >
              me@andreidodu.se
            </a>

            <div className="flex justify-center" style={{ gap: 'var(--gap-md)', marginBottom: 'var(--spacing-3xl)' }}>
              <a
                href="https://github.com/andreidodu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white p-3"
                style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/andreidoduse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white p-3"
                style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/andreidoduse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white p-3"
                aria-label="X (formerly Twitter)"
                style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.649l-5.207-6.802-5.974 6.802H2.356l7.734-8.835L1.25 2.25h6.649l4.699 6.203 5.45-6.203zM17.313 20.713h1.831L6.984 4.126H5.033l12.28 16.587z" />
                </svg>
              </a>
            </div>

            {/* Footer info inside card */}
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: 'var(--spacing-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-sm)',
              fontSize: '0.875rem',
              color: 'rgb(115, 115, 115)',
            }}>
              <div>© {currentYear} {t.footer.copyright}</div>
              <div>{t.footer.location}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
