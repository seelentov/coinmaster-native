import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import theme from './core/config/theme';
import AuthScreen from './screens/Auth/AuthScreen';
import MainScreen from './screens/Main/MainScreen';
import NewsScreen from './screens/News/NewsScreen';
import CurrencyScreen from './screens/Currency/CurrencyScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import CurrencyListScreen from './screens/CurrencyList/CurrencyList';
import NewsListScreen from './screens/NewsList/NewsList';
import SettingsScreen from './screens/Settings/SettingsScreen';
import FavoritesScreen from './screens/Favorites/FavoritesScreen';

export type RootStackParamList = {
    Main: undefined;
    Auth: undefined;
    Profile: undefined;
    News: {
        link: string,
        name: string
    }
    Currency: {
        id: string
    }
    CurrencyList: undefined
    NewsList: undefined
    Settings: undefined
    Favorites: undefined
};

const defaultOptions = {
    title: 'Coinmaster',
    headerShown: false,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
    return (

        <>
            <Stack.Navigator>
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="News"
                    component={NewsScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="NewsList"
                    component={NewsListScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Currency"
                    component={CurrencyScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="CurrencyList"
                    component={CurrencyListScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={defaultOptions}
                />
                <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
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
