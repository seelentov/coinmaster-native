import { Dimensions, StyleSheet, Text, View } from "react-native";
import theme from "../../../core/config/theme";

export function ValuteListItem({ item }: { item: IPosition }) {
    const riseColor = item.rise > 0 ? styles.itemRise :
        item.rise < 0 ? styles.itemFall : styles.itemStab

    const value = item.value.toFixed(4)

    return <View style={styles.item}>
        <Text style={styles.itemValue}>
            {value} ₽
        </Text>
        <Text style={riseColor}>
            {item.rise.toFixed(4)} ({item.rise_percent.toFixed(4)}%)
        </Text>
        <Text style={styles.itemDate}>
            {item.date.replaceAll("/", '.')}
        </Text>
    </View>
}

const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 20,
        paddingVertical: 3,
        backgroundColor: "#fff",
        width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: theme.desc,
        borderBottomWidth: 1
    },

    itemValue: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemDate: {
        fontSize: 16,
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
    }
});