import Layout from '../../hoc/layout/Layout';
import { Link } from 'react-router';
import classes from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className={classes.notFound}>
        <h2 style={{ margin: '10px 0' }}>Page Not Found</h2>
        <p> Go to the {<Link to="/">Homepage</Link>}</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
