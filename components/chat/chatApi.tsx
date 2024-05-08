import { ViewStyle } from "react-native";
import Chat, { MessageData } from "./chat";
import { useEffect, useLayoutEffect, useState } from "react";
import AudioPlayer from "./recording/audioPlayer";
import { useChat } from "./chatContext";

export type ConnectedChatProps = {
    containerStyle?: ViewStyle,
}

export default function ConnectedChat({ containerStyle }: ConnectedChatProps) {
    const sound = require("@assets/audio/sample.mp3")
    const chat = useChat()

    return <Chat containerStyle={containerStyle}
        messages={chat.messages}
        onSend={(message) => {
            chat.sendText(message, "user")
        }}
    />
}