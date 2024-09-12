import { useState, useEffect, useRef, PropsWithChildren, createContext } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useStoreBy } from '../../core/hooks/useStoreBy';
import { AuthStore } from '../../core/store/auth/auth.store';
import { useUpdateExpoMutation } from '../../core/store/api/auth.api';
import { useGetNotificationsQuery } from '../../core/store/api/notifications.api';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export const NotifContext = createContext<NotifContextProps>({
  expoPushToken: "",
  notifications: undefined,
  isLoadingNotif: false
});

interface NotifContextProps {
  expoPushToken: string,
  notifications: INotification[] | undefined,
  isLoadingNotif: boolean
}

export const NotifProvider = ({ children }: PropsWithChildren) => {

  const { data: notifications, isLoading: isLoadingNotif } = useGetNotificationsQuery(undefined, {
    pollingInterval: 5000
  })


  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const { token } = useStoreBy<AuthStore>("auth")
  const [updateExpoToken] = useUpdateExpoMutation()

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => {
        handleRegistrationError(`${error}`)
        setExpoPushToken(`${error}`)
      });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   const data = response.notification.request.content.data as { league: any, gameUrl: string, gameInfo: any }

    //   console.log(data)
    // });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  useEffect(() => {
    updateExpoToken(expoPushToken)
  }, [token, expoPushToken])

  return (
    <NotifContext.Provider value={{ expoPushToken, notifications, isLoadingNotif }}>
      {children}
    </NotifContext.Provider>
  );
};