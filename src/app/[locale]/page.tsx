import PlanetsSearch from '../../components/planetsSearch/PlanetsSearch';
import PageTitle from '../../components/pageTitle/PageTitle';
import { fetchPlanets } from '../lib/planetsApi';

// Отключаем кеширование страницы для корректной работы интернационализации
export const dynamic = 'force-dynamic';

// Server Component
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const search = resolvedSearchParams.search || '';

  // Получаем данные на сервере
  const planetsData = await fetchPlanets(page, search);

  return (
    <>
      <PageTitle />
      <PlanetsSearch
        initialData={planetsData}
        initialPage={page}
        initialSearch={search}
      />
    </>
  );
}
