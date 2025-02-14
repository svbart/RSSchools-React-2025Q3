import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlanetCharacteristics } from '../../common/types/types';

export interface IAppState {
  selectedItems: PlanetCharacteristics[];
}

const initialState: IAppState = {
  selectedItems: [],
};

export const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state, item: PayloadAction<PlanetCharacteristics>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedItems.push(item.payload);
    },
    remove: (state, item: PayloadAction<PlanetCharacteristics>) => {
      state.selectedItems.filter((el) => el.url !== item.payload.url);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = appSlice.actions;

export default appSlice.reducer;
