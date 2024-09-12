import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";

interface ISwitchWithLabelProps {
    value: boolean,
    onChange: (((value: boolean) => Promise<void> | void) & Function) | undefined,
    label?: string,
    disabled?: boolean
}

export default function SwitchWithLabel({ value, onChange, disabled = false, label }: ISwitchWithLabelProps) {

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text>{label}</Text>
                <Switch
                    style={styles.switch}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    switchContainer: {
        padding: 5,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    switch: {
        marginLeft: 10
    }
})