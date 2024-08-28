import { View, Text, Pressable, TextInput } from "react-native";
import { PropsWithChildren } from "react";
import { styles } from "./Input.stylesheet";

export default function Input({ value, setValue, ...rest }: any) {

    return (
        <TextInput {...rest} style={{...styles.main, ...rest.style}} value={value} onChangeText={setValue} />
    );
}