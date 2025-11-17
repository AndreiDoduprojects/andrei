'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en | typeof translations.sv;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if user has a saved language preference
    const savedLanguage = localStorage.getItem('preferred-language') as Language | null;

    if (savedLanguage) {
      setLanguage(savedLanguage);
      setIsInitialized(true);
    } else {
      // Detect country based on IP using a free geolocation API
      fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
          // If user is from Sweden, set language to Swedish
          if (data.country_code === 'SE') {
            setLanguage('sv');
          }
          setIsInitialized(true);
        })
        .catch(() => {
          // If geolocation fails, stay with default 'en'
          setIsInitialized(true);
        });
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
