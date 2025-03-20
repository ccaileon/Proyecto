import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Table } from "react-bootstrap";

export default function EmpReservationsList({ onRowClick }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/reservations")
      .then(response => response.json())
      .then(data => {
        console.log("✅ Reservas obtenidas:", data);

        // Convertir los datos al formato esperado y formatear fechas sin librerías externas
        const formattedData = data.map(res => ({
          idReserva: res.res_id.toString(),   // ID de la reserva
          idRoom: res.res_room_id.toString(), // ID de la habitación
          nameRes: `Cliente ${res.res_client_id}`, // Temporalmente el ID del cliente
          dateIn: formatDate(res.res_checkin),   // Fecha de Check-In formateada
          dateOut: formatDate(res.res_checkout), // Fecha de Check-Out formateada
          state: res.res_is_closed ? "Cerrada" : "Activa" // Estado de la reserva
        }));

        setData(formattedData);
      })
      .catch(error => console.error("❌ Error al obtener las reservas:", error));
  }, []); // Solo se ejecuta una vez al montar el componente

  // 🔥 Función para formatear fechas sin librerías externas
  const formatDate = (isoDate) => {
    if (!isoDate) return "Fecha inválida";
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <Container fluid className="p-0">
      <h2 className="mb-4">Gestión de Reservas</h2>
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
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={() => onRowClick(row)} style={{ cursor: 'pointer' }}>
                <td>{row.idReserva}</td>
                <td>{row.idRoom}</td>
                <td>{row.nameRes}</td>
                <td>{row.dateIn}</td>
                <td>{row.dateOut}</td>
                <td>{row.state}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No hay reservas disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

// 📌 Validación de PropTypes
EmpReservationsList.propTypes = {
  onRowClick: PropTypes.func.isRequired,
};