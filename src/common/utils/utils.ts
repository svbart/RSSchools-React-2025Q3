import { PlanetCharacteristics } from '../types/types';

export const normalizeData = <T extends Record<string, string>>(
  data: T[]
): PlanetCharacteristics[] => {
  return data.map((planet) => {
    const normalizedPlanet: Partial<PlanetCharacteristics> = {};
    Object.keys(planet).forEach((key) => {
      if (key.includes('_')) {
        const index = key.indexOf('_');
        const newKey: keyof PlanetCharacteristics = (key.slice(0, index) +
          key.charAt(index + 1).toUpperCase() +
          key.slice(index + 2)) as keyof PlanetCharacteristics;
        normalizedPlanet[newKey] = planet[key];
      } else {
        normalizedPlanet[key as keyof PlanetCharacteristics] = planet[key];
      }
    });
    return normalizedPlanet as PlanetCharacteristics;
  });
};
export const normalizePlanet = <T extends Record<string, string>>(
  data: T
): PlanetCharacteristics => {
  if (!data) return {} as PlanetCharacteristics;
  const normalizedPlanet: Partial<PlanetCharacteristics> = {};
  Object.keys(data).forEach((key) => {
    if (key.includes('_')) {
      const index = key.indexOf('_');
      const newKey: keyof PlanetCharacteristics = (key.slice(0, index) +
        key.charAt(index + 1).toUpperCase() +
        key.slice(index + 2)) as keyof PlanetCharacteristics;
      normalizedPlanet[newKey] = data[key];
    } else {
      normalizedPlanet[key as keyof PlanetCharacteristics] = data[key];
    }
  });
  return normalizedPlanet as PlanetCharacteristics;
};

export const getIdFromUrl = (url?: string) => {
  if (!url) return NaN;
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
};

// Функция для склонения русских слов
export const getRussianPlanetForm = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'планет';
  }

  if (lastDigit === 1) {
    return 'планета';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'планеты';
  } else {
    return 'планет';
  }
};

// Универсальная функция для формирования текста с количеством планет
export const getPlanetCountText = (
  count: number,
  locale: string = 'en'
): string => {
  if (locale === 'ru') {
    return `${count} ${getRussianPlanetForm(count)}`;
  } else {
    return count === 1 ? '1 planet' : `${count} planets`;
  }
};

export const getNumberOfSelectedItems = (length: number) => {
  return length === 1 ? '1 planet' : `${length} planets`;
};
