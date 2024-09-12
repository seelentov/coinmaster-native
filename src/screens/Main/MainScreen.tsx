import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { Headline } from 'react-native-paper';
import CurrencySwiper from '../../components/modules/CurrencySwiper/CurrencySwiper';
import { ScrollView, View } from 'react-native';
import { baseStyles } from '../../styles/base.styles';
import { useLang } from '../../core/hooks/useLang';
import NewsSwiper from '../../components/modules/NewsSwiper/NewsSwiper';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';
import { useGetFavoritesQuery } from '../../core/store/api/favorite.api';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({ navigation }: MainScreenProps) {

    const LANG = useLang();

    const { data: favoritesData } = useGetFavoritesQuery();

    const searchNews = favoritesData ? favoritesData.map((fav) => fav.valute.name) : [LANG.SCREENS.MAIN.SEARCH_DEFAULT_NEWS]

    return (
        <View style={baseStyles.wrapper}>
            <Header title={LANG.SCREENS.MAIN.HEADER} showBack={false} />
            <ScrollView style={baseStyles.scrollView}>
                <View style={baseStyles.container}>
                    <Headline style={{ marginBottom: 20, marginHorizontal: 10 }}>
                        {LANG.SCREENS.MAIN.HEADER_TOP_RISE}
                    </Headline>
                    <CurrencySwiper
                        navigation={navigation}
                        req={{ orderBy: 'rise_percent', orderDir: 'desc' }}
                        options={{ hideNegative: true }} />
                </View>
                <View style={baseStyles.container}>
                    <Headline style={{ marginBottom: 20, marginHorizontal: 10 }}>
                        {LANG.SCREENS.MAIN.HEADER_TOP_FALL}
                    </Headline>
                    <CurrencySwiper
                        navigation={navigation}
                        req={{ orderBy: 'rise_percent', orderDir: 'asc' }}
                        options={{ hidePositive: true }} />
                </View>
                <View style={baseStyles.container}>
                    <Headline style={{ marginBottom: 20, marginHorizontal: 10 }}>
                        {favoritesData ? LANG.SCREENS.MAIN.HEADER_NEWS_FOR_YOU : LANG.SCREENS.MAIN.HEADER_NEWS}
                    </Headline>
                    <NewsSwiper
                        navigation={navigation}
                        req={{
                            search: searchNews,
                            page_size: 10
                        }} />
                </View>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}
