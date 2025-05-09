import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import RoomCard from "../../habitaciones/components/RoomCard";
import RoomModal from "./RoomModal";
import "../../habitaciones/components/room.css";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function RoomSearch() {

const [selectedRoom, setSelectedRoom] = useState(null);
const [modalVisible, setModalVisible] = useState(false);

  const [resultados, setResultados] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();


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
      <h2 className="mb-4">Seleccione su habitación</h2>
      {resultados.length > 0 ? (
        resultados.map((room) => (
         
          <Row key={room.room_id} className="mb-4">
            <Col md={10}> 
            
              <RoomCard
                titulo={room.room_type.replace(/-/g, " ")}
                precio={room.room_price}
                capacidad={room.room_capacity}
                descripcion={room.room_description}
                imagenUrl={`/images/${room.room_type}.jpg`} 
                tipo={room.room_type}
                compacto = "true"
              />
            </Col>

                       <Col md={2}>
           <Row className="mt-4"><Button
  onClick={() => {
    setSelectedRoom(room);
    setModalVisible(true);
  }}
>
  Ver Detalles
</Button></Row>
            <Row className="mt-2 mb-5"> <Button
                className="btn btn-primary mt-2"
                onClick={() => {
                  const urlParams = new URLSearchParams(location.search);
                  const checkIn = urlParams.get("checkIn");
                  const checkOut = urlParams.get("checkOut");
                  const adults = urlParams.get("adults");
                  const children = urlParams.get("children");

                  const reservaData = {
                    room,
                    checkIn,
                    checkOut,
                    adults,
                    children
                  };

                  sessionStorage.setItem("reservaData", JSON.stringify(reservaData));

                  navigate("/checkout", {
                    state: reservaData
                  });
                }}
              >
                Reservar Estancia
            </Button></Row>
           </Col>
           

            <hr />
          </Row>
        ))
      ) : (
        <p>No se encontraron habitaciones disponibles. Pruebe una fecha diferente o reserve habitaciones separadas para más de 4 huéspedes.</p>
      )}

      <RoomModal
  show={modalVisible}
  onHide={() => setModalVisible(false)}
  room={selectedRoom}
/>
    </Container>



  );

  
}

export default RoomSearch;
