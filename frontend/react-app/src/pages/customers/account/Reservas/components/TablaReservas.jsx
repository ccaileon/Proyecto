import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const ReservasTable = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch("URL") //  API
      .then((response) => response.json())
      .then((data) => setReservas(data))
      .catch((error) => console.error("Error al obtener reservas:", error));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Fecha Reserva</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Tipo de Habitación</th>
          <th>Importe</th>
          <th>Método de Pago</th>
        </tr>
      </thead>
      <tbody>
        {reservas.map((reserva, index) => (
          <tr key={index}>
            <td>{reserva.fechaReserva}</td>
            <td>{reserva.checkIn}</td>
            <td>{reserva.checkOut}</td>
            <td>{reserva.tipoHabitacion}</td>
            <td>{reserva.precio}</td>
            <td>{reserva.metodoPago}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReservasTable;
