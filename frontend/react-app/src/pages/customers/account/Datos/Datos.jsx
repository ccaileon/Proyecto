import EstructuraUsuario from "../components/EstructuraUsuario";
import { Container, Card, Button } from "react-bootstrap";

function Datos() {
  const client = JSON.parse(sessionStorage.getItem("clientUser"));

  return (
    <EstructuraUsuario>
      <Container>
        <h1>Mi Cuenta</h1>
        <Container className="datos-usuario">
          <h3>Datos personales</h3>
          <p><strong>Nombre:</strong></p>
          <p className="dato">{client?.name}</p>
          <p><strong>Apellidos:</strong></p>
          <p className="dato">{client?.surname_one} {client?.surname_two}</p>
          <p><strong>Teléfono:</strong></p>
          <p className="dato">{client?.telephone}</p>
          <p><strong>Tipo de documento:</strong></p>
          <p className="dato">{client?.doc_type} {client?.doc_id}</p>
          <p><strong>Email:</strong></p>
          <p className="dato">{client?.email}</p>

          <h3>Métodos de Pago</h3>
          <p><strong>Tarjetas guardadas:</strong></p>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Text as="div">
  <div><strong>Titular:</strong></div>
  <div>Nombre y Apellidos BBDD</div>
  <div><strong>Núm. Tarjeta:</strong></div>
  <div>XXXX 9087 BBDD</div>
</Card.Text>

              <Button variant="btn">Eliminar</Button>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </EstructuraUsuario>
  );
}

export default Datos;

