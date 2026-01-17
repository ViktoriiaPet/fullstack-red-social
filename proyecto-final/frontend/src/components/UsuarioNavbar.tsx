import React, { useContext, useState } from "react"
import ButtonText from "./ui/ButtonText"
import { ThemeContext } from "../contexts/ThemeContext"
import { AuthContext } from "../contexts/AuthContext"
import { eventoMock } from "../data/mockData"

function UsuarioNavbar() {
  const { theme } = useContext(ThemeContext)
  const { user, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [hoverName, setHoverName] = useState(false)
  const [hoverLogout, setHoverLogout] = useState(false)

  if (!user) return null // No mostramos nada si no hay usuario

  // Tomamos los datos mockeados para el usuario
  const usuario = {
    nombre: user.name || eventoMock.usuario.nombre,
    avatar: eventoMock.usuario.avatar,
  }

  const nameStyle = {
    color: hoverName ? theme.ButtonText.hover.color : theme.ButtonText.base.color,
    transition: "color 0.3s ease",
    fontWeight: "bold",
  }

  return (
    <div className="dropdown" style={{ position: "relative" }}>
      <button
        className="btn d-flex align-items-center"
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: theme.ButtonText.base.backgroundColor,
          color: theme.ButtonText.base.color,
          border: theme.ButtonText.base.border,
        }}
      >
        <img
          src={usuario.avatar}
          alt={usuario.nombre}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "0.5rem",
          }}
        />
        <span
          className="fw-bold"
          style={nameStyle}
          onMouseEnter={() => setHoverName(true)}
          onMouseLeave={() => setHoverName(false)}
        >
          {usuario.nombre}
        </span>
      </button>

      {open && (
        <div
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: theme.cardColor,
            color: theme.textColor,
            border: `1px solid ${theme.borderColor}`,
            borderRadius: "0.25rem",
            minWidth: "150px",
            boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
          }}
        >
          <ButtonText onClick={logout}>Logout</ButtonText>
        </div>
      )}
    </div>
  )
}

export default UsuarioNavbar
