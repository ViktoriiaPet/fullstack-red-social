import { useEffect } from "react"
import CommentsEvent from "../components/CommentsEvent"
import Title from "../components/Title"
import ChatPage from "./ChatPage"
import Card from "../components/Card"
import { eventoMock } from "../data/mockData"

function EventPage() {
  const event = eventoMock

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full">
      <Title title="EVENTOS" />

      <div className="grid grid-cols-2 gap-5 md:grid-cols-2 w-full px-4">
        <Card mode="full" event={event} />

        {/* chat */}
        <div className="">
          <ChatPage />
        </div>
      </div>

      {/* comments */}
      <div className="mt-8">
        <CommentsEvent comentarios={event.comentarios} />
      </div>
    </div>
  )
}

export default EventPage
