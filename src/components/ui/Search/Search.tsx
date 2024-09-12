import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { Dropdown, Option } from 'react-native-paper-dropdown';
import { useQueryHelpQuery } from '../../../core/store/api/queryHelper.api';
import theme from '../../../core/config/theme';
import { useLang } from '../../../core/hooks/useLang';

interface ISelectProps<T> {
    orderBy?: {
        options: Option[],
        value: T,
        setState: Dispatch<SetStateAction<T>>
    },
    orderDir?: {
        value: IRequestOrderDir,
        setState: Dispatch<SetStateAction<IRequestOrderDir>>
    }
    search: {
        value: string,
        setState: Dispatch<SetStateAction<string>>
    }
}

export default function Search<T>({ orderBy, orderDir, search }: ISelectProps<T>) {

    const LANG = useLang()

    const toggleOrderDir = () => {
        if (orderDir) {
            orderDir.setState(prev => prev == "asc" ? 'desc' : 'asc')
        }
    }

    const handleChangeText = (text: SetStateAction<string>) => {
        search.setState(text)
    }

    return (
        <View style={styles.search}>
            {orderBy && <Dropdown
                CustomDropdownInput={() =>
                    <IconButton
                        icon={"filter"}
                        iconColor={"black"}
                        size={30}
                    />}
                CustomMenuHeader={() => <View></View>}
                options={orderBy.options}
                value={orderBy.value as string}
                onSelect={(value?: string | undefined) => value && orderBy.setState(value as T)}
            />}
            {orderDir && <IconButton
                icon={orderDir.value == "asc" ? "order-numeric-ascending" : "order-numeric-descending"}
                iconColor={"black"}
                size={30}
                onPress={() => toggleOrderDir()}
            />}
            <View style={styles.searchInputBox}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={LANG.COMPONENTS.UI.SEARCH.INPUT_PLACEHOLDER}
                    value={search.value}
                    onChangeText={handleChangeText}
                />
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    search: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    searchInput: {
        width: '100%',
        maxHeight: 50
    },
    searchInputBox: {
        width: '100%',
        position: 'relative'
    },
    queryHelp: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        borderColor: theme.desc,
        borderWidth: 1
    },
    queryHelpItem: {
        padding: 5,
        zIndex: 100
    }
})