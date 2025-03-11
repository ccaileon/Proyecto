import {EmpLoginError} from "../employeeLoginError/EmployeeLoginError";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "./empLoginForm.css";

const EmpLoginForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [loginError, setLoginError] = useState("");

    const onSubmit = async (data) => {
        setLoginError(""); // Clear previous errors
        console.log("📩 Data sent to backend:", data);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/employee-login", data);
            console.log("✅ Login successful:", response.data);

            // Show a success message (can be replaced with a redirect)
            alert(`Welcome, ${response.data.user.name}`);

            
        } catch (error) {
            console.error("❌ Login error:", error);
            setLoginError("Invalid email or password. Please try again.");
        }
    };

    return (
            <Container className="z-3 position-relative justify-content-center min-wh-100 min-vh-100 h-auto d-flex">    
                <Col xs={12} md={10} lg={8} xl={5}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Label className="mt-2">Email:</Form.Label>  
                                <Form.Control type="email" {...register("email",{ required : "Es necesario un email", maxlength: 100, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Escriba un email válido"}})}/> 
                                {errors.email && (<div>{errors.email.message}</div>)}
                                <Form.Label className="mt-2" >Contraseña:</Form.Label>
                                <Form.Control type="password" {...register("password", {required : "Es necesaria una contraseña", maxlength: 100})}/>
                                {errors.password && (<div>{errors.password.message}</div>)}    
                                <Button disabled={isSubmitting} className="mt-3 border-0" type="submit">{isSubmitting ? "Cargando..." : "Log In"}</Button>
                    </form>
                </Col>
            </Container>
    )
}
export default EmpLoginForm