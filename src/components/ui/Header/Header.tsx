import { View, Image } from "react-native";
import { styles } from "./Header.stylesheet";
import { ReactNode } from "react";
import { SvgUri } from 'react-native-svg'
import { useGetNotificationsQuery } from "../../../core/store/api/notification.api";
import { baseStyles } from "../../../styles/base.styles";
type IHeaderProps = {
    navigation: any,
    children: ReactNode
}


export default function Header({ navigation, children }: IHeaderProps) {

    const { data: notificationsData } = useGetNotificationsQuery();

    const isNew = notificationsData?.data && notificationsData.data.some(n => n.is_new)

    return (
        <View style={styles.main}>
            <View style={styles.left}>
                <Image
                    style={styles.profilePic}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>
            <View style={styles.children}>
                {children}
            </View>
            <View style={styles.right}>
                <SvgUri
                    width="100%"
                    height="100%"
                    uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
                    style={styles.rightIcon}
                />
                {isNew &&
                    <View style={{ ...styles.point, ...baseStyles.point }}></View>
                }
            </View>
        </View >
    );
}