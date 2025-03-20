import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./room.css";
function Room ({ titulo, precio, capacidad, descripcion, imagenUrl, tipo }) {

let includes;

    switch (tipo) {
    case "economica":
      includes =  <><Row className="justify-content-center">
         <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/piscina-white.png" width="10%" className="me-4 icon" />
            <h4><b>Acceso a Piscina</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/desayuno-white.png" width="10%" className="me-4 icon" />
            <h4><b>Desayuno Incluído</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/wifi-white.png" width="10%" className="me-4 icon" />
            <h4><b>Wifi Gratuíto</b></h4>
          </Col>
        </Row>
   </>;
      break;
    case "plus":
      includes = <><Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/piscina.png" width="10%" className="me-4 icon" />
            <h4><b>Acceso a Piscina</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/desayuno.png" width="10%" className="me-4 icon" />
            <h4><b>Desayuno Incluído</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/wifi.png" width="10%" className="me-4 icon" />
            <h4><b>Wifi Gratuíto</b></h4>
          </Col>
        </Row>
        <><Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/habitacionAmplia.png" width="10%" className="me-4 icon" />
            <h4><b>Habitación Amplia</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/lavanderia.png" width="10%" className="me-4 icon" />
            <h4><b>Lavandería</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/minibar.png" width="10%" className="me-4 icon" />
            <h4><b>Minibar</b></h4>
          </Col>
        </Row>
   </>
     
   </>;
      break;
    case "suite":
        includes = <><Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/piscina-white.png" width="10%" className="me-4 icon" />
            <h4><b>Acceso a Piscina</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/desayuno-white.png" width="10%" className="me-4 icon" />
            <h4><b>Desayuno Incluído</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/wifi-white.png" width="10%" className="me-4 icon" />
            <h4><b>Wifi Gratuíto</b></h4>
          </Col>
        </Row>
        <><Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/habitacionAmplia-white.png" width="10%" className="me-4 icon" />
            <h4><b>Habitación Amplia</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/lavanderia-white.png" width="10%" className="me-4 icon" />
            <h4><b>Lavandería</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/minibar-white.png" width="10%" className="me-4 icon" />
            <h4><b>Minibar</b></h4>
          </Col>
        </Row>
          <><Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/wine-white.png" width="10%" className="me-4 icon" />
            <h4><b>Vino de cortesía</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/terrace-white.png" width="10%" className="me-4 icon" />
            <h4><b>Terraza Privada</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/cocina-white.png" width="10%" className="me-4 icon" />
            <h4><b>Cocina Propia</b></h4>
          </Col>
        </Row>
   </>
   </>
     
   </>;
      break;
    default:
      includes = <p>🏨 Información adicional no disponible.</p>;
  }


return (
  <Container className="room">
      <Row>
            <Col xs={12} md={4} className="room-imagen d-flex align-items-center">
              <img src={imagenUrl} width="100%" alt={titulo} />
            </Col>
            <Col xs={12} md={8} className="room-text d-flex align-items-center">
              <div>
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
                     {includes}
      <p><b>Precio:</b> desde {precio}€ por noche | <b>Capacidad</b>: {capacidad}</p>
              </div>
            </Col>
      </Row>
  </Container>
);
}

Room.propTypes = {
  titulo: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  capacidad: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imagenUrl: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
};

export default Room;