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
    emp_role, // 👈 importante: que venga desde el body
  } = req.body;

  if (
    !emp_doc_id ||
    !emp_name ||
    !emp_surname_one ||
    !emp_telephone ||
    !emp_email ||
    !emp_password ||
    !emp_hotel_id ||
    !emp_role
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  if (!["manager", "staff"].includes(emp_role)) {
    return res.status(400).json({ error: "Rol inválido" });
  }

  if (emp_role === "staff") {
    if (!emp_manager_id) {
      return res
        .status(400)
        .json({ error: "Se requiere emp_manager_id para empleados staff" });
    }

    // Comprobar si el manager existe y es de rol manager
    const checkManagerSql =
      "SELECT * FROM employee WHERE emp_id = ? AND emp_role = 'manager'";
    connection.query(
      checkManagerSql,
      [emp_manager_id],
      async (err, results) => {
        if (err) {
          console.error("❌ Error verificando manager:", err);
          return res.status(500).json({ error: "Error verificando manager" });
        }

        if (results.length === 0) {
          return res
            .status(400)
            .json({ error: "El emp_manager_id proporcionado no es válido" });
        }

        // Si pasa la verificación, continúa con la creación
        await insertEmployee();
      }
    );
  } else {
    // Si es manager, no hace falta verificar emp_manager_id
    await insertEmployee();
  }

  async function insertEmployee() {
    try {
      const hashedPassword = await bcrypt.hash(emp_password, 10);
      const insertSql = `
        INSERT INTO employee (
          emp_doc_id, emp_name, emp_surname_one, emp_surname_two,
          emp_telephone, emp_email, emp_manager_id, emp_password,
          emp_hotel_id, emp_role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        emp_doc_id,
        emp_name,
        emp_surname_one,
        emp_surname_two || null,
        emp_telephone,
        emp_email,
        emp_role === "staff" ? emp_manager_id : null,
        hashedPassword,
        emp_hotel_id,
        emp_role,
      ];

      connection.query(insertSql, values, (err, results) => {
        if (err) {
          console.error("❌ Error creando empleado:", err);
          return res.status(500).json({ error: "Error interno" });
        }

        res.status(201).json({
          message: "✅ Empleado creado correctamente",
          employeeId: results.insertId,
        });
      });
    } catch (err) {
      console.error("❌ Error en la creación:", err);
      return res.status(500).json({ error: "Error interno" });
    }
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

const toggleEmployeeActive = (req, res) => {
  const emp_id = req.params.id;

  const query = `
    UPDATE employee
    SET emp_active = NOT emp_active
    WHERE emp_id = ?
  `;

  connection.query(query, [emp_id], (err, result) => {
    if (err) {
      console.error("❌ Error al actualizar estado del empleado:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "✅ Estado del empleado actualizado correctamente" });
  });
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeActive,
};
