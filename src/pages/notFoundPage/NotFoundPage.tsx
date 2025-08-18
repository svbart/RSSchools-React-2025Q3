'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';
import classes from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const t = useTranslations('notFound');

  return (
    <div className={classes.notFound}>
      <h2 style={{ margin: '10px 0' }}>{t('title')}</h2>
      <p>{t('description')}</p>
      <Link href="/">{t('backHome')}</Link>
    </div>
  );
};

export default NotFoundPage;
