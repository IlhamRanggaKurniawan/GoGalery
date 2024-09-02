/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import useEffectAfterMount from "./useEffectAfterMount";
import { useSession } from "./useSession";

const useWebSocket = (url: string, setMessages: React.Dispatch<React.SetStateAction<any[]>>) => {

    const [ws, setWs] = useState<WebSocket | null>(null)
    const sound = new Audio("/message.mp3");

    useEffectAfterMount(() => {

        const socket = new WebSocket(url)

        socket.onopen = () => {
            console.log("connected to websocket server")
        }

        socket.onmessage = (event: any) => {
            const data = JSON.parse(event.data)

            setMessages((prevMessages: any) => [...prevMessages, data]);

            sound.play()
        }

        socket.onclose = () => {
            console.log("Websocket connection closed")
        }

        socket.onerror = (error) => {
            console.log("Websocket error: ", error)
        }

        setWs(socket)

    }, [url])

    const sendMessage = (message: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message)
        } else {
            console.error("Websocket is not open")

        }
    }

    return { sendMessage }
}

export default useWebSocket