import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, View, Text, Alert } from 'react-native';
import { RootStackParamList } from '../../Router';
import { styles } from '../../styles/styles';
import { useContext, useEffect, useState } from 'react';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import Header from '../../components/ui/Header/Header';
import Br from '../../components/ui/Br/Br';
import { AuthContext } from '../../provider/AuthProvider';
import { useSignUpMutation, useUpdateNotifMutation } from '../../core/store/api/auth.api';
import * as Application from 'expo-application';
import Loading from '../../components/ui/Loading/Loading';
import { NotifContext } from '../../provider/NotifProvider';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: LoginScreenProps) {

    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPass] = useState<string>('')
    const [passwordRepeat, setPasswordRepeat] = useState<string>('')

    const [signUpMutation, { isLoading }] = useSignUpMutation()

    const defaultErrors = {
        name: undefined,
        phone: undefined,
        email: undefined,
        password: undefined,
        authorization: undefined
    }

    const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(defaultErrors);

    const setError = (key: string, value: string[]) => {
        setErrors(prev => { return { ...prev, [key]: value } })
    }

    const { isAuthenticated, authorization } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.popToTop()
            navigation.replace('Home')
        }
    }, [isAuthenticated])
    
    const trySignUp = async () => {
        const uniqueId = Application.getAndroidId();

        setErrors(defaultErrors);

        if (password !== passwordRepeat) {
            setError("authorization", ["Пароль и подтверждение пароля отличаются"]);
            return
        }

        signUpMutation({
            name,
            phone,
            email,
            password,
            uniqueId
        })
            .then((response: any) => {
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
                {!isLoading && <>
                    <Header>Регистрация</Header>
                    <Input
                        value={name}
                        setValue={setName}
                        placeholder="Логин"
                    />
                    {errors.Name && <Text style={{ color: 'red' }}>{errors.Name[0]}</Text>}
                    <Br />
                    <Input
                        value={phone}
                        setValue={setPhone}
                        placeholder="Номер телефона"
                        inputMode={'numeric'}
                    />
                    {errors.Phone && <Text style={{ color: 'red' }}>{errors.Phone[0]}</Text>}
                    <Br />
                    <Input
                        value={email}
                        setValue={setEmail}
                        placeholder="E-mail"
                    />
                    {errors.Email && <Text style={{ color: 'red' }}>{errors.Email[0]}</Text>}
                    <Br />
                    <Input
                        value={password}
                        setValue={setPass}
                        placeholder="Пароль"
                        secureTextEntry={true}
                    />
                    {errors.Password && <Text style={{ color: 'red' }}>{errors.Password[0]}</Text>}
                    <Br />
                    <Input
                        value={passwordRepeat}
                        setValue={setPasswordRepeat}
                        placeholder="Повторите пароль"
                        secureTextEntry={true}
                    />
                    <Br />
                    <Button onPress={() => trySignUp()}>Регистрация</Button>
                    {errors.authorization && <Text style={{ color: 'red' }}>{errors.authorization[0]}</Text>}
                    <Br />
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text>Есть аккаунт? Войти</Text>
                    </Pressable>
                </>}
            </View>
        </>
    );
}
