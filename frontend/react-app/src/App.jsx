import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ScrollToTop from "./utils/ScrollToTop.js";

// -- CLIENTES --
// -- Navegación y Footer --
import Menu2 from "./components/Menu2.jsx"
import Footer from "./components/Footer.jsx"
import AvisoLegal from "./pages/customers/terminosLegales/avisoLegal/AvisoLegal.jsx";
import PoliticaPrivacidad from "./pages/customers/terminosLegales/politicaPrivacidad/PoliticaPrivacidad.jsx";
import TerminosCondiciones from "./pages/customers/terminosLegales/terminosCondiciones/TerminosCondiciones.jsx";
// -- Secciones --
import Inicio from "./pages/customers/inicio/Inicio.jsx";
import Habitaciones from "./pages/customers/habitaciones/Habitaciones.jsx";
import Servicios from "./pages/customers/servicios/Servicios.jsx";
import Contacto from "./pages/customers/contacto/Contacto.jsx";
import Login from "./pages/customers/login/Login.jsx";
import Registro from "./pages/customers/registro/Registro.jsx";
import ResultadoBusqueda from "./pages/customers/resultadoBusqueda/ResultadoBusqueda.jsx";

// -- EMPLEADOS -- 
import EmployeeLogin from "./pages/employees/employeeLogin/EmployeeLogin.jsx";
import EmployeeMenu from "./pages/employees/employeeMenu/EmployeeMenu.jsx";
import EmpRooms from "./pages/employees/employeeRooms/EmployeeRooms.jsx";
import EmpReservations from "./pages/employees/employeeReservations/EmployeeReservations.jsx";
import EmpReservationsList from "./pages/employees/employeeReservations/components/employeeReservationsList/EmployeeReservationsList.jsx";


// -- CSS --
import "./index.css";

function App() {
  return(
<Router>
  <ScrollToTop />
  <Menu2 />
  <div className="pages-container">
    <Routes>
      { /* Rutas Cliente  */}
      <Route path="/" element={<Inicio />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/search" element={<ResultadoBusqueda />} />

        { /* Rutas Términos y Condiciones  */}
        <Route path="/aviso" element={<AvisoLegal />} />
        <Route path="/privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/condiciones" element={<TerminosCondiciones />} />
        { /* Rutas Empleado  */}
        <Route path="/employee" element={<EmployeeLogin/>}/>
        <Route path="/employee/:menu" element={<EmployeeMenu/>}/>
        <Route path="/employee/:menu/reservations" element={<EmpReservations/>}/>
        <Route path="/employee/:menu/rooms" element={<EmpRooms/>}/>
        <Route path="/employee/reservations-list" element={<EmpReservationsList />} />
    </Routes>
  </div>
  <Footer/>
</Router>
  )
}

export default App
