import { NavLink } from "react-router-dom";
import "./navbar.css";
function Navbar() {

  return(
<nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid navbar-custom">
    <NavLink className="navbar-brand" href="#">LOGO</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto d-flex justify-content-center">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/" activeClassName="active">Inicio</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Habitaciones" activeClassName="active">Habitaciones</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Servicios" activeClassName="active">Servicios</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/Contacto" activeClassName="active">Contacto</NavLink>
        </li>
      </ul>
    </div>
    <div>
      <ul className="navbar-nav mx-auto d-flex justify-content-right">
    <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="src\assets\icons\user.png" width="30px" />
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><NavLink className="dropdown-item" to="/login">Iniciar Sesión</NavLink></li>
            <li><NavLink className="dropdown-item" to="/registro">Registro</NavLink></li>
          </ul>
        </li>
        </ul>
    </div>
    
  </div>
</nav>

  );
}
export default Navbar