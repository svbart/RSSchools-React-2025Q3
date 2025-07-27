import classes from './Navigation.module.scss';
import { NavLink } from 'react-router';

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        <li className={classes.navItem}>
          <NavLink to="/" className={classes.navLink}>
            Homepage
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <NavLink to="/about" className={classes.navLink}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
