import { useForm} from "react-hook-form";
import { Container, Form, Col, Button} from "react-bootstrap";
import axios from "axios";
import "./empLoginForm.css"
const EmpLoginForm = ()=>{
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm();
    const onSubmit = async data => {
        try{
            //Esta promesa es para probar que el boton de login cambia su texto a "Cargando..."
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await axios.post("YOUR_API_ENDPOINT", data);
            //AQUÍ VA EL ENVÍO DEL FORM A NODEJS
        }catch(error){
            //AQUÍ VA UN SWAL EN CASO DE QUE LA AUTENTICACIÓN FALLE
            console.log(error);
            
        }
    }
    //{errors.emailAdmin?.type === 'required' && <p>El campo nombre es requerido</p>}
    //{errors.emailAdmin?.type === 'pattern' && <p>El correo no está bien</p>}
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