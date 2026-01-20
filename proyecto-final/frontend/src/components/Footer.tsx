import { useNavigate, useLocation } from "react-router-dom"
import ButtonText from "./ui/ButtonText"

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <footer
      className="
        ml-75 w-[calc(100%-300px)] p-2
        bg-background text-white border-t border-surface
      max-lg:ml-0 max-lg:w-full
      "
    >
      <div
        className="
          max-w-350 mx-auto
          flex justify-center gap-8 text-sm
        "
      >
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
