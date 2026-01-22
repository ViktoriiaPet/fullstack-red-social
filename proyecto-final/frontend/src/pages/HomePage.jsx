import Card from "../components/Card"
import Title from "../components/Title"
import AlertaPublica from "../components/AlertaPublica"
import { useAuthStore } from "../store/authStore"
// import { getJSON } from "../utils/apiclient"

function HomePage() {
  const user = useAuthStore((state) => state.user)

  return (
    <>
      {!user && <AlertaPublica />}
      <Title title="PUBLICACIONES" />
      <>
        <div className="row g-4  w-auto">
          <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
            <Card />
          </div>
          <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
            <Card />
          </div>
          <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
            <Card />
          </div>
        </div>
      </>
    </>
  )
}

export default HomePage
