const connection = require("../config/db");

// 🟢 Registrar fin de turno
const registerShiftOut = (req, res) => {
  const emp_id = req.params.id;
  const now = new Date();

  const sql = `
    UPDATE shift
    SET shift_date_out = ?,
        hours_worked = ROUND(TIMESTAMPDIFF(SECOND, shift_date_in, ?) / 3600, 2)
    WHERE shift_emp_id = ?
      AND shift_date_out IS NULL
    ORDER BY shift_date_in DESC
    LIMIT 1
  `;

  connection.query(sql, [now, now, emp_id], (err, result) => {
    if (err) {
      console.error("❌ Error al cerrar turno:", err);
      return res.status(500).json({ error: "Error al cerrar turno" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se encontró turno abierto" });
    }

    res.json({ message: "Turno cerrado correctamente" });
  });
};

module.exports = {
  registerShiftOut,
};
