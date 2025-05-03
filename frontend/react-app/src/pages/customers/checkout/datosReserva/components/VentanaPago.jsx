import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./ventanaPago.css";

const VentanaPago = ({ guestData }) => {
  const [show, setShow] = useState(false);
  const [sending, setSending] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
  
    if (!guestData.surname_one || !guestData.email || !guestData.phone || !guestData.bed_type) {
      alert("Por favor, completa todos los datos del invitado.");
      setSending(false);
      return;
    }
  
    try {
      const roomId = sessionStorage.getItem("selectedRoomId");
      const hotelId = sessionStorage.getItem("hotelId") || 1;
      const checkin = sessionStorage.getItem("checkin");
      const checkout = sessionStorage.getItem("checkout");
      const empId = sessionStorage.getItem("employeeId") || 2;
  
      const reservaResumen = JSON.parse(sessionStorage.getItem("reservaData"));
      const noches = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
      const adults = Number(reservaResumen?.adults || 0);
      const children = Number(reservaResumen?.children || 0);
      const subtotal = (adults * 50 + children * 25) * noches;
      const total = subtotal * 1.21;
  
      const payload = {
        res_room_id: Number(roomId),
        res_room_hotel_id: Number(hotelId),
        res_checkin: checkin,
        res_checkout: checkout,
        res_checkin_by: Number(empId),
        res_checkout_by: Number(empId),
        res_observations: guestData.comment || "",
        invoiceData: {
          invoice_total_price: total.toFixed(2),
          invoice_details: `Habitación ${reservaResumen.room.room_type}, ${adults} adultos, ${children} niños, ${noches} noches`,
          invoice_pay_method: "tarjeta",
          invoice_points_used: 0
        }
      };
  
      const token = sessionStorage.getItem("clientToken");
      const isClient = !!token;
  
      let endpoint = "http://localhost:3000/api/reservations/guest";
      let headers = {};
  
      if (isClient) {
        endpoint = "http://localhost:3000/api/reservations/client";
        headers = {
          Authorization: `Bearer ${token}`,
        };
      } else {
        // Si es invitado, agregar sus datos personales
        payload.guest_name = guestData.name;
        payload.guest_lastname = guestData.surname_one || "Sin Apellido";
        payload.guest_email = guestData.email || "no-email@hotel.com";
        payload.guest_phone = guestData.phone || "000000000";
        payload.guest_preferences = guestData.bed_type || "individual";
      }
  
      console.log("📦 Payload que se enviará al backend:", payload);
      const response = await axios.post(endpoint, payload, { headers });
  
      console.log("✅ Reserva completada:", response.data);
      alert("✅ Reserva confirmada correctamente");
      handleClose();
    } catch (error) {
      console.error("❌ Error creando la reserva:", error.response?.data || error.message);
      alert("❌ Error creando la reserva. Revisa los datos.");
    } finally {
      setSending(false);
    }
  };
  

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Proceder con el Pago
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Pago con Tarjeta</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>Detalles de Pago</h5>
          <Form onSubmit={handlePaymentSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre en la tarjeta</Form.Label>
              <Form.Control type="text" placeholder="Ej: Juan Pérez" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Número de tarjeta{" "}
                <img
                  src="src/assets/img/imgVentanaPago/pago.png"
                  width="30%"
                  alt="tarjetas"
                />
              </Form.Label>
              <Form.Control type="text" placeholder="**** **** **** ****" maxLength="19" required />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Expiración</Form.Label>
                  <Form.Control type="text" placeholder="MM/YY" maxLength="5" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CVC</Form.Label>
                  <Form.Control type="text" placeholder="123" maxLength="3" required />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="success" className="w-100" type="submit" disabled={sending}>
              {sending ? "Procesando..." : "Pagar Ahora"}
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={sending}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VentanaPago;

VentanaPago.propTypes = {
  guestData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname_one: PropTypes.string.isRequired,
    surname_two: PropTypes.string,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    bed_type: PropTypes.string.isRequired,
    comment: PropTypes.string
  }).isRequired
};

