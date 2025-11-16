'use client';

import Image from 'next/image';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden" id="about">
      <div className="container">
        <div className="max-w-5xl text-center" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Profile Image */}
          <div
            style={{
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              opacity: 0,
              marginBottom: 'var(--spacing-2xl)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 40px rgba(3, 105, 161, 0.2)',
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Andrei Dodu"
                fill
                sizes="200px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
            style={{
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '0.1s',
              opacity: 0,
              marginBottom: 'var(--gap-xl)',
            }}
          >
            <span className="block text-white/90" style={{ marginBottom: 'var(--gap-md)' }}>Andrei Dodu</span>
            <span className="block gradient-text">Full-Stack Developer</span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed" style={{ marginLeft: 'auto', marginRight: 'auto' }}
            style={{
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '0.2s',
              opacity: 0,
              marginBottom: 'var(--section-spacing-mobile)',
              textAlign: 'center',
            }}
          >
            Crafting elegant solutions at the intersection of technology and finance
          </p>

          <div
            className="flex flex-wrap justify-center"
            style={{
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '0.4s',
              opacity: 0,
              gap: 'var(--gap-md)',
            }}
          >
            <button
              className="btn btn-primary group"
              onClick={() => scrollToSection('contact')}
            >
              <span className="relative z-10">Get In Touch</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection('work')}
            >
              View Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
