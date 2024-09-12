import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation, CommonActions } from '@react-navigation/native';
import { useActions } from '../../core/hooks/useActions';
import { useStoreBy } from '../../core/hooks/useStoreBy';
import { AuthStore } from '../../core/store/auth/auth.store';
import { useGetMeQuery, useLoginMutation, useLogoutMutation, useRefreshMutation } from '../../core/store/api/auth.api';

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  children: null,
  authorization: async (token: string) => { },
  logout: async () => { }
});

interface AuthContextProps {
  isAuthenticated: boolean;
  authorization: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  children: ReactNode;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { setToken } = useActions()
  const { token } = useStoreBy<AuthStore>("auth")
  const [refresh] = useRefreshMutation()
  const [logoutMutation] = useLogoutMutation()
  const { data: meData } = useGetMeQuery()

  const navigation: NavigationProp<ParamListBase> = useNavigation()

  const navigateTo = (screen: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen }],
      })
    );
  }

  useEffect(() => {
    const timeoutId = setInterval(() => {
      refresh().then((res) => {
        if (res?.data?.access_token) {
          authorization(res?.data?.access_token)
          console.log(res?.data?.access_token)
        }
      })

    }, 1 * 60 * 1000);

    return () => clearInterval(timeoutId);
  }, []);

  const setAuthState = (token: string | false) => {
    if (!token) {
      setToken("")
      setIsAuthenticated(false);
    }
    else {
      setToken(token)
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token') || "";
      if (meData && token) {
        setAuthState(token)
      }
      else {
        navigateTo("Auth")
      }
    };

    checkAuth();
  }, [token, meData]);

  const authorization = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    setAuthState(token)

  };

  const logout = async () => {
    await AsyncStorage.setItem('token', "");
    await logoutMutation()
    setAuthState(false)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, children, authorization, logout }}>
      {children}
    </AuthContext.Provider>
  );
};