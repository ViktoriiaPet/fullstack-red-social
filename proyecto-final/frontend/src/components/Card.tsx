import { useNavigate } from "react-router-dom"
import UserInfo from "./UserInfo"
import TagList from "./TagList"
import EventActions from "./EventActions"
import Button from "./ui/Button"

interface EventData {
  title: string
  description: string
  location: string
  dates: string[]
  startTime: string
  endTime?: string
  attendees: number
  categories: string[]
  img: string
  likes: number
  commentsCount: number
  organizer?: string
  contact?: string
  minAttendees?: number
  maxAttendees?: number
  reservationDeadline?: string
  comments?: any[]
}

interface CardProps {
  event: EventData
  mode?: "compact" | "full"
}

function Card({ event, mode = "compact" }: CardProps) {
  const navigate = useNavigate()
  const isFull = mode === "full"

  // date formatting logic
  const getDateText = (dates: string[]) => {
    if (dates.length === 1) {
      const d = new Date(dates[0])
      return `${d.getDate()} de ${d.toLocaleDateString("es-ES", { month: "long" })}`
    } else {
      const sortedDates = dates.map((d) => new Date(d)).sort((a, b) => a.getTime() - b.getTime())
      const start = sortedDates[0]
      const end = sortedDates[sortedDates.length - 1]
      return `Del ${start.getDate()} de ${start.toLocaleDateString("es-ES", { month: "long" })} al ${end.getDate()} de ${end.toLocaleDateString("es-ES", { month: "long" })}`
    }
  }

  return (
    <div className={isFull ? "w-full max-w-[900px] mx-auto mb-10" : "mx-2 mb-5"}>
      <div className="bg-surface text-textPrimary rounded-lg shadow-lg overflow-hidden">
        {/* user info */}
        <UserInfo />

        {/* event image */}
        <div className="w-full aspect-[16/9]">
          {" "}
          <img src={event.img} alt={event.title} className="w-full h-full object-cover" />{" "}
        </div>

        {/* content */}
        <div className="p-4">
          <h2 className="text-xl font-bold">{event.title}</h2>

          {/* description */}
          {isFull ? (
            <p className="mt-4 text-textSecondary">{event.description}</p>
          ) : (
            <p className="mt-2 text-textSecondary line-clamp-3">{event.description}</p>
          )}

          {/* basic info */}
          <div className="mt-4 space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <strong>Lugar:</strong>
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <strong>Fecha:</strong>
              <span>{getDateText(event.dates)}</span>
            </div>

            <div className="flex items-center gap-2">
              <strong>Hora inicio:</strong>
              <span>{event.startTime}</span>
            </div>

            {isFull && event.endTime && (
              <div className="flex items-center gap-2">
                <strong>Hora fin:</strong>
                <span>{event.endTime}</span>
              </div>
            )}

            {!isFull && (
              <div className="flex gap-1">
                <strong>Asistentes inscritos:</strong>
                <span>{event.attendees}</span>
              </div>
            )}
          </div>

          {/* full mode only */}
          {isFull && (
            <>
              <div className="mt-3 text-sm">
                <p>
                  <strong>Organizador:</strong> {event.organizer}
                </p>
                <p>
                  <strong>Contacto:</strong> {event.contact}
                </p>
                <p>
                  <strong>Mínimo asistentes:</strong> {event.minAttendees}
                </p>
                <p>
                  <strong>Máximo asistentes:</strong> {event.maxAttendees}
                </p>
                <p>
                  <strong>Inscritos:</strong> {event.attendees}
                </p>
              </div>

              {/* reservation deadline */}
              {event.reservationDeadline && (
                <p className="mt-4">
                  <strong>Fecha límite de reserva:</strong>{" "}
                  {new Date(event.reservationDeadline).toLocaleDateString("es-ES")}
                </p>
              )}
            </>
          )}

          <div className="mt-6 flex gap-3">
            {isFull ? (
              <Button>Inscribirse</Button>
            ) : (
              <>
                <Button onClick={() => navigate("/event")}>Ver más</Button>
                <Button>Inscribirse</Button>
              </>
            )}
          </div>

          {/* categories */}
          <div className="mt-6">
            <TagList categories={event.categories} />
          </div>

          {/* actions */}
          <div className="mt-6">
            <EventActions
              likes={event.likes}
              commentsCount={event.commentsCount}
              onShare={() => alert("Compartir evento")}
              onSave={() => alert("Evento guardado")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
