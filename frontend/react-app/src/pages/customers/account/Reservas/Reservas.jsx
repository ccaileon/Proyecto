import PanelUsuario from "../components/PanelUsuario";
import Logout from "../components/Logout";
import { Container, Row, Col } from "react-bootstrap";
import "../components/datos.css";

function Reservas() {
  return(
<>
<PanelUsuario />
<Container className="container-datos">
    <Row className="d-flex justify-content-between">
         <Col xs="auto">
  <h1>Mis Reservas</h1> 
  </Col>
  <Col xs="auto"><Logout /></Col>
  </Row>
  </Container>
</>
  )
}

export default Reservas