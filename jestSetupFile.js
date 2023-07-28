import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-encrypted-storage', () => {
  return {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve('{ "foo": 1 }')),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: props => props.children,
}));

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// temporarily suppress warning
jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());

// react-hook-form
global.window = {};
global.window = global;

jest.mock('./src/api/post', () => {
  return {
    signUp: jest.fn(({email, password}) => Promise.resolve()),
    signIn: jest.fn(({email, password}) => Promise.resolve()),
  };
});
