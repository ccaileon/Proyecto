import "./servicios.css";
import { Container, Row, Col } from "react-bootstrap";

function Servicios() {
  return (
    <div className="container-fluid servicios">
      <Container>
        <h1 className="h1-white text-center">Nuestros Servicios</h1>

        <Row className="justify-content-center">
          <Col md={4}>
            <img src="src/assets/img/masage.jpg" width="100%" alt="Masajes" />
            <h3 className="h3-white">Tratamientos y Masajes</h3>
            <p className="p-white">
              Ofrecemos masajes con aceites esenciales y tratamientos
              corporales y faciales premium.
            </p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/circuito-hidroterapia.jpg" width="100%" alt="Circuito Hidroterapia" />
            <h3 className="h3-white">Circuito Hidroterapia</h3>
            <p className="p-white">
              Jacuzzis, saunas, baños de vapor y duchas de sensaciones con
              esencias marinas para relajar cuerpo y mente.
            </p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/restaurante.jpg" width="100%" alt="Restaurante" />
            <h3 className="h3-white">Gastronomía Mediterránea</h3>
            <p className="p-white">
              La gastronomía de Almería es una combinación de mar, huerta y
              tradición mediterránea con influencias árabes. Una experiencia
              gourmet con vistas al mar.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={4}>
            <img src="src/assets/img/kayak.jpg" width="100%" alt="Kayak" />
            <h3 className="h3-white">Excursiones en Kayak</h3>
            <p className="p-white">
              Realizamos excursiones en Kayak aptas para todos los miembros
              de la familia.
            </p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/snorkel.jpg" width="100%" alt="Snorkel" />
            <h3 className="h3-white">Aventura Submarina</h3>
            <p className="p-white">
              Descubre Cabo de Gata como nunca antes lo habías visto con
              nuestro servicio de snorkel.
            </p>
          </Col>
          <Col md={4}>
            <img src="src/assets/img/ocio-nocturno.jpg" width="100%" alt="Ocio Nocturno" />
            <h3 className="h3-white">Ocio Nocturno</h3>
            <p className="p-white">
              Disfruta de cócteles exclusivos, música en vivo y un ambiente
              único bajo las estrellas.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Servicios;
