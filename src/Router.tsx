import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import theme from './core/config/theme';
import MainScreen from './screens/Main/MainScreen';

export type RootStackParamList = {
    Main: undefined;
    Profile: undefined;
    Settings: undefined;
    Favorites: undefined;
    Login: undefined;
    SignUp: undefined;
    Currency: {
        currency_id: number,
        exchange_id?: number
    },
    Exchange: {
        currency_id?: number,
        exchange_id: number
    },
    News: {
        currency_id?: number,
    },
};

const defaultOptions = {
    title: 'Cardscore',
    headerShown: false,

}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
    return (

        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={defaultOptions}
                />
            </Stack.Navigator>
            <StatusBar
                animated={false}
                backgroundColor={theme.text}
            />
        </>
    );
}
