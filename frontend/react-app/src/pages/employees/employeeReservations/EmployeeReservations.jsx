import { useState, useEffect } from 'react';
import { EmpLoginNav } from "../components/employeeLoginNav/EmployeeLoginNav";
import { Container } from "react-bootstrap";
import EmpResrvationsFilter from "./components/employeeReservationsFilter/EmployeeReservationsFilter";
import EmpReservationsList from "./components/employeeReservationsList/EmployeeReservationsList";
import { EmpReservationOffCanvas } from "./components/employeeReservationsOffCanvas/EmployeeReservationsOffCanvas";
import "./employeeReservations.css";

export default function EmpReservations() {
  const [filteredData, setFilteredData] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);


  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = sessionStorage.getItem("Token");
        const response = await fetch("http://localhost:3000/api/reservations", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        setFilteredData(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchReservations();
  }, []);

  const handleRowClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowOffcanvas(true);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
    setSelectedReservation(null);
  };
  return (
    <Container fluid className="m-0 p-0">
      <EmpLoginNav />
      <EmpResrvationsFilter setFilteredData={setFilteredData} />
      <EmpReservationsList data={filteredData} onRowClick={handleRowClick} className="mt-5" />
      <EmpReservationOffCanvas
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        reservation={selectedReservation}
      />
    </Container>
  );
}
