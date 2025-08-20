'use client';

import { ChangeEvent, FC } from 'react';
import { useTranslations } from 'next-intl';

interface SearchFieldProps {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

const SearchField: FC<SearchFieldProps> = ({ onInputChange, searchValue }) => {
  const t = useTranslations('search');

  return (
    <input
      type="text"
      placeholder={t('placeholder')}
      value={searchValue}
      onChange={onInputChange}
    />
  );
};

export default SearchField;
