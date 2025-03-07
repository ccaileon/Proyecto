import { Container, Row, Col, Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
import "./room.css";
function Room ({ titulo, precio, descripcion, imagenUrl, tipo }) {

let includes;

    switch (tipo) {
    case "economica":
      includes =  <><Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/relax.png" width="10%" className="me-4 icon" />
            <h4><b>Espacio Tranquilo</b></h4>
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
   </>;
      break;
    case "plus":
      includes = <><Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/relax.png" width="10%" className="me-4 icon" />
            <h4><b>Espacio Tranquilo</b></h4>
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
            <img src="src/assets/icons/relax.png" width="10%" className="me-4 icon" />
            <h4><b>Habitación Amplia</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/desayuno.png" width="10%" className="me-4 icon" />
            <h4><b>Servicio de Habitaciones</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/wifi.png" width="10%" className="me-4 icon" />
            <h4><b>Minibar</b></h4>
          </Col>
        </Row>
   </>
       <><Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/relax.png" width="10%" className="me-4 icon" />
            <h4><b>Terraza Disponible</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/desayuno.png" width="10%" className="me-4 icon" />
            <h4><b>Servicio de Habitaciones</b></h4>
          </Col>
          <Col md={4} className="d-flex align-items-center">
            <img src="src/assets/icons/wifi.png" width="10%" className="me-4 icon" />
            <h4><b>Minibar</b></h4>
          </Col>
        </Row>
   </>
   </>;
      break;
    case "suite":
      includes = <p>💰 Opción económica sin perder comodidad.</p>;
      break;
    default:
      includes = <p>🏨 Información adicional no disponible.</p>;
  }


return (
  <Container className="room">
    <Accordion defaultActiveKey="0">
      <Row>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Col xs={12} md={4} className="d-flex align-items-center">
              <img src={imagenUrl} width="300px" alt={titulo} />
            </Col>
            <Col xs={12} md={8} className="d-flex align-items-center">
              <div>
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
              </div>
            </Col>
          </Accordion.Header>
  <Accordion.Body>
  <Row>
    <Col xs={12} md={4}></Col>
    <Col xs={12} md={8} className="body-content">
      {includes}
      <p>Precio desde {precio}€ por noche.</p>
    </Col>
  </Row>
</Accordion.Body>
        </Accordion.Item>
      </Row>
    </Accordion>
  </Container>
);
}

Room.propTypes = {
  titulo: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  descripcion: PropTypes.string.isRequired,
  imagenUrl: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
};

export default Room;