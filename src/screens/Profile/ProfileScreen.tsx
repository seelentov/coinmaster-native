import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { useContext } from 'react';
import { AuthContext } from '../../components/providers/AuthProvider';
import { Avatar, Button, Paragraph, Text, Title } from 'react-native-paper';
import { useGetMeQuery } from '../../core/store/api/auth.api';
import Loading from '../../components/ui/Loading/Loading';
import Error from '../../components/ui/Error/Error';
import { ScrollView, StyleSheet, View } from 'react-native';
import { baseStyles } from '../../styles/base.styles';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';
import { BASE_URL } from '../../core/store/api/api';
import { useLang } from '../../core/hooks/useLang';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {

    const { logout } = useContext(AuthContext)
    const { data, isLoading, error } = useGetMeQuery()

    if (isLoading) {
        return <Loading />
    }

    const LANG = useLang()

    return (
        <View style={baseStyles.wrapper}>
            <Header title={LANG.SCREENS.PROFILE.HEADER} />
            <ScrollView style={baseStyles.scrollView}>
                {error ? <Error minimal /> :
                    <View style={styles.header}>
                        <Avatar.Image size={128} source={{ uri: BASE_URL as string + data?.avatar_url as string }} />
                        <View>
                            <Title>{data?.name}</Title>
                            <Text>{data?.phone}</Text>
                            <Text>{data?.email}</Text>
                        </View>
                    </View>
                }
                <Button mode="contained" onPress={() => logout()}>
                    {LANG.SCREENS.PROFILE.LOGOUT_BUTTON}
                </Button>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})