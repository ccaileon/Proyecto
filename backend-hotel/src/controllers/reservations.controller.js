const Reservation = require("../models/reservation.model");
const connection = require("../config/db");

// Obtener todas las reservas
const getReservations = (req, res) => {
  const {
    room, // nº de habitación
    doc_id, // documento de cliente
    name, // nombre de cliente
    checkin, // fecha check-in
  } = req.query;

  let sql = `
    SELECT r.*, c.client_name, c.client_doc_id 
    FROM reservation r
    JOIN client c ON r.res_client_id = c.client_id
    WHERE 1 = 1
  `;
  const params = [];

  if (room) {
    sql += " AND r.res_room_id = ?";
    params.push(room);
  }

  if (doc_id) {
    sql += " AND c.client_doc_id LIKE ?";
    params.push(`%${doc_id}%`);
  }

  if (name) {
    sql += " AND c.client_name LIKE ?";
    params.push(`%${name}%`);
  }

  if (checkin) {
    sql += " AND DATE(r.res_checkin) = ?";
    params.push(checkin);
  }

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener reservas con filtros:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(results);
  });
};

// Obtener reserva por ID
const getReservationById = (req, res) => {
  const { id } = req.params;
  Reservation.getById(id, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener la reserva:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.json(results[0]);
  });
};

// Crear una reserva
const createReservation = (req, res) => {
  const {
    res_client_id,
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed,
    res_checkin_by,
    res_checkout_by,
  } = req.body;

  console.log("Datos recibidos:", req.body); // Verificar que los datos llegan correctamente

  // Verificar la existencia de la habitación
  const checkRoomQuery =
    "SELECT * FROM room WHERE room_id = ? AND room_hotel_id = ?";

  connection.query(
    checkRoomQuery,
    [res_room_id, res_room_hotel_id],
    (err, roomResult) => {
      if (err) {
        console.error("Error verificando la habitación:", err);
        return res
          .status(500)
          .json({ error: "Error verificando la habitación.", details: err });
      }
      if (roomResult.length === 0) {
        return res.status(400).json({
          error: "La habitación no existe o no pertenece a un hotel válido.",
        });
      }

      // Verificar si el cliente existe
      const checkClientQuery = "SELECT * FROM client WHERE client_id = ?";
      connection.query(
        checkClientQuery,
        [res_client_id],
        (err, clientResult) => {
          if (err) {
            console.error("Error verificando el cliente:", err);
            return res
              .status(500)
              .json({ error: "Error verificando el cliente.", details: err });
          }
          if (clientResult.length === 0) {
            return res.status(400).json({ error: "El cliente no existe." });
          }

          // Verificar si el empleado existe
          const checkEmployeeQuery = "SELECT * FROM employee WHERE emp_id = ?";
          connection.query(
            checkEmployeeQuery,
            [res_checkin_by],
            (err, employeeResult) => {
              if (err) {
                console.error("Error verificando el empleado:", err);
                return res.status(500).json({
                  error: "Error verificando el empleado.",
                  details: err,
                });
              }
              if (employeeResult.length === 0) {
                return res
                  .status(400)
                  .json({ error: "El empleado no existe." });
              }

              // Insertar la reserva
              const insertQuery = `
          INSERT INTO reservation (res_client_id, res_room_id, res_room_hotel_id, res_checkin, res_checkout, res_is_closed, res_checkin_by, res_checkout_by) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

              connection.query(
                insertQuery,
                [
                  res_client_id,
                  res_room_id,
                  res_room_hotel_id,
                  res_checkin,
                  res_checkout,
                  res_is_closed,
                  res_checkin_by,
                  res_checkout_by,
                ],
                (err, result) => {
                  if (err) {
                    console.error("Error creando la reserva:", err);
                    return res.status(500).json({
                      error: "Error creando la reserva.",
                      details: err,
                    });
                  }

                  res.status(201).json({
                    message: "Reserva creada exitosamente.",
                    reservationId: result.insertId,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};

// Actualizar reserva
const updateReservation = (req, res) => {
  const { id } = req.params;
  const {
    res_client_id,
    res_room_id,
    res_checkin,
    res_checkout,
    res_is_closed,
  } = req.body;

  if (
    !res_client_id ||
    !res_room_id ||
    !res_checkin ||
    !res_checkout ||
    res_is_closed === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  Reservation.update(id, req.body, (err) => {
    if (err) {
      console.error("❌ Error al actualizar la reserva:", err);
      return res
        .status(500)
        .json({ error: "Error interno del servidor al actualizar la reserva" });
    }
    res.json({ message: "✅ Reserva actualizada exitosamente" });
  });
};

// Eliminar reserva
const deleteReservation = (req, res) => {
  const { id } = req.params;
  Reservation.delete(id, (err) => {
    if (err) {
      console.error("❌ Error al eliminar la reserva:", err);
      return res
        .status(500)
        .json({ error: "Error interno del servidor al eliminar la reserva" });
    }
    res.json({ message: "✅ Reserva eliminada exitosamente" });
  });
};

// Exportar funciones
module.exports = {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
