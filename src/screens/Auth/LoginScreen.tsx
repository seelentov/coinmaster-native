import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, View, Text, Alert } from 'react-native';
import { RootStackParamList } from '../../Router';
import { styles } from '../../styles/styles';
import { useContext, useEffect, useState } from 'react';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import Header from '../../components/ui/Header/Header';
import Br from '../../components/ui/Br/Br';
import { AuthContext } from '../../provider/AuthProvider';
import { useLoginMutation, useUpdateNotifMutation } from '../../core/store/api/auth.api';
import Loading from '../../components/ui/Loading/Loading';
import { useGetContactsQuery } from '../../core/store/api/info.api';
import { NotifContext } from '../../provider/NotifProvider';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {

    const [login, setLogin] = useState<string>('')
    const [password, setPass] = useState<string>('')
    const [loginMutation, { isLoading: isLoadingLogin }] = useLoginMutation()

    const defaultErrors = {
        name: undefined,
        password: undefined,
        authorization: undefined
    }

    const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(defaultErrors);

    const setError = (key: string, value: string[]) => {
        setErrors(prev => { return { ...prev, [key]: value } })
    }

    const { isAuthenticated, authorization, isLoadingAuth } = useContext(AuthContext);
    

    const isLoading = isLoadingLogin || isLoadingAuth

    useEffect(() => {
        if (isAuthenticated) {
            navigation.popToTop()
            navigation.replace('Home')
        }
    }, [isAuthenticated])

    const tryLogin = async () => {
        setErrors(defaultErrors);
        loginMutation({
            login,
            password
        })
            .then((response: any) => {
                console.log(response)
                if (response.error) {
                    const errors = response.error.data.errors as { [key: string]: string[] };
                    Object.entries(errors).forEach((error) => {
                        setError(error[0], error[1])
                    })
                } else if (response?.data?.token){
                    const token = response.data.token || "" as string
                    authorization(token)
                } else {
                    Alert.alert("Error", JSON.stringify(response))
                }
            })
            .catch(console.log)
    }

    return (
        <>
            <View style={styles.wrapperFull}>
                {isLoading && <Loading />}
                {!isLoading &&
                    <>
                        <Header>Вход</Header>
                        <Input
                            value={login}
                            setValue={setLogin}
                            placeholder="Логин"
                        />
                        {errors.Login && <Text style={{ color: 'red' }}>{errors.Login[0]}</Text>}
                        <Br />
                        <Input
                            value={password}
                            setValue={setPass}
                            placeholder="Пароль"
                            secureTextEntry={true}
                        />
                        {errors.Password && <Text style={{ color: 'red' }}>{errors.Password[0]}</Text>}
                        <Br />
                        <Button onPress={() => tryLogin()}>Вход</Button>
                        {errors.authorization && <Text style={{ color: 'red' }}>{errors.authorization[0]}</Text>}
                        <Br />
                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text>Нет аккаунта? Регистрация</Text>
                        </Pressable>
                    </>
                }
            </View>
        </>
    );
}
