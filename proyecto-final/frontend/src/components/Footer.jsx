import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

import { useNavigate, useLocation } from "react-router-dom"
import ButtonText from "./ui/ButtonText"

export default function Footer() {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: theme.navbarBG,
        color: theme.white,
        borderTop: theme.navbarBorder,
      }}
    >
      <div className="footer__inner">
        <ButtonText
          onClick={() => navigate("/normativa")}
          active={location.pathname === "/normativa"}
        >
          Normativa
        </ButtonText>
        <ButtonText
          onClick={() => navigate("/privacidad")}
          active={location.pathname === "/privacidad"}
        >
          Privacidad
        </ButtonText>

        <ButtonText onClick={() => navigate("/cookies")} active={location.pathname === "/cookies"}>
          Cookies
        </ButtonText>
      </div>
    </footer>
  )
}
