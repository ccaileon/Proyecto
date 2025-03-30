import { Form } from "react-bootstrap";
import VentanaPago from "./VentanaPago";
import { useState } from "react";

function GuestDetails() {

  const [showModal, setShowModal] = useState(false);

  return(
<>
<h1>Datos del invitado</h1>
<hr />
<Form>
<Form.Group>
  <Form.Control
  type="text"
  placeholder="Nombre *">
  </Form.Control>
</Form.Group>
<Form.Group>
  <Form.Control
  type="text"
  placeholder="Primer Apellido *">
  </Form.Control>
</Form.Group>
<Form.Group>
  <Form.Control
  type="text"
  placeholder="Segundo Apellido">
  </Form.Control>
</Form.Group>
<Form.Group>
  <Form.Control
  type="number"
  placeholder="Teléfono *">
  </Form.Control>
</Form.Group>
<Form.Group>
  <Form.Control
  type="email"
  placeholder="Correo Electrónico *">
  </Form.Control>
</Form.Group>
</Form>

<h1>Preferencias de la Reserva</h1>
<hr />
<Form.Group>
  <Form.Check
    type="radio"
    label="Cama Individual"
    name="tipoCama"
    id="cama-individual"
  />
</Form.Group>

<Form.Group>
  <Form.Check
    type="radio"
    label="Cama Doble"
    name="tipoCama"
    id="cama-doble"
  />
</Form.Group>
<Form.Group>
  <Form.Control
  type="text-area"
  placeholder="Escriba sus comentarios aqui">
  </Form.Control>
</Form.Group>

{/* Ventana Emergente de Pago */}

<VentanaPago show={showModal} onClose={() => setShowModal(false)} />


</>


  );
}

export default GuestDetails