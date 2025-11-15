'use client';

import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-xl font-bold gradient-text">
            ANDREI DODU
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-gray-400 hover:text-white transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0369a1] to-[#fbbf24] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#work"
              className="text-gray-400 hover:text-white transition-colors relative group"
            >
              Work
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0369a1] to-[#fbbf24] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0369a1] to-[#fbbf24] group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
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
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <a
                href="#about"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#work"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </a>
              <a
                href="#contact"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
