import { View, Text, Pressable } from "react-native";
import { PropsWithChildren } from "react";
import { styles } from "./Button.stylesheet";
import theme from "../../../core/config/theme";

type IButtonProps = {
    onPress(): void
    color?: string
} & PropsWithChildren

export default function Button({ onPress, children, color }: IButtonProps) {



    return (
        <Pressable onPress={onPress}>
            <View style={{...styles.main, backgroundColor: color || theme.color}}>
                <Text style={styles.text}>
                    {children}
                </Text>
            </View>
        </Pressable>
    );
}