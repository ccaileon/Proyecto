import {Container} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
export default function EmpReservationsList(){
    return(
        <Container fluid className="p-0">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nº Reserva</th>
                        <th>Nº Habitación</th>
                        <th>Nombre reserva</th>
                        <th>Fecha Check In</th>
                        <th>Fecha Check Out</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
        </Container>
    );
}
