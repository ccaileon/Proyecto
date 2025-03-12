import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// -- CLIENTES --
// -- Navegación y Footer --
import Menu2 from "./components/Menu2.jsx"
import Footer from "./components/Footer.jsx"

// -- Secciones --
import Inicio from "./pages/customers/inicio/Inicio.jsx";
import Habitaciones from "./pages/customers/habitaciones/Habitaciones.jsx";
import Servicios from "./pages/customers/servicios/Servicios.jsx";
import Contacto from "./pages/customers/contacto/Contacto.jsx";
import Login from "./pages/customers/login/Login.jsx";
import Registro from "./pages/customers/registro/Registro.jsx";
// -- EMPLEADOS -- 
import EmployeeLogin from "./pages/employees/employeeLogin/EmployeeLogin.jsx";
import EmployeeMenu from "./pages/employees/employeeMenu/EmployeeMenu.jsx";
import EmpRooms from "./pages/employees/employeeRooms/EmployeeRooms.jsx";
import EmpReservations from "./pages/employees/employeeReservations/EmployeeReservations.jsx";
import "./index.css";

function App() {
  return(
<Router>
  <Menu2 />
  <div className="pages-container">
    <Routes>
      <Route path="/" element={<Inicio />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/employee" element={<EmployeeLogin/>}/>
        <Route path="/employee/:menu" element={<EmployeeMenu/>}/>
        <Route path="/employee/:menu/reservations" element={<EmpReservations/>}/>
        <Route path="/employee/:menu/rooms" element={<EmpRooms/>}/>
    </Routes>
  </div>
  <Footer/>
</Router>
  )
}

export default App
