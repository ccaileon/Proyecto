const connection = require("../config/db");
const bcrypt = require("bcryptjs");

// Obtener todos los empleados
const getEmployees = (req, res) => {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.error("❌ Error fetching employees:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
};

// Obtener un empleado por ID
const getEmployeeById = (req, res) => {
  const empId = req.params.id;

  connection.query(
    "SELECT * FROM employee WHERE emp_id = ?",
    [empId],
    (err, results) => {
      if (err) {
        console.error("❌ Error fetching employee:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(results[0]);
    }
  );
};

// Crear un empleado
const createEmployee = async (req, res) => {
  const {
    emp_doc_id,
    emp_name,
    emp_surname_one,
    emp_surname_two,
    emp_telephone,
    emp_email,
    emp_manager_id,
    emp_password,
    emp_hotel_id,
  } = req.body;

  if (
    !emp_doc_id ||
    !emp_name ||
    !emp_surname_one ||
    !emp_telephone ||
    !emp_email ||
    !emp_password ||
    !emp_hotel_id
  ) {
    return res
      .status(400)
      .json({ error: "All fields except emp_manager_id are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(emp_password, 10);
    const sql = `INSERT INTO employee (emp_doc_id, emp_name, emp_surname_one, emp_surname_two, emp_telephone, emp_email, emp_manager_id, emp_password, emp_hotel_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      emp_doc_id,
      emp_name,
      emp_surname_one,
      emp_surname_two || null,
      emp_telephone,
      emp_email,
      emp_manager_id || null,
      hashedPassword,
      emp_hotel_id,
    ];

    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error("❌ Error creating employee:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({
        message: "Employee successfully created",
        employeeId: results.insertId,
      });
    });
  } catch (error) {
    console.error("❌ Error hashing password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Actualizar un empleado
const updateEmployee = (req, res) => {
  const empId = req.params.id;
  const {
    emp_doc_id,
    emp_name,
    emp_surname_one,
    emp_surname_two,
    emp_telephone,
    emp_email,
    emp_manager_id,
    emp_password,
    emp_hotel_id,
  } = req.body;

  if (
    !emp_doc_id ||
    !emp_name ||
    !emp_surname_one ||
    !emp_surname_two ||
    !emp_telephone ||
    !emp_email ||
    !emp_hotel_id
  ) {
    return res.status(400).json({
      error: "All fields except emp_manager_id and emp_password are required",
    });
  }

  let sql = `UPDATE employee SET emp_doc_id = ?, emp_name = ?, emp_surname_one = ?, emp_surname_two = ?, emp_telephone = ?, emp_email = ?, emp_manager_id = ?, emp_hotel_id = ?`;
  let values = [
    emp_doc_id,
    emp_name,
    emp_surname_one,
    emp_surname_two,
    emp_telephone,
    emp_email,
    emp_manager_id || null,
    emp_hotel_id,
  ];

  if (emp_password) {
    sql += `, emp_password = ?`;
    bcrypt.hash(emp_password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("❌ Error hashing password:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      values.push(hashedPassword);
      sql += ` WHERE emp_id = ?`;
      values.push(empId);

      connection.query(sql, values, (err, results) => {
        if (err) {
          console.error("❌ Error updating employee:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Employee not found" });
        }
        res.json({ message: "Employee successfully updated" });
      });
    });
  } else {
    sql += ` WHERE emp_id = ?`;
    values.push(empId);

    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error("❌ Error updating employee:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json({ message: "Employee successfully updated" });
    });
  }
};

// Eliminar un empleado
const deleteEmployee = (req, res) => {
  const empId = req.params.id;

  connection.query(
    "DELETE FROM employee WHERE emp_id = ?",
    [empId],
    (err, results) => {
      if (err) {
        console.error("❌ Error deleting employee:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json({ message: "Employee successfully deleted" });
    }
  );
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
