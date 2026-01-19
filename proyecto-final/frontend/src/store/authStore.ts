import { create } from "zustand"
import { persist } from "zustand/middleware"
import defaultAvatar from "../assets/default-avatar.svg"

type User = {
  name?: string
  email?: string
  id?: string
  avatar?: string
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token?: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token = null) =>
        set({
          user: {
            ...user,
            avatar: user.avatar || defaultAvatar,
          },
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
)
