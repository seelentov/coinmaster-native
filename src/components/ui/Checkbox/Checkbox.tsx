import { View, Text, Pressable, Switch } from "react-native";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { styles } from "./Checkbox.stylesheet";
import theme from "../../../core/config/theme";

type ICheckboxProps = {
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
    text: string
}

export default function Checkbox({ check, setCheck, text }: ICheckboxProps) {
    return (
        <Pressable onPress={() => setCheck(check)} style={styles.main}>
            <Switch
                trackColor={{ false: '#767577', true: theme.desc }}
                thumbColor={check ? theme.color : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setCheck}
                value={check}
            />
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}