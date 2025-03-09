import { FC, ReactNode } from 'react';
import styles from '@/src/hoc/layout/Layout.module.scss';
import { useTheme } from '../../contexts/ThemeContext';

interface ILayoutProps {
  children: ReactNode | ReactNode[];
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? styles.dark : styles.light;
  return (
    <div className={styles.Layout}>
      <main className={`${styles.main} ${theme}`}>{children}</main>
    </div>
  );
};

export default Layout;
