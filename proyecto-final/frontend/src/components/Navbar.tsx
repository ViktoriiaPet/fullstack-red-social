import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useSidebarStore } from "../store/sidebarStore"
import Sidebar from "./Sidebar"
import UsuarioNavbar from "./UsuarioNavbar"
import Button from "./ui/Button"
import ButtonText from "./ui/ButtonText"
import { FaBars } from "react-icons/fa"
import { RiLayoutLeftLine } from "react-icons/ri"
import DropdownPanel from "./ui/DropdownPanel"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const user = useAuthStore((state) => state.user)
  const isOpen = useSidebarStore((state) => state.isOpen)
  const open = useSidebarStore((state) => state.open)
  const close = useSidebarStore((state) => state.close)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <nav className="flex justify-between items-center w-full fixed top-0 z-50 px-4 py-2 bg-background  border-b border-surface">
        <div className="w-full flex items-center justify-between relative md:ml-5">
          <a className="flex items-center " href="/">
            <img
              src="/logo.svg"
              alt="logo Armand Events"
              width="45"
              height="45"
              className="inline-block align-top logo"
            />
          </a>

          {/* sidebar button */}
          <div className="lg:hidden">
            <Button
              type="button"
              onClick={isOpen ? close : open}
              className=" fixed bottom-12 right-5 bg-transparent hover:bg-transparent border-[3px] border-white px-4 py-2 text-white z-50 "
            >
              <RiLayoutLeftLine className="text-3xl" />
            </Button>
          </div>

          {/* desktop menu */}
          <div className="hidden lg:flex gap-2 mr-auto">
            <ButtonText onClick={() => navigate("/")} active={location.pathname === "/"}>
              Inicio
            </ButtonText>

            {user && (
              <>
                <ButtonText
                  onClick={() => navigate("/profile")}
                  active={location.pathname === "/profile"}
                >
                  Perfil
                </ButtonText>

                <ButtonText
                  onClick={() => navigate("/my-events")}
                  active={location.pathname === "/my-events"}
                >
                  Agenda
                </ButtonText>

                <ButtonText
                  onClick={() => navigate("/create")}
                  active={location.pathname === "/create"}
                >
                  Crear Evento
                </ButtonText>
              </>
            )}

            <ButtonText onClick={() => navigate("/faq")} active={location.pathname === "/faq"}>
              FAQ
            </ButtonText>

            <ButtonText
              onClick={() => navigate("/history")}
              active={location.pathname === "/history"}
            >
              Historia
            </ButtonText>
          </div>

          {/* mobile menu */}
          {menuOpen && (
            <DropdownPanel className="lg:hidden">
              <ButtonText onClick={() => navigate("/")}>Inicio</ButtonText>
              {user && (
                <>
                  <ButtonText onClick={() => navigate("/profile")}>Perfil</ButtonText>
                  <ButtonText onClick={() => navigate("/my-events")}>Agenda</ButtonText>
                  <ButtonText onClick={() => navigate("/create")}>Crear Evento</ButtonText>
                </>
              )}

              <ButtonText onClick={() => navigate("/faq")}>FAQ</ButtonText>
              <ButtonText onClick={() => navigate("/history")}>Historia</ButtonText>
            </DropdownPanel>
          )}

          <div className="flex items-center gap-2">
            {/* login / user section */}
            <div className="flex lg:mr-8">
              {!user && (
                <div className="flex gap-3 mx-2">
                  <Button onClick={() => navigate("/login")}>Iniciar</Button>
                  <Button onClick={() => navigate("/register")}>Registro</Button>
                </div>
              )}

              {user && <UsuarioNavbar />}
            </div>

            {/* burger menu button */}
            <Button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden bg-transparent hover:bg-transparent border border-white p-2 rounded"
            >
              <FaBars className="text-white text-2xl" />
            </Button>
          </div>
        </div>
      </nav>

      <Sidebar />
    </>
  )
}

export default Navbar
