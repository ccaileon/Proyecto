import PropTypes from 'prop-types';
import { Offcanvas, Form, Button } from 'react-bootstrap';

export function EmpReservationOffCanvas({ show, onHide, reservation }) {
  if (!reservation) return null;

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios realizados en la reserva
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Detalles de la Reserva</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formIdReserva">
            <Form.Label>Nº Reserva</Form.Label>
            <Form.Control type="text" defaultValue={reservation.idReserva} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIdRoom">
            <Form.Label>Nº Habitación</Form.Label>
            <Form.Control type="text" defaultValue={reservation.idRoom} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNameRes">
            <Form.Label>Nombre Reserva</Form.Label>
            <Form.Control type="text" defaultValue={reservation.nameRes} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDateIn">
            <Form.Label>Fecha Check In</Form.Label>
            <Form.Control type="date" defaultValue={reservation.dateIn} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDateOut">
            <Form.Label>Fecha Check Out</Form.Label>
            <Form.Control type="date" defaultValue={reservation.dateOut} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formState">
            <Form.Label>Estado</Form.Label>
            <Form.Control type="text" defaultValue={reservation.state} />
          </Form.Group>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
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