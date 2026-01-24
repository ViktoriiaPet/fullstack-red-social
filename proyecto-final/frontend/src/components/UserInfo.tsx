import { useAuthStore } from "../store/authStore"

function UserInfo() {
  const user = useAuthStore((state) => state.user)

  if (!user) return null

  return (
    <div className="flex items-center p-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-[50px] h-[50px] rounded-full object-cover mr-4"
      />

      <div>
        <div className="font-bold text-textPrimary">{user.name}</div>

        <div className="text-sm text-textSecondary">
          Publicado el{" "}
          {new Date().toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  )
}

export default UserInfo
