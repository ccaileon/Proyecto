import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("clientToken");
    sessionStorage.removeItem("clientUser");
    navigate("/"); // Redirige al inicio después de cerrar sesión
  };

  return (
    <p className="p-white" style={{ cursor: "pointer" }} onClick={handleLogout}>
      → Desconexión
    </p>
  );
}

export default Logout;
