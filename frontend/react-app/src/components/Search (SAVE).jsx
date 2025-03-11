import { useState, useRef, useEffect } from "react";
import { Container, Form, Row, Col, Button} from "react-bootstrap";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
/*import "./search.css";*/
import HuespedesSelector from "./HuespedesSelector";

function Search() {
// -- Calendario --
const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  // Cerrar el calendario si se hace clic fuera de él
  const handleDateClick = () => {
    setShowCalendar(prev => !prev);
  };

  // Cerrar el calendario si se hace clic fuera de él
  const handleOutsideClick = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // -- Huéspedes -- 
const numChild = document.getElementById("numChild");
const numAdult = document.getElementById("numAdult");
const numBaby = document.getElementById("numBaby");
 let huespedes = {
  adult: 1,
  child: 0,
  baby: 0
};

function totalHuespedes() {
  return huespedes.adult + huespedes.child;
}
  function addAdult() {
    if (totalHuespedes() < 6) {
    huespedes.adult +=1;
    }
    numAdult.textContent = huespedes.adult;
    return huespedes.adult;
  }
    function subtractAdult() {
      if (huespedes.adult > 1) {
    huespedes.adult -=1;
    numAdult.textContent = huespedes.adult;
    } 

    return huespedes.adult;
  }

  function addChild() {
    if (totalHuespedes() < 6) {
    huespedes.child +=1;
    }
    numChild.textContent = huespedes.child;
    return huespedes.child;
  }
    function subtractChild() {
      if (huespedes.child > 0) {
    huespedes.child -=1;
    }
    numChild.textContent = huespedes.child;
    return huespedes.child;
  }

  function addBaby() {
    if (huespedes.baby < 2) {
    huespedes.baby +=1;
    }
    numBaby.textContent = huespedes.baby;
    return huespedes.baby;
  }
    function subtractBaby() {
      if (huespedes.baby > 0) {
    huespedes.baby -=1;
    }
    numBaby.textContent = huespedes.baby;
    return huespedes.baby;
  }

  return (
<Container fluid className="buscador">
<Row className="buscador">
  <Col xs={2}>
    <Form.Label htmlFor="checkin" className="d-block input search">
      <h4>Llegada</h4>
    </Form.Label>
    <Form.Control
      type="text"
      placeholder="Seleccionar fecha"
      onClick={() => handleDateClick('checkin')}
      value={state[0].startDate ? state[0].startDate.toLocaleDateString() : ''}
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
      value={state[0].endDate ? state[0].endDate.toLocaleDateString() : ''}
      readOnly
    />
  </Col>
<HuespedesSelector />

{/*
  <Col xs={2}>
    <Form.Label htmlFor="adultos" className="d-block">
      <h4>Adultos</h4>
    </Form.Label>
      <div className="botones">
      <p id="numAdult" className="contador">1</p>
    <Button onClick={addAdult}>+</Button>
     <Button onClick={subtractAdult}>-</Button>
     </div>
  </Col>

  <Col xs={2}>
    <Form.Label htmlFor="children" className="d-block">
      <h4>Niños</h4>
    </Form.Label>
     <div className="botones">
    <p id="numChild" className="contador">0</p>
    <Button onClick={addChild}>+</Button>
     <Button onClick={subtractChild}>-</Button>
     </div>
  </Col>
    <Col xs={2}>
    <Form.Label htmlFor="children" className="d-block">
      <h4>Bebés (&lt; 2 años)</h4>
    </Form.Label>
    <div className="botones">
    <p id="numBaby" className="contador">0</p>
    <Button onClick={addBaby}>+</Button>
     <Button onClick={subtractBaby}>-</Button>
     </div>
  </Col>
  */}
  <Col xs={2}>     
  <Button type="submit" className="btn mt-3">
           Buscar
          </Button></Col>
</Row>

{/* Mostrar el calendario solo cuando showCalendar sea true */}
{showCalendar && (
  <div ref={calendarRef} className="calendar-container">
    <DateRange
      editableDateInputs={true}
      onChange={item => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      showDateDisplay={false} 
    />
  </div>
)}

</Container>

)}

export default Search;