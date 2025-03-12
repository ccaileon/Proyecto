import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import PropTypes from "prop-types";

function Cabecera({nombre, clase}) {
  // Efecto Paralelaje
  useEffect(() => {
    const handleScroll = () => {
      let scrollPosition = window.scrollY;
      let cabecera = document.querySelector(".cabecera");

      if (cabecera) {
        let newBackgroundPosition = scrollPosition * -0.5 + "px";
        cabecera.style.backgroundPosition = "center " + newBackgroundPosition;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return(
  
        <header>
      <Container fluid className={clase}>
        <Row>
          <Col md={8} className="col-8">
            <h1>{nombre}</h1>
          </Col>
          </Row>
          </Container>
          </header>

  )
}

Cabecera.propTypes = {
  nombre: PropTypes.string.isRequired,
  clase: PropTypes.string.isRequired,

};

export default Cabecera