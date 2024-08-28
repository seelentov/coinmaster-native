import home from '../../components/ui/Icons/home'
import profile from '../../components/ui/Icons/profile'
import settings from '../../components/ui/Icons/settings'
import favorites from '../../components/ui/Icons/favorites'
import info from '../../components/ui/Icons/info'
import { RootStackParamList } from '../../Router'

type RouterPage = {
    name: keyof RootStackParamList
    icon: string
    title: string
}

const routing: RouterPage[] =  [
    {
        'name': "Home",
        'title': "Все игры",
        'icon': home
    },
    {
        'name': "Favorites",
        'title': "Избранное",
        'icon': favorites
    },
    {
        'name': "Profile",
        'title': "Профиль",
        'icon': profile
    },
    {
        'name': "Settings",
        'title': "Настройки",
        'icon': settings
    },
    {
        'name': "Infos",
        'title': "Инфо",
        'icon': info
    }
]

export default routing;