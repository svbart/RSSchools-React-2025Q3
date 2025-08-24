import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FormEntry {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  terms: boolean;
  pictureBase64?: string;
}

interface FormDataState {
  entries: FormEntry[];
}

const initialState: FormDataState = {
  entries: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<FormEntry>) => {
      state.entries.push(action.payload);
    },
  },
});

export const { addEntry } = formDataSlice.actions;
export default formDataSlice.reducer;
