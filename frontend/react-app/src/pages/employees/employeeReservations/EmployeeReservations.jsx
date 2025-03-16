import { useState } from 'react';
import { EmpLoginNav } from "../components/employeeLoginNav/EmployeeLoginNav"
import { Container } from "react-bootstrap";
import EmpResrvationsFilter from "./components/employeeReservationsFilter/EmployeeReservationsFilter";
import EmpReservationsList from "./components/employeeReservationsList/EmployeeReservationsList";
import { EmpReservationOffCanvas } from "./components/employeeReservationsOffCanvas/EmployeeReservationsOffCanvas";
import "./employeeReservations.css";
 export default function EmpReservations(){
    const [data, setData]= useState([
        {idReserva : '01', idRoom : "121", nameRes : "Paco", dateIn : "12/04/2025", dateOut: "20/04/2025", state: "Sin registrar"},
        {idReserva : '02', idRoom : "125", nameRes : "Julio Iglesias", dateIn : "12/04/2025", dateOut: "19/04/2025", state: "Sin registrar"},
        {idReserva : '03', idRoom : "112", nameRes : "Albert Rivera", dateIn : "20/05/2025", dateOut: "25/06/2025", state: "Sin registrar"}
    ])
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const handleRowClick = (reservation) => {
        setSelectedReservation(reservation);
        setShowOffcanvas(true);
    };
    
      const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
        setSelectedReservation(null);
    };
    return(
        <Container fluid className="m-0 p-0">
            <EmpLoginNav/>
            <EmpResrvationsFilter />
            <EmpReservationsList data={data} onRowClick={handleRowClick} className="mt-5"/>
            <EmpReservationOffCanvas
                show={showOffcanvas}
                onHide={handleCloseOffcanvas}
                reservation={selectedReservation}
            />  
        </Container>
        
    )
    
}