import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { baseStyles } from '../../styles/base.styles';
import { useGetValuteQuery } from '../../core/store/api/valute.api';
import { useCallback, useState } from 'react';
import { convertDateToString } from '../../core/utils/date/convertDateToString';
import Loading from '../../components/ui/Loading/Loading';
import Error from '../../components/ui/Error/Error';
import { parseDateFromString } from '../../core/utils/date/parseDateFromString';
import { getDaysBetweenDates } from '../../core/utils/date/getDaysBetweenDates';
import theme from '../../core/config/theme';
import { useLang } from '../../core/hooks/useLang';
import { Graph } from '../../components/ui/Graph/Graph';
import { DatePicker } from '../../components/ui/DatePicker/DatePicker';
import NewsList from '../../components/modules/NewsList/NewsList';
import { Tabs } from '../../components/ui/Tabs/Tabs';
import { ValuteList } from '../../components/modules/ValuteList/ValuteList';
import { Chat } from '../../components/modules/Chat/Chat';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { useGetFavoritesQuery, useRemoveFavoriteMutation, useStoreFavoriteMutation } from '../../core/store/api/favorite.api';

type CurrencyScreenProps = NativeStackScreenProps<RootStackParamList, 'Currency'>;

interface ICurrencyScreenDates {
    start_date: string,
    end_date: string,
}


const { width } = Dimensions.get("window")

export default function CurrencyScreen({ navigation, route }: CurrencyScreenProps) {

    const { id } = route.params

    const LANG = useLang()

    const [dates, setDates] = useState<ICurrencyScreenDates>({
        start_date: convertDateToString(
            new Date(new Date().setDate(new Date().getDate() - 20))
        ),
        end_date: convertDateToString(new Date())
    })

    const [selected, setSelected] = useState<number>(0);

    const [storeFavorite, { isLoading: isLoadingSetFavorite }] = useStoreFavoriteMutation()
    const [removeFavorite, { isLoading: isLoadingRemoveFavorite }] = useRemoveFavoriteMutation()

    const { data: favorites, isLoading: isLoadingGetFavorite } = useGetFavoritesQuery()

    const isLoadingBtn = isLoadingSetFavorite || isLoadingRemoveFavorite || isLoadingGetFavorite



    const isFavorite = favorites?.some(fav => fav.identifier == id)

    const toggleFavorite = () => {
        if (!isLoadingBtn) {
            const favoriteId = favorites?.find(fav => fav.identifier == id)

            if (isFavorite && favoriteId) {
                removeFavorite(favoriteId?.id)
            } else {
                storeFavorite({
                    identifier: id
                })
            }
        }
    }



    const switchDate = (pos: 'start_date' | "end_date", date: Date) => {
        setDates(prev => { return { ...prev, [pos]: convertDateToString(date) } })
    }

    const onConfirmDatePicker = useCallback(
        ({ startDate, endDate }: { startDate: any, endDate: any }) => {
            const today = new Date();

            if (endDate > today || startDate > today) {
                Alert.alert(LANG.ALERT.ERR, LANG.SCREENS.CURRENCY.DATE_ERR_DATEPICKER)
                return false;
            }

            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));



            if (diffDays >= 7) {
                switchDate("start_date", startDate);
                switchDate("end_date", endDate);
                return true
            } else {
                Alert.alert(LANG.ALERT.ERR, LANG.SCREENS.CURRENCY.AT_LEAST_DATEPICKER)
            }

            return false

        },
        [switchDate]
    );

    const daysBetweenDates = getDaysBetweenDates(
        parseDateFromString(dates.start_date),
        parseDateFromString(dates.end_date)
    );

    const { data, isLoading, error } = useGetValuteQuery({
        id,
        body: dates
    });

    const preparedData = data?.data

    const values = preparedData?.positions.map(p => p.value)
    const labels = preparedData?.positions.map(p => p.date.slice(0, 5))

    const selectedpoint = preparedData?.positions[selected]

    const tabs = [
        {
            key: "changes",
            title: LANG.SCREENS.CURRENCY.TABS_CHANGES,
            component: preparedData && <ValuteList positions={preparedData?.positions} />
        },
        {
            key: "news",
            title: LANG.SCREENS.CURRENCY.TABS_NEWS,
            component: preparedData && <NewsList req={{ search: [preparedData?.name] }} navigation={navigation} />
        },
        {
            key: "chat",
            title: LANG.SCREENS.CURRENCY.TABS_COMMENTS,
            component: preparedData && <Chat identificator={preparedData?.code} />
        }
    ]

    if (isLoading) {
        return <Loading />
    }


    return (
        <View style={baseStyles.wrapper}>
            <Header title={preparedData?.name} desc={
                <View style={styles.favBtn}>
                    <Appbar.Action icon={isFavorite ? "star" : "star-outline"} onPress={() => toggleFavorite()} disabled={isLoadingBtn} size={30} />
                    {isLoadingBtn &&
                        <ActivityIndicator
                            style={styles.favBtnLoading}
                            animating={true}
                            color={"black"}
                            size={30} />}
                </View>
            } />
            <View style={baseStyles.scrollView}>
                {error ? <Error minimal /> :
                    (labels && values) &&
                    <>
                        <Graph
                            labels={labels}
                            values={values}
                            onDataPointClick={({ index }) => {
                                setSelected(index)
                            }}
                            width={values.length > 13 ? width * Number((daysBetweenDates / 13)) : width}
                            isActiveDot={({ index }) => selected == index}
                        />
                        {selectedpoint &&
                            <View style={styles.selectedPoint}>
                                <Text style={styles.selectedPointText}>{selectedpoint?.value.toFixed(3)} ₽</Text>
                                <Text style={{ ...styles.selectedPointText, color: selectedpoint.rise > 0 ? "green" : "red" }}>{selectedpoint?.rise.toFixed(6)} ({selectedpoint?.rise_percent.toFixed(6)} %)</Text>
                            </View>}
                    </>

                }
                <DatePicker
                    startDate={parseDateFromString(dates.start_date)}
                    endDate={parseDateFromString(dates.end_date)}
                    onConfirmDatePicker={onConfirmDatePicker}
                />
                <Tabs tabs={tabs} />
            </View>
            <Footer navigation={navigation} />
        </View >
    );
}


const styles = StyleSheet.create({
    selectedPoint: {
        padding: 10,
        backgroundColor: "#fff",
        borderTopColor: theme.desc,
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectedPointText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    favBtn: {
        position: 'relative'
    },
    favBtnLoading: {
        position: 'absolute',
        top: 15,
        left: 15
    }
});