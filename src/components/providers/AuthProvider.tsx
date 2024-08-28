import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation, CommonActions } from '@react-navigation/native';
import { useActions } from '../../core/hooks/useActions';

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

  const navigation: NavigationProp<ParamListBase> = useNavigation()

  const navigateTo = (screen: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen }],
      })
    );
  }

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
      if (token) {
        setAuthState(token)
        navigateTo("Home")
      }
      else {
        navigateTo("Login")
      }
    };

    checkAuth();
  }, []);


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (meData) {
  //       const subscriptionDate = new Date(meData.subData);
  //       const currentDate = new Date();

  //       if (subscriptionDate < currentDate) {
  //         setIsSubExist(false);

  //         if (checkSubInterval === 5000) {
  //           setCheckSubInterval(60000)
  //           navigateTo("OnlyInfos");
  //         }
  //         Alert.alert("Подписка истекла!", "Обратитесь по контактным данным для продления подписки")
  //         console.log("Sub: ERR!")
  //       } else {
  //         if (checkSubInterval === 60000) {
  //           setCheckSubInterval(5000)
  //           navigateTo("Home");
  //         }

  //         setIsSubExist(true);
  //         console.log("Sub: OK!")
  //       }
  //     }
  //   }, checkSubInterval);

  //   return () => clearInterval(intervalId);
  // }, [meData, checkSubInterval]);


  const authorization = async (token: string) => {
    await AsyncStorage.setItem('token', token);
    setAuthState(token)
  };

  const logout = async () => {
    await AsyncStorage.setItem('token', "");
    setAuthState(false)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, children, authorization, logout }}>
      {children}
    </AuthContext.Provider>
  );
};