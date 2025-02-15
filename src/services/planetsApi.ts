import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PlanetCharacteristics } from '../common/types/types';

interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetCharacteristics[];
}

// Define a service using a base URL and expected endpoints
export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/planets' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<PlanetsResponse, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPlanetById: builder.query<PlanetsResponse, number>({
      query: (id) => `${id}`,
    }),
    getPlanetsByPage: builder.query<PlanetsResponse, number>({
      query: (pageNumber) => `/?page=${pageNumber}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPlanetsQuery,
  useGetPlanetByIdQuery,
  useGetPlanetsByPageQuery,
} = planetsApi;
