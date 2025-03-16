import PropTypes from "prop-types";
import {Container, Table } from 'react-bootstrap';
export default function EmpReservationsList({data, onRowClick}){
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
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} onClick={() => onRowClick(row)} style={{cursor: 'pointer'}}>
                            <td>{row.idReserva}</td>
                            <td>{row.idRoom}</td>
                            <td>{row.nameRes}</td>
                            <td>{row.dateIn}</td>
                            <td>{row.dateOut}</td>
                            <td>{row.state}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
EmpReservationsList.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        idReserva: PropTypes.string.isRequired,
        idRoom: PropTypes.string.isRequired,
        nameRes: PropTypes.string.isRequired,
        dateIn: PropTypes.string.isRequired,
        dateOut: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
      })
    ).isRequired,
    onRowClick: PropTypes.func.isRequired,
  };