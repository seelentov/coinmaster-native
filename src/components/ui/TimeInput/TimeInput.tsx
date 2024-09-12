import { useState } from "react";
import { Alert } from "react-native";
import { TextInput } from "react-native-paper"
import { useLang } from "../../../core/hooks/useLang";

interface ITimeInputProps {
    value: string,
    onChange: (((value: string) => Promise<void> | void) & Function)
    disabled?: boolean
    label?: string
}

export default function TimeInput({ value, onChange, disabled = false, label = "" }: ITimeInputProps) {

    const LANG = useLang()

    const check = () => {
        const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
        if (timePattern.test(value)) {
            onChange(value);
        } else {
            Alert.alert(LANG.ALERT.ERR, LANG.COMPONENTS.UI.TIME_INPUT.WRONG_FORMAT);
            onChange('23:59:59');
        }
    }


    const handleChange = (input: string) => {

        const inputEraseDots = input.replaceAll(":", "")

        let result = [];

        for (let i = 0; i < inputEraseDots.length; i += 2) {
            result.push(inputEraseDots.slice(i, i + 2));
        }
        onChange(result.join(":"))
    }

    return (
        <TextInput
            label={label}
            value={value}
            onBlur={() => check()}
            onChangeText={handleChange}
            keyboardType="numeric"
            disabled={disabled}
        />
    )
}