import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Inicio from "./pages/Inicio/Inicio.jsx";
import Habitaciones from "./pages/Habitaciones/Habitaciones.jsx";
import Servicios from "./pages/Servicios/Servicios.jsx";
import Contacto from "./pages/Contacto/Contacto.jsx";
import Login from "./pages/Login/Login.jsx";
import Registro from "./pages/Registro/Registro.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import "./index.css";


function App() {
  
  return(
<Router>
  <Navbar />
  <div className="pages-container">
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/" element={<Habitaciones />} />
       <Route path="/" element={<Servicios />} />
       <Route path="/" element={<Contacto />} />
       <Route path="/" element={<Login />} />
       <Route path="/" element={<Registro />} />
    </Routes>
  </div>
  <Footer />
</Router>
  )
}

export default App
