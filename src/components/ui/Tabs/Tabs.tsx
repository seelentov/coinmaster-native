import { ReactNode, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface ITabProps {
    key: string,
    title: string,
    component: ReactNode
}

interface ITabsProps {
    tabs: ITabProps[]
    activeTab?: number
}

export const Tabs = ({ tabs, activeTab = 0 }: ITabsProps) => {
    const [index, setIndex] = useState<number>(activeTab);

    return (
        <>
            <ScrollView horizontal style={styles.tabsContainer}>
                {tabs.map((tab, btnIndex) => {
                    return <Button disabled={btnIndex == index} mode="contained" style={styles.tabsBtn} onPress={() => setIndex(btnIndex)}>{tab.title}</Button>
                })}
            </ScrollView>
            {tabs[index].component}
        </>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        fontSize: 20,
        flexShrink: 0,
        maxHeight: 50
    },
    bodyContainer: {
    },
    tabsBtn: {
        marginHorizontal: 5,
        height: 40
    }
})