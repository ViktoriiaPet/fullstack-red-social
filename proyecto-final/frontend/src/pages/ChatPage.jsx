import { useEffect, useState, useContext, useRef } from "react"
// eslint-disable-next-line no-unused-vars
import { io } from "socket.io-client"
import { ThemeContext } from "../contexts/ThemeContext"
import { eventoMock } from "../data/mockData"
import Title from "../components/Title"

import MensajeBurbuja from "../components/MensajeBurbuja"
import { BsChatRightFill } from "react-icons/bs"
import Button from "../components/ui/Button"
import { useAuthStore } from "../store/authStore"

/* const socket = io("http://localhost:4000") */
let socket = null // null para quitar errores en el terminal

export default function ChatPage() {
  const { theme } = useContext(ThemeContext)
  const user = useAuthStore((state) => state.user)
  const chatEndRef = useRef(null)

  const usuarioActual = {
    nombre: user?.name || eventoMock.user.name,
    avatar: eventoMock.user.avatar,
  }

  // Mensajes iniciales con mock
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = useState([
    {
      user: "Diego R",
      content: "¡Hola! Bienvenidos al chat del evento.",
      timestamp: "18:45",
      avatar: eventoMock.user.avatar,
    },
  ])

  const [message, setMessage] = useState("")

  // descomentar para que funcione
  useEffect(() => {
    /*     socket.on("chat message", (msg) => {
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

  const sendMessage = () => {
    if (!message.trim()) return

    const newMsg = {
      user: usuarioActual.nombre,
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      avatar: usuarioActual.avatar,
    }
    socket.emit("chat message", newMsg)
    setMessage("")
  }

  const chatContainerRef = useRef(null)

  return (
    <>
      {/*    <Title title="Chat del Evento" /> */}

      {/* <div className="mx-auto" style={{ maxWidth: "600px", width: "100%" }}> */}
      <div>
        <div
          className="card"
          style={{
            backgroundColor: theme.cardColor,
            color: theme.textColor,
            border: `2px solid ${theme.borderColor}`,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <div
            className="card-header d-flex align-items-center"
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              backgroundColor: theme.up,
              color: theme.white || "#fff",
              borderBottom: `2px solid ${theme.borderColor}`,
            }}
          >
            <span style={{ marginTop: "-3px", marginRight: "8px" }}>
              <BsChatRightFill />
            </span>{" "}
            <span>Chat del Evento</span>
          </div>

          <div
            ref={chatContainerRef}
            className="card-body d-flex flex-column"
            style={{
              height: "400px",
              overflowY: "auto",
              padding: "1rem",
            }}
          >
            {messages.length === 0 && (
              <div style={{ fontStyle: "italic", opacity: 0.7 }}>No hay mensajes aún.</div>
            )}

            <ul className="list-unstyled mb-0">
              {/*  flex-grow-1 */}
              {messages.map((m, i) => {
                const isMe = m.user === usuarioActual.nombre
                return <MensajeBurbuja key={i} message={m} isMe={isMe} />
              })}
              <div ref={chatEndRef} />
            </ul>
          </div>

          <div
            className="card-footer d-flex gap-2 align-items-center"
            style={{
              backgroundColor: theme.cardColor,
              borderColor: theme.textColor,
              borderTop: `2px solid`,
            }}
          >
            <textarea
              className="form-control"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= 250) setMessage(e.target.value)
              }}
              rows={2}
              style={{
                resize: "none",
                border: `1px solid ${theme.borderColor}`,
                borderRadius: "6px",
                backgroundColor: theme.dejarComentario,
                color: theme.black,
                flexGrow: 1,
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())
              }
            />
            <Button style={{ marginLeft: "0.5rem" }} onClick={sendMessage}>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
