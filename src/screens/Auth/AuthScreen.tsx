import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from 'react';
import { RootStackParamList } from '../../Router';
import { AuthContext } from '@components/providers/AuthProvider';
import Login from '@components/modules/Auth/Login';
import SignUp from '@components/modules/Auth/SignUp';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: AuthScreenProps) {

    const [page, setPage] = useState<"SignUp" | "Login">("Login")

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.popToTop()
            navigation.replace('Main')
        }
    }, [isAuthenticated])

    return (
        <>
            {page == "Login" ?
                <Login setPage={setPage} /> :
                <SignUp setPage={setPage} />}
        </>

    );
}
