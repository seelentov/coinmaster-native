import { Text } from "react-native-paper"
import { baseStyles } from "../../../styles/base.styles"
import { StyleSheet, View } from "react-native"


interface IErrorProps {
    text: string
    minimal?: boolean
}

export default function Error({ text, minimal = false }: IErrorProps) {
    return (
        <View style={!minimal && baseStyles.center}>
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    }
})