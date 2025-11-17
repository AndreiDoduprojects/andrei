'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ paddingTop: '6rem', paddingBottom: '6rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div style={{
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '4rem',
        paddingRight: '4rem',
        maxWidth: '80rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.875rem',
        color: 'rgb(107, 114, 128)'
      }}>
        <span>© {currentYear} {t.footer.copyright}</span>
        <span>{t.footer.location}</span>
      </div>
    </footer>
  );
}
