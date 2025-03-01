import { Link } from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap'; // Importa los componentes necesarios
import './formulario.css';

function Formulario() {
  return (
    <Container className="mt-5">
      <h1 className="text-center">Iniciar Sesión</h1>
      <Container className="d-flex justify-content-center align-items-center">
      <Form className="formulario-inicio p-4 border rounded shadow bg-light">
        {/* Campo de correo electrónico */}
        <Form.Group controlId="formEmail">

          <Form.Control type="email" placeholder="Correo Electrónico" />
        </Form.Group>

        {/* Campo de contraseña */}
        <Form.Group controlId="formPassword" className="mt-3">

          <Form.Control type="password" placeholder="Contraseña" />
        </Form.Group>

        {/* Botón de inicio de sesión */}
        <Button variant="primary" type="submit" className="mt-4 w-100">
          Iniciar Sesión
        </Button>
      </Form>
</Container>
      {/* Enlace de registro */}
      <p className="text-center mt-3">
        ¿Aún no tienes una cuenta?{" "}
        <Link to="/Registro">Regístrate</Link>.
      </p>
    </Container>
  );
}

export default Formulario;
