import { getTranslations } from 'next-intl/server';
import classes from '../../../components/pages/AboutPage.module.scss';

// Отключаем кеширование страницы для корректной работы интернационализации
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

// Server Component
export default async function About({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className={classes.about}>
      <h2 className={classes.name}>{t('title')}</h2>
      <p>{t('description')}</p>
      <p>{t('author')}</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('course')}
      </a>
    </div>
  );
}
