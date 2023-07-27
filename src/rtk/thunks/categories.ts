import {createAsyncThunk} from '@reduxjs/toolkit';
import {getCategories} from 'api/get';
import {AppDispatch, RootState} from 'rtk/slices';
import {setCategories, setIsLoading} from 'rtk/slices/categories';

export const fetchCategoriesThunk = createAsyncThunk<
  void,
  void,
  {dispatch: AppDispatch; state: RootState}
>('categories/fetchCategoriesThunk', async (_, {dispatch, rejectWithValue}) => {
  try {
    const data = await getCategories();
    dispatch(setCategories(data));
  } catch (error: any) {
    return rejectWithValue(error.message);
  } finally {
    dispatch(setIsLoading(false));
  }
});
