import { PlanetCharacteristics } from '../types/types';

export const getBaseUrl = () => {
  return 'https://swapi.py4e.com/api/planets';
};

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
