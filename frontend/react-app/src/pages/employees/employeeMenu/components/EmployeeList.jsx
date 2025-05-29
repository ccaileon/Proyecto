
import { useEffect, useState } from "react";

export function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const token = sessionStorage.getItem("Token");
  const loggedUser = JSON.parse(sessionStorage.getItem("User"));
  const myId = loggedUser?.id;

  const fetchSummary = () => {
    fetch("http://localhost:3000/api/shifts/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) =>
        console.error("Error cargando resumen de empleados:", err)
      );
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleToggleActive = async (empId, isActive, empName) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/employees/${empId}/toggle`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      alert(
        `${isActive ? "Cuenta desactivada" : "Cuenta activada"}: ${empName}`
      );

      fetchSummary();
    } catch (error) {
      alert("No se pudo cambiar el estado del empleado.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Empleados</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Turnos</th>
            <th>Horas trabajadas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.emp_id}>
              <td>{emp.full_name.trim()}</td>
              <td>{emp.emp_email}</td>
              <td>{emp.emp_role}</td>
              <td>{emp.shift_count}</td>
              <td>{emp.hours}h {emp.minutesOnly}min</td>
              <td>{emp.emp_active ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() =>
                    handleToggleActive(
                      emp.emp_id,
                      emp.emp_active,
                      emp.full_name.trim()
                    )
                  }
                  disabled={emp.emp_id === myId}
                  title={
                    emp.emp_id === myId
                      ? "No puedes modificarte a ti mismo"
                      : ""
                  }
                >
                  {emp.emp_active ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
