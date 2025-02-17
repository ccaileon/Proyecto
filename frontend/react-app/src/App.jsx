import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Inicio from "./pages/Inicio/Inicio.jsx";
import Habitaciones from "./pages/Habitaciones/Habitaciones.jsx";
import Servicios from "./pages/Servicios/Servicios.jsx";
import Contacto from "./pages/Contacto/Contacto.jsx";
import Login from "./pages/Login/Login.jsx";
import Registro from "./pages/Registro/Registro.jsx";
import EmployeeLogin from "./pages/employeeRoutes/employee-login/EmployeeLogin.jsx";
import Footer from "./components/Footer.jsx"
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
    <Footer/>
  </div>
</Router>
  )
}

export default App
