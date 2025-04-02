import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";

export default function EmpRooms() {
  const [groupedRooms, setGroupedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = sessionStorage.getItem("Token");
        const response = await axios.get("http://localhost:3000/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🔄 Agrupar por tipo de habitación
        const grouped = {};
        response.data.forEach(room => {
          if (!grouped[room.room_type]) {
            grouped[room.room_type] = {
              ...room,
              count: 1
            };
          } else {
            grouped[room.room_type].count++;
          }
        });

        setGroupedRooms(Object.values(grouped));
      } catch (error) {
        console.error("❌ Error al obtener habitaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Habitaciones</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row xs={1} sm={2} md={3} lg={4}>
          {groupedRooms.map((room) => (
            <Col key={room.room_type} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title className="text-capitalize">
                    {room.room_type}
                  </Card.Title>
                  <Card.Text>
                    Capacidad: {room.room_capacity} personas<br />
                    Hotel ID: {room.room_hotel_id}<br />
                    Metros²: {room.room_mts_square}<br />
                    Vistas: {room.room_has_views ? "Sí" : "No"}<br />
                    Jacuzzi: {room.room_has_jacuzzi ? "Sí" : "No"}<br />
                    Balcón: {room.room_has_balcony ? "Sí" : "No"}<br />
                    Servicio incluido: {room.room_has_service ? "Sí" : "No"}<br />
                    🛏️ Habitaciones de este tipo: <strong>{room.count}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}



