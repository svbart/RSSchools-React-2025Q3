'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../../i18n/routing';
import { startTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span>Language:</span>
      <button
        onClick={() => handleLocaleChange('en')}
        style={{
          padding: '4px 8px',
          backgroundColor: locale === 'en' ? '#0070f3' : 'transparent',
          color: locale === 'en' ? 'white' : 'inherit',
          border: '1px solid #0070f3',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        EN
      </button>
      <button
        onClick={() => handleLocaleChange('ru')}
        style={{
          padding: '4px 8px',
          backgroundColor: locale === 'ru' ? '#0070f3' : 'transparent',
          color: locale === 'ru' ? 'white' : 'inherit',
          border: '1px solid #0070f3',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        RU
      </button>
    </div>
  );
}
