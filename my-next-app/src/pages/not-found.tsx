import Link from 'next/link';
import Layout from '@/src/hoc/layout/Layout';
import styles from '@NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.title}>Page Not Found</h2>
        <p>
          Go to the <Link href="/">Homepage</Link>{' '}
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
