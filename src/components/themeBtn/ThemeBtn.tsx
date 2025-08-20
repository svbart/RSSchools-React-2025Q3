'use client';

import { useContext } from 'react';
import { useTranslations } from 'next-intl';
import { ThemeContext } from '../../contexts/themeContext';
import classes from './ThemeBtn.module.scss';

const ThemeBtn = () => {
  const t = useTranslations('theme');
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div className={classes.themeBtnContainer}>
      <button
        onClick={toggleTheme}
        className={`${classes.themeButton} ${theme}`}
      >
        {theme === 'dark' ? t('light') : t('dark')}
      </button>
    </div>
  );
};

export default ThemeBtn;
