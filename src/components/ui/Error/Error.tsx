import { useLang } from "../../../core/hooks/useLang"
import { baseStyles } from "../../../styles/base.styles"
import { StyleSheet, Text, View } from "react-native"


export default function Error({ minimal = false }: { minimal?: boolean }) {
    const LANG = useLang()

    return (
        <View style={!minimal && baseStyles.center}>
            <View style={styles.container}>
                <Text style={styles.text}>{LANG.COMPONENTS.UI.ERROR.TITLE}</Text>
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