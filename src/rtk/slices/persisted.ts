import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {PersistedState} from 'ts/rtk/slices';

const initialState: PersistedState = {
  selectedCategories: [],
};

const persistedSlice = createSlice({
  initialState,
  name: 'persisted',
  reducers: {
    setUser(state, action: PayloadAction<PersistedState['user']>) {
      state.user = action.payload;
    },
    setSelectedCategories(
      state,
      action: PayloadAction<PersistedState['selectedCategories']>,
    ) {
      state.selectedCategories = action.payload;
    },
    toggleSelectedCategories(state, action: PayloadAction<number>) {
      const contained = state.selectedCategories.indexOf(action.payload) > -1;
      if (contained) {
        state.selectedCategories = state.selectedCategories.filter(
          item => item !== action.payload,
        );
      } else {
        state.selectedCategories.push(action.payload);
      }
    },
  },
});

export const {setUser, setSelectedCategories, toggleSelectedCategories} =
  persistedSlice.actions;

const persistedReducer = persistedSlice.reducer;

export default persistedReducer;
