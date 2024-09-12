import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { useGetValutesQuery } from "../../../core/store/api/valute.api"
import { SwiperFlatList } from "react-native-swiper-flatlist";
import theme from "../../../core/config/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Router";
import Error from "../../ui/Error/Error";
import Loading from "../../ui/Loading/Loading";

interface ICurrencySwiperProps {
    req: IValuteIndexRequest,
    options?: {
        hidePositive?: boolean,
        hideNegative?: boolean,
    },
    navigation: NativeStackNavigationProp<RootStackParamList, any, undefined>
}

export default function CurrencySwiper({ req, options, navigation }: ICurrencySwiperProps) {
    const { data, isLoading, error } = useGetValutesQuery(req)

    let preparedData = data?.data;

    if (options?.hidePositive) {
        preparedData = preparedData?.filter(currency => currency.rise_percent < 0)
    }

    if (options?.hideNegative) {
        preparedData = preparedData?.filter(currency => currency.rise_percent > 0)
    }

    if (isLoading) {
        return <Loading minimal />
    }

    if (error) {
        return <Error minimal />
    }

    const openPage = (id: string) => {
        navigation.navigate('Currency', { id })
    }

    return (
        <View>
            <SwiperFlatList
                autoplay
                autoplayDelay={3}
                autoplayLoop
                autoplayLoopKeepAnimation
                data={preparedData}
                renderItem={({ item }: { item: IValutePreview }) => {

                    const nameLimit = 30

                    const name = item.name.length < nameLimit ? item.name : item.name.slice(0, nameLimit) + "..."
                    const value = item.value.toFixed(2)
                    const riseColor = item.rise > 0 ? styles.itemRise :
                        item.rise < 0 ? styles.itemFall : styles.itemStab
                    return (
                        <Pressable onPress={() => openPage(item.code)}>
                            <View style={styles.swiperItem}>
                                <Text style={styles.itemName}>{name}</Text>
                                <Text style={styles.itemCode}>{item.char_code}</Text>
                                <Text style={styles.itemValue}>
                                    {value} ₽
                                </Text>
                                <Text style={riseColor}>
                                    {item.rise} ({item.rise_percent}%)
                                </Text>
                                <View style={styles.itemBG}>
                                    <Text style={styles.itemBGText}>{item.char_code}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    swiperItem: {
        padding: 20,
        backgroundColor: "#fff",
        height: 150,
        width,
        borderColor: theme.desc,
        borderWidth: 1,
        borderRadius: 30,
        position: 'relative',
        overflow: 'hidden'
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    itemCode: {
        fontSize: 16,
    },
    itemValue: {
        fontSize: 24,
        fontWeight: "bold",
    },
    itemRise: {
        fontSize: 16,
        color: "green",
    },
    itemFall: {
        fontSize: 16,
        color: "red",
    },
    itemStab: {
        fontSize: 16,
    },
    itemBG: {
        position: 'absolute',
        right: -40,
    },
    itemBGText: {
        fontSize: 120,
        color: theme.desc
    }
});