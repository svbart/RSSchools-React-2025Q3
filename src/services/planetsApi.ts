import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PlanetCharacteristics } from '../common/types/types';
import { normalizeData, normalizePlanet } from '../common/utils/utils';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `https://swapi.py4e.com/api/planets`,
});

type ExtendedFetchBaseQueryError = FetchBaseQueryError & { message: string };

const baseQueryWithErrorHandling: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const err = result.error as FetchBaseQueryError;
    let message = 'Unknown error occurred';

    if ('status' in err) {
      if (typeof err.data === 'string') {
        message = err.data;
      } else if (
        typeof err.data === 'object' &&
        err.data != null &&
        'detail' in err.data
      ) {
        message = err.data.detail as string;
      } else {
        message = 'Data loading error';
      }
    }

    const extendedError: ExtendedFetchBaseQueryError = {
      ...err,
      message,
    };

    console.error(
      `[API ERROR] Status: ${extendedError.status} | Message: ${extendedError.message} | Endpoint: ${typeof args === 'string' ? args : args.url}`
    );

    return { error: extendedError };
  }

  return result;
};

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Planets', 'Planet'],
  keepUnusedDataFor: 80,
  endpoints: (build) => ({
    getPlanetById: build.query<
      PlanetCharacteristics,
      number,
      Record<string, string>
    >({
      query: (id) => {
        if (id === 0) {
          return '';
        }
        return `${id}`;
      },
      transformResponse: (
        response: Record<string, string>
      ): PlanetCharacteristics => normalizePlanet(response),
      keepUnusedDataFor: 100,
      providesTags: (_, error, id) => (error ? [] : [{ type: 'Planet', id }]),
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
      providesTags: (_, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'Planets', id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetPlanetByIdQuery, useGetPlanetsByPageQuery } = planetsApi;
