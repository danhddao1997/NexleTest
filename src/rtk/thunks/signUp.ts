import {createAsyncThunk} from '@reduxjs/toolkit';
import {signIn, signUp} from 'api/post';
import LoadingModal from 'components/LoadingModal';
import {AppDispatch, RootState} from 'rtk/slices';
import {setUser} from 'rtk/slices/persisted';
import {SignInPayload} from 'ts/interfaces';
import {storeTokens} from 'utils/managers/encrypted-storage';

export const signUpThunk = createAsyncThunk<
  void,
  SignInPayload,
  {dispatch: AppDispatch; state: RootState}
>('signUp/signUpThunk', async (data, {dispatch, rejectWithValue}) => {
  LoadingModal.open();
  try {
    await signUp(data);
    const {accessToken, refreshToken, user} = await signIn(data);
    await storeTokens(accessToken, refreshToken);
    dispatch(setUser(user));
    LoadingModal.close();
  } catch (error: any) {
    LoadingModal.close();
    return rejectWithValue(error.message);
  }
});
