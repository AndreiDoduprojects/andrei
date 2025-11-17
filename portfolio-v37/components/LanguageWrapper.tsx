'use client';

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageWrapper({
  children,
  fontClassName
}: {
  children: React.ReactNode;
  fontClassName: string;
}) {
  const { language } = useLanguage();

  return (
    <html lang={language} className={fontClassName}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
