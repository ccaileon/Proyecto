import { Container } from "react-bootstrap";


function TerminosCondiciones() {

  return (
<Container className="terminos">
<h1>Términos y Condiciones</h1>
<h2>Reservas y Pagos</h2>
<p><ul>
  <li>Las reservas se realizan a través de nuestro sitio web o contacto directo.</li>
  <li>Se requiere un pago parcial o total según la política vigente.</li></ul></p>

<h2>Política de Cancelación</h2>
<p><ul>
  <li>Cancelaciones hasta 48 horas antes del check-in: reembolso total.</li>
  <li>Cancelaciones tardías o no presentación: sin reembolso.</li></ul></p>


<h2>Condiciones de Uso del Spa</h2>
<p><ul>
  <li>Se recomienda reserva previa para tratamientos.</li>
  <li>El uso de las instalaciones está sujeto a normas de higiene y seguridad.</li></ul></p>

<h2>Responsabilidad del Cliente</h2>
<p>El cliente es responsable de los daños ocasionados en las instalaciones.</p>

<h2>Jurisdicción</h2>
<p>Cualquier disputa se resolverá en los tribunales de Almería, España.</p>


</Container>

  );
}

export default TerminosCondiciones