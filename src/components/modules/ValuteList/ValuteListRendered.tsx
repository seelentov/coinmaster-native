import { Dimensions, FlatList, StyleSheet, Text, View, Pressable } from "react-native"
import { ValuteListItem } from "./ValiteListItem";

export interface IValuteListRenderedProps {
    positions: IPosition[],
}

export default function ValuteListRendered({ positions }: IValuteListRenderedProps) {

    let preparedData = positions.slice().reverse();

    return (

        <FlatList
            data={preparedData}
            keyExtractor={(item) => item.date}
            renderItem={({ item }: { item: IPosition }) => {
                return <ValuteListItem item={item} />
            }}
        />
    )
}


