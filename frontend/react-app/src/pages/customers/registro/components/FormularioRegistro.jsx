import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { Container, Form, Button } from 'react-bootstrap';

// Crear la instancia personalizada de SweetAlert con ReactContent
const alert = withReactContent(Swal);

function FormularioRegistro() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("📩 Datos enviados desde el frontend:", data);

    const formattedData = {
      client_name: data.nombre,
      client_surname_one: data.primerApellido,
      client_surname_two: data.segundoApellido || "",
      client_telephone: data.telefono,
      client_email: data.correo,
      password: data.clave // <-- Enviamos la contraseña correctamente
    };

    try {
      const response = await axios.post("http://localhost:3000/api/clients", formattedData);
      console.log("✅ Registro efectuado correctamente:", response.data);

      if (response.status === 200 || response.status === 201) {
        // Usar MySwal para la alerta con ReactContent
        alert.fire({
          title: 'Registro completado',
          text: 'Va a ser redirigido.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
            console.log("✅ Redirigiendo al usuario a la página de inicio de sesión");
          }
        });
      } else {
        console.error("❌ El registro no fue exitoso, código de estado:", response.status);
      }

    } catch (error) {
      console.error("❌ Error en el registro:", error);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center">Formulario de Registro</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Form.Group controlId="formNombre">
          <Form.Control 
            type="text" 
            placeholder="Nombre *"
            {...register("nombre", { required: "Este campo es obligatorio" })} 
          />
          {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
        </Form.Group>

        <Form.Group controlId="formPrimerApellido">
          <Form.Control 
            type="text" 
            placeholder="Primer Apellido *"
            {...register("primerApellido", { required: "Este campo es obligatorio" })} 
          />
          {errors.primerApellido && <p className="text-danger">{errors.primerApellido.message}</p>}
        </Form.Group>

        <Form.Group controlId="formSegundoApellido">
          <Form.Control 
            type="text" 
            placeholder="Segundo Apellido"
            {...register("segundoApellido")} 
          />
        </Form.Group>

        <Form.Group controlId="formTelefono">
          <Form.Control 
            type="tel" 
            placeholder="Teléfono *"
            {...register("telefono", { required: "Este campo es obligatorio" })} 
          />
          {errors.telefono && <p className="text-danger">{errors.telefono.message}</p>}
        </Form.Group>

        <Form.Group controlId="formCorreo">
          <Form.Control 
            type="email" 
            placeholder="Correo Electrónico *"
            {...register("correo", { required: "Este campo es obligatorio" })} 
          />
          {errors.correo && <p className="text-danger">{errors.correo.message}</p>}
        </Form.Group>

        <Form.Group controlId="formContraseña">
          <Form.Control 
            type="password" 
            placeholder="Contraseña *"
            {...register("clave", { required: "Este campo es obligatorio" })} 
          />
          {errors.contraseña && <p className="text-danger">{errors.contraseña.message}</p>}
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4 w-100">
          Registrarme
        </Button>
      </Form>
    </Container>
  );
}

export default FormularioRegistro;

