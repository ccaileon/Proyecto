import { useForm } from "react-hook-form";
import axios from "axios";

function FormularioRegistro() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log("📩 Datos enviados desde el frontend:", data);
  
    const formattedData = {
      client_name: data.nombre,
      client_surname_one: data.primerApellido,
      client_surname_two: data.segundoApellido || "",
      client_telephone: data.telefono,
      client_email: data.correo,
      contraseña: data.contraseña // <-- Enviamos la contraseña correctamente
    };
  
    try {
      const response = await axios.post("http://localhost:3000/api/clients", formattedData);
      console.log("✅ Registro efectuado correctamente:", response.data);
    } catch (error) {
      console.error("❌ Error en el registro:", error);
    }
  };

  return (
    <div className="container">
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nombre *" {...register("nombre", { required: "Este campo es obligatorio" })} /> 
        {errors.nombre && <p>{errors.nombre.message}</p>}

        <input type="text" placeholder="Primer Apellido *" {...register("primerApellido", { required: "Este campo es obligatorio" })} /> 
        {errors.primerApellido && <p>{errors.primerApellido.message}</p>}

        <input type="text" placeholder="Segundo Apellido" {...register("segundoApellido")} />

        <input type="tel" placeholder="Teléfono *" {...register("telefono", { required: "Este campo es obligatorio" })} /> 
        {errors.telefono && <p>{errors.telefono.message}</p>}

        <input type="email" placeholder="Correo Electrónico *" {...register("correo", { required: "Este campo es obligatorio" })} />
        {errors.correo && <p>{errors.correo.message}</p>}

        <input type="password" placeholder="Contraseña *" {...register("contraseña", { required: "Este campo es obligatorio" })} />
        {errors.contraseña && <p>{errors.contraseña.message}</p>}

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}

export default FormularioRegistro;
