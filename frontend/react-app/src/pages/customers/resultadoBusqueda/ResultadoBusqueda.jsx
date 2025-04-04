import { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function ResultadoBusqueda() {
  const [resultados, setResultados] = useState([]);
  const location = useLocation();
  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const checkIn = urlParams.get("checkIn");
    const checkOut = urlParams.get("checkOut");
    const adults = urlParams.get("adults");
    const children = urlParams.get("children");

    console.log("📌 Parámetros de búsqueda enviados:", { checkIn, checkOut, adults, children });

    if (!checkIn || !checkOut || !adults) {
      console.warn("⚠️ Faltan parámetros para la búsqueda.");
      return;
    }

    fetch(`http://localhost:3000/api/rooms/search?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`)
      .then(response => response.json())
      .then(data => {
        console.log("✅ Respuesta del backend:", data);
        const uniqueRooms = [];
        const seenTypes = new Set();

        data.forEach((room) => {
          if (!seenTypes.has(room.room_type)) {
            seenTypes.add(room.room_type);
            uniqueRooms.push(room);
          }
        });

        setResultados(uniqueRooms);
      })
      .catch(error => console.error("❌ Error al obtener resultados:", error));
  }, [location.search]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Resultados de búsqueda</h2>
      <Row>
        {resultados.length > 0 ? (
          resultados.map((room) => (
            <Col key={room.room_id} md={4} className="mb-4">
              <Card>
                <Card.Img 
                  variant="top" 
                  src={`/images/${room.room_type}.jpg`} 
                  alt={room.room_type} 
                  style={{ height: "200px", objectFit: "cover" }} 
                />
                <Card.Body>
                  <Card.Title>{room.room_type.replace(/-/g, " ")}</Card.Title>
                  <Card.Text>
                    <strong>Capacidad:</strong> {room.room_capacity} personas <br />
                    <strong>Metros cuadrados:</strong> {room.room_mts_square} m²
                  </Card.Text>
                  <Button variant="primary" className="me-2">Ver detalles</Button>
                  <Button
  variant="success"
  onClick={() => {
    const urlParams = new URLSearchParams(location.search);
    const checkIn = urlParams.get("checkIn");
    const checkOut = urlParams.get("checkOut");

    // Guardar los datos necesarios individualmente
    sessionStorage.setItem("selectedRoomId", room.room_id);
    sessionStorage.setItem("hotelId", room.room_hotel_id || 1); // Asegúrate que room_room_hotel_id viene del backend
    sessionStorage.setItem("checkin", checkIn);
    sessionStorage.setItem("checkout", checkOut);

    window.location.href = "/checkout";
  }}
>
  Reservar
</Button>


                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No se encontraron habitaciones disponibles.</p>
        )}
      </Row>
    </Container>
  );
}

export default ResultadoBusqueda;
