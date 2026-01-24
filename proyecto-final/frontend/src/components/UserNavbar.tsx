import { useState } from "react"
import { useAuthStore } from "../store/authStore"
import ButtonText from "./ui/ButtonText"
import DropdownPanel from "./ui/DropdownPanel"

function UserNavbar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [open, setOpen] = useState<boolean>(false)

  if (!user) return null

  const userData = {
    nombre: user.name,
    avatar: user.avatar,
  }

  return (
    <div className="relative">
      <ButtonText
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-transparent text-white border border-white px-4 py-2 rounded"
      >
        <img src={userData.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />

        <span className="font-bold transition-colors hover:text-accent">{userData.nombre}</span>
      </ButtonText>

      {open && (
        <DropdownPanel>
          <ButtonText onClick={logout}>Cerrar sesión</ButtonText>
        </DropdownPanel>
      )}
    </div>
  )
}

export default UserNavbar
