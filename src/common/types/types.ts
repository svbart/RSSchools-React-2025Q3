import { ReactNode } from 'react';

export interface PlanetCharacteristics {
  name: string;
  rotationPeriod: string;
  orbitalPeriod: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surfaceWater: string;
  population: string;
}

export interface ChildrenAsProps {
  children: ReactNode;
}
