import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { Alert, ScrollView, View } from 'react-native';
import { baseStyles } from '../../styles/base.styles';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';
import { Button, Headline } from 'react-native-paper';
import { useGetSettingsQuery, useSetSettingsMutation } from '../../core/store/api/settings.api';
import Loading from '../../components/ui/Loading/Loading';
import Error from '../../components/ui/Error/Error';
import { useEffect, useState } from 'react';
import { langOptions } from '../../core/consts/langOptions';
import { Dropdown } from 'react-native-paper-dropdown';
import SwitchWithLabel from '../../components/ui/SwitchWithLabel/SwitchWithLabel';
import stringConvertUTCtoLocal from '../../core/utils/time/stringConvertUTCtoLocal';
import stringConvertLocaltoUTC from '../../core/utils/time/stringConvertLocaltoUTC';
import TimeInput from '../../components/ui/TimeInput/TimeInput';
import { useLang } from '../../core/hooks/useLang';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {

    const LANG = useLang()

    const { data, isLoading: isLoadingUseGetSettingsQuery, error } = useGetSettingsQuery();
    const [setSettingsMutation, { isLoading: isLoadingSetSettingsMutation }] = useSetSettingsMutation()

    const isLoading = isLoadingSetSettingsMutation || isLoadingUseGetSettingsQuery

    const [settings, setSettings] = useState<ISettingsBase>({
        notif_time: "10:00:00",
        notif_active: false,
        lang: "ru"
    })

    useEffect(() => {
        if (!data) {
            return
        }

        setSettings({ ...data, notif_time: stringConvertUTCtoLocal(data.notif_time) })
    }, [data])

    const setSetting = (
        key: keyof ISettingsBase,
        value: ISettingsBase[keyof ISettingsBase]
    ) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    }

    if (isLoading) {
        return <Loading />
    }

    const handleSave = () => {
        setSettingsMutation({ ...settings, notif_time: stringConvertLocaltoUTC(settings.notif_time) })
            .then(() => Alert.alert(LANG.ALERT.OK, LANG.ALERT.SAVE))
            .catch((ex) => {
                Alert.alert(LANG.ALERT.ERR, LANG.ALERT.ERR_SAVE)
                console.log(ex)
            })
    }

    return (
        <View style={baseStyles.wrapper}>
            <Header title={LANG.SCREENS.SETTINGS.HEADER} />
            <ScrollView style={baseStyles.scrollView}>
                {error ? <Error minimal /> :
                    <>
                        <View style={baseStyles.container}>
                            <Headline style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                {LANG.SCREENS.SETTINGS.HEADER_MAIN}
                            </Headline>
                            <Dropdown
                                label={LANG.SCREENS.SETTINGS.LANGUAGE}
                                options={langOptions}
                                value={settings?.lang}
                                onSelect={(value?: string | undefined) => setSetting("lang", value as ISettingsLang)}
                                disabled={isLoading}
                            />
                        </View>
                        <View style={baseStyles.container}>
                            <Headline style={{ marginBottom: 20, marginHorizontal: 10 }}>
                                {LANG.SCREENS.SETTINGS.HEADER_NOTIFICATIONS}
                            </Headline>
                            <SwitchWithLabel
                                value={settings?.notif_active}
                                label={LANG.SCREENS.SETTINGS.NOTIFICATIONS_TOGGLE}
                                onChange={(value: boolean) => setSetting("notif_active", value as boolean)}
                                disabled={isLoading}
                            />
                            <TimeInput
                                label={LANG.SCREENS.SETTINGS.NOTIFICATIONS_TIME}
                                value={settings?.notif_time}
                                onChange={(value?: string | undefined) => setSetting("notif_time", value as string)}
                                disabled={isLoading || !settings?.notif_active}
                            />
                        </View>
                    </>}
            </ScrollView>
            <Button mode="contained"
                style={{ marginTop: 30 }}
                onPress={handleSave}
                disabled={isLoading}
                loading={isLoading}
            >
                Сохранить
            </Button>
            <Footer navigation={navigation} />
        </View>
    );
}
