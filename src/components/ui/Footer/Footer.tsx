import { Pressable, View, Text } from "react-native";
import { styles } from "./Footer.stylesheet";
import { SvgXml } from "react-native-svg";
import { useRoute } from "@react-navigation/native";
import routing from "../../../core/config/routing";
type IHeaderProps = {
    navigation: any
}


export default function Footer({ navigation }: IHeaderProps) {

    const actualRoute = useRoute();

    return (
        <View style={styles.main}>
            <View style={styles.list}>
                {routing.map((route, key) => {
                    const opacity = route.name === actualRoute.name ? 1 : 0.5
                    return (<Pressable key={key} style={{ ...styles.item, opacity }} onPress={() => navigation.navigate(route.name)}>
                        <SvgXml xml={route.icon} width="30" height="30" />
                    </Pressable>)
                })}

            </View>
        </View>
    );
}