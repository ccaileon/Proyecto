import EmpLoginForm from "../components/employeeForm/EmpLoginForm";
import EmpBackground from "../components/employeeBackground/EmpBackground";
import {useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { EmpLoginNav } from "../components/employeeLoginNav/EmployeeLoginNav";
import { useNavigate } from "react-router-dom";
const EmployeeLogin = ()=>{
    const navigate = useNavigate();
      const [userName, setUserName] = useState("");
    
      useEffect(() => {
        const storedUser = sessionStorage.getItem("User");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUserName(userData.name);
        }
      }, []);
      if (userName){
        navigate("/employee/menu")
      }else{
        return (
            <Container fluid className="justify-content-center align-content-top min-vh-100 min-wh-100 w-auto h-auto d-block p-0 m-0">
                <EmpLoginNav/>
                <EmpLoginForm/>
                <EmpBackground/>
            </Container>    
        )
      }
    
}
export default EmployeeLogin