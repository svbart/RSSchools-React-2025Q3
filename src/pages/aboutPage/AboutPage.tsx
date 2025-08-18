'use client';

import { useTranslations } from 'next-intl';
import classes from './AboutPage.module.scss';

const AboutPage = () => {
  const t = useTranslations('about');

  return (
    <div className={classes.about}>
      <h2 className={classes.name}>{t('title')}</h2>
      <p>{t('description')}</p>
      <p>Author: Svetlana Bartkevich</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        RSSCHOOL REACT COURSE
      </a>
    </div>
  );
};

export default AboutPage;
