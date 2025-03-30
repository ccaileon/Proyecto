import { Container, Row, Col, Card } from "react-bootstrap";
import "./orderSummary.css";

function OrderSummary() {
// AQUI VA LA LÓGICA QUE RECUPERA LOS DETALLES DE LA RESERVA DE LA HABITACIÓN
  return(
<Container className="resumen">
<h3>Resumen de la reserva</h3>
<hr />
<img src="src\assets\img\imgHabitaciones\plus\habitacion-plus.jpg" width="100%"></img> {/* IMAGEN DE LA HABITACIÓN CORRESPONDIENTE */}
<Card className="resumenReserva">
        <Card.Body>
          <Row>
            <Col xs={6}><strong>Tipo de habitación</strong></Col>
            <Col xs={6}>tipoHabitacion</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Fecha de entrada</strong></Col>
            <Col xs={6}>fechaEntrada</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Fecha de salida</strong></Col>
            <Col xs={6}>fechaSalida</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Núm. Noches</strong></Col>
            <Col xs={6}>noches</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Núm. Invitados</strong></Col>
            <Col xs={6}>invitados</Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6}><strong>Tarifa tarifaAdultos Adultos</strong></Col>
            <Col xs={6}>precioAdultos€</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Tarifa tarifaNinos Niños</strong></Col>
            <Col xs={6}>precioNinos€</Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6}><strong>Subtotal</strong></Col>
            <Col xs={6}>subtotal€</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>IVA 21%</strong></Col>
            <Col xs={6}>reservaIVA€</Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6}><h4><strong>Total</strong></h4></Col>
            <Col xs={6}><h4><strong>reservatotal€</strong></h4></Col>
          </Row>
        </Card.Body>
      </Card>
</Container>
  );
}

export default OrderSummary