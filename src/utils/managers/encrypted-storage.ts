import EncryptedStorage from 'react-native-encrypted-storage';

export const storeTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  await EncryptedStorage.setItem('accessToken', accessToken);
  await EncryptedStorage.setItem('refreshToken', refreshToken);
};

export const getToken = async (key: 'accessToken' | 'refreshToken') => {
  return await EncryptedStorage.getItem(key);
};

export const removeTokens = async () => {
  await EncryptedStorage.clear();
};
