import { FC, ReactNode } from 'react';
import classes from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}
const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={classes.Layout}>
    <main id="root" className={classes.main}>
      {children}
    </main>
  </div>
);

export default Layout;
