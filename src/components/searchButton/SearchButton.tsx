'use client';

import { useTranslations } from 'next-intl';

const SearchButton = () => {
  const t = useTranslations('search');

  return <button type="submit">{t('searchButton')}</button>;
};

export default SearchButton;
