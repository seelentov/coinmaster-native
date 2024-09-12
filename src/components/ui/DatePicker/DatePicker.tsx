import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../../../core/config/theme";
import { DatePickerModal } from 'react-native-paper-dates';
import { convertDateToString } from "../../../core/utils/date/convertDateToString";
import { useLang } from "../../../core/hooks/useLang";

type IOnConfirmDatePickerProps = {
    startDate: any;
    endDate: any;
}

interface IDatePickerProps {
    startDate: Date,
    endDate: Date,
    onConfirmDatePicker: ({ }: IOnConfirmDatePickerProps) => boolean
}

export function DatePicker({ startDate, endDate, onConfirmDatePicker }: IDatePickerProps) {

    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

    const onDismissDatePicker = useCallback(() => {
        setDatePickerOpen(false);
    }, [setDatePickerOpen]);

    const onConfirmDatePickerWrap = ({ startDate, endDate }: IOnConfirmDatePickerProps): void => {
        if (onConfirmDatePicker({ startDate, endDate })) {
            setDatePickerOpen(false)
        }
    }

    const LANG = useLang()

    return <>
        <DatePickerModal
            locale="en"
            mode="range"
            visible={datePickerOpen}
            onDismiss={onDismissDatePicker}
            startDate={startDate}
            endDate={endDate}
            onConfirm={onConfirmDatePickerWrap}
            inputEnabled={false}
        />
        <Pressable onPress={() => setDatePickerOpen(true)}>
            <View style={styles.dates}>
                <Text style={styles.datesText}>{convertDateToString(startDate)} - {convertDateToString(endDate)}</Text>
                <Text style={styles.datesTextMini}>{LANG.COMPONENTS.UI.DATEPICKER.PICK_TIME}</Text>
            </View>
        </Pressable>
    </>

}

const styles = StyleSheet.create({
    dates: {
        padding: 10,
        backgroundColor: "#fff",
        borderColor: theme.desc,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    datesText: {
        fontSize: 18,
        fontWeight: "bold",

    },
    datesTextMini: {
        fontSize: 12,
    }
})