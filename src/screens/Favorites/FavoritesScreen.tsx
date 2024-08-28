import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, View, StyleSheet, Text } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useGetFavoriteGamesQuery } from '../../core/store/api/auth.api';
import Loading from '../../components/ui/Loading/Loading';
import getFlagByCountry from '../../core/utils/countries/getFlagByCountry';
import { localizeReverseCountry } from '../../core/utils/countries/localizeCountries';
import ListItem from '../../components/ui/ListItem/ListItem';
import NotFound from '../../components/ui/NotFound/NotFound';
import theme from '../../core/config/theme';
import ListItem2 from '../../components/ui/ListItem2/ListItem2';
import calcGame from '../../core/utils/game/calcGame';
import DatePicker from '../../components/DatePicker/DatePicker';
import { FavoritesContext } from '../../provider/FavoritesProvider';
import moment from 'moment';
import isToday from '../../core/utils/date/isToday';
import { SvgXml } from 'react-native-svg';
import close from '../../components/ui/Icons/close'
import { NotifContext } from '../../provider/NotifProvider';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: HomeScreenProps) {

    const [date, setDate] = useState<Date | null>(null)

    const { favorites, isLoading } = useContext(FavoritesContext);

    const {notificatorsData} = useContext(NotifContext)
    
    const filtredFavorites = favorites?.filter(({ league, game }) => {
        if (!date) {
            return true
        }

        const checkTime = new Date(game.dateTime)


        return (date.getDate() === checkTime.getDate()) && (date.getMonth() === checkTime.getMonth()) && (date.getFullYear() === checkTime.getFullYear())
    })

    const [showGames, setShowGames] = useState<number>(15)

    const clearDate = () => {
        setDate(null)
        setShowGames(15)
    }

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 100) {
            setShowGames(prev => prev + 10)
        }
    };

    const day = date?.getDate()
    const month = date && ((date?.getMonth() + 1) < 10 ? `0${date?.getMonth() + 1}` : date?.getMonth() + 1)

    const weekDay = date && (isToday(date) ? "СЕГОДНЯ" : `${day}.${month}`)

    const titleDate = !date ? 'Все игры' : weekDay ? weekDay : ""

    return (
        <>
            <View style={styles.wrapper}>
                <View style={{...nestedStyles.datePicker, paddingLeft: date ? 50 : 0}}>
                    <DatePicker dateState={date} setDate={setDate} />
                    <Pressable onPress={clearDate} style={{ ...nestedStyles.datePickerBtn, opacity: date ? 1 : 0 }}>
                    <SvgXml
                    width="20px"
                    height="20px"
                    xml={close}
                />
                    </Pressable>
                </View>
                {!isLoading && <ListItem title={titleDate} style={{ backgroundColor: theme.desc }} />}
                <ScrollView
                    onScroll={handleScroll}
                >
                    {isLoading ? <Loading /> :
                        (filtredFavorites && filtredFavorites?.length > 0) ?
                            (!date ? filtredFavorites.slice(0, showGames) : filtredFavorites).map(({ league, game }) => {

                                const {
                                    counts,
                                    activeTime,
                                    renderedDate,
                                    showNotifs,
                                } = calcGame(game)

                                const leagueData = {
                                    title: league?.title,
                                    country: league?.country,
                                    url: league?.url
                                }

                                const notifKey = (game.teams[0].name + game.teams[1].name).replaceAll(" ", "").toUpperCase()

                                const notificators = notificatorsData?.filter(n => n.gameUrl.toUpperCase() === notifKey)

                                const notificatorsLeft = showNotifs ? notificators?.filter(n => n.leftTeam).length : 0
                                const notificatorsRight = showNotifs ? notificators?.filter(n => !n.leftTeam).length : 0

                                const titles = game.teams.map(team => team.name?.length > 20 ? team.name.slice(0,20) + "..." : team.name) as [string, string]

                                return (
                                    <View style={{ borderTopWidth: 2, borderColor: theme.desc }} key={game.teams.map(t => t.name).join("") + game.dateTime}>
                                        <ListItem
                                            title={league.title?.length > 30 ? league.title.slice(0,30) + "..." : league.title}
                                            imageUrl={getFlagByCountry(localizeReverseCountry(league.country))}
                                            style={{ borderBottomWidth: 1, paddingVertical: 0 }}
                                        />
                                        <ListItem2
                                            navigation={navigation}
                                            titles={titles}
                                            iconUrls={game.teams.map(team => team.iconUrl) as [string, string]}
                                            counts={counts}
                                            notifs={[notificatorsLeft || 0, notificatorsRight || 0]}
                                            descs={[activeTime, renderedDate]}
                                            routeType={'Game'}
                                            routeProps={{ league: leagueData, gameUrl: game.url, gameInfo: game }}
                                        />
                                    </View>
                                )
                            }) :
                            <NotFound title={'Пусто..'} desc={'Игр не найдено'} />}
                </ScrollView>
            </View>
            <Footer navigation={navigation} />
        </>
    );
}


const nestedStyles = StyleSheet.create({
    datePicker: {
        position: 'relative',
        overflow: 'visible',
    },
    datePickerBtn: {
        height: '100%',
        width: 50,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: theme.background,
        borderColor: theme.desc,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    }
})