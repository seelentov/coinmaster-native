import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { useState } from "react";
import NewsList from "../../components/modules/NewsList/NewsList";
import { View } from "react-native";
import { baseStyles } from "../../styles/base.styles";
import Header from "../../components/ui/Header/Header";
import Footer from "../../components/ui/Footer/Footer";
import { useGetFavoritesQuery } from "../../core/store/api/favorite.api";
import { useLang } from "../../core/hooks/useLang";

type NewsListScreenProps = NativeStackScreenProps<RootStackParamList, 'NewsList'>;


export default function NewsListScreen({ navigation }: NewsListScreenProps) {

    const LANG = useLang()

    const { data: favoritesData } = useGetFavoritesQuery();

    const searchNews = favoritesData?.map((fav) => fav.valute.name)

    return (
        <View style={baseStyles.wrapper}>
            <Header title={LANG.SCREENS.NEWS.HEADER} />
            <View style={baseStyles.scrollView}>
                {searchNews && <NewsList defaultPageSize={30} req={{ search: searchNews }} navigation={navigation} />}
            </View>
            <Footer navigation={navigation} />
        </View>
    )

}