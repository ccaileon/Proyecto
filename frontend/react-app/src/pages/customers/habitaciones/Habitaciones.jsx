import { Container } from "react-bootstrap";
import Room from "./components/Room";
import "./habitaciones.css";

function Habitaciones() {


  return(
    <Container>
<Container className="habitaciones">
  <h1>Habitaciones</h1>
<Room
  titulo="Habitación Estándar"
  precio={65}
  descripcion="Una opción sencilla y acogedora, ideal para quienes buscan comodidad sin complicaciones. Equipada con todo lo esencial para una estancia agradable a un precio accesible."
  imagenUrl="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
/>

<Room
  titulo="Habitación Familiar"
  precio={80}
  descripcion="El espacio perfecto para compartir en familia. Amplia, confortable y equipada con todo lo necesario para una estancia placentera. Disponemos de cunas bajo solicitud."
  imagenUrl="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
/>

<Room
  titulo="Habitación Brisa"
  precio={100}
  descripcion="Un refugio espacioso con un diseño moderno y elegante. Perfecta para quienes buscan un ambiente acogedor con un toque de estilo."
  imagenUrl="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
/>

<Room
  titulo="Suite Arrecife"
  precio={200}
  descripcion="Lujo y confort con vistas al mar. Esta amplia suite cuenta con terraza privada, sala de estar y una cocina totalmente equipada para una experiencia inigualable."
  imagenUrl="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
/>

<Room
  titulo="Suite Duna Dorada"
  precio={220}
  descripcion="Nuestra suite más exclusiva, diseñada para quienes buscan el máximo confort. Dispone de un dormitorio independiente, sala de estar, cocina equipada y una terraza privada con vistas espectaculares."
  imagenUrl="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
/>
</Container>
</Container>
  );

}

export default Habitaciones