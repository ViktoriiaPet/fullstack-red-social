import Card from "../components/Card"
import Title from "../components/Title"

const MyEvents = () => {
  return (
    <>
      <Title title="AGENDA" />

      <div className="row g-4 justify-content-center w-100">
        <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
          <Card />
        </div>
        <div className="col-xxl-4 col-xl-6 col-md-6 col-sm-12">
          <Card />
        </div>
      </div>
    </>
  )
}

export default MyEvents

// FALTA TODA LA LOGICA PARA AÑADIR LOS EVENTOS
