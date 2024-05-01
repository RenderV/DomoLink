import { useColorScheme } from 'react-native';
import { ColorValue } from "react-native"

export type ColorTheme = {
    background: ColorValue,
    primary: ColorValue,
    iconsPrimary: ColorValue,
    accent: ColorValue
}

export const ColorLight: ColorTheme = {
    background: "white",
    primary: '#00ff69',
    accent: '#00ff69',
    iconsPrimary: "black",
    // iconsPrimary: "#00ff7c",
}

export const ColorBlack : ColorTheme = {
    primary: '#1f1f24',
    accent: '#75009c',
    background: "#171518",
    iconsPrimary: "white",
    // iconsPrimary: "#00ff7c",
}

const useTheme = () => {
    const colorScheme = useColorScheme();
    
    // return colorScheme === 'dark' ? ColorBlack : ColorLight
    return ColorBlack
};

export default useTheme