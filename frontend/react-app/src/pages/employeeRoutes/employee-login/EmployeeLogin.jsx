import EmpLoginForm from "../components/emp-login-form/EmpLoginForm";
import EmpBackground from "../components/emp-background/EmpBackground";
import { Container } from "react-bootstrap";
const EmployeeLogin = ()=>{
    return (
        <Container fluid className="justify-content-center align-items-center w-100 h-100 d-flex">
        <EmpLoginForm/>
        <EmpBackground/>
        </Container>    
    )
}
export default EmployeeLogin