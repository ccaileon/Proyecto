import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


export function EmpLoginNav(){
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.name);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("Token"); // 🔐 Borra el token
    sessionStorage.removeItem("User"); // 🔐 Borra la sesión
    navigate("/employee"); // 🔁 Redirige al login
  };


  return(
    <nav className="z-3 align-items-start min-vw-100 navbar navbar-expand-lg bg-body-tertiary m-0 p-0 ">
      <div className="container-fluid navbar-custom d-flex justify-content-between align-items-center">
  <NavLink className="navbar-brand" to="#">LOGO</NavLink>

  <div className="d-flex align-items-center gap-3">
    {userName && <span className="fw-bold">Bienvenido, {userName}</span>}
    <Button variant="outline-danger" onClick={handleLogout}>
      Cerrar sesión
    </Button>
  </div>
</div>

    </nav>
  );
}