import { EmpLoginNav } from "../components/employeeLoginNav/EmployeeLoginNav"
import { Container } from "react-bootstrap"
import EmpResrvationsFilter from "./components/employeeReservationsFilter/EmployeeReservationsFilter"
 export default function EmpReservations(){
    return(
        <Container fluid className="m-0 p-0">
            <EmpLoginNav/>
            <EmpResrvationsFilter/>
        </Container>
        
    )
    
}