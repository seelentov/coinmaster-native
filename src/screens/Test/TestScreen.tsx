import { NavigationScreenProps } from '../../Router';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { baseStyles } from '../../styles/base.styles';
import useBLE from '@hooks//useBLE';
import { useEffect, useState } from 'react';
import { Appbar, Button, Text } from 'react-native-paper';
import Loading from '@components/ui/Loading/Loading';
import * as Clipboard from 'expo-clipboard';
import Header from '@components/ui/Header/Header';

type TestScreenProps = NavigationScreenProps<"Test">;

export default function TestScreen({ navigation }: TestScreenProps) {

    const {
        allDevices,
        scanForPeripherals,
        requestPermissions
    } = useBLE("", "")

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(JSON.stringify(allDevices, null, 2));
    };

    useEffect(() => {
        scanForDevices().catch(e => Alert.alert("scanForDevices__ERR", JSON.stringify(e)))
    }, [])

    useEffect(() => {
        console.log(allDevices)
    }, [allDevices])

    const scanForDevices = async () => {
        setIsLoading(true)
        try {

            const isPermissionsEnabled = await requestPermissions();

            Alert.alert("isPermissionsEnabled" + isPermissionsEnabled ? "true" : "false")

            if (isPermissionsEnabled) {
                scanForPeripherals()
            }

        }
        catch (e) {
            Alert.alert("scanForDevices__ERR", JSON.stringify(e))
        }
        setIsLoading(false)
    };

    return (
        <View style={baseStyles.wrapper}>
            <Header title={'Тестирование связи'} navigation={navigation} additional={isLoading && <Appbar.Action icon="loading" loading={isLoading} />} />
            <ScrollView style={baseStyles.scrollView}>
                {isLoading && <Loading minimal />}
                <Text>{JSON.stringify(allDevices, null, 2)}</Text>
            </ScrollView>isLoading
            <View style={{ ...baseStyles.footer, flexDirection: "row" }}>
                <Button mode="contained" onPress={() => scanForDevices()}>
                    Обновить
                </Button>
                <Button mode="contained" onPress={() => copyToClipboard()}>
                    Копировать
                </Button>
            </View>
        </View>
    );
}