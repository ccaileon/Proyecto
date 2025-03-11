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