import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// -- CLIENTES --
// -- Navegación y Footer --
import Navbar from "./components/Navbar.jsx"
import Search from "./components/Search.jsx"
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

// -- CSS --
import "./index.css";

function App() {
  return(
<Router>
  <Navbar/>
  <div className="pages-container">
    <Routes>
      <Route path="/" element={<Inicio />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
       <Route path="/employee" element={<EmployeeLogin/>}/>
    </Routes>
  </div>
  <Footer/>
</Router>
  )
}

export default App
