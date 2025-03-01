import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./room.css";
function Room ({ titulo, precio, descripcion, imagenUrl }) {

return (
<Container className="room">
  <Row>
<Col xs={12} md={4}>
<img src={imagenUrl} width="300px"></img>
</Col>
<Col xs={12} md={8}><h3>{ titulo }</h3>
<p>{ descripcion }</p>
<p>Precio desde { precio }€ por noche.</p>
</Col>
    </Row>
</Container>

)}

Room.propTypes = {
  titulo: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  descripcion: PropTypes.string.isRequired,
  imagenUrl: PropTypes.string.isRequired,
};

export default Room;