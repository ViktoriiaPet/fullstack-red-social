import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function RequireAuth({ redirectTo = "/login" }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}
