import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Router';
import { View } from 'react-native';
import { baseStyles } from '../../styles/base.styles';
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';

type NewsScreenProps = NativeStackScreenProps<RootStackParamList, 'News'>;

export default function NewsScreen({ navigation, route }: NewsScreenProps) {

    const { link, name } = route.params

    return (
        <View style={baseStyles.wrapper}>
            <Header title={name} />
            <WebView
                style={baseStyles.scrollView}
                source={{ uri: link }}
                renderLoading={() =>
                    <View style={baseStyles.center}>
                        <ActivityIndicator animating={true} color={Colors.blue500} size="large" />
                    </View>}
            />
            <Footer navigation={navigation} />

        </View>
    );
}