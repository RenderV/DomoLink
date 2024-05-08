import React from "react"
import { Dispatch, SetStateAction } from "react"
import AudioPlayer from "./recording/audioPlayer"

export type MessageData = {
    origin: "user" | "other",
    message: string | JSX.Element,
    id: number
}

type ChatContextType = {
    sendText: (text: string, origin: "user" | "other") => void,
    sendAudio: (audioURI: string, origin: "user" | "other") => void,
    messages: MessageData[],
}

const ChatContext = React.createContext<ChatContextType | null>(null)

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = React.useState<MessageData[]>([])

    const sendText = (text: string, origin: "user" | "other") => {
        setMessages((prev) => [{ origin: origin, message: text, id: prev.length }, ...prev])
    }

    const sendAudio = (audioURI: string, origin: "user" | "other") => {
        const audioMessage: MessageData = {
            origin: origin,
            message: <AudioPlayer soundSource={audioURI} />,
            id: messages.length
        }

        setMessages((prev) => [audioMessage, ...prev])
    }

    return (
        <ChatContext.Provider value={{ sendText, sendAudio, messages: messages }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    const context = React.useContext(ChatContext)
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
}