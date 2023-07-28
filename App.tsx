import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from '@navigation/index';
import {StatusBar} from 'react-native';
import LoadingModal from 'components/LoadingModal';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'rtk/slices';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={'light-content'}
            translucent
            backgroundColor={'transparent'}
          />
          <AppNavigation />
          <LoadingModal />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
