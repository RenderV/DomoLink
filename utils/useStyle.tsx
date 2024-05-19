import { useColorScheme } from 'react-native';
import { ColorValue } from "react-native"
import React, {useContext} from 'react';

export type StyleContextType = {
    mode: "light" | "dark"
    color: ColorTheme
    setDarkMode: (dark: boolean) => void
}

export type ColorTheme = {
    background: ColorValue,
    primary: ColorValue,
    secondary: ColorValue,
    iconsPrimary: ColorValue,
    accent: ColorValue,
    textColor: ColorValue,
}

export const ColorLight: ColorTheme = {
    primary: '#1f1f24',
    secondary: '#32323b',
    accent: '#75009c',
    background: "white",
    iconsPrimary: "black",
    textColor: "black",
}

export const ColorBlack: ColorTheme = {
    primary: '#1f1f24',
    secondary: '#32323b',
    accent: '#75009c',
    background: "#171518",
    iconsPrimary: "white",
    textColor: "white",
}

const StyleContext = React.createContext<StyleContextType>({
    color: ColorBlack,
    mode: "light",
    setDarkMode: () => { }
})

export const StyleProvider = ({ children }: { children: React.ReactNode }) => {
    const sysMode = useColorScheme() === 'dark' ? true : false
    const [darkMode, setDarkMode] = React.useState(true)

    const color = darkMode ? ColorBlack : ColorLight
    const mode = darkMode ? "dark" : "light"

    return (
        <StyleContext.Provider value={{ color, setDarkMode, mode }}>
            {children}
        </StyleContext.Provider>
    )
}

export const useColor = () => {
    const context = useContext(StyleContext)
    if (!context) throw new Error('useColor must be used within a StyleProvider')

    return context.color
};

export const useTheme = () => {
    const context = useContext(StyleContext)
    if (!context) throw new Error('useColor must be used within a StyleProvider')

    return context
}

export default useColor