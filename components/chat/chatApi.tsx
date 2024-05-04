import { ViewStyle } from "react-native";
import Chat, { MessageData } from "./chat";
import { useEffect, useState } from "react";

export type ConnectedChatProps = {
    containerStyle?: ViewStyle,
}

export default function ConnectedChat({ containerStyle }: ConnectedChatProps) {

    const [messages, setMessages] = useState<MessageData[]>([])

    return <Chat containerStyle={containerStyle}
        messages={messages}
        onSend={(message) => {
            setMessages((prev) => [{ origin: "user", message, id: prev.length }, ...prev])
        }}
    />
}