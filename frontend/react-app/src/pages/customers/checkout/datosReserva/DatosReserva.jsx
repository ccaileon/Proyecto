import { Container, Col, Row } from "react-bootstrap";
import GuestDetails from "./components/GuestDetails";
import OrderSummary from "./components/OrderSummary"
import "./datosReserva.css";

function DatosReserva() {

  return(
 <>
      <Container fluid className="container-datos">
        {/* Row que contendrá las columnas */}
        <Row>
          {/* Columna para los detalles del cliente a la izquierda */}
          <Col xs={12} md={8} className="datos-invitado"> 
            <GuestDetails />
          </Col>

          {/* Columna para el resumen de la reserva a la derecha */}
          <Col xs={12} md={3} className="panel-reserva">
           <OrderSummary />
          </Col>
        </Row>
      </Container>
    </>

  );
}

export default DatosReserva