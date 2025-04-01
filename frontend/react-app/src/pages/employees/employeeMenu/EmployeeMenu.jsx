import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button} from "react-bootstrap";
import { EmpLoginNav } from "../components/employeeLoginNav/EmployeeLoginNav";
import { EmpMenuCard}  from "../components/employeeMenuCard/EmployeeMenuCard";
import EmpBackground from "../components/employeeBackground/EmpBackground";
import "./employeeMenu.css";
const EmployeeMenu = ()=> {
  const navigate = useNavigate();

const handleLogout = () => {
  sessionStorage.clear(); // 🔐 Borra la sesión
  navigate("/employee"); // 🔁 Redirige al login
};

  
  return (
    <Container fluid className="justify-content-center min-vh-100 min-wh-100 w-100 p-0 m-0">
        <EmpLoginNav/>
        <Row id="employee-menu-row" className="min-wh-100 min-vh-100 m-0 p-0 justify-content-center text-center  align-items-center">
          <Col  >     
            <EmpMenuCard
            title="Gestionar reservas"
            imageUrl="https://www.grupobillingham.com/blog/wp-content/uploads/2022/12/planner-agenda-calendario.jpg"
            route="/employee/:menu/reservations"
            />
          </Col>
          <Col >
            <EmpMenuCard
            title="Gestionar habitaciones"
            imageUrl="https://i.ibb.co/0jyKWY0Z/pexels-photo-164595.jpg"
            route="/employee/:menu/rooms"/>
          </Col>
        </Row>
  


    </Container>
      
  )
}

export default EmployeeMenu;  