'use client';

import { useTranslations } from 'next-intl';

export default function PageTitle() {
  const t = useTranslations('search');

  return (
    <h1 style={{ textAlign: 'center', margin: '20px 0' }}>{t('title')}</h1>
  );
}
