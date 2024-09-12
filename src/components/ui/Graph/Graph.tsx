import { Dispatch, SetStateAction } from "react";
import { Dimensions, ScrollView, StyleProp, Text, View, ViewStyle } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";

interface IGraphProps {
    labels: string[],
    values: number[],
    onDataPointClick?: ((data: { index: number; value: number; dataset: Dataset; x: number; y: number; getColor: (opacity: number) => string; }) => void) | undefined,
    width?: number,
    isActiveDot?: ({ x, y, index, indexData }: { x: number, y: number, index: number, indexData: number }) => boolean
    activeStyles?: StyleProp<ViewStyle>
}

export function Graph({ labels, values, onDataPointClick, activeStyles = {}, isActiveDot, width = Dimensions.get("window").width }: IGraphProps) {
    return <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} style={{ flexShrink: 0, flexGrow: 0 }}>
        <LineChart
            data={{
                labels: labels,
                datasets: [{ data: values }]
            }}
            width={width}
            height={220}
            yAxisSuffix="₽"
            yAxisInterval={1}
            chartConfig={{
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

            }}
            renderDotContent={({ x, y, index, indexData }) => {
                return <View style={{
                    borderRadius: 20,
                    backgroundColor: isActiveDot ? (isActiveDot({ x, y, index, indexData }) ? "black" : 'white') : "black",
                    width: 5,
                    height: 5,
                    position: 'absolute',
                    top: y - 2.5,
                    left: x - 2.5
                }}>
                </View>
            }}
            bezier
            onDataPointClick={onDataPointClick}

        />
    </ScrollView>
}