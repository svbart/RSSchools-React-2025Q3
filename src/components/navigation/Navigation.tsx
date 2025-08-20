'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '../../i18n/routing';
import ThemeBtn from '../themeBtn/ThemeBtn';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import classes from './Navigation.module.scss';

const Navigation = () => {
  const t = useTranslations('navigation');
  const pathname = usePathname();

  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        <li className={classes.navItem}>
          <Link
            href="/"
            className={`${classes.navLink} ${pathname === '/' ? classes.active : ''}`}
          >
            {t('home')}
          </Link>
        </li>
        <li className={classes.navItem}>
          <Link
            href="/about"
            className={`${classes.navLink} ${pathname === '/about' ? classes.active : ''}`}
          >
            {t('about')}
          </Link>
        </li>
      </ul>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <LanguageSwitcher />
        <ThemeBtn />
      </div>
    </nav>
  );
};

export default Navigation;
