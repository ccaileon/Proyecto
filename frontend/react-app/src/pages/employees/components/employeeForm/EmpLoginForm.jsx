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
                    {loginError && <Alert variant="danger">{loginError}</Alert>}

                    <Form.Label className="mt-2">Email:</Form.Label>
                    <Form.Control 
                        type="email" 
                        {...register("emp_email", { 
                            required: "Email is required", 
                            pattern: { 
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                                message: "Enter a valid email address" 
                            } 
                        })} 
                    />
                    {errors.emp_email && (<div className="text-danger">{errors.emp_email.message}</div>)}

                    <Form.Label className="mt-2">Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        {...register("emp_password", { 
                            required: "Password is required" 
                        })} 
                    />
                    {errors.emp_password && (<div className="text-danger">{errors.emp_password.message}</div>)}

                    <Button disabled={isSubmitting} className="mt-3 border-0 w-100" type="submit">
                        {isSubmitting ? "Loading..." : "Log In"}
                    </Button>
                </form>
            </Col>
        </Container>
    );
};

export default EmpLoginForm;
