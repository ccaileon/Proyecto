import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./room.css";

function Room({ precio, capacidad, descripcion, imagenUrl, tipo }) {



  return (
    <Container className="room">
      <Row>
        <Col xs={12} md={4} className="room-imagen d-flex align-items-center">
          <img src={imagenUrl} width="100%" alt={titulo} className="img-effect" />
        </Col>
        <Col xs={12} md={8} className="room-text d-flex align-items-center">
          <div>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            {includes}
            <p><b>Precio:</b> desde {precio}€ por noche | <b>Capacidad:</b> {capacidad}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

Room.propTypes = {
  precio: PropTypes.number.isRequired,
  capacidad: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imagenUrl: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
};

export default Room;
