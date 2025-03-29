import PanelUsuario from "../components/PanelUsuario";
import Logout from "../components/Logout";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "../components/datos.css";

function Datos() {
  return(
    <>
    <PanelUsuario />
    <Container className="container-datos">   
<Container>
    <Row className="d-flex justify-content-between">
         <Col xs="auto">
  <h1>Mi Cuenta</h1> 
  </Col>
  <Col xs="auto"><Logout /></Col>
  </Row>
  </Container>


<Container className="datos-usuario">
  <h3>Datos personales</h3>
<p><strong>Nombre:</strong></p>
<p className="dato">Nombre BBDD</p>
<p><strong>Apellidos:</strong></p>
<p className="dato">Apellidos BBDD</p>
<p><strong>Teléfono:</strong></p>
<p className="dato">Teléfono BBDD</p>
<p><strong>Dirección:</strong></p>
<p className="dato">DirecciónBBDD</p>

  <h3>Métodos de Pago</h3>
<p><strong>Tarjetas guardadas:</strong></p>
<Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Text>
          <p><strong>Titular:</strong></p>
          <p>Nombre y Apellidos BBDD</p>
         <p><strong>Núm. Tarjeta:</strong></p> <p>XXXX 9087 BBDD</p>
        </Card.Text>
        <Button variant="btn">Eliminar</Button>
      </Card.Body>
    </Card>
</Container>


    </Container>
    </>
    
  )
}

export default Datos