import { Dimensions, FlatList, StyleSheet, Text, View, Pressable } from "react-native"
import theme from "../../../core/config/theme";
import { useGetNewsQuery } from "../../../core/store/api/news.api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Router";
import Loading from "../../ui/Loading/Loading";
import Error from "../../ui/Error/Error";
import { useEffect, useState } from "react";
import { useGetValuteQuery } from "../../../core/store/api/valute.api";
import { convertDateToString } from "../../../core/utils/date/convertDateToString";
import { ValuteListItem } from "./ValiteListItem";

export interface IValuteListQueriableProps {
    id: string,
    req: IValuteShowRequest
}

export default function ValuteListQueriable({ id, req }: IValuteListQueriableProps) {

    const [dateDecrementer, setDateDecrementer] = useState<number>(10)

    const { data, isLoading, error, refetch } = useGetValuteQuery({
        id,
        body: {
            end_date: convertDateToString(new Date()),
            start_date: convertDateToString(
                new Date(new Date().setDate(new Date().getDate() - dateDecrementer))
            ),
            ...req,
        }
    })

    let preparedData = data?.data?.positions.slice().reverse();

    const loadMore = () => {
        setDateDecrementer(prev => prev + 10);
    }

    useEffect(() => {
        refetch();
    }, [dateDecrementer, refetch]);

    if (isLoading) {
        return <Loading minimal />
    }

    if (error) {
        return <Error minimal />
    }

    return (
        <>
            {preparedData && <FlatList
                data={preparedData}
                keyExtractor={(item) => item.date}
                renderItem={({ item }: { item: IPosition }) => {
                    return <ValuteListItem item={item} />
                }}
                onEndReached={(req.start_date && req.end_date) ? loadMore : null}
                onEndReachedThreshold={0.5}
            />}
        </>

    )
}


