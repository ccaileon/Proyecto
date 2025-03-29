import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import "./panelUsuario.css";

function PanelUsuario() {
  return(
    <Container fluid className="sidebar">
      <NavLink to="/datos" className="menu-item">Mi Cuenta</NavLink>
      <NavLink to="/reservas" className="menu-item">Mis Reservas</NavLink>
      <NavLink to="/recompensas" className="menu-item">Recompensas</NavLink>
      <NavLink to="/preferencias" className="menu-item">Preferencias</NavLink>
    </Container>
  );
}

export default PanelUsuario