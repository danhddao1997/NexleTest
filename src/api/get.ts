import api from 'api';
import {Category} from 'ts/DAOs';
import {getToken} from 'utils/managers/encrypted-storage';

export const getCategories = async () => {
  const accessToken = await getToken('accessToken');
  const rs = await api.get('/categories', undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return rs.data as Category[];
};
