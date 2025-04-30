import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";

export function EmpReservationOffCanvas({ show, onHide, reservation }) {
  const [reservationLoaded, setreservationLoaded] = useState(null);
  const [reserveFormatted, setreserveFormatted] = useState(null);
  const [dateIn, setDateIn] = useState(null);
  const [dateOut, setDateOut] = useState(null);
  const [selectedEstado, setSelectedState] = useState("");
  const [filesUploaded, setFilesUploaded] = useState({ doc1: null, doc2: null, doc3: null });

  const formatDate = (isoDate) => {
    if (!isoDate) return "Fecha inválida";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  useEffect(() => {
    const fetchReservation = async () => {
      if (!reservation?.idReserva) return;
      const token = sessionStorage.getItem("Token");
      const response = await fetch(`http://localhost:3000/api/reservations/${reservation.idReserva}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error("No se pudo obtener la reserva");
      }
      const data = await response.json();
      setreservationLoaded(data);
      setDateIn(formatDate(data.res_checkin));
      setDateOut(formatDate(data.res_checkout));
      setSelectedState(data.res_state);
      const formattedData = {
        name: data.client_name || data.guest_name,
        surnameOne: data.client_surname_one || data.guest_lastname,
        surnameTwo: data.client_surname_two || " ",
        email: data.client_email || data.guest_email,
        phone: data.client_telephone || data.guest_phone,
        clientDocType: data.client_doc_type || " ",
        clientDocId: data.client_doc_id || " "
      };
      setreserveFormatted(formattedData);
    };

    fetchReservation();
  }, [reservation]);

  const validateTransition = (currentState, newState) => {
    if (currentState === "pendiente" && newState === "checkin") {
      const errors = [];
  
      if (!reserveFormatted?.clientDocType.trim()) {
        errors.push("Debe rellenar el tipo de documento.");
      }
      if (!reserveFormatted?.clientDocId.trim()) {
        errors.push("Debe rellenar el número de documento.");
      }
      if (!filesUploaded.doc1) {
        errors.push("Debe subir al menos un documento.");
      }
  
      if (errors.length > 0) {
        alert(errors.join("\n")); // Mostrar todos los errores juntos
        return false;
      }
  
      return true;
    }
  
    const validTransitions = {
      pendiente: ["checkin"],
      checkin: ["checkout"],
      checkout: ["cerrado"]
    };
  
    const isValid = validTransitions[currentState]?.includes(newState);
    if (!isValid) {
      alert("Transición no válida.");
    }
  
    return isValid;
  };
  

  const handleFileChange = (e, key) => {
    setFilesUploaded(prev => ({ ...prev, [key]: e.target.files[0] }));
  };

  const handleSaveChanges = () => {
    console.log("Guardar cambios con estado:", selectedEstado);
    onHide();
  };

  if (!reservation || !reservation.idReserva || !reservationLoaded) return null;

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="w-100">
      <Offcanvas.Header className="border-bottom" closeButton>
        <Col xs="2" className="m-1">
          <Offcanvas.Title>Reserva número: {reservationLoaded?.res_id}</Offcanvas.Title>
        </Col>
        <Col xs="2" className="m-1">
          <Offcanvas.Title>Estado actual: {reservationLoaded?.res_state}</Offcanvas.Title>
        </Col>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Row>
            <Col xs="auto">
              <Button variant="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
            </Col>
            <Col xs="auto">
            <Form.Select
              aria-label="Estado de la reserva"
              value={selectedEstado}
              onChange={(e) => {
                const newState = e.target.value;
                if (!validateTransition(reservationLoaded.res_state, newState)) return;
                setSelectedState(newState);
              }}
            >
              <option value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="checkin">Check In</option>
              <option value="checkout">Check Out</option>
              <option value="cerrado">Cerrado</option>
            </Form.Select>
            </Col>
          </Row>
          <h3>Información del cliente:</h3>
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <Form.Group controlId="formNameClient" className=" align-items-center">
            <Form.Label className="me-2">Nombre de cliente:</Form.Label>
            <Form.Control type="text" defaultValue={reserveFormatted?.name || ""} />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formSurnameOneClient" className="align-items-center">
            <Form.Label className="me-2">1º apellido:</Form.Label>
            <Form.Control type="text" defaultValue={reserveFormatted?.surnameOne || ""} />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formSurnameTwoClient" className="align-items-center">
            <Form.Label className="me-2">2º apellido:</Form.Label>
            <Form.Control type="text" defaultValue={reserveFormatted?.surnameTwo || ""} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center border-bottom pb-3 mb-3">
        <Col xs="auto">
          <Form.Group controlId="formTypeDoc">
            <Form.Label className="me-2">Tipo de documento:</Form.Label>
            <Form.Control type="text" defaultValue={reserveFormatted?.clientDocType || ""} />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formIdDoc">
            <Form.Label className="me-2">Nº documento:</Form.Label>
            <Form.Control type="text" defaultValue={reserveFormatted?.clientDocId|| ""} />
          </Form.Group>
        </Col>
        {/* <Col xs="auto">
          <Form.Group controlId="formPrefix">
            <Form.Label className="me-2">Prefijo:</Form.Label>
            <Form.Control type="text" defaultValue="NO ESTA DEFINIDO" readOnly />
          </Form.Group>
        </Col> */}
        <Col xs="auto">
          <Form.Group controlId="formPhoneNum">
            <Form.Label className="me-2">Número de contacto:</Form.Label>
            <Form.Control type="text" defaultValue={reserveFormatted?.phone || ""} />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formEmail">
            <Form.Label className="me-2">Email de contacto:</Form.Label>
            <Form.Control type="text" defaultValue={reservationLoaded?.client_email || ""} />
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center border-bottom pb-3 mb-3">
        <h3>Información de la habitación</h3>
        <Col xs="auto">
          <Form.Group controlId="formRoomId">
            <Form.Label className="me-2">Habitación asignada:</Form.Label>
            <Form.Control type="text" defaultValue={reservationLoaded?.res_room_id || ""}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formRoom">
            <Form.Label className="me-2">Tipo de habitación:</Form.Label>
            <Form.Control type="text" defaultValue={reservationLoaded?.room_type || ""} readOnly/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formRoom">
            <Form.Label className="me-2">Preferencia cama:</Form.Label>
            <Form.Control type="text" defaultValue={reservationLoaded?.res_wants_double === 1 ? "Si" : "No"} readOnly/>
          </Form.Group>
        </Col>
        <Row>
          <Form.Group controlId="formObersvations">
            <Form.Label className="me-2">Observaciones:</Form.Label>
            <Form.Control type="text" defaultValue={reservationLoaded?.res_observations || ""}/>
          </Form.Group>
        </Row>
      </Row>
      <Row className="align-items-center pb-3">
        <h3>Información de reserva:</h3>
        <Col xs="auto">
          <Form.Group controlId="formDateCheckin">
            <Form.Label className="me-2">Fecha checkin:</Form.Label>
            <Form.Control type="text" value={dateIn || ""} readOnly/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group controlId="formDateCheckout">
            <Form.Label className="me-2">fecha checkout:</Form.Label>
            <Form.Control type="text" value={dateOut || ""}  readOnly/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="align-items-center border-bottom pb-3">
            <Col xs="auto">
              <Form.Group controlId="formDocumentOne">
                <Form.Label className="me-2">Subir documento 1:</Form.Label>
                <Form.Control type="file" onChange={(e) => handleFileChange(e, "doc1")} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group controlId="formDocumentTwo">
                <Form.Label className="me-2">Subir documento 2:</Form.Label>
                <Form.Control type="file" onChange={(e) => handleFileChange(e, "doc2")} />
              </Form.Group>
            </Col>
            <Col xs="auto">
              <Form.Group controlId="formDocumentThree">
                <Form.Label className="me-2">Subir documento 3:</Form.Label>
                <Form.Control type="file" onChange={(e) => handleFileChange(e, "doc3")} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

EmpReservationOffCanvas.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    idReserva: PropTypes.string.isRequired,
  }),
};

// export function EmpReservationOffCanvas({ show, onHide, reservation }) {
//   const [reservationLoaded, setreservationLoaded] = useState(null);
//   const [reserveFormatted, setreserveFormatted] = useState(null);
//   const [dateIn, setDateIn] = useState(null);
//   const [dateOut, setDateOut] = useState(null);
//   const [selectedEstado, setSelectedState] = useState("");
//   const [filesUploaded, setFilesUploaded] = useState({ doc1: null, doc2: null, doc3: null });

//   const formatDate = (isoDate) => {
//     if (!isoDate) return "Fecha inválida";
//     const date = new Date(isoDate);
//     return date.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
//   };

//   useEffect(() => {
//     const fetchReservation = async () => {
//       if (!reservation?.idReserva) return;
//       const token = sessionStorage.getItem("Token");
//       const response = await fetch(`http://localhost:3000/api/reservations/${reservation.idReserva}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (!response.ok) {
//         throw new Error("No se pudo obtener la reserva");
//       }
//       const data = await response.json();
//       setreservationLoaded(data);
//       setDateIn(formatDate(data.res_checkin));
//       setDateOut(formatDate(data.res_checkout));
//       setSelectedState(data.res_state);
//       const formattedData = {
//         name: data.client_name || data.guest_name,
//         surnameOne: data.client_surname_one || data.guest_lastname,
//         surnameTwo: data.client_surname_two || " ",
//         email: data.client_email || data.guest_email,
//         phone: data.client_telephone || data.guest_phone,
//         clientDocType: data.client_doc_type || " ",
//         clientDocId: data.client_doc_id || " "
//       };
//       setreserveFormatted(formattedData);
//     };

//     fetchReservation();
//   }, [reservation]);

//   const validateTransition = (currentState, newState) => {
//     if (currentState === "pendiente" && newState === "checkin") {
//       if (!reserveFormatted?.clientDocType.trim() || !reserveFormatted?.clientDocId.trim()) {
//         alert("Debe rellenar tipo y número de documento para hacer Check In.");
//         return false;
//       }
//       if (!filesUploaded.doc1) {
//         alert("Debe subir al menos un documento antes de hacer Check In.");
//         return false;
//       }
//       return true;
//     }

//     const validTransitions = {
//       pendiente: ["checkin"],
//       checkin: ["checkout"],
//       checkout: ["cerrado"]
//     };
//     return validTransitions[currentState]?.includes(newState);
//   };

//   const handleEstadoChange = (e) => {
//     const newState = e.target.value;
//     if (!validateTransition(reservationLoaded.res_state, newState)) {
//       alert("Transición no válida o condiciones no cumplidas.");
//       return;
//     }
//     // Aquí se mostraría la ventana de confirmación (futura implementación)
//     setSelectedState(newState);
//   };

//   const handleFileChange = (e, key) => {
//     setFilesUploaded(prev => ({ ...prev, [key]: e.target.files[0] }));
//   };

//   const handleSaveChanges = () => {
//     console.log("Guardar cambios con estado:", selectedEstado);
//     onHide();
//   };

//   if (!reservation || !reservation.idReserva || !reservationLoaded) return null;

//   return (
//     <Offcanvas show={show} onHide={onHide} placement="end" className="w-100">
//       <Offcanvas.Header className="border-bottom" closeButton>
//         <Col xs="2" className="m-1">
//           <Offcanvas.Title>Reserva número: {reservationLoaded?.res_id}</Offcanvas.Title>
//         </Col>
//         <Col xs="2" className="m-1">
//           <Offcanvas.Title>Estado actual: {reservationLoaded?.res_state}</Offcanvas.Title>
//         </Col>
//       </Offcanvas.Header>
//       <Offcanvas.Body>
//         <Form>
//           <Row>
//             <Col xs="auto">
//               <Button variant="primary" onClick={handleSaveChanges}>Guardar Cambios</Button>
//             </Col>
//             <Col xs="auto">
//               <Form.Select aria-label="Estado de la reserva" value={selectedEstado} onChange={handleEstadoChange}>
//                 <option value="">Seleccione un estado</option>
//                 <option value="pendiente">Pendiente</option>
//                 <option value="checkin">Check In</option>
//                 <option value="checkout">Check Out</option>
//                 <option value="cerrado">Cerrado</option>
//               </Form.Select>
//             </Col>
//           </Row>

//           {/* ...campos de cliente y reserva... */}

//           <Row className="align-items-center border-bottom pb-3">
//             <Col xs="auto">
//               <Form.Group controlId="formDocumentOne">
//                 <Form.Label className="me-2">Subir documento 1:</Form.Label>
//                 <Form.Control type="file" onChange={(e) => handleFileChange(e, "doc1")} />
//               </Form.Group>
//             </Col>
//             <Col xs="auto">
//               <Form.Group controlId="formDocumentTwo">
//                 <Form.Label className="me-2">Subir documento 2:</Form.Label>
//                 <Form.Control type="file" onChange={(e) => handleFileChange(e, "doc2")} />
//               </Form.Group>
//             </Col>
//             <Col xs="auto">
//               <Form.Group controlId="formDocumentThree">
//                 <Form.Label className="me-2">Subir documento 3:</Form.Label>
//                 <Form.Control type="file" onChange={(e) => handleFileChange(e, "doc3")} />
//               </Form.Group>
//             </Col>
//           </Row>
//           <h3>Información del cliente:</h3>
//       <Row className="align-items-center mb-3">
//         <Col xs="auto">
//           <Form.Group controlId="formNameClient" className=" align-items-center">
//             <Form.Label className="me-2">Nombre de cliente:</Form.Label>
//             <Form.Control type="text" defaultValue={reserveFormatted?.name || ""} />
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formSurnameOneClient" className="align-items-center">
//             <Form.Label className="me-2">1º apellido:</Form.Label>
//             <Form.Control type="text" defaultValue={reserveFormatted?.surnameOne || ""} />
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formSurnameTwoClient" className="align-items-center">
//             <Form.Label className="me-2">2º apellido:</Form.Label>
//             <Form.Control type="text" defaultValue={reserveFormatted?.surnameTwo || ""} />
//           </Form.Group>
//         </Col>
//       </Row>
//       <Row className="align-items-center border-bottom pb-3 mb-3">
//         <Col xs="auto">
//           <Form.Group controlId="formTypeDoc">
//             <Form.Label className="me-2">Tipo de documento:</Form.Label>
//             <Form.Control type="text" defaultValue={reserveFormatted?.clientDocType || ""} />
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formIdDoc">
//             <Form.Label className="me-2">Nº documento:</Form.Label>
//             <Form.Control type="text" defaultValue={reserveFormatted?.clientDocId|| ""} />
//           </Form.Group>
//         </Col>
//         {/* <Col xs="auto">
//           <Form.Group controlId="formPrefix">
//             <Form.Label className="me-2">Prefijo:</Form.Label>
//             <Form.Control type="text" defaultValue="NO ESTA DEFINIDO" readOnly />
//           </Form.Group>
//         </Col> */}
//         <Col xs="auto">
//           <Form.Group controlId="formPhoneNum">
//             <Form.Label className="me-2">Número de contacto:</Form.Label>
//             <Form.Control type="text" defaultValue={reserveFormatted?.phone || ""} />
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formEmail">
//             <Form.Label className="me-2">Email de contacto:</Form.Label>
//             <Form.Control type="text" defaultValue={reservationLoaded?.client_email || ""} />
//           </Form.Group>
//         </Col>
//       </Row>
//       <Row className="align-items-center border-bottom pb-3 mb-3">
//         <h3>Información de la habitación</h3>
//         <Col xs="auto">
//           <Form.Group controlId="formRoomId">
//             <Form.Label className="me-2">Habitación asignada:</Form.Label>
//             <Form.Control type="text" defaultValue={reservationLoaded?.res_room_id || ""}/>
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formRoom">
//             <Form.Label className="me-2">Tipo de habitación:</Form.Label>
//             <Form.Control type="text" defaultValue={reservationLoaded?.room_type || ""} readOnly/>
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formRoom">
//             <Form.Label className="me-2">Preferencia cama:</Form.Label>
//             <Form.Control type="text" defaultValue={reservationLoaded?.res_wants_double === 1 ? "Si" : "No"} readOnly/>
//           </Form.Group>
//         </Col>
//         <Row>
//           <Form.Group controlId="formObersvations">
//             <Form.Label className="me-2">Observaciones:</Form.Label>
//             <Form.Control type="text" defaultValue={reservationLoaded?.res_observations || ""}/>
//           </Form.Group>
//         </Row>
//       </Row>
//       <Row className="align-items-center pb-3">
//         <h3>Información de reserva:</h3>
//         <Col xs="auto">
//           <Form.Group controlId="formDateCheckin">
//             <Form.Label className="me-2">Fecha checkin:</Form.Label>
//             <Form.Control type="text" value={dateIn || ""} readonly/>
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formDateCheckout">
//             <Form.Label className="me-2">fecha checkout:</Form.Label>
//             <Form.Control type="text" value={dateOut || ""}  readonly/>
//           </Form.Group>
//         </Col>
//       </Row>
//       <Row className="align-items-center border-bottom pb-3">
//         <Col xs="auto">
//           <Form.Group controlId="formDocumentOne">
//             <Form.Label className="me-2">Subir documento 1:</Form.Label>
//             <Form.Control type="file" />
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formDocumentTwo">
//             <Form.Label className="me-2">Subir documento 2:</Form.Label>
//             <Form.Control type="file" />
//           </Form.Group>
//         </Col>
//         <Col xs="auto">
//           <Form.Group controlId="formDocumentThree">
//             <Form.Label className="me-2">Subir documento 3:</Form.Label>
//             <Form.Control type="file" />
//           </Form.Group>
//         </Col>
//       </Row>
//         </Form>
//       </Offcanvas.Body>
//     </Offcanvas>
//   );
// }