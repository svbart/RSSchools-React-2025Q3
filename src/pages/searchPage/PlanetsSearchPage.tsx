'use client';

import { useTranslations } from 'next-intl';
import PlanetsSearch from '../../containers/planetsSearch/PlanetsSearch';
import classes from './PlanetsSearchPage.module.scss';

const PlanetsSearchPage = () => {
  const t = useTranslations('search');

  return (
    <div>
      <h1 className={classes.header}>{t('title')}</h1>
      <PlanetsSearch />
    </div>
  );
};

export default PlanetsSearchPage;
