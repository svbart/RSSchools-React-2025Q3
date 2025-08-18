'use server';

import { PlanetCharacteristics } from '../../common/types/types';

export async function generateCSV(
  planets: PlanetCharacteristics[]
): Promise<string> {
  const headers = [
    'Name',
    'Climate',
    'Gravity',
    'Terrain',
    'Population',
    'Diameter',
  ];
  const csvContent = [
    headers.join(','),
    ...planets.map((planet) =>
      [
        `"${planet.name}"`,
        `"${planet.climate}"`,
        `"${planet.gravity}"`,
        `"${planet.terrain}"`,
        `"${planet.population}"`,
        `"${planet.diameter}"`,
      ].join(',')
    ),
  ].join('\n');

  return csvContent;
}

export async function downloadCSVAction(planets: PlanetCharacteristics[]) {
  const csvContent = await generateCSV(planets);
  return csvContent;
}
