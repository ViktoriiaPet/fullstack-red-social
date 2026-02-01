import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { postJSON } from "../../utils/apiclient"
import { useAuthStore } from "../../store/authStore"
import Button from "../ui/Button"
import SuccessModal from "./SuccessModal"
import Title from "../Title"

type AuthMode = "login" | "register"

interface AuthFormProps {
  mode: AuthMode
}

interface Errors {
  username?: string
  password?: string
  repeatPassword?: string
  email?: string
  general?: string
}

export default function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [passVisible, setPassVisible] = useState(false)
  const [repeatPassVisible, setRepeatPassVisible] = useState(false)

  const [showSuccess, setShowSuccess] = useState(false)
  const [createdUsername, setCreatedUsername] = useState("")

  const validateEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!username || username.length < 5) {
      setErrors({ username: "username must be at least 5 characters" })
      return
    }

    if (!password || password.length < 5) {
      setErrors({ password: "password must be at least 5 characters" })
      return
    }

    if (mode === "register") {
      if (password !== repeatPassword) {
        setErrors({ repeatPassword: "passwords do not match" })
        return
      }

      if (!email || !validateEmail(email)) {
        setErrors({ email: "invalid email address" })
        return
      }
    }

    try {
      if (mode === "login") {
        const data = await postJSON("api/v1/users/login", { username, password })
        const jwt = data.token || data.jwt
        const userObj = data.user || (data.username ? { name: data.username } : null)

        if (jwt && userObj) {
          login(userObj, jwt)
          navigate("/")
        } else {
          setErrors({ general: "invalid credentials" })
        }
      }

      if (mode === "register") {
        const data = await postJSON("api/v1/users/register", {
          username,
          password,
          email,
        })

        setCreatedUsername(data.username || username)
        setShowSuccess(true)

        setUsername("")
        setPassword("")
        setRepeatPassword("")
        setEmail("")
      }
    } catch (err: any) {
      setErrors({
        general: err?.message || "unexpected error",
      })
    }
  }

  return (
    <>
      <Title title={mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"} />

      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl p-6 shadow-md bg-surface border border-white">
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            {/* username */}
            <div>
              <label className="block text-sm font-medium">Nombre de usuario</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <p className="text-sm text-error">{errors.username}</p>}
            </div>

            {/* password */}
            <div>
              <label className="block text-sm font-medium">Contraseña</label>
              <div className="relative">
                <input
                  type={passVisible ? "text" : "password"}
                  className="mt-1 w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 top-4 cursor-pointer text-textSecondary"
                  onClick={() => setPassVisible(!passVisible)}
                >
                  {passVisible ? <BsEye /> : <BsEyeSlash />}
                </span>
              </div>
              {errors.password && <p className="text-sm text-error">{errors.password}</p>}
            </div>

            {/* repeat password */}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium">Repetir contraseña</label>
                <div className="relative">
                  <input
                    type={repeatPassVisible ? "text" : "password"}
                    className="mt-1 w-full rounded-md border px-3 py-2 pr-10"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-4 cursor-pointer text-textSecondary"
                    onClick={() => setRepeatPassVisible(!repeatPassVisible)}
                  >
                    {repeatPassVisible ? <BsEye /> : <BsEyeSlash />}
                  </span>
                </div>
                {errors.repeatPassword && (
                  <p className="text-sm text-error">{errors.repeatPassword}</p>
                )}
              </div>
            )}

            {/* email */}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-sm text-error">{errors.email}</p>}
              </div>
            )}

            {errors.general && <p className="text-sm text-error">{errors.general}</p>}

            <Button type="submit">{mode === "login" ? "Iniciar Sesión" : "Registrarse"}</Button>
          </form>
        </div>

        {/* success modal */}
        {showSuccess && mode === "register" && (
          <SuccessModal
            message={`${createdUsername} se ha registrado con éxito.`}
            onConfirm={() => {
              setShowSuccess(false)
              navigate("/login")
            }}
          />
        )}
      </div>
    </>
  )
}
