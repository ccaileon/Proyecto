import "./intro.css"
function Intro() {
  return (
    <div className="container intro">
      <div className="row">
        <div className="col">
          <img className="imagen" src="src/assets/img/zona-playa.jpg" alt="Zona Playa" width="100%" />
        </div>

        <div className="col">
          <h1>Un Oasis de Paz y Tranquilidad</h1>
          <p>En Dunas de Oro, cada detalle está diseñado para transportarte a un <b>refugio de calma y bienestar</b> en medio de un paraíso dorado. 

<br /><br />Nuestro hotel spa combina la belleza natural de las dunas con la tranquilidad de un oasis, ofreciéndote una <b>experiencia única</b> donde el lujo y la relajación se encuentran.</p>
        </div>
      </div>
    </div>
  );
}

export default Intro;