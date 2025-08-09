import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PlanetCharacteristics } from '../common/types/types';
import { normalizeData } from '../common/utils/utils';

export interface PlanetsResponseFromServer {
  count: number;
  next: string | null;
  previous: string | null;
  results: Record<string, string>[];
}

export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetCharacteristics[];
}

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://swapi.py4e.com/api/planets` }),
  endpoints: (build) => ({
    getPlanetById: build.query<Partial<PlanetCharacteristics>, number>({
      query: (id) => {
        if (id === 0) {
          return '';
        }
        return `${id}`;
      },
    }),
    getPlanetsByPage: build.query<
      PlanetsResponse,
      {
        pageNumber: number;
        searchValue: string;
      },
      PlanetsResponseFromServer
    >({
      query: ({ pageNumber, searchValue }) => {
        return {
          url: `?page=${pageNumber}`,
          params: {
            search: searchValue,
          },
        };
      },
      transformResponse: (
        response: PlanetsResponseFromServer
      ): PlanetsResponse => ({
        ...response,
        results: normalizeData(response.results),
      }),
    }),
  }),
});

export const { useGetPlanetByIdQuery, useGetPlanetsByPageQuery } = planetsApi;
