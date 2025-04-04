import { useState, useRef, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import "./search.css";
import HuespedesSelector from "./HuespedesSelector";

function Search() {
  const navigate = useNavigate(); 
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [huespedes, setHuespedes] = useState({ adultos: 1, ninos: 0, bebes: 0 });

  const handleDateClick = () => {
    setShowCalendar(prev => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    });
    return () => document.removeEventListener("mousedown", handleDateClick);
  }, []);

  // Mostrar en inputs
  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    const day = localDate.getDate().toString().padStart(2, "0");
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const year = localDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Enviar a la URL
  const toISOStringDate = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split("T")[0];
  };

  const handleSearch = () => {
    const checkIn = toISOStringDate(state[0].startDate);
    const checkOut = toISOStringDate(state[0].endDate);
    const { adultos, ninos } = huespedes;
  
    // ✅ Guardar en sessionStorage para que estén disponibles en el checkout
    sessionStorage.setItem("checkin", checkIn);
    sessionStorage.setItem("checkout", checkOut);
  
    console.log("🚀 Parámetros enviados a la URL:", { checkIn, checkOut, adultos, ninos });
  
    navigate(`/search?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adultos}&children=${ninos}`);
  };
  

  return (
    <Container className="buscador">
      <Row className="buscador">
        <Col xs={2}>
          <Form.Label htmlFor="checkin" className="d-block input search">
            <h4>Llegada</h4>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Seleccionar fecha"
            onClick={() => handleDateClick('checkin')}
            value={state[0].startDate ? formatDate(state[0].startDate) : ''}
            readOnly
          />
        </Col>

        <Col xs={2}>
          <Form.Label htmlFor="checkout" className="d-block">
            <h4>Salida</h4>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Seleccionar fecha"
            onClick={() => handleDateClick('checkout')}
            value={formatDate(state[0].endDate)}
            readOnly
          />
        </Col>

        <HuespedesSelector huespedes={huespedes} setHuespedes={setHuespedes} />

        <Col xs={2}>     
          <Button className="btn mt-3" onClick={handleSearch}>
            Buscar
          </Button>
        </Col>
      </Row>

      {showCalendar && (
        <div ref={calendarRef} className="calendar-container">
          <DateRange
            editableDateInputs={true}
            onChange={item => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            showDateDisplay={false} 
          />
          <Button className="btn-listo" onClick={() => setShowCalendar(false)}>Listo</Button>
        </div>
      )}
    </Container>
  );
}

export default Search;

