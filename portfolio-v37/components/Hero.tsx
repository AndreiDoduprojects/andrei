'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [nameText, setNameText] = useState('');
  const [titleText, setTitleText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingNow, setIsTypingNow] = useState(false);
  const [symbolIndex, setSymbolIndex] = useState(0);
  const [showSymbols, setShowSymbols] = useState(true);
  const symbols = ['*', '+', '.'];
  const fullTitle = t.hero.title;

  useEffect(() => {
    let titleIndex = 0;

    // Reset all states when language changes
    setNameText('');
    setTitleText('');
    setShowCursor(true);
    setIsTypingNow(false);
    setSymbolIndex(0);
    setShowSymbols(true);

    // Cycle through symbols rapidly for 5 seconds
    const symbolInterval = setInterval(() => {
      setSymbolIndex(prev => (prev + 1) % symbols.length);
    }, 100);

    const typeString = (str: string, index: number, callback: () => void) => {
      if (index < str.length) {
        setIsTypingNow(true);
        setNameText(prev => prev + str[index]);
        setTimeout(() => {
          setIsTypingNow(false);
        }, 100); // Show _ for 100ms while typing
        const delay = 300; // 300ms delay per character for visible stagger
        setTimeout(() => typeString(str, index + 1, callback), delay);
      } else {
        setIsTypingNow(false);
        callback();
      }
    };

    const deleteChars = (count: number, callback: () => void) => {
      let deleted = 0;
      const deleteOne = () => {
        if (deleted < count) {
          setNameText(prev => prev.slice(0, -1));
          deleted++;
          setTimeout(deleteOne, 250);
        } else {
          callback();
        }
      };
      deleteOne();
    };

    const typeTitle = () => {
      if (titleIndex < fullTitle.length) {
        setIsTypingNow(true);
        setTitleText(fullTitle.slice(0, titleIndex + 1));
        titleIndex++;
        setTimeout(() => {
          setIsTypingNow(false);
        }, 100); // Show _ for 100ms while typing
        const delay = 200; // 200ms delay per character
        setTimeout(typeTitle, delay);
      } else {
        // Typing is done
        setIsTypingNow(false);
        setShowCursor(false);
      }
    };

    const startTypingSequence = () => {
      // Type "Andrrr"
      typeString('Andrrr', 0, () => {
        // Pause, then delete "rr"
        setTimeout(() => {
          deleteChars(2, () => {
            // Type "ei Dodu"
            typeString('ei Dodu', 0, () => {
              // Pause before typing title
              setTimeout(() => {
                typeTitle();
              }, 300);
            });
          });
        }, 200);
      });
    };

    // After 5 seconds, stop symbols and start typing
    const startTimeout = setTimeout(() => {
      clearInterval(symbolInterval);
      setShowSymbols(false);
      startTypingSequence();
    }, 5000);

    return () => {
      clearInterval(symbolInterval);
      clearTimeout(startTimeout);
    };
  }, [t.hero.title]);

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
                width: '280px',
                height: '280px',
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
                sizes="280px"
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
            <span className="block gradient-text" style={{ marginBottom: 'var(--gap-md)', letterSpacing: '-5px', fontSize: 'calc(1em + 30px)', minHeight: '1.1em' }}>
              {nameText}
              {showSymbols && titleText.length === 0 && <span style={{ fontSize: '0.6em', lineHeight: '1', verticalAlign: 'middle' }}>{symbols[symbolIndex]}</span>}
              {!showSymbols && showCursor && titleText.length === 0 && (
                <span style={{ animation: 'blink 1s infinite' }}>
                  {isTypingNow ? '_' : ''}|
                </span>
              )}
            </span>
            <span className="block gradient-text" style={{ fontSize: 'calc(1em + 0px)', letterSpacing: '-5px', minHeight: '1.2em' }}>
              {titleText}
              {showCursor && titleText.length > 0 && titleText.length < fullTitle.length && (
                <span style={{ animation: 'blink 1s infinite' }}>
                  {isTypingNow ? '_' : ''}|
                </span>
              )}
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed"
            style={{
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '0.2s',
              opacity: 0,
              marginBottom: 'var(--section-spacing-mobile)',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
            }}
          >
            {t.hero.tagline}
          </p>

          <div
            className="flex flex-wrap justify-center"
            style={{
              animation: 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: '0.4s',
              opacity: 0,
              gap: 'var(--gap-md)',
              alignItems: 'stretch',
            }}
          >
            <button
              className="btn btn-primary group"
              onClick={() => scrollToSection('contact')}
              style={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollToSection('work')}
              style={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}
            >
              {t.hero.viewWork}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
