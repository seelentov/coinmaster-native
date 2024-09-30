import { NavigationScreenProps } from '../../Router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { baseStyles } from '../../styles/base.styles';
import Header from '../../components/ui/Header/Header';
import { useEffect, useState } from 'react';
import { Appbar, Button, Divider, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import theme from '@config/theme';

type StandScreenProps = NavigationScreenProps<"Stand">;

export default function StandScreen({ navigation, route }: StandScreenProps) {

    const stand = route.params;

    const [intervalRange, setIntervalRange] = useState<number>(2)
    const [speedRange, setSpeedRange] = useState<number>(0)

    const [intervalState, setIntervalState] = useState<number>(-1)



    useEffect(() => {
        const interval = setInterval(() => {
            setIntervalState(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval);
    }, [])

    const handleSendCommand = (command: number, attribute: number = 0) => {
        const commandString = `${stand.deviceid}${command}${attribute}3e7f6c`

        attribute = command === 5 ? attribute - 2 : attribute

        if (command === 5) {
            setIntervalState(attribute + 2)
        }

        if (command === 6) {
            setIntervalState(0)
        }
    }

    return (
        <View style={baseStyles.wrapper}>
            <Header title={stand.name} navigation={navigation} additional={<Appbar.Action color={'red'} icon="stop-circle" onPress={() => handleSendCommand(7)} />} />
            <ScrollView style={baseStyles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.text}>Моторы выброса</Text>
                    <View style={styles.row}>
                        <Button mode="contained" onPress={() => handleSendCommand(2)}>
                            Запустить
                        </Button>
                        <Button mode="contained" onPress={() => handleSendCommand(4)}>
                            Остановить
                        </Button>
                    </View>
                </View>
                <Divider />
                <View style={styles.container}>
                    <Text style={styles.text}>Скорость: {speedRange}</Text>
                    <Slider
                        style={{ height: 40 }}
                        minimumValue={0}
                        maximumValue={7}
                        minimumTrackTintColor={theme.colors.primary}
                        maximumTrackTintColor="#000000"
                        thumbTintColor={theme.colors.primary}
                        onValueChange={setSpeedRange}
                        value={speedRange}
                        step={1}
                    />
                    <Button mode="contained" onPress={() => handleSendCommand(1, speedRange)}>
                        Установить скорость
                    </Button>
                </View>
                <Divider />
                <View style={styles.container}>
                    {intervalState < 0 ?
                        <>
                            <Text style={styles.text}>Запуск с интервалом: {intervalRange} сек</Text>
                            <Slider
                                style={{ height: 40 }}
                                minimumValue={2}
                                maximumValue={10}
                                minimumTrackTintColor={theme.colors.primary}
                                maximumTrackTintColor="#000000"
                                thumbTintColor={theme.colors.primary}
                                onValueChange={setIntervalRange}
                                value={intervalRange}
                                step={1}
                            />
                            <Button mode="contained" onPress={() => handleSendCommand(5, intervalRange)}>
                                Запустить
                            </Button>
                        </>
                        : intervalState === 0 ?
                            <Text style={styles.text}>Запуск!</Text>
                            : <>
                                <Text style={styles.text}>Запуск через: {intervalState} сек</Text>
                                <Button mode="contained" onPress={() => handleSendCommand(6)}>
                                    Остановить интервал
                                </Button>
                            </>}

                </View>
                <Divider />
                <View style={styles.container}>
                    <Button mode="contained" onPress={() => handleSendCommand(3)}>
                        Одиночный выброс
                    </Button>
                </View>
                <Divider />
                <View style={styles.container}>
                    <Button mode="contained" onPress={() => handleSendCommand(8)}>
                        Светодиод
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center'
    }
})