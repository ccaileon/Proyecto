import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import ScrollToTop from "./utils/ScrollToTop.js";

// -- CLIENTES --
// -- Navegación y Footer --
import Menu from "./components/Menu.jsx"
import Footer from "./components/Footer.jsx"
import AvisoLegal from "./pages/customers/terminosLegales/avisoLegal/AvisoLegal.jsx";
import PoliticaPrivacidad from "./pages/customers/terminosLegales/politicaPrivacidad/PoliticaPrivacidad.jsx";
import TerminosCondiciones from "./pages/customers/terminosLegales/terminosCondiciones/TerminosCondiciones.jsx";
// -- Cuenta de Usuario --
import Datos from "./pages/customers/account/Datos/Datos.jsx";
import Preferencias from "./pages/customers/account/Preferencias/Preferencias.jsx";
import Recompensas from "./pages/customers/account/Recompensas/Recompensas.jsx";
import Reservas from "./pages/customers/account/Reservas/Reservas.jsx";
// -- Checkout --
import DatosReserva from "./pages/customers/checkout/datosReserva/DatosReserva.jsx";
// -- Secciones --
import Inicio from "./pages/customers/inicio/Inicio.jsx";
import Habitaciones from "./pages/customers/habitaciones/Habitaciones.jsx";
import Servicios from "./pages/customers/servicios/Servicios.jsx";
import Contacto from "./pages/customers/contacto/Contacto.jsx";
import Login from "./pages/customers/login/Login.jsx";
import Registro from "./pages/customers/registro/Registro.jsx";
import ResultadoBusqueda from "./pages/customers/resultadoBusqueda/ResultadoBusqueda.jsx";
// -- 404 Not Found --
import NotFound from "./pages/customers/NotFound/NotFound.jsx";

// -- EMPLEADOS -- 
import EmployeeLogin from "./pages/employees/employeeLogin/EmployeeLogin.jsx";
import EmployeeMenu from "./pages/employees/employeeMenu/EmployeeMenu.jsx";
import EmpRooms from "./pages/employees/employeeRooms/EmployeeRooms.jsx";
import EmpReservations from "./pages/employees/employeeReservations/EmployeeReservations.jsx";
import EmpReservationsList from "./pages/employees/employeeReservations/components/employeeReservationsList/EmployeeReservationsList.jsx";

// -- Rutas Privadas --
import PrivateRoute from "./components/PrivateRoute.jsx";

// -- CSS --
import "./index.css";

function Layout() {
  const location = useLocation(); // Permite saber en que página estamos, nativo de react-router-dom

  const rutasConMenu = [ // Almacena las rutas en las que el menu público es visible
"/", "/habitaciones", "/servicios", "/contacto", "/login", 
    "/registro", "/search", "/datos", "/preferencias", 
    "/recompensas", "/reservas", "/aviso", "/privacidad", "/condiciones", "datosReserva"
  ];

  return (
    <>
      <ScrollToTop />
      {/* Mostramos el menú público solo si la ruta actual está en la lista */}
      {rutasConMenu.some(ruta => location.pathname.startsWith(ruta))&& <Menu />} 

      <div className="pages-container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/search" element={<ResultadoBusqueda />} />
          <Route path="/datos" element={<Datos />} />
          <Route path="/preferencias" element={<Preferencias />} />
          <Route path="/recompensas" element={<Recompensas />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/aviso" element={<AvisoLegal />} />
          <Route path="/privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/condiciones" element={<TerminosCondiciones />} />
          <Route path="/datosReserva" element={<DatosReserva />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );

}



function App() {
  return(
<Router>
  <ScrollToTop />
  <div className="pages-container">
    <Routes>
  {/* Rutas Cliente Públicas */} 
        <Route path="*" element={<Layout />} />

        { /* Rutas Privadas Empleado */}
        <Route path="/employee" element={<EmployeeLogin/>}/>
        <Route path="/employee/:menu" element={
          <PrivateRoute><EmployeeMenu /></PrivateRoute>} />
        <Route path="/employee/:menu/reservations" element={
          <PrivateRoute><EmpReservations/></PrivateRoute>
        }/>
        <Route path="/employee/:menu/rooms" element={
          <PrivateRoute><EmpRooms/></PrivateRoute>
        }/>
        <Route path="/employee/reservations-list" element={
          <PrivateRoute><EmpReservationsList/></PrivateRoute>
        } />
    </Routes>
  </div>

</Router>
  )
}

export default App
