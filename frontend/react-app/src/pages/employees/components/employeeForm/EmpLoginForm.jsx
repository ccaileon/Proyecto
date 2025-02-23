
import { FormProvider} from "react-hook-form";
import { Container, Form, Col, Button} from "react-bootstrap";
import "./empLoginForm.css"


const EmpLoginForm = () => {
    //{errors.emailAdmin?.type === 'required' && <p>El campo nombre es requerido</p>}
    //{errors.emailAdmin?.type === 'pattern' && <p>El correo no está bien</p>}
    return (
            <Container className="z-3 position-relative justify-content-center min-wh-100 min-vh-100 h-auto d-flex ">
                <Col xs={12} md={10} lg={8} xl={5}>
                <FormProvider>
                            <Form.Label className="mt-2">Email:</Form.Label>  
                            <Form.Control type="email" /> 
                            <Form.Label className="mt-2">Contraseña:</Form.Label>
                            <Form.Control type="password" />
                                <Button className="mt-3 border-0" type="submit">Log In</Button>
                </FormProvider>
                </Col>
            </Container>
    )
}
export default EmpLoginForm;
