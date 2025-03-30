import { Container, Row, Col } from "react-bootstrap";
import PanelUsuario from "./PanelUsuario";
import "./estructuraUsuario.css";

function EstructuraUsuario(contenido) {
  return(
    <>
      <Container fluid className="container-datos">
        {/* Row que contendrá las columnas */}
        <Row>
          {/* Columna para el PanelUsuario a la izquierda */}
          <Col xs={12} md={2} className="panel"> 
            <PanelUsuario />
          </Col>

          {/* Columna para el contenido principal de la página a la derecha */}
          <Col xs={12} md={9} className=" contenido-cliente">
           {contenido}
          </Col>
        </Row>
      </Container>
    </>
  );


}

export default EstructuraUsuario