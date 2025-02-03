import { Component, ReactNode } from 'react';
import classes from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

export default class Layout extends Component<LayoutProps> {
  render() {
    return (
      <div className={classes.Layout}>
        <main className={classes.main}>{this.props.children}</main>
      </div>
    );
  }
}
