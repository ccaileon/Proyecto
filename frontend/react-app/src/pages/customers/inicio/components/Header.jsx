import "./header.css";
import { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Header() {
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

  return (
    <header>
      <Container fluid className="cabecera" id="cabecera">
        <Row>
          <Col md={8} className="col-8">
            <h1>Dunas de Oro</h1>
            <div className="d-flex flex-row gap-2">
              <h2>Resort</h2>
              <h2 className="h2-white">&</h2>
              <h2>Spa</h2>
            </div>
          </Col>
          <Col md={4} className="col-4">
            <h3 className="mx-auto d-flex justify-content-center">Buscar Habitación</h3>

            {/* Formulario Búsqueda de Habitaciones */}
            <Form className="form">
              <Row>
                <Col>
                  <Form.Label htmlFor="checkin">
                    <h4>Check-in</h4>
                  </Form.Label>
                  <Form.Control type="date" id="checkin" name="checkin" />
                </Col>
                <Col>
                  <Form.Label htmlFor="checkout">
                    <h4>Check-out</h4>
                  </Form.Label>
                  <Form.Control type="date" id="checkout" name="checkout" />
                </Col>
              </Row>

              <div className="d-flex justify-content-center gap-3 custom-select">
                <Col xs={3}>
                  <Form.Label htmlFor="adultos">
                    <h4>Adultos</h4>
                  </Form.Label>
                  <Form.Select name="adultos" id="adultos">
                    {[...Array(6)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={3}>
                  <Form.Label htmlFor="children">
                    <h4>Niños</h4>
                  </Form.Label>
                  <Form.Select name="children" id="children">
                    {[...Array(7)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </div>

              <Container className="d-flex justify-content-center">
                <Button type="submit" className="btn">
                  Buscar
                </Button>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;

