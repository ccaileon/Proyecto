import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import RoomDetails from "./RoomDetails";

function RoomCard({ precio, capacidad, descripcion, imagenUrl, tipo, compacto = false }) {
  const titulos = {
    "standard": "Habitación Estándar",
    "standard-family": "Habitación Familiar Estándar",
    "plus": "Habitación Brisa",
    "plus-family": "Habitación Familiar Brisa",
    "suite": "Suite de Lujo",
    "suite-family": "Suite Familiar de Lujo",
  };
  const titulo = titulos[tipo] || "Habitación No Definida";

  return (
    <Container className="room">
      <Row>
        <Col xs={12} md={4} className="room-imagen d-flex align-items-center">
          <img src={imagenUrl} width="100%" alt={titulo} className="img-effect" />
        </Col>
        <Col xs={12} md={8} className="room-text d-flex align-items-center">
          <div>
            <h3>{titulo}</h3>
            {!compacto && <p>{descripcion}</p>}
            {!compacto && <RoomDetails tipo={tipo} />}
            <p><b>Precio:</b> desde {precio}€ por noche | <b>Capacidad:</b> {capacidad}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

RoomCard.propTypes = {
  precio: PropTypes.number.isRequired,
  capacidad: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  imagenUrl: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  compacto: PropTypes.bool,
};

export default RoomCard;