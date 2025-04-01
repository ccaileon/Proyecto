const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken"); // Middleware para verificar el token
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees.controller");

router.get("reservations", verifyToken, (req, res) => {
  res.json({
    message: "Acceso autorizado ✅",
    empleados: req.user, // Aquí puedes acceder a los datos del usuario decodificados
  });
});
router.get("/", getEmployees); // Obtener todos los empleados
router.get("/:id", getEmployeeById); // Obtener un empleado por ID
router.post("/", createEmployee); // Crear un empleado
router.put("/:id", updateEmployee); // Actualizar un empleado
router.delete("/:id", deleteEmployee); // Eliminar un empleado

module.exports = router;
