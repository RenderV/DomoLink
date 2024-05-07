import { ViewStyle } from "react-native";
import Chat, { MessageData } from "./chat";
import { useEffect, useState } from "react";
import AudioPlayer from "./recording/audioPlayer";

export type ConnectedChatProps = {
    containerStyle?: ViewStyle,
}

export default function ConnectedChat({ containerStyle }: ConnectedChatProps) {

    const [messages, setMessages] = useState<MessageData[]>([
        {
            message: <AudioPlayer soundSource={require("@assets/audio/sample.mp3")} />,
            origin: 'user',
            id: 100
        }
    ])

    return <Chat containerStyle={containerStyle}
        messages={messages}
        onSend={(message) => {
            setMessages((prev) => [{ origin: "other", message, id: prev.length }, ...prev])
        }}
    />
}