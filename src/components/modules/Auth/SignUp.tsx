import { Alert, View } from 'react-native';
import { useState } from 'react';
import {
    Button,
    Headline,
    TextInput,
    HelperText,
} from 'react-native-paper';
import { useRegisterMutation } from '../../../core/store/api/auth.api';
import { baseStyles } from '../../../styles/base.styles';
import { IAuthModuleProps } from './AuthModuleProps';
import { useLang } from '../../../core/hooks/useLang';

export default function SignUp({ setPage }: IAuthModuleProps) {

    const [phone, setPhone] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPass] = useState<string>('')
    const [passwordVerify, setPassVerify] = useState<string>('')

    const LANG = useLang();

    const [registerMutation, { isLoading }] = useRegisterMutation()

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

    const tryLogin = async () => {
        setErrors(defaultErrors);

        if (passwordVerify != password) {
            setError("password", [LANG.COMPONENTS.MODULES.AUTH.ERRORS.BAD_CONFIRM_PASSWORD]);
            return
        }

        registerMutation({
            phone,
            name,
            email,
            password
        })
            .then((response: any) => {
                console.log(response)
                if (response.error) {
                    const errors = response.error.data.errors as { [key: string]: string[] };
                    Object.entries(errors).forEach((error) => {
                        setError(error[0], error[1])
                    })
                } else if (response.data.authorization) {
                    Alert.alert(LANG.ALERT.OK, response.data.authorization)
                    setPage("Login");
                } else {
                    Alert.alert(LANG.ALERT.ERR, JSON.stringify(response))
                }
            })
            .catch(console.log)
    }

    return (
        <View style={baseStyles.center}>
            <Headline style={{ alignSelf: 'center', marginBottom: 20 }}>
                {LANG.COMPONENTS.MODULES.AUTH.SIGNUP.HEADER}
            </Headline>
            <TextInput
                label={LANG.COMPONENTS.MODULES.AUTH.PLACEHOLDERS.NAME}
                value={name}
                onChangeText={setName}
            />
            {errors.name && (<HelperText type="error">{errors.name[0]}</HelperText>)}
            <TextInput
                label={LANG.COMPONENTS.MODULES.AUTH.PLACEHOLDERS.PHONE}
                value={phone}
                onChangeText={setPhone}
                keyboardType="number-pad"
            />
            {errors.phone && (<HelperText type="error">{errors.phone[0]}</HelperText>)}
            <TextInput
                label={LANG.COMPONENTS.MODULES.AUTH.PLACEHOLDERS.EMAIL}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            {errors.email && (<HelperText type="error">{errors.email[0]}</HelperText>)}
            <TextInput
                label={LANG.COMPONENTS.MODULES.AUTH.PLACEHOLDERS.PASSWORD}
                value={password}
                onChangeText={setPass}
                secureTextEntry={true}
            />
            {errors.password && (<HelperText type="error">{errors.password[0]}</HelperText>)}
            <TextInput
                label={LANG.COMPONENTS.MODULES.AUTH.PLACEHOLDERS.PASSWORD_CONFIRM}
                value={passwordVerify}
                onChangeText={setPassVerify}
                secureTextEntry={true}
            />
            <Button mode="contained"
                style={{ marginTop: 30 }}
                onPress={() => tryLogin()}
                disabled={isLoading}
                loading={isLoading}
            >
                {LANG.COMPONENTS.MODULES.AUTH.SIGNUP.BUTTON}
            </Button>
            <Button mode="text"
                onPress={() => setPage('Login')}
                disabled={isLoading}
            >
                {LANG.COMPONENTS.MODULES.AUTH.SIGNUP.SETPAGE}
            </Button>
        </View>
    )
}
