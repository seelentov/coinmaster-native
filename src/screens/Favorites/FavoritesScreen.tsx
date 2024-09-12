import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { ScrollView, View } from 'react-native';
import { baseStyles } from '../../styles/base.styles';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';
import CurrencyList from '../../components/modules/CurrencyList/CurrencyList';
import Search from '../../components/ui/Search/Search';
import { valuteOrderByOptions } from '../../core/consts/valuteOrderByOptions';
import { useState } from 'react';
import { useGetFavoritesQuery } from '../../core/store/api/favorite.api';
import Error from '../../components/ui/Error/Error';
import { useLang } from '../../core/hooks/useLang';

type FavoritesScreenProps = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {

    const LANG = useLang()

    const [orderBy, setOrderBy] = useState<IValuteOrderBy>("rise_percent");
    const [orderDir, setOrderDir] = useState<IRequestOrderDir>("asc")

    const [searchInput, setSearchInput] = useState<string>("")

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const { data: favorites } = useGetFavoritesQuery()

    const req: IValuteIndexRequest = {
        orderDir,
        orderBy,

        code: favorites?.map(fav => fav.valute.code)
    }

    if (searchInput != "") {
        req.name = [searchInput]
    }

    return (
        <View style={baseStyles.wrapper}>
            <Header title={LANG.SCREENS.FAVORITES.HEADER} search={{
                node:
                    <Search<IValuteOrderBy>
                        search={{
                            value: searchInput,
                            setState: setSearchInput
                        }}
                        orderDir={{
                            value: orderDir,
                            setState: setOrderDir
                        }}
                        orderBy={{
                            options: valuteOrderByOptions,
                            value: orderBy,
                            setState: setOrderBy
                        }}
                    />,
                searchIsOpen: isFilterOpen,
                setSearchIsOpen: setIsFilterOpen
            }} />
            <View style={baseStyles.scrollView}>
                {(req?.code && req?.code.length > 0)
                    ? <CurrencyList req={req} navigation={navigation} />
                    : <Error minimal />}
            </View>
            <Footer navigation={navigation} />
        </View>
    );
}
