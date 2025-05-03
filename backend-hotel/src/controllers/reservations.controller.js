const Guest = require("../models/guest.model");
const Reservation = require("../models/reservation.model");
const connection = require("../config/db");

const checkOverlapQuery = `
  SELECT * FROM reservation 
  WHERE res_room_id = ? 
    AND res_room_hotel_id = ?
    AND res_is_closed = 0
    AND (
      (? BETWEEN res_checkin AND res_checkout)
      OR (? BETWEEN res_checkin AND res_checkout)
      OR (res_checkin BETWEEN ? AND ?)
    )
`;

// 🔎 Obtener todas las reservas
const getReservations = (req, res) => {
  const { room, doc_id, name, checkin } = req.query;

  let sql = `
    SELECT 
      r.*, 
      c.client_name, c.client_doc_id,
      g.guest_name, g.guest_lastname
    FROM reservation r
    LEFT JOIN client c ON r.res_client_id = c.client_id
    LEFT JOIN guest g ON r.res_guest_id = g.guest_id
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
    sql += " AND (c.client_name LIKE ? OR g.guest_name LIKE ?)";
    params.push(`%${name}%`, `%${name}%`);
  }
  if (checkin) {
    sql += " AND DATE(r.res_checkin) = ?";
    params.push(checkin);
  }

  connection.query(sql, params, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Error interno del servidor" });
    res.json(results);
  });
};

// 🔍 Obtener reserva por ID
const getReservationById = (req, res) => {
  const { id } = req.params;
  Reservation.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: "Error interno" });
    if (results.length === 0)
      return res.status(404).json({ error: "No encontrada" });
    res.json(results[0]);
  });
};

// 🧾 Crear reserva con invitado (sin cuenta)
const createReservationForGuest = (req, res) => {
  console.log("Body recibido:", req.body);
  const {
    guest_name,
    guest_lastname,
    guest_email,
    guest_phone,
    guest_preferences,
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed = 0,
    res_checkin_by,
    res_checkout_by,
    res_observations = "",
    invoiceData = {},
  } = req.body;

  if (
    !guest_name ||
    !guest_lastname ||
    !res_room_id ||
    !res_checkin ||
    !res_checkout
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  if (new Date(res_checkin) >= new Date(res_checkout)) {
    return res.status(400).json({ error: "Fechas inválidas" });
  }

  const checkOverlapQuery = `
    SELECT * FROM reservation
    WHERE res_room_id = ?
      AND res_room_hotel_id = ?
      AND NOT (
        res_checkout <= ? OR res_checkin >= ?
      )
  `;

  connection.query(
    checkOverlapQuery,
    [res_room_id, res_room_hotel_id, res_checkin, res_checkout],
    (err, overlapResult) => {
      if (err) {
        return res.status(500).json({ error: "Error validando solapamiento" });
      }
      if (overlapResult.length > 0) {
        return res
          .status(400)
          .json({ error: "La habitación ya está reservada en esas fechas" });
      }

      const sqlGuest = `
        INSERT INTO guest (guest_name, guest_lastname, guest_email, guest_phone, guest_preferences)
        VALUES (?, ?, ?, ?, ?)
      `;

      connection.query(
        sqlGuest,
        [
          guest_name,
          guest_lastname,
          guest_email,
          guest_phone,
          guest_preferences,
        ],
        (err, result) => {
          if (err)
            return res.status(500).json({ error: "Error guardando invitado" });

          const guestId = result.insertId;

          connection.query(
            "SELECT * FROM employee WHERE emp_id = ?",
            [res_checkin_by],
            (err, employeeResult) => {
              if (err || employeeResult.length === 0) {
                return res.status(400).json({ error: "Empleado no válido" });
              }

              const data = {
                res_guest_id: guestId,
                res_client_id: null,
                res_room_id,
                res_room_hotel_id,
                res_checkin,
                res_checkout,
                res_is_closed,
                res_checkin_by,
                res_checkout_by,
                res_observations,
              };

              Reservation.create(data, (err, result) => {
                if (err) {
                  return res.status(500).json({
                    error: "Error creando reserva",
                    details: err.message,
                  });
                }

                const res_id = result.insertId;
                const sqlInvoice = `
                  INSERT INTO invoice (
                    invoice_code_transact, invoice_details,
                    invoice_guest_id, invoice_pay_method, invoice_points_used,
                    invoice_res_id, invoice_total_price, invoice_date
                  ) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())
                `;

                console.log("🧾 Preparando datos para la factura:", {
                  invoice_code_transact: null,
                  invoice_details: invoiceData.invoice_details,
                  invoice_guest_id: guestId,
                  invoice_pay_method: invoiceData.invoice_pay_method,
                  invoice_points_used: invoiceData.invoice_points_used,
                  invoice_res_id: res_id,
                  invoice_total_price: invoiceData.invoice_total_price,
                });

                connection.query(
                  sqlInvoice,
                  [
                    null,
                    invoiceData.invoice_details ||
                      `Reserva a nombre de ${guest_name} ${guest_lastname}`,
                    guestId,
                    invoiceData.invoice_pay_method,
                    invoiceData.invoice_points_used || 0,
                    res_id,
                    invoiceData.invoice_total_price,
                  ],
                  (err, result) => {
                    if (err) {
                      console.error("❌ Error MySQL al guardar factura:", err);
                      return res
                        .status(500)
                        .json({ error: "Error guardando factura" });
                    }

                    res.status(201).json({
                      message: "✅ Reserva creada correctamente para invitado",
                      reservationId: res_id,
                      guestId,
                    });
                  }
                );
              });
            }
          );
        }
      );
    }
  );
};

// 🧾 Crear reserva con cliente registrado
const createReservation = (req, res) => {
  const {
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed = 0,
    res_checkin_by,
    res_checkout_by,
    res_observations = "",
    invoiceData = {},
  } = req.body;

  const clientId = req.user?.client_id;

  if (
    !clientId ||
    !res_room_id ||
    !res_room_hotel_id ||
    !res_checkin ||
    !res_checkout
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const checkOverlapQuery = `
    SELECT * FROM reservation
    WHERE res_room_id = ?
      AND res_room_hotel_id = ?
      AND NOT (
        res_checkout <= ? OR res_checkin >= ?
      )
  `;

  connection.query(
    checkOverlapQuery,
    [res_room_id, res_room_hotel_id, res_checkin, res_checkout],
    (err, overlapResult) => {
      if (err) {
        return res.status(500).json({ error: "Error validando solapamiento" });
      }
      if (overlapResult.length > 0) {
        return res
          .status(400)
          .json({ error: "La habitación ya está reservada en esas fechas" });
      }

      connection.query(
        "SELECT * FROM employee WHERE emp_id = ?",
        [res_checkin_by],
        (err, employeeResult) => {
          if (err || employeeResult.length === 0)
            return res.status(400).json({ error: "Empleado no válido" });

          const data = {
            res_client_id: clientId,
            res_guest_id: null,
            res_room_id,
            res_room_hotel_id,
            res_checkin,
            res_checkout,
            res_is_closed,
            res_checkin_by,
            res_checkout_by,
            res_observations,
          };

          Reservation.create(data, (err, result) => {
            if (err) {
              return res.status(500).json({
                error: "Error creando reserva",
                details: err.message,
              });
            }

            const res_id = result.insertId;

            const sqlInvoice = `
              INSERT INTO invoice (
                invoice_res_id, invoice_total_price,
                invoice_details, invoice_pay_method,
                invoice_points_used, invoice_client_id,
                invoice_date
              ) VALUES (?, ?, ?, ?, ?, ?, CURDATE())
            `;

            connection.query(
              sqlInvoice,
              [
                res_id,
                invoiceData.invoice_total_price,
                invoiceData.invoice_details,
                invoiceData.invoice_pay_method,
                invoiceData.invoice_points_used || 0,
                clientId,
              ],
              (err) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ error: "Error guardando factura" });
                }

                // ➕ Calcular puntos ganados
                const puntosGanados =
                  Math.floor(invoiceData.invoice_total_price / 100) * 10;

                // 🔄 Actualizar la reserva con los puntos
                connection.query(
                  "UPDATE reservation SET res_add_points = ? WHERE res_id = ?",
                  [puntosGanados, res_id],
                  (err) => {
                    if (err)
                      console.error(
                        "❌ Error al guardar puntos en reserva:",
                        err
                      );
                  }
                );

                // 🔄 Acumular puntos en la tabla account
                connection.query(
                  "UPDATE account SET account_points = account_points + ? WHERE account_client_id = ?",
                  [puntosGanados, clientId],
                  (err) => {
                    if (err)
                      console.error(
                        "❌ Error acumulando puntos en account:",
                        err
                      );
                  }
                );

                res.status(201).json({
                  message: "✅ Reserva creada correctamente para cliente",
                  reservationId: res_id,
                  clientId,
                  puntosGanados,

                });
              }
            );
          });
        }
      );
    }
  );
};

const updateReservation = (req, res) => {
  const { id } = req.params;
  const {
    res_client_id,
    res_guest_id,
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed,
    res_checkin_by,
    res_checkout_by,
  } = req.body;

  if (!res_room_id || !res_checkin || !res_checkout) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const data = {
    res_client_id: res_client_id || null,
    res_guest_id: res_guest_id || null,
    res_room_id,
    res_room_hotel_id,
    res_checkin,
    res_checkout,
    res_is_closed,
    res_checkin_by,
    res_checkout_by,
  };

  Reservation.update(id, data, (err) => {
    if (err)
      return res.status(500).json({ error: "Error actualizando reserva" });
    res.json({ message: "✅ Reserva actualizada correctamente" });
  });
};
const updateReservationStatus = (req, res) => {
  const { id } = req.params;
  const { status, employeeId } = req.body;

  // Validación de datos requeridos
  if (!status || !employeeId) {
    return res.status(400).json({ error: "Estado y empleado requeridos" });
  }

  let updateQuery = "";
  let values = [];

  // Lógica para cada tipo de estado
  switch (status) {
    case "checkin":
      updateQuery = `
        UPDATE reservation 
        SET res_is_checkin = 1, res_checkin_by = ? 
        WHERE res_id = ?
      `;
      values = [employeeId, id];
      break;

    case "checkout":
      updateQuery = `
        UPDATE reservation 
        SET res_is_checkout = 1, res_checkout_by = ? 
        WHERE res_id = ?
      `;
      values = [employeeId, id];
      break;

    case "closed":
      updateQuery = `
        UPDATE reservation 
        SET res_is_closed = 1 
        WHERE res_id = ?
      `;
      values = [id];
      break;

    default:
      return res.status(400).json({ error: "Estado inválido" });
  }

  // Ejecutar la consulta SQL
  connection.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error("❌ Error actualizando estado:", err);
      return res.status(500).json({ error: "Error al actualizar estado" });
    }

    // Confirmar éxito y devolver datos actualizados de la reserva
    res.json({
      message: `✅ Estado actualizado a ${status}`,
      updatedReservation: { id, status, employeeId },
    });
  });
};

const deleteReservation = (req, res) => {
  const { id } = req.params;
  Reservation.delete(id, (err) => {
    if (err) return res.status(500).json({ error: "Error eliminando reserva" });
    res.json({ message: "✅ Reserva eliminada correctamente" });
  });
};

const getMyReservations = (req, res) => {
  const clientId = req.user?.client_id;

  if (!clientId) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }

  const sql = `
    SELECT 
      r.res_id,
      DATE_FORMAT(r.res_checkin, '%Y-%m-%d') AS checkIn,
      DATE_FORMAT(r.res_checkout, '%Y-%m-%d') AS checkOut,
      DATE_FORMAT(i.invoice_date, '%Y-%m-%d') AS fechaReserva,
      rm.room_type AS tipoHabitacion,
      i.invoice_total_price AS precio,
      i.invoice_pay_method AS metodoPago
    FROM reservation r
    JOIN room rm ON r.res_room_id = rm.room_id
    JOIN invoice i ON i.invoice_res_id = r.res_id
    WHERE r.res_client_id = ?
    ORDER BY r.res_checkin DESC
  `;

  connection.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error("❌ Error obteniendo reservas del cliente:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(results);
  });
};

const getClientReservations = (req, res) => {
  const clientId = req.user?.client_id;

  if (!clientId) {
    return res.status(401).json({ error: "No autorizado" });
  }

  Reservation.getClientReservations(clientId, (err, results) => {
    if (err) {
      console.error("❌ Error obteniendo reservas del cliente:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(results);
  });
};

module.exports = {
  getReservations,
  getReservationById,
  createReservation,
  createReservationForGuest,
  updateReservation,
  deleteReservation,
  getMyReservations,
  getClientReservations,
  updateReservationStatus,

};
