'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center' }}>
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          background: language === 'en' ? 'var(--gradient-swedish)' : 'transparent',
          color: language === 'en' ? 'white' : 'var(--text-secondary)',
          border: '1px solid',
          borderColor: language === 'en' ? 'transparent' : 'var(--grey-dark)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: 'var(--font-system)',
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('sv')}
        style={{
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          background: language === 'sv' ? 'var(--gradient-swedish)' : 'transparent',
          color: language === 'sv' ? 'white' : 'var(--text-secondary)',
          border: '1px solid',
          borderColor: language === 'sv' ? 'transparent' : 'var(--grey-dark)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: 'var(--font-system)',
        }}
      >
        SV
      </button>
    </div>
  );
}
