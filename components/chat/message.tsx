import { StyleSheet, Text, View, ViewStyle } from "react-native"
import useTheme, { ColorTheme } from "../../utils/useStyle";
import { Ionicons } from '@expo/vector-icons';

type messageProps = {
    style?: ViewStyle
    children?: string | JSX.Element
    origin?: "user" | "other"
}

export default function Message({ children, style, origin="other" }: messageProps) {
    const colors = useTheme();
    const styles = makeStyles(colors);

    let originStyle = origin === "user" ? styles.userMessage : styles.otherMessage;

    return (
        <View style={[styles.messageContainer, originStyle, style]}>
            {typeof children === 'string' && <Text style={styles.content}>
                {children}
             </Text>}
            {typeof children !== 'string' && 
            <View style={styles.content}>
                {children}
            </View>
            }
        </View>
    )
}

const makeStyles = (colorscheme: ColorTheme) => {
    return StyleSheet.create({
        messageContainer: {
            borderRadius: 25,
            // width: "97%",
            maxWidth: "97%",
            // height: 80, 
            minHeight: 40,
            maxHeight: 300,
            height: 'auto',
            margin: 10,
            justifyContent: 'center',
        },
        userMessage: {
            backgroundColor: colorscheme.accent,
            borderTopRightRadius: 0,
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
        },
        otherMessage: {
            backgroundColor: colorscheme.secondary,
            borderTopLeftRadius: 0,
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
        },
        content: {
            color: colorscheme.textColor,
            margin: 20,
        }
    })
}