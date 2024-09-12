import { Dimensions, FlatList, StyleSheet, Text, View, Pressable } from "react-native"
import theme from "../../../core/config/theme";
import { useGetNewsQuery } from "../../../core/store/api/news.api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Router";
import Loading from "../../ui/Loading/Loading";
import Error from "../../ui/Error/Error";
import { useEffect, useState } from "react";

interface INewsListProps {
    req: INewsIndexRequest,
    navigation: NativeStackNavigationProp<RootStackParamList, any, undefined>
    defaultPageSize?: number
}

export default function NewsList({ req, navigation, defaultPageSize = 10 }: INewsListProps) {

    const [pageSize, setPageSize] = useState<number>(defaultPageSize)

    const { data, isLoading, error, refetch } = useGetNewsQuery({ ...req, page_size: pageSize })

    let preparedData = data?.data;

    const openNews = (link: string, name: string) => {
        navigation.navigate('News', { link, name })
    }

    const loadMoreNews = () => {
        setPageSize(prevSize => prevSize + 5);
    }

    useEffect(() => {
        refetch();
    }, [pageSize, refetch]);

    if (isLoading) {
        return <Loading minimal />
    }

    if (error) {
        return <Error minimal />
    }

    return (

        <FlatList
            data={preparedData}
            keyExtractor={(item) => item.title + item.link}
            renderItem={({ item }: { item: INews }) => (
                <Pressable onPress={() => openNews(item.link, item.title)}>
                    <View style={styles.newsItem}>
                        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.itemDescription} numberOfLines={4}>{item.description}</Text>
                        <Text style={styles.itemDate}>{item.date}</Text>
                    </View>
                </Pressable>
            )}
            onEndReached={loadMoreNews}
            onEndReachedThreshold={0.5}
        />
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    newsItem: {
        padding: 20,
        backgroundColor: "#fff",
        height: 180,
        width,
        borderColor: theme.desc,
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 10,
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