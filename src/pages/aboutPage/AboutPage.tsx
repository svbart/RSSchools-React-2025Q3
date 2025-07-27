import Layout from '../../hoc/layout/Layout';
import classes from './AboutPage.module.scss';
import Navigation from '../../components/navigation/Navigation';

const AboutPage = () => {
  return (
    <Layout>
      <Navigation />
      <div className={classes.about}>
        <h2 className={classes.name}>About</h2>
        <p>Author: Svetlana Bartkevich </p>
        <a
          href="https://https://rs.school/courses/reactjs.com/SvetlanaBartkevich"
          target="_blank"
          rel="noopener noreferrer"
        >
          RSSCHOOL REACT COURSE
        </a>
      </div>
    </Layout>
  );
};

export default AboutPage;
