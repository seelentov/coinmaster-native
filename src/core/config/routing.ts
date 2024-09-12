import { RootStackParamList } from '../../Router'

type RouterPage = {
    name: keyof RootStackParamList
    icon: string
}

const routing: RouterPage[] = [
    {
        'name': "Main",
        'icon': "home"
    },

    {
        'name': "CurrencyList",
        'icon': "currency-rub"
    },
    {
        'name': "NewsList",
        'icon': "newspaper"
    },
    {
        'name': "Profile",
        'icon': "account"
    },
    {
        'name': "Favorites",
        'icon': "playlist-star"
    },
    {
        'name': "Settings",
        'icon': "application-braces"
    },
]

export default routing;