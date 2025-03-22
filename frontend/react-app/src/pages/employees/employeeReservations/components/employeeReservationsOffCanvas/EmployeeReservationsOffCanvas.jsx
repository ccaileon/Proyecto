import PropTypes from 'prop-types';
import { Offcanvas, Form, Button, Row, Col } from 'react-bootstrap';

export function EmpReservationOffCanvas({ show, onHide, reservation }) {
  if (!reservation) return null;

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios realizados en la reserva
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="w-100">
      <Offcanvas.Header className="border-bottom" closeButton>
        <Col xs="2" className=""><Offcanvas.Title>Reserva número: {reservation.idReserva}</Offcanvas.Title>
        </Col>
        <Col xs="2"><Offcanvas.Title>Estado: Pendiente</Offcanvas.Title>
        </Col>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <Form>
      <Row>
        <Col xs="auto">
          <Button variant="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
        </Col>
        <Col xs="auto">
        <Form.Select aria-label="Default select example">
          <option>Estado de la reserva</option>
          <option value="1">Pendiente</option>
          <option value="2">Check In Realizado</option>
          <option value="3">Check Out Realizado</option>
          <option value="4">Reserva Cerrada</option>
        </Form.Select>
        </Col>

      </Row>
        <h3>Información del cliente:</h3>
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Form.Group controlId="formNameClient" className=" align-items-center">
            <Form.Label className="me-2">Nombre de cliente:</Form.Label>
            <Form.Control type="text" defaultValue="Pepe" readOnly />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formSurnameOneClient" className="align-items-center">
            <Form.Label className="me-2">1º apellido:</Form.Label>
            <Form.Control type="text" defaultValue="Martínez" readOnly />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formSurnameTwoClient" className="align-items-center">
            <Form.Label className="me-2">2º apellido:</Form.Label>
            <Form.Control type="text" defaultValue="Herrero" readOnly />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formNacClient" className="align-items-center">
            <Form.Label className="me-2">Nacionalidad:</Form.Label>
            <Form.Control type="text" defaultValue="Español" readOnly />
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center border-bottom pb-3 mb-3">
        <Col xs="auto">
          <Form.Group controlId="formTypeDoc">
            <Form.Label className="me-2">Tipo de documento:</Form.Label>
            <Form.Control type="text" defaultValue="DNI" readOnly />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formIdDoc">
            <Form.Label className="me-2">Nº documento:</Form.Label>
            <Form.Control type="text" defaultValue="49811244F" readOnly />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formPrefix">
            <Form.Label className="me-2">Prefijo:</Form.Label>
            <Form.Control type="text" defaultValue="0034" readOnly />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formPhoneNum">
            <Form.Label className="me-2">Número de contacto:</Form.Label>
            <Form.Control type="text" defaultValue="620601093" readOnly />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formEmail">
            <Form.Label className="me-2">Email de contacto:</Form.Label>
            <Form.Control type="text" defaultValue="pepe9@gmail.com" readOnly />
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center border-bottom pb-3 mb-3">
        <h3>Información de la habitación</h3>
        <Col xs="auto">
          <Form.Group controlId="formRoomId">
            <Form.Label className="me-2">Habitación asignada:</Form.Label>
            <Form.Control type="text" defaultValue="125"/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formRoom">
            <Form.Label className="me-2">Tipo de habitación:</Form.Label>
            <Form.Control type="text" defaultValue="Habitación estándar" readOnly/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formRoom">
            <Form.Label className="me-2">Preferencia cama:</Form.Label>
            <Form.Control type="text" defaultValue="Doble" readOnly/>
          </Form.Group>
        </Col>
        <Row>
          <Form.Group controlId="formObersvations">
            <Form.Label className="me-2">Observaciones:</Form.Label>
            <Form.Control type="text" defaultValue="-Quiere petalos de rosa y channel número cinco esparcidos por las sábanas" readOnly/>
          </Form.Group>
        </Row>
      </Row>
      <Row className="align-items-center border-bottom pb-3">
        <h3>Gestión de reserva:</h3>
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
    idRoom: PropTypes.string.isRequired,
    nameRes: PropTypes.string.isRequired,
    dateIn: PropTypes.string.isRequired,
    dateOut: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
};