import { PlanetCharacteristics } from '../../common/types/types';
import { normalizeData, normalizePlanet } from '../../common/utils/utils';

export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetCharacteristics[];
}

// Серверная функция для получения планет
export async function fetchPlanets(
  pageNumber: number = 1,
  searchValue: string = ''
): Promise<PlanetsResponse> {
  const baseUrl = 'https://swapi.py4e.com/api/planets';
  const params = new URLSearchParams({
    page: pageNumber.toString(),
    ...(searchValue && { search: searchValue }),
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Кеширование на 60 секунд
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: normalizeData(data.results),
    };
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw error;
  }
}

// Серверная функция для получения планеты по ID
export async function fetchPlanetById(
  id: number
): Promise<PlanetCharacteristics | null> {
  const url = `https://swapi.py4e.com/api/planets/${id}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Кеширование на 5 минут
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return normalizePlanet(data);
  } catch (error) {
    console.error('Error fetching planet:', error);
    throw error;
  }
}
