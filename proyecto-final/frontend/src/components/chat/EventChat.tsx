import { useEffect, useState, useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { io, Socket } from "socket.io-client"
import { useAuthStore } from "../../store/authStore"
import MessageBubble from "./MessageBubble"
import { eventoMock } from "../../data/mockData"
import Button from "../ui/Button"
import { BsChatRightFill } from "react-icons/bs"
import moderatorAvatar from "../../assets/moderator-avatar.svg"

/* const socket = io("http://localhost:4000") */
let socket: Socket | null = null // null para quitar errores en el terminal

// tipo de mensaje del chat
interface ChatMessage {
  user: string
  content: string
  timestamp: string
  avatar: string
}

export default function EventChat() {
  const user = useAuthStore((state) => state.user)

  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  const usuarioActual = {
    nombre: user?.name || eventoMock.user.name,
    avatar: eventoMock.user.avatar,
  }

  // mensajes iniciales con mock
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      user: "Moderadora",
      content: "¡Hola! Bienvenidos al chat del evento.",
      timestamp: "18:45",
      avatar: moderatorAvatar,
    },
  ])

  const [message, setMessage] = useState<string>("")

  // descomentar para que funcione
  useEffect(() => {
    /*     socket.on("chat message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg])
    })
    return () => socket.off("chat message") */
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  const sendMessage = (): void => {
    if (!message.trim()) return

    const newMsg: ChatMessage = {
      user: usuarioActual.nombre,
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      avatar: usuarioActual.avatar,
    }

    socket?.emit("chat message", newMsg)
    setMessage("")
  }

  return (
    <div className="xl:pl-4">
      <div className="overflow-hidden rounded-lg border-2 border-white bg-background shadow-md">
        <div className="flex items-center border-b-2 border-gray-white bg-surface px-4 py-2 text-lg font-bold text-white">
          <BsChatRightFill className="mr-2 -mt-[2px]" />
          <span>Chat del Evento</span>
        </div>

        <div ref={chatContainerRef} className="flex h-[350px] flex-col overflow-y-auto py-4 px-2">
          {messages.length === 0 && (
            <div className="italic text-textSecondary">No hay mensajes aún.</div>
          )}
          <ul className="m-0 list-none">
            {messages.map((m, i) => {
              const isMe = m.user === usuarioActual.nombre
              return <MessageBubble key={i} message={m} isMe={isMe} />
            })}
            <div ref={chatEndRef} />
          </ul>
        </div>

        <div className="flex items-end gap-2 border-t-2 border-white bg-surface p-3">
          <textarea
            className="flex-grow resize-none rounded-md border border-gray-white bg-background p-2 text-white focus:outline-none focus:ring-2 focus:ring-background min-h-20   
              max-h-24"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= 250) setMessage(e.target.value)
            }}
            rows={2}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())
            }
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  )
}
