import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native"
import { useGetValutesQuery } from "../../../core/store/api/valute.api"
import { SwiperFlatList } from "react-native-swiper-flatlist";
import theme from "../../../core/config/theme";
import { useGetNewsQuery } from "../../../core/store/api/news.api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Router";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Loading from "../../ui/Loading/Loading";
import Error from "../../ui/Error/Error";

interface INewsSwiperProps {
    req: INewsIndexRequest,
    navigation: NativeStackNavigationProp<RootStackParamList, any, undefined>
}

export default function NewsSwiper({ req, navigation }: INewsSwiperProps) {
    const { data, isLoading, error } = useGetNewsQuery(req)

    let preparedData = data?.data;

    const openNews = (link: string, name: string) => {
        navigation.navigate('News', { link, name })
    }


    if (isLoading) {
        return <Loading minimal />
    }

    if (error) {
        return <Error minimal />
    }

    return (
        <>
            {preparedData && <View style={styles.container}>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={3}
                    data={preparedData}
                    autoplayLoop
                    autoplayLoopKeepAnimation
                    renderItem={({ item }: { item: INews }) => {
                        return (
                            <Pressable onPress={() => openNews(item.link, item.title)}>
                                <View style={styles.swiperItem}>
                                    <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                                    <Text style={styles.itemDescription} numberOfLines={4}>{item.description}</Text>
                                    <Text style={styles.itemDate}>{item.date}</Text>
                                </View>
                            </Pressable>
                        )
                    }}
                />
            </View>}
        </>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    swiperItem: {
        padding: 20,
        backgroundColor: "#fff",
        height: 180,
        width,
        borderColor: theme.desc,
        borderWidth: 1,
        borderRadius: 30,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    itemDescription: {
        fontSize: 16,
    },
    itemDate: {
        marginTop: 'auto',
        fontSize: 10,
    }
});