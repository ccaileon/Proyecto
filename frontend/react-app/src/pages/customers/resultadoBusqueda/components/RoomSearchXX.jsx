import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Room from '../../habitaciones/components/Room'; 
import "../../habitaciones/components/room.css";

function RoomSearch() {
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
      {resultados.length > 0 ? (
        resultados.map((room) => (
         
          <Row key={room.room_id} className="mb-4">
            <Col md={12}> 
            
              <Room
                titulo={room.room_type.replace(/-/g, " ")}
                precio={room.room_price}
                capacidad={room.room_capacity}
                descripcion={room.room_description}
                imagenUrl={`/images/${room.room_type}.jpg`} 
                tipo={room.room_type}
              />
            </Col>
            <button className="btn">Reservar Estancia</button>
            <hr />
          </Row>
        ))
      ) : (
        <p>No se encontraron habitaciones disponibles. Pruebe una fecha diferente o reserve habitaciones separadas para más de 4 huéspedes.</p>
      )}
    </Container>
  );
}

export default RoomSearch;
