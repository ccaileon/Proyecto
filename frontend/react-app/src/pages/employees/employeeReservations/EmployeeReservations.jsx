import { EmpLoginNav } from "../components/employeeLoginNav/EmployeeLoginNav"
import { Container } from "react-bootstrap";
import EmpResrvationsFilter from "./components/employeeReservationsFilter/EmployeeReservationsFilter";
import EmpReservationsList from "./components/employeeReservationsList/EmployeeReservationsList";
import "./employeeReservations.css";
 export default function EmpReservations(){
    return(
        <Container fluid className="m-0 p-0">
            <EmpLoginNav/>
            <EmpResrvationsFilter />
            <EmpReservationsList className="mt-5"/>
        </Container>
        
    )
    
}