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
    updateSelectedItems: (
      state,
      item: PayloadAction<PlanetCharacteristics>
    ) => {
      const selectedItems = state.selectedItems;
      const isSelected = selectedItems.find(
        (el) => el.url === item.payload.url
      );
      if (isSelected) {
        state.selectedItems = selectedItems.filter(
          (element) => element.url !== item.payload.url
        );
        return;
      }
      state.selectedItems.push(item.payload);
    },
    deleteAllSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSelectedItems, deleteAllSelectedItems } = appSlice.actions;

export default appSlice.reducer;
