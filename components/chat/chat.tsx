import { View, Text, TextInput, TouchableOpacity, ViewStyle, FlatList, GestureResponderEvent, NativeSyntheticEvent, TextInputTextInputEventData } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import useTheme from '../../utils/useStyle';
import { StyleSheet } from 'react-native';
import { ColorTheme } from '../../utils/useStyle';
import { Ionicons } from '@expo/vector-icons';
import Message from './message';
import { EventHandler, useRef, useState } from 'react';

export type MessageData = {
    origin: "user" | "other",
    message: string | JSX.Element,
    id: number
}

export function SubmitInput({ onSend }: { onSend: (message: string) => void }) {
    const colors = useTheme();
    const styles = makeStyles(colors);
    const [message, setMessage] = useState<string>("")
    const textInputRef = useRef<TextInput>(null)

    const handleSend = () => {
        if(message === "") return
        onSend(message)
        setMessage("")
        textInputRef.current?.clear()
    }

    return (
        <View style={styles.messageInputContainer}>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setMessage(text)}
                    onSubmitEditing={handleSend}
                    ref={textInputRef}
                />
            </View>
            <TouchableOpacity style={styles.sendBox} onPress={handleSend}>
                <Ionicons
                    name="send"
                    size={24}
                    color={colors.iconsPrimary}
                />
            </TouchableOpacity>
        </View>
    )
}

export type ChatProps = {
    containerStyle?: ViewStyle,
    messages?: MessageData[],
    onSend: (message: string) => void
    onEndReached?: () => void
}

export default function Chat({ containerStyle, messages, onSend, onEndReached }: ChatProps) {
    const colors = useTheme();
    const styles = makeStyles(colors);

    return (
        <View style={[containerStyle, styles.chatContainer]}>
            <View style={styles.messages}>
                <FlashList
                    estimatedItemSize={30}
                    onEndReached={onEndReached}
                    showsVerticalScrollIndicator={false}
                    inverted={true}
                    data={messages}
                    renderItem={({ item }) => <Message origin={item.origin}>{item.message}</Message>}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <SubmitInput onSend={onSend} />
        </View>
    );
}

const makeStyles = (colorscheme: ColorTheme) => {
    return StyleSheet.create({
        chatContainer: {
            alignItems: 'center',
        },
        messageInputContainer: {
            justifyContent: 'center',
            flexDirection: 'row',
            height: 50
        },
        textInputContainer: {
            backgroundColor: colorscheme.background,
            color: colorscheme.iconsPrimary,
            borderColor: colorscheme.primary,
            borderWidth: 1,
            borderRadius: 10,
            height: "100%",
            flex: 1,
            justifyContent: 'center',
        },
        textInput: {
            height: "100%",
            margin: 10,
            color: colorscheme.textColor,
        },
        sendBox: {
            backgroundColor: colorscheme.accent,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
            height: "100%",
            aspectRatio: 1
        },
        messages: {
            width: "100%",
            height: "86%",
            margin: 10,
        },
    });
}