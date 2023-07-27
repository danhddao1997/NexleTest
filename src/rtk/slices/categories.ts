import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CategoriesState} from 'ts/rtk/slices';

const initialState: CategoriesState = {
  categories: [],
  isLoading: true,
};

const categoriesSlice = createSlice({
  initialState,
  name: 'categories',
  reducers: {
    setIsLoading(state, action: PayloadAction<CategoriesState['isLoading']>) {
      state.isLoading = action.payload;
    },
    setCategories(state, action: PayloadAction<CategoriesState['categories']>) {
      state.categories = action.payload;
    },
  },
});

export const {setIsLoading, setCategories} = categoriesSlice.actions;

const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
