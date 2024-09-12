import { View } from "react-native";
import { baseStyles } from "../../styles/base.styles";
import Footer from "../../components/ui/Footer/Footer";
import Header from "../../components/ui/Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import CurrencyList from "../../components/modules/CurrencyList/CurrencyList";
import { useState } from "react";
import Search from "../../components/ui/Search/Search";
import { valuteOrderByOptions } from "../../core/consts/valuteOrderByOptions";
import { useLang } from "../../core/hooks/useLang";

type CurrencyListScreenProps = NativeStackScreenProps<RootStackParamList, 'CurrencyList'>;

export default function CurrencyListScreen({ navigation }: CurrencyListScreenProps) {

    const [orderBy, setOrderBy] = useState<IValuteOrderBy>("rise_percent");
    const [orderDir, setOrderDir] = useState<IRequestOrderDir>("asc")

    const [searchInput, setSearchInput] = useState<string>("")

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    const LANG = useLang()

    const req: IValuteIndexRequest = {
        orderDir,
        orderBy
    }

    if (searchInput != "") {
        req.name = [searchInput]
    }

    return (
        <View style={baseStyles.wrapper}>
            <Header title={LANG.SCREENS.CURRENCY_LIST.HEADER} search={{
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
                <CurrencyList req={req} navigation={navigation} />
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}