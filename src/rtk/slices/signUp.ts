import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {SignUpState} from 'ts/rtk/slices';

const initialState: SignUpState = {
  loading: false,
};

const signUpSlice = createSlice({
  initialState,
  name: 'signUp',
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {setLoading} = signUpSlice.actions;

const signUpReducer = signUpSlice.reducer;

export default signUpReducer;
