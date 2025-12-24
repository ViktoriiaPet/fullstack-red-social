import { useState } from "react"
import Titulo from "../components/Titulo"

const ProfilePage = () => {
  const [form, setForm] = useState({
    profilePic: null,
    nickname: "Diego",
    email: "",
    phone: "",
    password: "",
    name: "",
    lastname: "",
    lastname2: "",
    dni: "",
    postalCode: "",
    birthDate: "",
    about: "",
    interests: [],
    newsletter: "none",
  })

  const [showInterests, setShowInterests] = useState(false)
  const [showNewsletter, setShowNewsletter] = useState(false)

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        interests: checked ? [...prev.interests, value] : prev.interests.filter((i) => i !== value),
      }))
    } else if (type === "radio") {
      setForm((prev) => ({ ...prev, newsletter: value }))
    } else {
      setForm((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm((prev) => ({ ...prev, profilePic: URL.createObjectURL(file) }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form data:", form)
    alert("Formulario enviado (simulado)")
  }

  const handleDeleteAccount = () => {
    if (window.confirm("¿Seguro que deseas eliminar tu cuenta?")) {
      alert("Cuenta eliminada (simulado)")
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Titulo title="Configuración de la cuenta" />

      {/* foto de perfil */}
      <div className="mt-6 text-center">
        <img
          src={form.profilePic || "https://i.pravatar.cc/150"}
          alt="Profile Preview"
          className="w-24 h-24 rounded-full object-cover mx-auto mb-2 transition-transform hover:scale-105 cursor-pointer"
          onClick={() => document.getElementById("profilePic")?.click()}
        />
        <input
          type="file"
          id="profilePic"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePicChange}
        />
      </div>

      {/* form */}
      <form className="mt-6 space-y-4 text-white" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nickname" className="block mb-1 font-medium">
            Nickname
          </label>
          <input
            id="nickname"
            value={form.nickname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="name" className="block mb-1 font-medium">
              Nombre
            </label>
            <input
              id="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastname" className="block mb-1 font-medium">
              Primer apellido
            </label>
            <input
              id="lastname"
              value={form.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastname2" className="block mb-1 font-medium">
              Segundo apellido
            </label>
            <input
              id="lastname2"
              value={form.lastname2}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dni" className="block mb-1 font-medium">
            DNI
          </label>
          <input
            id="dni"
            value={form.dni}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="postalCode" className="block mb-1 font-medium">
              Código postal
            </label>
            <input
              id="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="birthDate" className="block mb-1 font-medium">
              Fecha de nacimiento
            </label>
            <input
              id="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="about" className="block mb-1 font-medium">
            About me
          </label>
          <textarea
            id="about"
            rows={3}
            value={form.about}
            onChange={handleChange}
            placeholder="Cuéntanos algo sobre ti..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* intereses */}
        <div>
          <button
            type="button"
            className="w-full text-black bg-gray-200 py-2 rounded mb-2"
            onClick={() => setShowInterests(!showInterests)}
          >
            Modificar intereses
          </button>
          {showInterests && (
            <div className="flex flex-col gap-2 p-2 border border-gray-200 rounded">
              {["Música", "Deporte", "Etc"].map((item) => (
                <label key={item} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={form.interests.includes(item)}
                    onChange={handleChange}
                  />
                  {item}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* newsletter */}
        <div>
          <button
            type="button"
            className="w-full text-black bg-gray-200 py-2 rounded mb-2"
            onClick={() => setShowNewsletter(!showNewsletter)}
          >
            Modificar preferencias de newsletter
          </button>
          {showNewsletter && (
            <div className="flex flex-col gap-2 p-2 border border-gray-200 rounded">
              {[
                { label: "No recibir Newsletter", value: "none" },
                { label: "Diaria", value: "daily" },
                { label: "Semanal", value: "weekly" },
                { label: "Mensual", value: "monthly" },
              ].map((item) => (
                <label key={item.value} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="newsletter"
                    value={item.value}
                    checked={form.newsletter === item.value}
                    onChange={handleChange}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Aplicar cambios
          </button>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Eliminar cuenta
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage
