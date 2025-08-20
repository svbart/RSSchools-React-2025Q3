'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('navigation');
  const pathname = usePathname();

  const getNewPath = (newLocale: string) => {
    // Удаляем текущую локаль из пути
    const pathWithoutLocale = pathname?.replace(/^\/(en|ru)/, '');
    return `/${newLocale}${pathWithoutLocale}`;
  };

  const handleLanguageChange = (newLocale: string) => {
    const newPath = getNewPath(newLocale);
    // Принудительная перезагрузка для обновления локали
    window.location.href = newPath;
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <span>{t('language')}:</span>
      <button
        onClick={() => handleLanguageChange('en')}
        style={{
          padding: '4px 8px',
          backgroundColor: locale === 'en' ? '#0070f3' : 'transparent',
          color: locale === 'en' ? 'white' : 'inherit',
          border: '1px solid #0070f3',
        }}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ru')}
        style={{
          padding: '4px 8px',
          backgroundColor: locale === 'ru' ? '#0070f3' : 'transparent',
          color: locale === 'ru' ? 'white' : 'inherit',
          border: '1px solid #0070f3',
        }}
      >
        RU
      </button>
    </div>
  );
}
