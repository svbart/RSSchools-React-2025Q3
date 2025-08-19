import { FC, ReactNode } from 'react';
import classes from './Layout.module.scss';
import Navigation from '../../components/navigation/Navigation';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}
const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={classes.Layout}>
    <main id="root" className={classes.Main}>
      <Navigation />
      {children}
    </main>
  </div>
);

export default Layout;
