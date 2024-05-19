import { ColorTheme } from "../../utils/useStyle"
import { StyleSheet } from "react-native"
import useColor from "../../utils/useStyle";
import { useState } from "react";
import { Pressable } from "react-native";
import { LoadingIcon } from "./loadingIcon";

enum ButtonState {
    on = "on",
    off = "off",
    loading = "loading"
}

type BoolActionProps = {
    icon: (state: boolean) => JSX.Element,
    handleStateChange: (newState: boolean) => Promise<boolean>,
    initialState?: boolean
}

export default function SwitchActionButton({ handleStateChange, icon, initialState }: BoolActionProps) {

    const color = useColor()
    const style = makeStyles(color)

    const [buttonState, setButtonState] = useState<ButtonState>(initialState ? ButtonState.on : ButtonState.off)
    const [actionState, setActionState] = useState<boolean>(false)

    const handlePress = async () => {
        setButtonState(ButtonState.loading)
        const newState = await handleStateChange(!actionState)
        setActionState(newState)
        setButtonState(() => newState ? ButtonState.on : ButtonState.off )
    }

    return (
        <Pressable style={style.action} onPress={() => handlePress()}>
            { buttonState!==ButtonState.loading && icon(actionState) }
            { buttonState===ButtonState.loading && <LoadingIcon/>}
        </Pressable>
    )
}

const makeStyles = (color: ColorTheme) => {
    return StyleSheet.create({
        action: {
            backgroundColor: color.modeSecondary,
            borderRadius: 20,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
}