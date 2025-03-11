import { NavLink } from "react-router-dom";
import "./menu.css";
import Search from "./Search";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

function Menu() {

  return(
<Navbar expand="lg" bg="light" className="bg-body-tertiary">
  <Container fluid className="navbar-custom">
    <Navbar.Brand as={NavLink} to="/Inicio">
      <img src="public\logotipo.png" width="60px" alt="Logo" />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbarNav" />
    <Navbar.Collapse id="navbarNav" className="d-flex justify-content-start">
      <Nav className="navbar-nav mx-auto">
        <Nav.Link as={NavLink} to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Inicio
        </Nav.Link>
        <Nav.Link as={NavLink} to="/Habitaciones" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Habitaciones
        </Nav.Link>
        <Nav.Link as={NavLink} to="/Servicios" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Servicios
        </Nav.Link>
        <Nav.Link as={NavLink} to="/Contacto" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Contacto
        </Nav.Link>
        
      </Nav>
    </Navbar.Collapse>


    <div className="ms-auto d-flex cuerpo-buscador">
      <Search />
    </div>
      </Container>
<Dropdown align="end" className="nav-item">
          <Dropdown.Toggle variant="link" id="dropdown-user" className="nav-link">
            <img src="public\user.png" width="30px" alt="User" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/login">Iniciar Sesión</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/registro">Registro</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
  
</Navbar>


  );
}
export default Menu