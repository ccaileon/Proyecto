import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import "./panelUsuario.css";
import Logout from "./Logout";

function PanelUsuario() {
  return(
    <Container fluid className="sidebar">

      <NavLink to="/datos" className="menu-item">Mi Cuenta</NavLink>
      <NavLink to="/reservas" className="menu-item">Mis Reservas</NavLink>
      <NavLink to="/recompensas" className="menu-item">Recompensas</NavLink>
      <NavLink to="/preferencias" className="menu-item">Preferencias</NavLink>
      <div className="mt-5"><Logout /></div>
    </Container>
  );
}

export default PanelUsuario