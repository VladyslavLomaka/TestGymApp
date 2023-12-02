import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import {Provider} from 'react-redux';
import {configuredStore} from '@store/configureStore';
import {RootRouter} from '@navigation/Router';
import {ToastMessage} from '@components/ToastMessage';

enableFreeze();

export function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={configuredStore.store}>
        <RootRouter />
        <ToastMessage />
      </Provider>
    </SafeAreaProvider>
  );
}
