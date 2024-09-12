import { NativeModules, Platform, SafeAreaView, Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/core/store/store';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/Router';
import { AuthProvider } from './src/components/providers/AuthProvider';
import { NotifProvider } from './src/components/providers/NotifProvider';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import theme from './src/core/config/theme';
import { useState } from 'react';

const { StatusBarManager } = NativeModules;

export default function App() {

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingTop: Platform.OS !== 'android' ? StatusBarManager.HEIGHT : 0,
        }}>
          <NavigationContainer>
            <NotifProvider>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </NotifProvider>
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}
