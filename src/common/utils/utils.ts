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

export const getIdFromUrl = (url?: string) => {
  if (!url) return NaN;
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
};

export const getNumberOfSelectedItems = (length: number) => {
  return length === 1 ? '1 planet' : `${length} planets`;
};
