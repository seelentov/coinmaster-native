import { NativeModules, Platform, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/core/store/store';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/Router';
import { AuthProvider } from './src/components/providers/AuthProvider';
import { NotifProvider } from './src/components/providers/NotifProvider';

const { StatusBarManager } = NativeModules;

export default function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
