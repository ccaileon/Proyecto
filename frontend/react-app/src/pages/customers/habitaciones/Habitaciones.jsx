import { Container } from "react-bootstrap";
import RoomCard from "./components/RoomCard";
import "./habitaciones.css";
import Cabecera from "../../../components/Cabecera";
import IntroHabitaciones from "./components/IntroHabitaciones";
import BannerHabitaciones from "./components/BannerHabitaciones";

function Habitaciones() {


  return(
    <div>
 <Cabecera 
 nombre="Habitaciones"
 clase="cabecera-habitaciones"/>

<IntroHabitaciones />

<Container fluid className="room-container">
<Container className="habitaciones">
<h1>Habitaciones funcionales y cómodas</h1>

{/*LO SUYO SERIA AUTOMATIZAR QUE SE HAGA UNA CARD DE CADA ROOM SEGÚN LA RESPUESTA DE TIPOS DE LA API*/}
{/*Aqui falta:

- Llamada a API para sacar los tipos de habitación
- Un useEffect para que de un solo card saque todos los necesarios según número de tipos de habitación (automatizar)*/}

<RoomCard
precio="120"
capacidad="2"
tipo="standard"
whiteIcons = "true"

/>
<hr />
<RoomCard
precio="120"
capacidad="2"
tipo="standard-family"
whiteIcons = "true"

/>
</Container>
</Container>

<Container className="habitaciones">
<h1>Más espacio, más comodidad</h1>
<RoomCard
precio="120"
capacidad="2"
tipo="plus"

/>
<hr />
<RoomCard
precio="120"
capacidad="2"
tipo="plus-family"

/>
</Container>

<Container fluid className="room-container">
<Container className="habitaciones">
<h1>La mejor experiencia de alojamiento</h1>
<RoomCard
precio="120"
capacidad="2"
tipo="suite"
whiteIcons = "true"

/>
<hr />
<RoomCard
precio="120"
capacidad="2"
tipo="suite-family"
whiteIcons = "true"
/>
</Container>
</Container>
<BannerHabitaciones/>
</div>
  );

}

export default Habitaciones