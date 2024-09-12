import { View, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { Button, Headline, HelperText, TextInput } from 'react-native-paper';
import { useLoginMutation } from '../../../core/store/api/auth.api';
import { AuthContext } from '../../providers/AuthProvider';
import { IAuthModuleProps } from './AuthModuleProps';
import { useLang } from '../../../core/hooks/useLang';
import { baseStyles } from '../../../styles/base.styles';

export default function Login({ setPage }: IAuthModuleProps) {

    const [phone, setPhone] = useState<string>('1')
    const [password, setPass] = useState<string>('password')
    const [loginMutation, { isLoading }] = useLoginMutation()

    const defaultErrors = {
        phone: undefined,
        password: undefined,
        message: undefined
    }

    const LANG = useLang();

    const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(defaultErrors);

    const setError = (key: string, value: string[]) => {
        setErrors(prev => { return { ...prev, [key]: value } })
    }

    const { authorization } = useContext(AuthContext);

    const tryLogin = async () => {
        setErrors(defaultErrors);
        loginMutation({
            phone,
            password
        })
            .then((response: any) => {
                console.log(response)
                if (response?.error?.data) {
                    setError("message", [response.error.data.authorization])
                }
                else if (response?.data?.access_token) {
                    const token = response?.data?.access_token
                    authorization(token)
                }
            })
            .catch(console.log)
    }

    return (
        <View style={baseStyles.center}>
            <Headline style={{ alignSelf: 'center', marginBottom: 20 }}>
                {LANG.COMPONENTS.MODULES.AUTH.LOGIN.HEADER}
            </Headline>
            <TextInput
                label={LANG.COMPONENTS.MODULES.AUTH.PLACEHOLDERS.PHONE}
                value={phone}
                onChangeText={setPhone}
            />
            {errors.phone && (<HelperText type="error">{errors.phone[0]}</HelperText>)}
            <TextInput
                label={LANG.COMPONENTS.MODULES.AUTH.PLACEHOLDERS.PASSWORD}
                value={password}
                onChangeText={setPass}
                secureTextEntry={true}
            />
            {errors.password && (<HelperText type="error">{errors.password[0]}</HelperText>)}
            <Button mode="contained"
                style={{ marginTop: 30 }}
                onPress={() => tryLogin()}
                disabled={isLoading}
                loading={isLoading}
            >
                {LANG.COMPONENTS.MODULES.AUTH.LOGIN.BUTTON}
            </Button>
            {errors.message && (<HelperText type="error">{errors.message[0]}</HelperText>)}

            <Button mode="text"
                onPress={() => setPage('SignUp')}
                disabled={isLoading}
            >
                {LANG.COMPONENTS.MODULES.AUTH.LOGIN.SETPAGE}
            </Button>
        </View>
    );
}
