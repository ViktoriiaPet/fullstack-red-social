import { useContext, useState, FC } from "react"
import { useNavigate, useLocation, Location } from "react-router-dom"
import logo from "/logo.svg"
import Button from "./ui/Button"
import ButtonText from "./ui/ButtonText"
import Sidebar from "./Sidebar"
import UsuarioNavbar from "./UsuarioNavbar"
import { FaBars } from "react-icons/fa"
import { useAuthStore } from "../store/authStore"

const Navbar = () => {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg fixed-top bg-background border-b border-white">
        <div className="container-fluid" style={{ position: "relative" }}>
          <a className="navbar-brand d-flex align-items-center ms-5" href="/">
            <img
              src={logo}
              alt="logo Armand Events"
              width="45"
              height="45"
              className="d-inline-block align-text-top logo"
            />
          </a>
          {/* botón para abrir Sidebar en móvil */}
          {/*   <div className="d-lg-none">
            <Button onClick={() => setSidebarOpen(true)}>#</Button>
          </div> */}
          <div className="d-lg-none">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              style={{
                position: "absolute",
                top: 120,
                right: 20,
                borderWidth: "3px",
                borderColor: "white",
                borderStyle: "solid",
                borderRadius: "6px",
                backgroundColor: "transparent",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: "500",
                color: "white",
              }}
            >
              #
            </button>
          </div>
          {/*         <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ position: "absolute", top: 10, right: 22 }}
          >
            <FaBars style={{ color: "white", fontSize: "24px" }} />
          </button>
          {/*       <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
          <div className="d-flex gap-2 me-auto">
            <ButtonText onClick={() => navigate("/")} active={location.pathname === "/"}>
              Inicio
            </ButtonText>

            {/* si hay usuario, mostramos los botones del menú */}
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
          {/*    </div> */}
          <div className="d-flex btn-user">
            {!user && (
              <div className="d-flex gap-3 mx-2">
                <Button onClick={() => navigate("/login")}>Iniciar</Button>
                <Button onClick={() => navigate("/register")}>Registro</Button>
              </div>
            )}

            {user && <UsuarioNavbar />}
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

export default Navbar
