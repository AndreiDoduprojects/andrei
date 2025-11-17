'use client';

import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [showBackground, setShowBackground] = useState(false);
  const { t } = useLanguage();

  useMotionValueEvent(scrollY, 'change', (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        opacity: 0,
        padding: 'var(--spacing-md) 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <motion.div
        className="relative"
        animate={{
          width: showBackground ? '80%' : '100%',
          maxWidth: showBackground ? '1200px' : '1536px',
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          borderRadius: showBackground ? '12px' : '0px',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            background: showBackground ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0)',
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            borderRadius: showBackground ? '12px' : '0px',
            backdropFilter: showBackground ? 'blur(12px)' : 'none',
            padding: `var(--component-padding-md) var(--component-padding-lg)`,
            border: showBackground ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
            boxShadow: showBackground ? '0 8px 32px rgba(0, 0, 0, 0.4)' : 'none',
          }}
        >
          <AnimatePresence>
            {showBackground && (
              <motion.div
                key={String(showBackground)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 h-full w-full pointer-events-none"
                style={{
                  background: 'rgba(10, 10, 10, 0.9)',
                  borderRadius: '12px',
                  maskImage: 'linear-gradient(to bottom, white, transparent, white)',
                  WebkitMaskImage: 'linear-gradient(to bottom, white, transparent, white)',
                }}
              />
            )}
          </AnimatePresence>
          <div className="flex items-center justify-between w-full">
            {/* Language Switcher - Left */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Desktop Navigation - Center */}
            <div
              className="hidden md:flex items-center mx-auto"
              style={{
                gap: 'var(--gap-2xl)',
              }}
            >
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white cursor-pointer"
                style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {t.nav.work}
              </a>
              <a
                href="#skills"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white cursor-pointer"
                style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {t.nav.skills}
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white cursor-pointer"
                style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {t.nav.contact}
              </a>
            </div>

            {/* Placeholder for balance on desktop */}
            <div className="hidden md:block" style={{ width: '80px' }}></div>

            {/* Mobile Menu Button - Centered */}
            <button
              className="md:hidden text-white"
              style={{
                padding: 'var(--component-padding-sm)',
              }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden border-t border-gray-800"
              style={{
                animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                padding: `var(--component-padding-md) 0`,
              }}
            >
              <div
                className="flex flex-col"
                style={{
                  gap: 'var(--gap-sm)',
                }}
              >
                <a
                  href="#work"
                  className="text-gray-400 hover:text-white"
                  style={{
                    padding: 'var(--component-padding-sm)',
                    transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                >
                  {t.nav.work}
                </a>
                <a
                  href="#skills"
                  className="text-gray-400 hover:text-white"
                  style={{
                    padding: 'var(--component-padding-sm)',
                    transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                >
                  {t.nav.skills}
                </a>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white"
                  style={{
                    padding: 'var(--component-padding-sm)',
                    transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    setMobileMenuOpen(false);
                  }}
                >
                  {t.nav.contact}
                </a>
                <div style={{ padding: 'var(--component-padding-sm)' }}>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </nav>
  );
}
