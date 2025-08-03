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
  name: 'app',
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

export const { updateSelectedItems, deleteAllSelectedItems } = appSlice.actions;

export default appSlice.reducer;
