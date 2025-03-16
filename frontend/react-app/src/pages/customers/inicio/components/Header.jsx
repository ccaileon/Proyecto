import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

import './header.css'; 

function Header() {



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
         </Row>
</Container>
          
  
    </header>
  );
}

export default Header;
