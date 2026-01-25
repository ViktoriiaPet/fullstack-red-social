import { useState, useEffect, useRef } from "react"
import Button from "./ui/Button"
import { BsChatRightFill } from "react-icons/bs"
import { FaRegClock } from "react-icons/fa"
import { AiFillLike } from "react-icons/ai"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { BiSolidPencil } from "react-icons/bi"

interface Comment {
  id: string
  usuario: string
  mensaje: string
  fecha: Date
  likes: string[]
}

interface CommentsEventProps {
  admin?: boolean
  user?: string
}

const mockComentariosDB: Comment[] = [
  {
    id: crypto.randomUUID(),
    usuario: "Sandra",
    mensaje: "¡Me encanta este evento!",
    fecha: new Date("2024-01-01T10:30:00"),
    likes: [],
  },
  {
    id: crypto.randomUUID(),
    usuario: "Francisco",
    mensaje: "¡Muy interesante!",
    fecha: new Date("2024-01-01T09:10:00"),
    likes: [],
  },
]

function CommentsEvent({ admin = false, user = "EstoEsUnUsuario" }: CommentsEventProps) {
  const [comentarios, setComentarios] = useState<Comment[]>(
    [...mockComentariosDB].sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
  )

  const [nuevoComentario, setNuevoComentario] = useState("")
  const [editID, setEditID] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const editRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (editRef.current) {
      editRef.current.style.height = "auto"
      editRef.current.style.height = editRef.current.scrollHeight + "px"
    }
  }, [editValue, editID])

  const manejarEnvio = () => {
    if (nuevoComentario.trim() === "") return

    const comentario: Comment = {
      id: crypto.randomUUID(),
      usuario: user,
      mensaje: nuevoComentario,
      fecha: new Date(),
      likes: [],
    }

    setComentarios((prev) =>
      [comentario, ...prev].sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
    )

    setNuevoComentario("")
  }

  const manejarLike = (id: string) => {
    setComentarios((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: c.likes.includes(user)
                ? c.likes.filter((u) => u !== user)
                : [...c.likes, user],
            }
          : c
      )
    )
  }

  const manejarBorrar = (id: string) => {
    setComentarios((prev) => prev.filter((c) => c.id !== id))
  }

  const manejarEditar = (id: string) => {
    const comentario = comentarios.find((c) => c.id === id)
    if (!comentario) return
    setEditID(id)
    setEditValue(comentario.mensaje)

    setTimeout(() => {
      editRef.current?.focus()
    }, 0)
  }

  const aplicarCambios = () => {
    if (editValue.trim() === "") return

    setComentarios((prev) => prev.map((c) => (c.id === editID ? { ...c, mensaje: editValue } : c)))

    setEditID(null)
    setEditValue("")
  }

  const comentariosOrdenados = [...comentarios].sort(
    (a, b) => b.fecha.getTime() - a.fecha.getTime()
  )

  return (
    <>
      {/* box to add a comment */}
      <div className="p-4 mt-3 bg-surface border-2 border-white rounded-lg shadow-md">
        <label className="block font-bold mb-2 text-textPrimary">Añadir un comentario</label>

        <textarea
          value={nuevoComentario}
          onChange={(e) => {
            let valor = e.target.value
            if (valor.length <= 400) {
              const idx = valor.search(/[a-zA-Z]/)
              if (idx !== -1) {
                valor = valor.slice(0, idx) + valor.charAt(idx).toUpperCase() + valor.slice(idx + 1)
              }
              setNuevoComentario(valor)
            }
          }}
          placeholder="Escribe tu comentario aquí..."
          className="
            w-full 
            bg-background 
            text-textPrimary 
            border-2 
            border-white 
            rounded-md 
            p-2 
            mb-4 
            min-h-24   
            max-h-24        
            overflow-y-auto 
            resize-none     
          "
        />

        <Button onClick={manejarEnvio}>Enviar</Button>
      </div>

      {/* comments list */}
      <div className="mt-3 bg-surface border-2 border-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 bg-main text-textPrimary font-bold text-lg px-4 py-3 border-b-2 border-white">
          <BsChatRightFill className="mt-[2px]" />
          <span>Comentarios</span>
        </div>

        {comentarios.length === 0 ? (
          <div className="py-4 italic opacity-80 text-textSecondary">No hay comentarios aún.</div>
        ) : (
          <ul className="px-4 m-0 list-none">
            {comentariosOrdenados.map((c) => (
              <li key={c.id} className="border-b border-white py-4 text-textPrimary">
                <strong>{c.usuario}:</strong>

                {editID === c.id ? (
                  <>
                    <textarea
                      ref={editRef}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full bg-background text-textPrimary rounded-md p-2 mt-2 resize-none overflow-hidden"
                    />

                    <Button onClick={aplicarCambios} className="mt-2">
                      Aplicar cambios
                    </Button>
                  </>
                ) : (
                  <div className="bg-background text-textPrimary rounded-md p-2 mt-2 whitespace-pre-wrap break-words">
                    {c.mensaje}
                  </div>
                )}

                <div className="flex items-center text-xs text-textSecondary mt-2 gap-1">
                  <FaRegClock className="mt-[2px]" />
                  <span>
                    {new Date(c.fecha).toLocaleString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => manejarLike(c.id)}
                    className="flex items-center gap-1 px-2 py-1 text-sm"
                  >
                    <AiFillLike /> {c.likes.length}
                  </Button>

                  {(admin || c.usuario === user) && editID !== c.id && (
                    <>
                      <Button
                        onClick={() => manejarEditar(c.id)}
                        className="flex items-center px-2 py-1 text-sm"
                      >
                        <BiSolidPencil />
                      </Button>

                      <Button
                        onClick={() => manejarBorrar(c.id)}
                        className="flex items-center px-2 py-1 text-sm"
                      >
                        <RiDeleteBin6Fill />
                      </Button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default CommentsEvent
