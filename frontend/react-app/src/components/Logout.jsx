import { useNavigate } from "react-router-dom";
import "./logout.css";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/"); // Redirige al inicio después de cerrar sesión
  };

  return (
 <span onClick={handleLogout} className="logout-btn">
  <img src="/logout.png" alt="Cerrar sesión" width="30" height="30" className="logout-icon" />
</span>
  );
}

export default Logout;
