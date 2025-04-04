import { useState, useEffect } from "react";  // Importar useEffect para realizar la acción al cargar el componente
import { Form } from "react-bootstrap";
import VentanaPago from "./VentanaPago";

function GuestDetails() {
  const [showModal, setShowModal] = useState(false);

  // Estado para los campos del formulario
  const [guestData, setGuestData] = useState({
    name: "",
    surname_one: "",
    surname_two: "",
    phone: "",
    email: "",
    bed_type: "", // "individual" o "doble"
    comment: ""
  });

  // Obtener los datos del usuario del sessionStorage
  useEffect(() => {
    const client = JSON.parse(sessionStorage.getItem("clientUser"));
    if (client) {
      setGuestData({
        name: client.name || "",
        surname_one: client.surname_one || "",
        surname_two: client.surname_two || "",
        phone: client.phone || "",
        email: client.email || "",
        bed_type: "", // Aquí puedes dejarlo vacío, ya que no se obtiene de sessionStorage
        comment: "" // Similarmente, aquí puedes dejarlo vacío
      });
    }
  }, []); // Se ejecuta solo una vez al cargar el componente

  // Función para actualizar datos del invitado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuestData({ ...guestData, [name]: value });
  };

  return (
    <>
      <h1>Datos del invitado</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nombre *"
            value={guestData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="surname_one"
            placeholder="Primer Apellido *"
            value={guestData.surname_one}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="surname_two"
            placeholder="Segundo Apellido"
            value={guestData.surname_two}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            name="phone"
            placeholder="Teléfono *"
            value={guestData.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            placeholder="Correo Electrónico *"
            value={guestData.email}
            onChange={handleChange}
          />
        </Form.Group><br />

        <h1>Preferencias de la Reserva</h1>
        <hr />
        <Form.Group>
          <Form.Check
            type="radio"
            label="Cama Individual"
            name="bed_type"
            value="individual"
            checked={guestData.bed_type === "individual"}
            onChange={handleChange}
            id="cama-individual"
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            type="radio"
            label="Cama Doble"
            name="bed_type"
            value="doble"
            checked={guestData.bed_type === "doble"}
            onChange={handleChange}
            id="cama-doble"
          />
        </Form.Group><br />

        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            name="comment"
            placeholder="Escriba sus comentarios aquí"
            value={guestData.comment}
            onChange={handleChange}
          /><br />
        </Form.Group>
      </Form>

      {/* Ventana Emergente de Pago */}
      <VentanaPago 
  show={showModal} 
  onClose={() => setShowModal(false)} 
  guestData={guestData}
/>
    </>
  );
}

export default GuestDetails;
