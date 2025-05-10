import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./orderSummary.css";

function OrderSummary() {
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("reservaData"));
    if (data) setReserva(data);
  }, []);

  if (!reserva) return <p>Cargando datos...</p>;

  const { room, checkIn, checkOut, adults, children } = reserva;

  const calcularNoches = (entrada, salida) => {
    const f1 = new Date(entrada);
    const f2 = new Date(salida);
    const diff = Math.abs(f2 - f1);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const noches = calcularNoches(checkIn, checkOut);
  const precioAdultos = 50;
  const precioNinos = 25;
  const subtotal = (adults * precioAdultos + children * precioNinos) * noches;
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  const titulos = {
    "standard": "Habitación Estándar",
    "standard-family": "Habitación Familiar Estándar",
    "plus": "Habitación Brisa",
    "plus-family": "Habitación Familiar Brisa",
    "suite": "Suite de Lujo",
    "suite-family": "Suite Familiar de Lujo",
  };
const titulo = titulos[room.room_type] || "Habitación No Definida";

  return (
    <Container className="resumen">
      <h3>Resumen de la reserva</h3>
      <hr />
      <img
        src={`src/assets/img/imgHabitaciones/rooms/${room.room_type}.jpg`}
        width="100%"
        alt="Habitación seleccionada"
        className="img-borde"
      />
      <Card className="resumenReserva">
        <Card.Body>
          <Row>
            <Col xs={6}><strong>Tipo de habitación</strong></Col>
            <Col xs={6}>{titulo}</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Fecha de entrada</strong></Col>
            <Col xs={6}>{checkIn}</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Fecha de salida</strong></Col>
            <Col xs={6}>{checkOut}</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Núm. Noches</strong></Col>
            <Col xs={6}>{noches}</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Núm. Invitados</strong></Col>
            <Col xs={6}>{adults} adultos, {children} niños</Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6}><strong>Tarifa Adultos</strong></Col>
            <Col xs={6}>{precioAdultos}€</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>Tarifa Niños</strong></Col>
            <Col xs={6}>{precioNinos}€</Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6}><strong>Subtotal</strong></Col>
            <Col xs={6}>{subtotal}€</Col>
          </Row>
          <Row>
            <Col xs={6}><strong>IVA 21%</strong></Col>
            <Col xs={6}>{iva.toFixed(2)}€</Col>
          </Row>
          <hr />
          <Row>
            <Col xs={6}><h4><strong>Total</strong></h4></Col>
            <Col xs={6}><h4><strong>{total.toFixed(2)}€</strong></h4></Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default OrderSummary;
