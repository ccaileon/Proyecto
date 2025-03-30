import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./formulario.css";

const alert = withReactContent(Swal);

function FormularioLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("📩 Datos enviados al backend:", data);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        client_email: data.email,
        password: data.password, // Enviar la contraseña ingresada
      });

      console.log("✅ Login exitoso:", response.data);

      if (response.status === 200) {
        alert.fire({
          title: "Inicio de sesión exitoso",
          text: "Bienvenido de nuevo",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          navigate("/dashboard"); // Redirigir a otra página después del login
        });
      }
    } catch (error) {
      console.error("❌ Error en el inicio de sesión:", error);
      alert.fire({
        title: "Error",
        text: "Correo o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
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
        <Link to="/Registro">Recuperar</Link>.
      </p>
    </Container>
  );
}

export default FormularioLogin;

