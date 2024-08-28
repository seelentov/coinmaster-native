import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { View } from "react-native";
import Footer from "../../components/ui/Footer/Footer";
import { baseStyles } from "../../styles/base.styles";


type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({ navigation }: MainScreenProps) {


    return (
        <>

            <View style={baseStyles.wrapper}>

            </View>
            <Footer navigation={navigation} />
        </>
    );
}