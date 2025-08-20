'use client';

import { SyntheticEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classes from './Pagination.module.scss';
import Flyout from '../flyout/Flyout';

interface PaginationProps {
  thereIsNext: boolean;
}

const Pagination = ({ thereIsNext }: PaginationProps) => {
  const t = useTranslations('navigation');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = Number(searchParams?.get('page')) || 1;

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    let newPage = pageNumber;

    if (target.textContent === t('previous')) {
      newPage = pageNumber - 1;
    }
    if (target.textContent === t('next')) {
      newPage = pageNumber + 1;
    }

    // Next.js navigation
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(newPage));

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.flyout}>
        <Flyout />
      </div>
      <div className={classes.pagination}>
        <button
          className={classes.button}
          onClick={handleButtonClick}
          disabled={pageNumber === 1}
        >
          {t('previous')}
        </button>
        <span className={classes.pageNumber}>{pageNumber}</span>
        <button
          className={classes.button}
          onClick={handleButtonClick}
          disabled={!thereIsNext}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
