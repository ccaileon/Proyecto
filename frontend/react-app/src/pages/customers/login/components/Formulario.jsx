import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./formulario.css";

const alert = withReactContent(Swal);

function FormularioLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Estados para controlar la visibilidad del modal y el email de recuperación
  const [showModal, setShowModal] = useState(false);
  const [emailRecover, setEmailRecover] = useState("");

  const onSubmit = async (data) => {
    console.log("📩 Datos enviados al backend:", data);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        client_email: data.email,
        password: data.password, // Enviar la contraseña ingresada
      });

      console.log("✅ Login exitoso:", response.data);

      if (response.status === 200) {

        sessionStorage.setItem("clientToken", response.data.token);
        sessionStorage.setItem("clientUser", JSON.stringify(response.data.user));
        
        console.log("🔑 Token almacenado en sessionStorage:", response.data.token);

        alert.fire({
          title: "Inicio de sesión exitoso",
          text: "Bienvenido de nuevo",
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: 'btn'
          }
        }).then(() => {
          navigate("/"); // Redirigir a otra página después del login
        });
      }
    } catch (error) {
      console.error("❌ Error en el inicio de sesión:", error);
      alert.fire({
        title: "Error",
        text: "Correo o contraseña incorrectos.",
        icon: "error",
        confirmButtonText: "Volver",
        customClass: {
            confirmButton: 'btn'
          }
      });
    }
  };

  // Funciones modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Función ficticia para la recuperación de contraseña con validación de email
  const handleRecoverPassword = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Expresión regular básica para validar un email
    if (emailRecover && emailRegex.test(emailRecover)) {
      alert.fire({
        title: "Recuperación de contraseña",
        text: "Te hemos enviado un correo para recuperar tu contraseña.",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: 'btn'
        }
      });
      handleCloseModal(); // Cerrar el modal tras enviar el correo ficticio
    } else {
      alert.fire({
        title: "Error",
        text: "Por favor, ingresa un correo electrónico válido.",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: 'btn'
        }
      });
    }
  };

  return (
    <Container className="mt-5  mb-10">
      <h1>Iniciar Sesión</h1>
      <div className="d-flex">
        <Form className="formulario-inicio" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formEmail">
            <Form.Control 
              type="email" 
              placeholder="Correo Electrónico" 
              {...register("email", { required: "Este campo es obligatorio" })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Control 
              type="password" 
              placeholder="Contraseña" 
              {...register("password", { required: "Este campo es obligatorio" })}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </Form.Group>

          <Button variant="btn" type="submit" className="mt-4 w-100">
            Iniciar Sesión
          </Button>
        </Form>
      </div>

       <p className="mt-3 p-4">
        ¿Has olvidado la contraseña?{" "}
        <Button variant="link" onClick={handleShowModal}>Recuperar</Button>
      </p>

      {/* Modal para recuperar contraseña */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmailRecover">
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={emailRecover}
                onChange={(e) => setEmailRecover(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn" onClick={handleRecoverPassword}>
            Recuperar Contraseña
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default FormularioLogin;


