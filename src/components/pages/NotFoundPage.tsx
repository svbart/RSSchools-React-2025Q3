import { useTranslations } from 'next-intl';
import classes from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const t = useTranslations('notFound');

  return (
    <div className={classes.notFound}>
      <h2 style={{ margin: '10px 0', color: 'red' }}>{t('title')}</h2>
      <p>{t('description')}</p>
    </div>
  );
};

export default NotFoundPage;
