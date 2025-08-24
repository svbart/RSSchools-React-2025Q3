import { type FC, type ReactNode } from 'react';
import classes from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
