import eventImg from "../assets/event.jpg"
import userAvatar from "../assets/user.jpg"

export const eventoMock = {
  title: "Festival de Música Urbana",
  description:
    "Únete a nosotros para una noche llena de ritmo, talento local y buena vibra. Disfruta de actuaciones en vivo de artistas emergentes y reconocidos, con estilos que van desde el hip hop y el reguetón hasta fusiones innovadoras de música electrónica y danza urbana. Habrá espacios interactivos para el público, food trucks con gastronomía internacional, y zonas chill-out para relajarse entre concierto y concierto. Este festival busca crear una experiencia única donde la música, la cultura y la comunidad se encuentren en un mismo lugar, celebrando la diversidad y la creatividad de la escena urbana.",
  organizer: "Juan Pérez",
  contact: "juan.perez@email.com",
  location: "Barcelona",
  dates: ["2025-11-25", "2025-11-27"],
  startTime: "20:00",
  endTime: "23:30",
  minAttendees: 20,
  maxAttendees: 200,
  attendees: 57,
  categories: ["Música", "Cultura", "Danza", "Teatro"],

  user: {
    name: "Juan Pérez",
    avatar: userAvatar,
    publishedAt: "2025-11-01",
  },

  comments: [
    {
      user: "Sandra",
      message: "¡Qué ganas de que llegue el evento!",
      time: "2025-11-10 18:45",
      likes: 3,
    },
    {
      user: "Francisco",
      message: "Me apunto!",
      time: "2025-11-11 09:20",
      likes: 5,
    },
    {
      user: "Diego",
      message: "Alguien sabe si venderán cerveza? es para un amigo...",
      time: "2025-11-12 14:05",
      likes: 2,
    },
  ],

  img: eventImg,
  likes: 120,
  commentsCount: 45,
}
