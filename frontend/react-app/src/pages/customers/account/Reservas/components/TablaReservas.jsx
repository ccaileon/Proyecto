import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const TablaReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("clientToken");
  
    fetch("http://localhost:3000/api/reservations/client/my-reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
        {Array.isArray(reservas) && reservas.length > 0 ? (
          reservas.map((reserva, index) => (
        <tr key={index}>
        <td>{reserva.fechaReserva}</td>
        <td>{reserva.checkIn}</td>
        <td>{reserva.checkOut}</td>
        <td>{reserva.tipoHabitacion}</td>
        <td>{reserva.precio}</td>
        <td>{reserva.metodoPago}</td>
      </tr>
    ))
      ) : (
    <tr>
      <td colSpan="6">No se encontraron reservas</td>
    </tr>
  )}
</tbody>

    </Table>
  );
};

export default TablaReservas;
