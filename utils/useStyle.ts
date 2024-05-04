import { useColorScheme } from 'react-native';
import { ColorValue } from "react-native"

export type ColorTheme = {
    background: ColorValue,
    primary: ColorValue,
    secondary: ColorValue,
    iconsPrimary: ColorValue,
    accent: ColorValue,
    textColor: ColorValue,
}

export const ColorLight: ColorTheme = {
    primary: '#00ff69',
    secondary: '#1f1f24',
    accent: '#00ff69',
    background: "white",
    iconsPrimary: "black",
    textColor: "black",
    // iconsPrimary: "#00ff7c",
}

export const ColorBlack : ColorTheme = {
    primary: '#1f1f24',
    secondary: '#32323b',
    accent: '#75009c',
    background: "#171518",
    iconsPrimary: "white",
    textColor: "white",
    // iconsPrimary: "#00ff7c",
}

const useTheme = () => {
    const colorScheme = useColorScheme();
    
    // return colorScheme === 'dark' ? ColorBlack : ColorLight
    return ColorBlack
};

export default useTheme