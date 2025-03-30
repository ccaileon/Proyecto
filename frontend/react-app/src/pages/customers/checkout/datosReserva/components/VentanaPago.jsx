import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "./ventanaPago.css";


const VentanaEmergente = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  <Form>
    {/* Nombre en la tarjeta */}
    <Form.Group className="mb-3">
      <Form.Label>Nombre en la tarjeta</Form.Label>
      <Form.Control type="text" placeholder="Ej: Juan Pérez" required />
    </Form.Group>

    {/* Número de tarjeta */}
    <Form.Group className="mb-3">
      <Form.Label>Número de tarjeta <img src="src\assets\img\imgVentanaPago\pago.png" width="30%"/></Form.Label>
      <Form.Control type="text" placeholder="**** **** **** **** " maxLength="19" required />
    </Form.Group>

    {/* Fecha de expiración y CVC */}
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

    {/* Botón de pago */}
    <Button variant="success" className="w-100" type="submit">
      Pagar Ahora
    </Button>
  </Form>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VentanaEmergente;
