import { useEffect } from "react"
import CommentsEvent from "../components/CommentsEvent"
import Title from "../components/Title"
import EventChat from "../components/chat/EventChat.js"
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

      <div className="grid grid-cols-1 xl:grid-cols-2">
        <Card mode="full" event={event} />

        {/* chat */}
        <EventChat />
      </div>

      {/* comments */}
      <div className="mt-10 xl:mt-0">
        <CommentsEvent />
      </div>
    </div>
  )
}

export default EventPage
