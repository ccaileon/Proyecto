import { NavLink } from "react-router-dom";
import { useState } from 'react';
import "./menu.css";
import Search from "./Search";
import { Navbar, Nav, Container } from "react-bootstrap";

function Menu() {
const [isLoggedIn, setIsLoggedIn] = useState(false); // Lógica de conexión va aquí (comprobar si el usuario está conectado)

  return(
<Navbar expand="lg" bg="light" className="bg-body-tertiary menu">
  <Container fluid className="navbar-custom">
    <Navbar.Brand as={NavLink} to="/">
      <img src="/logotipo.png" width="60px" alt="Logo" />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbarNav" />
    <Navbar.Collapse id="navbarNav" className="d-flex justify-content-start">
      <Nav className="navbar-nav mx-auto">
        <Nav.Link as={NavLink} to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Inicio
        </Nav.Link>
        <Nav.Link as={NavLink} to="/habitaciones" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Habitaciones
        </Nav.Link>
        <Nav.Link as={NavLink} to="/servicios" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Servicios
        </Nav.Link>
        <Nav.Link as={NavLink} to="/contacto" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Contacto
        </Nav.Link>
        
      </Nav>
    </Navbar.Collapse>


    <div className="ms-auto d-flex cuerpo-buscador">
      <Search />
    </div>
      </Container>

        <NavLink to={isLoggedIn ? "/datos" : "/login"} className="nav-link me-4">
  <img src="/user.png" width="30px" alt="Iniciar Sesión" className="user-icon"/>
</NavLink>
  
</Navbar>


  );
}
export default Menu