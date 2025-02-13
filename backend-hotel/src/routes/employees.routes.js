const express = require("express");
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees.controller");

router.get("/", getEmployees); // Obtener todos los empleados
router.get("/:id", getEmployeeById); // Obtener un empleado por ID
router.post("/", createEmployee); // Crear un empleado
router.put("/:id", updateEmployee); // Actualizar un empleado
router.delete("/:id", deleteEmployee); // Eliminar un empleado

module.exports = router;
