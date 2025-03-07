import { Container, Row, Col } from 'react-bootstrap';
import './footer.css';

function Footer() {
  return (
    <Container fluid className="footer">
      <Row className="d-flex justify-content-center text-center">
        <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <img src="src/assets/icons/direccion.png" width="24" className="icon" alt="Dirección" />
            <h3 className="h3-white">Dirección</h3>
          </div>
          <p className="p-white">C/ Playa Sol - 1234 <br /> Almería</p>
        </Col>

        <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <img src="src/assets/icons/horario.png" width="24" className="icon" alt="Horario de Atención" />
            <h3 className="h3-white">Horario de Atención</h3>
          </div>
          <p className="p-white">Lunes a Domingo <br /> 7 AM - 22 PM</p>
        </Col>

        <Col md={4}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <img src="src/assets/icons/telefono.png" width="24" className="icon" alt="Contacto" />
            <h3 className="h3-white">Contacto</h3>
          </div>
          <p className="p-white">912 34 56 78<br />dunasdeoro@info.com</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

