import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";

export function EmpReservationOffCanvas({ show, onHide, reservation }) {
    // 🔄 Cargar todas las reservas al montar el componente
    const [reservaCargada, setReservaCargada] = useState(null);
    const [dateIn, setDateIn] = useState(null);
    const [dateOut, setDateOut] = useState(null);
    const [estadoReserva, setEstadoReserva] = useState(""); // Estado de la reserva seleccionado
    const formatDate = (isoDate) => {
      if (!isoDate) return "Fecha inválida";
      const date = new Date(isoDate);
      return date.toLocaleDateString("en-CA", { year: "numeric" , month: "2-digit", day: "2-digit"});
    };

    useEffect(() => {      
      const fetchReservation = async () => {  
        if (!reservation?.idReserva) return;
          const token = sessionStorage.getItem("Token");
          const response = await fetch(`http://localhost:3000/api/reservations/${reservation.idReserva}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error("No se pudo obtener la reserva");
          }
          const data = await response.json();
          setReservaCargada(data);
          setDateIn(formatDate(data.res_checkin));
          setDateOut(formatDate(data.res_checkout));
          setEstadoReserva(data.state || ""); // Asigna el estado de la reserva al cargar
      };

      fetchReservation();
    }, [reservation]);

    // Función para guardar los cambios de estado
    const handleSaveChanges = async () => {
      try {
        const token = sessionStorage.getItem("Token");
        const response = await axios.put(
          `http://localhost:3000/api/reservations/${reservaCargada?.res_id}/status`,
          {
            status: estadoReserva, // Envía el estado seleccionado
            employeeId: 2, // Asumiendo que el empleado es el id 2
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        onHide(); // Cierra el offcanvas después de guardar
      } catch (error) {
        console.error("❌ Error al guardar cambios de estado:", error);
      }
    };

    if (!reservation || !reservation.idReserva || !reservaCargada) {
      return null; // o un loader/spinner bonito
    }

    return (
      <Offcanvas show={show} onHide={onHide} placement="end" className="w-100">
        <Offcanvas.Header className="border-bottom" closeButton>
          <Col xs="2" className="m-1">
            <Offcanvas.Title>Reserva número: {reservaCargada?.res_id || ""}</Offcanvas.Title>
          </Col>
          <Col xs="2" className="m-1">
            <Offcanvas.Title>Estado: {reservaCargada?.state || ""}</Offcanvas.Title>
          </Col>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row>
              <Col xs="auto">
                <Button variant="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
              </Col>
              <Col xs="auto">
                <Form.Select
                  aria-label="Estado de la reserva"
                  value={estadoReserva}
                  onChange={(e) => setEstadoReserva(e.target.value)} // Cambiar el estado
                >
                  <option>Estado de la reserva</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Check In Realizado">Check In Realizado</option>
                  <option value="Check Out Realizado">Check Out Realizado</option>
                  <option value="Reserva Cerrada">Reserva Cerrada</option>
                </Form.Select>
              </Col>
            </Row>
            {/* Información del cliente */}
            <h3>Información del cliente:</h3>
            <Row className="align-items-center mb-3">
              <Col xs="auto">
                <Form.Group controlId="formNameClient" className="align-items-center">
                  <Form.Label className="me-2">Nombre de cliente:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.client_name || ""} readOnly />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formSurnameOneClient" className="align-items-center">
                  <Form.Label className="me-2">1º apellido:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.client_surname_one || ""} readOnly />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formSurnameTwoClient" className="align-items-center">
                  <Form.Label className="me-2">2º apellido:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.client_surname_two || ""} readOnly />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center border-bottom pb-3 mb-3">
              <Col xs="auto">
                <Form.Group controlId="formTypeDoc">
                  <Form.Label className="me-2">Tipo de documento:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.client_doc_type || ""} readOnly />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formIdDoc">
                  <Form.Label className="me-2">Nº documento:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.client_doc_id || ""} readOnly />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formPrefix">
                  <Form.Label className="me-2">Prefijo:</Form.Label>
                  <Form.Control type="text" defaultValue="NO ESTA DEFINIDO" readOnly />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formPhoneNum">
                  <Form.Label className="me-2">Número de contacto:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.client_telephone || ""} readOnly />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formEmail">
                  <Form.Label className="me-2">Email de contacto:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.client_email || ""} readOnly />
                </Form.Group>
              </Col>
            </Row>
            {/* Información de la habitación */}
            <Row className="align-items-center border-bottom pb-3 mb-3">
              <h3>Información de la habitación</h3>
              <Col xs="auto">
                <Form.Group controlId="formRoomId">
                  <Form.Label className="me-2">Habitación asignada:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.res_room_id || ""}/>
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formRoom">
                  <Form.Label className="me-2">Tipo de habitación:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.room_type || ""} readOnly/>
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formRoom">
                  <Form.Label className="me-2">Preferencia cama:</Form.Label>
                  <Form.Control type="text" defaultValue={reservaCargada?.res_wants_double === 1 ? "Si" : "No"} readOnly/>
                </Form.Group>
              </Col>
            </Row>
            {/* Observaciones */}
            <Row>
              <Form.Group controlId="formObersvations">
                <Form.Label className="me-2">Observaciones:</Form.Label>
                <Form.Control type="text" defaultValue={reservaCargada?.res_observations || ""} readOnly/>
              </Form.Group>
            </Row>
            {/* Gestión de reserva */}
            <Row className="align-items-center pb-3">
              <h3>Gestión de reserva:</h3>
              <Col xs="auto">
                <Form.Group controlId="formDateCheckin">
                  <Form.Label className="me-2">Fecha checkin:</Form.Label>
                  <Form.Control type="date" value={dateIn || ""} onChange={(e) => setDateIn(e.target.value)}/>
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formDateCheckout">
                  <Form.Label className="me-2">Fecha checkout:</Form.Label>
                  <Form.Control type="date" value={dateOut || ""} onChange={(e) => setDateOut(e.target.value)}/>
                </Form.Group>
              </Col>
            </Row>
            {/* Subir documentos */}
            <Row className="align-items-center border-bottom pb-3">
              <Col xs="auto">
                <Form.Group controlId="formDocumentOne">
                  <Form.Label className="me-2">Subir documento 1:</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formDocumentTwo">
                  <Form.Label className="me-2">Subir documento 2:</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Form.Group controlId="formDocumentThree">
                  <Form.Label className="me-2">Subir documento 3:</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    );
}

EmpReservationOffCanvas.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    idReserva: PropTypes.string.isRequired,
  }),
};
