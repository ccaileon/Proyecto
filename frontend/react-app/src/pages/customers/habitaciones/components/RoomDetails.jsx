import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function RoomDetails({ tipo }) {
  let includes;

  const icon = (imgUrl, text) => (
    <Col md={4} className="d-flex align-items-center">
      <img src={imgUrl} width="10%" className="me-4" />
      <h4 className="mt-2"><b>{text}</b></h4>
    </Col>
  );

  switch (tipo) {
    case "standard":
    case "standard-family":
      includes = (
        <Row className="justify-content-center">
          {icon("src/assets/icons/piscina-white.png", "Acceso a Piscina")}
          {icon("src/assets/icons/desayuno-white.png", "Desayuno Incluído")}
          {icon("src/assets/icons/wifi-white.png", "Wifi Gratuíto")}
        </Row>
      );
      break;

    case "plus":
    case "plus-family":
      includes = (
        <>
          <Row className="justify-content-center">
            {icon("src/assets/icons/piscina.png", "Acceso a Piscina")}
            {icon("src/assets/icons/desayuno.png", "Desayuno Incluído")}
            {icon("src/assets/icons/wifi.png", "Wifi Gratuíto")}
          </Row>
          <Row className="justify-content-center mt-2">
            {icon("src/assets/icons/habitacionAmplia.png", "Habitación Amplia")}
            {icon("src/assets/icons/lavanderia.png", "Lavandería")}
            {icon("src/assets/icons/minibar.png", "Minibar")}
          </Row>
        </>
      );
      break;

    case "suite":
    case "suite-family":
      includes = (
        <>
          <Row className="justify-content-center">
            {icon("src/assets/icons/piscina-white.png", "Acceso a Piscina")}
            {icon("src/assets/icons/desayuno-white.png", "Desayuno Incluído")}
            {icon("src/assets/icons/wifi-white.png", "Wifi Gratuíto")}
          </Row>
          <Row className="justify-content-center mt-2">
            {icon("src/assets/icons/habitacionAmplia-white.png", "Habitación Amplia")}
            {icon("src/assets/icons/lavanderia-white.png", "Lavandería")}
            {icon("src/assets/icons/minibar-white.png", "Minibar")}
          </Row>
          <Row className="justify-content-center mt-2">
            {icon("src/assets/icons/wine-white.png", "Vino de cortesía")}
            {icon("src/assets/icons/terrace-white.png", "Terraza Privada")}
            {icon("src/assets/icons/cocina-white.png", "Cocina Propia")}
          </Row>
        </>
      );
      break;

    default:
      includes = <p>Información adicional no disponible.</p>;
  }

  return includes;
}

RoomDetails.propTypes = {
  tipo: PropTypes.string.isRequired,
};

export default RoomDetails;