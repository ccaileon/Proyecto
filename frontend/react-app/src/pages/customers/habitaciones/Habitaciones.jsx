import { Container } from "react-bootstrap";
import Room from "./components/Room";
import "./habitaciones.css";
import Cabecera from "../../../components/Cabecera";
import IntroHabitaciones from "./components/IntroHabitaciones";

function Habitaciones() {


  return(
    <div>
 <Cabecera 
 nombre="Habitaciones"
 clase="cabecera-habitaciones"/>

<IntroHabitaciones />

    <Container>
<Container className="habitaciones">

<Room
  titulo="Habitación Estándar"
  precio={65}
  descripcion="Una opción sencilla y acogedora, ideal para quienes buscan comodidad sin complicaciones. Equipada con todo lo esencial para una estancia agradable a un precio accesible."
  imagenUrl="src\assets\img\imgHabitaciones\standard\habitacion-standard.jpg"
  tipo="economica"
/>

<Room
  titulo="Habitación Familiar"
  precio={80}
  descripcion="El espacio perfecto para compartir en familia. Amplia, confortable y equipada con todo lo necesario para una estancia placentera. Disponemos de cunas bajo solicitud."
  imagenUrl="src\assets\img\imgHabitaciones\standardFamily\habitacion-standard-familiar.jpg"
  tipo="economica"
/>

<Room
  titulo="Habitación Brisa"
  precio={100}
  descripcion="Un refugio espacioso con un diseño moderno y elegante. Perfecta para quienes buscan un ambiente acogedor con un toque de estilo."
  imagenUrl="src\assets\img\imgHabitaciones\plus\habitacion-plus.jpg"
  tipo="plus"
/>

<Room
  titulo="Habitación Coral"
  precio={100}
  descripcion="Un habitación con espacio y camas extra, con un aire elegante y de modernidad. Perfecta para familiar o grupos que buscan una habitación con extra en comfort, lujo y espacio."
  imagenUrl="src\assets\img\imgHabitaciones\plusFamily\habitacion-plus-family.avif"
  tipo="plus"
/>

<Room
  titulo="Suite Arrecife"
  precio={200}
  descripcion="Lujo y confort con vistas al mar. Esta amplia suite cuenta con terraza privada, sala de estar y una cocina totalmente equipada para una experiencia inigualable."
  imagenUrl="src\assets\img\imgHabitaciones\suite\habitacion-suite.jpg"
  tipo="suite"
/>

<Room
  titulo="Suite Duna Dorada"
  precio={220}
  descripcion="Nuestra suite más exclusiva, diseñada para quienes buscan el máximo confort. Dispone de un dormitorio independiente, sala de estar, cocina equipada y una terraza privada con vistas espectaculares."
  imagenUrl="src\assets\img\imgHabitaciones\presidential\habitacion-presidencial.jpg"
  tipo="suite"
/>
</Container>
</Container>
</div>
  );

}

export default Habitaciones