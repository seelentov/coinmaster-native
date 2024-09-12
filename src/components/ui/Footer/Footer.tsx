import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Router";
import { Pressable, StyleSheet, View } from "react-native";
import { baseStyles } from "../../../styles/base.styles";
import { IconButton, MD3Colors } from "react-native-paper";
import routing from "../../../core/config/routing";
import { useRoute } from "@react-navigation/native";

interface IFooterProps {
    navigation: NativeStackNavigationProp<RootStackParamList, any, undefined>
}

export default function Footer({ navigation }: IFooterProps) {

    const actialRoute = useRoute();

    return (
        <View style={baseStyles.footer}>
            {routing.map(route => {
                const active = route.name === actialRoute.name
                return <IconButton
                    icon={route.icon}
                    iconColor={"black"}
                    size={30}
                    disabled={active}
                    onPress={() => navigation.navigate(route.name as any)}
                />
            })}


        </View>
    )
}


const styles = StyleSheet.create({

})