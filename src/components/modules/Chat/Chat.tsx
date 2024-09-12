import { useState } from "react"
import { useGetChatQuery, useRemoveMessageMutation, useThrowMessageMutation } from "../../../core/store/api/chat.api"
import Error from "../../ui/Error/Error"
import Loading from "../../ui/Loading/Loading"
import { FlatList, StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native"
import { localeStringDate } from "../../../core/utils/date/localeStringDate"
import { TextInput } from "react-native-paper"
import { BASE_URL } from "../../../core/store/api/api"
import { useLang } from "../../../core/hooks/useLang"

interface IChatProps {
    identificator: string,
    req?: IChatShowRequest
}

export function Chat({ identificator, req }: IChatProps) {

    const LANG = useLang()

    const [text, setText] = useState<string>("")

    const [pageSize, setPageSize] = useState<number>(10)

    const { data, isLoading, error } = useGetChatQuery({ identificator, body: { ...req, page_size: pageSize } }, { pollingInterval: 5000 })

    const [throwMessage] = useThrowMessageMutation();

    const messages = data?.messages || []

    const loadMore = () => {
        setPageSize(prevSize => prevSize + 10);
    }

    if (isLoading) {
        return <Loading minimal />
    }

    if (error) {
        return <Error minimal />
    }

    const handleSubmit = () => {
        if (!data) {
            return
        }

        throwMessage({ id: data?.id, body: { text } })
            .then((res) => {
                console.log(res)
                setText("")
            })
            .catch((er: Error) => Alert.alert(LANG.ALERT.ERR, er.toString()))
    }
    return (
        <View style={styles.container}>
            <TextInput placeholder={LANG.COMPONENTS.MODULES.CHAT.INPUT_PLACEHOLDER}
                style={styles.input}
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleSubmit} />

            {messages.length > 0 ? <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Image
                            source={{ uri: BASE_URL + item.user.avatar_url }}
                            style={styles.userAvatar}
                        />
                        <View style={styles.messageContent}>
                            <Text style={styles.userName}>{item.user.name}</Text>
                            <Text style={styles.messageText}>{item.text}</Text>
                            <Text style={styles.messageDate}>{item.created_at}</Text>
                        </View>
                    </View>
                )}
            /> :
                <View style={styles.empty}>
                    <Text>{LANG.COMPONENTS.MODULES.CHAT.EMPTY_LIST}</Text>
                </View>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    input: {

    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    messageContent: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        marginBottom: 5,
    },
    messageDate: {
        color: '#888',
    },
    empty: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
});