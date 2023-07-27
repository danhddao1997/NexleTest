import api from './';
import {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from 'ts/interfaces';

const signIn = async (data: SignInPayload) => {
  const rs = await api.post('/auth/signin', data);
  if (rs.ok) {
    return rs.data as SignInResponse;
  } else {
    throw new Error(rs.originalError.message);
  }
};

const signUp = async (data: SignUpPayload) => {
  const rs = await api.post('/auth/signup', {
    ...data,
    firstName: 'Tester',
    lastName: 'Mr',
  });
  if (rs.ok) {
    return rs.data as SignUpResponse;
  } else {
    throw new Error(rs.originalError.message);
  }
};

export {signIn, signUp};
