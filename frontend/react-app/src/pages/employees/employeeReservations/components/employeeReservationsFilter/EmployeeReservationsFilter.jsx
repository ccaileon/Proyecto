import { useForm} from "react-hook-form";
import axios from "axios";
import {Button, Container, Navbar, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
export default function EmpResrvationsFilter(){
  const { register, handleSubmit } = useForm();
  const onSubmit  = async data => {
    try{
      //AQUÍ VA EL ENVÍO DEL FORM A NODEJS
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios.post("YOUR_API_ENDPOINT", data);
    }catch(error){
      //AQUÍ VA UN SWAL EN CASO DE QUE LA AUTENTICACIÓN FALLE
      console.log(error);  
    }
  }
    return(
      <Container fluid>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="#home">Filtrar por:</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="align-items-end">
                  <Form.Group as={Col} className="mb-3" controlId="formId">
                    <Form.Label>Documento identidad:</Form.Label>
                    <Form.Control type="text" {...register("clientId")}/>
                  </Form.Group>
                  <Form.Group as={Col}  className="mb-3" controlId="formName">
                    <Form.Label>Nombre de cliente:</Form.Label>
                    <Form.Control type="text" placeholder="Introduce el nombre sin apellidos" {...register("clientName")}/>
                  </Form.Group>
                  <Form.Group as={Col}  className="mb-3" controlId="formDate">
                    <Form.Label>Fecha checkIn:</Form.Label>
                    <Form.Control type="date" placeholder="filterDateCheckin" {...register("clientDate")}/>
                  </Form.Group>
                  <Col className="mb-3">
                    <Button variant="primary" type="submit">Buscar</Button>
                  </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
      </Navbar>
    </Container>
    )
}