import EmpLoginForm from "../components/employeeForm/EmpLoginForm";
import EmpBackground from "../components/employeeBackground/EmpBackground";
import { Container } from "react-bootstrap";
import { EmpLoginNav } from "../components/employeeLoginNav/EmployeeLoginNav";
const EmployeeLogin = ()=>{
    return (
        <Container fluid className="justify-content-center align-content-top min-vh-100 min-wh-100 w-auto h-auto d-block p-0 m-0">
            <EmpLoginNav/>
            <EmpLoginForm/>
            <EmpBackground/>
        </Container>    
    )
}
export default EmployeeLogin