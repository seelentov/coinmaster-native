import { useNavigation, useRoute } from "@react-navigation/native";
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useState } from "react"
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { baseStyles } from "../../../styles/base.styles";

interface IHeaderProps {
    title?: string
    showBack?: boolean
    search?: {
        node: ReactNode,
        searchIsOpen: boolean,
        setSearchIsOpen: Dispatch<SetStateAction<boolean>>
    }
    desc?: ReactNode
}


export default function Header({ search, desc = "", title = "", showBack = true }: IHeaderProps) {

    const navigation = useNavigation()

    const goBack = () => navigation.goBack();

    return (
        <Appbar.Header style={baseStyles.header}>
            {((search && !search.searchIsOpen) || (!search)) &&
                <>
                    {showBack ?
                        <Appbar.BackAction onPress={goBack} /> :
                        <View style={{ marginRight: 30 }}></View>}
                    <Appbar.Content title={title} />
                    {search && <Appbar.Action icon="magnify" onPress={() => search.setSearchIsOpen(true)} />}
                </>}
            {(search && search.searchIsOpen) &&
                <View>
                    {search.node}
                </View>}
            {desc}
        </Appbar.Header>
    )
}