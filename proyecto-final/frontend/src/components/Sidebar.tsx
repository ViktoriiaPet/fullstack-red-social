import { useSidebarStore } from "../store/sidebarStore"
import Button from "./ui/Button"
import CompactCalendar from "./CompactCalendar"

const categorias = [
  "Arte",
  "Aventura",
  "Bienestar",
  "Ciencia",
  "Danza",
  "Deporte",
  "Espiritualidad",
  "Frikis",
  "Gastronomía",
  "Infantiles",
  "Manualidades",
  "Música",
  "Populares",
  "Teatro",
  "Temático",
  "Tradicional",
  "Singles",
  "Naturaleza",
  "Cultura",
]

export default function Sidebar() {
  const { isOpen, close } = useSidebarStore()

  return (
    <>
      {/* backdrop only on mobile */}
      {isOpen && (
        <div
          className="
            fixed inset-0 bg-black/40 z-40 lg:hidden
          "
          onClick={close}
        />
      )}

      <aside
        className={`
          fixed top-15 left-0
          w-[300px] h-[calc(100vh-60px)]
          bg-background text-white border-r border-surface
          px-14 pt-4 z-40 flex flex-col lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300
        `}
      >
        <h5 className="mb-3 text-white">Categorías</h5>

        <div className="flex flex-col grow min-h-0">
          <div
            className="
              flex flex-col gap-2 grow min-h-0 overflow-y-auto
              custom-scroll pr-3
            "
          >
            {categorias.map((categoria) => (
              <Button key={categoria}>{categoria}</Button>
            ))}
          </div>

          <CompactCalendar />
        </div>
      </aside>
    </>
  )
}
