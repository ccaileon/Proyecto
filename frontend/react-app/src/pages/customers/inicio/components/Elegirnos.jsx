import "./elegirnos.css"
function Elegirnos() {
  return (
    <div className="container elegirnos">
      <h1>¿Por qué elegirnos?</h1>
      <p>
        En <b>Dunas de Oro</b> nos comprometemos a ofrecerte una experiencia única de descanso, diversión y bienestar.
        Buscamos la satisfacción de nuestros clientes en todo lo que hacemos y cuidamos hasta el mínimo detalle.
        Nuestro hotel-spa ha sido diseñado para ofrecerte el equilibrio perfecto entre <b>lujo, comodidad y naturaleza.</b>
      </p>
<div className="container contenedor-row">
      <div className="row justify-content-center">
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/relax.png" width="10%" className="me-4 icon" />
          <h4><b>Espacio Tranquilo</b></h4>
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/desayuno.png" width="10%" className="me-4 icon" />
          <h4><b>Desayuno Incluído</b></h4>
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/wifi.png" width="10%" className="me-4 icon" />
          <h4><b>Wifi Gratuíto</b></h4>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/restaurante.png" width="10%" className="me-4 icon" />
          <h4><b>Restaurante</b></h4>
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/playa.png" width="10%" className="me-4 icon" />
          <h4><b>Playa a pocos metros</b></h4>
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/experiencias.png" width="10%" className="me-4 icon" />
          <h4><b>Experiencias Únicas</b></h4>
        </div>
      </div>

    <div className="row justify-content-center">
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/familia.png" width="10%" className="me-4" />
          <h4><b>Para toda la Familia</b></h4>
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/excelencia.png" width="10%" className="me-4 icon" />
          <h4><b>Excelencia</b></h4>
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <img src="src/assets/icons/fidelizacion.png" width="10%" className="me-4" />
          <h4><b>Acumula Puntos</b></h4>
        </div>
      </div>
</div>
    </div>
  );
}

export default Elegirnos;
