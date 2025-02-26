import { Link } from "react-router-dom";
import "./formulario.css"

function Formulario() {
  return(
    <div className="container">
<h1>Iniciar Sesión</h1>
<form>
  <input type="email" placeholder="Correo Electrónico" />
   <input type="password" placeholder="Contraseña" />
   <input type="submit" value="Iniciar Sesión" />
</form>
<p>   ¿Aún no tienes una cuenta?{" "}
        <Link to="/Registro">Regístrate</Link>.</p>
    </div>
  );
}

export default Formulario