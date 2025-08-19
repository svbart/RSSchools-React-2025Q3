import { getTranslations } from 'next-intl/server';
import PlanetsSearch from '../../containers/planetsSearch/PlanetsSearch';
import { fetchPlanets } from '../lib/planetsApi';

// This is a Server Component - it renders on the server with RSC
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const t = await getTranslations('search');
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const search = resolvedSearchParams.search || '';

  // Получаем данные на сервере
  const planetsData = await fetchPlanets(page, search);

  return (
    <>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>{t('title')}</h1>
      <PlanetsSearch
        initialData={planetsData}
        initialPage={page}
        initialSearch={search}
      />
    </>
  );
}
