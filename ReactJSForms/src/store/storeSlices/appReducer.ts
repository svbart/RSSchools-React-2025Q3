import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
  countries: { code: string; name: string }[];
  selectedCountry?: string;
}

const initialState: IAppState = {
  countries: [
    { code: 'USA', name: 'United States' },
    { code: 'CAN', name: 'Canada' },
    { code: 'GBR', name: 'United Kingdom' },
    { code: 'DEU', name: 'Germany' },
    { code: 'FRA', name: 'France' },
    { code: 'ITA', name: 'Italy' },
    { code: 'ESP', name: 'Spain' },
    { code: 'AUS', name: 'Australia' },
    { code: 'JPN', name: 'Japan' },
    { code: 'CHN', name: 'China' },
    { code: 'IND', name: 'India' },
    { code: 'BRA', name: 'Brazil' },
    { code: 'MEX', name: 'Mexico' },
    { code: 'RUS', name: 'Russia' },
    { code: 'ZAF', name: 'South Africa' },
    { code: 'EGY', name: 'Egypt' },
    { code: 'TUR', name: 'Turkey' },
    { code: 'ARG', name: 'Argentina' },
    { code: 'COL', name: 'Colombia' },
    { code: 'CHL', name: 'Chile' },
    { code: 'POL', name: 'Poland' },
    { code: 'NLD', name: 'Netherlands' },
    { code: 'BEL', name: 'Belgium' },
    { code: 'SWE', name: 'Sweden' },
    { code: 'NOR', name: 'Norway' },
    { code: 'DNK', name: 'Denmark' },
    { code: 'FIN', name: 'Finland' },
  ],
  selectedCountry: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateSelectedCountry: (state, item: PayloadAction<string>) => {
      state.selectedCountry =
        state.countries.find((country) => country.code === item.payload)
          ?.name || '';
    },
  },
});

export const { updateSelectedCountry } = appSlice.actions;

export default appSlice.reducer;
