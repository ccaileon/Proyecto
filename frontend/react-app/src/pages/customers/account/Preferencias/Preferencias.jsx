import { Container, Col, Row } from "react-bootstrap";
import PanelUsuario from "../components/PanelUsuario";
import Logout from "../components/Logout";

function Preferencias() {
  return(
    <>
    <PanelUsuario />
    <Container className="container-datos">
    <Row className="d-flex justify-content-between">
         <Col xs="auto">
  <h1>Preferencias</h1> 
  </Col>
  <Col xs="auto"><Logout /></Col>
  </Row>
  </Container>
    
    </>
  
  )
}

export default Preferencias