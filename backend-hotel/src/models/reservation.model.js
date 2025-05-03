const db = require("../config/db");

const Reservation = {
  getAll: (callback) => {
    db.query("SELECT * FROM reservation LEFT JOIN client ON client.client_id = res_client_id LEFT JOIN guest ON guest.guest_id = res_guest_id LEFT JOIN room ON room.room_id = res_room_id", callback);
  },

  getById: (id, callback) => {
    db.query(
      "SELECT * FROM reservation FULL JOIN client ON client.client_id = res_client_id LEFT JOIN room ON room.room_id = res_room_id WHERE res_id = ?",
      [id],
      callback
    );

  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO reservation (
        res_client_id, res_guest_id, res_room_id, res_room_hotel_id,
        res_checkin, res_checkout, res_is_closed,
        res_checkin_by, res_checkout_by, res_observations, res_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.res_client_id || null,
      data.res_guest_id || null,
      data.res_room_id,
      data.res_room_hotel_id, // Asegúrate de incluir el hotel
      data.res_checkin,
      data.res_checkout,
      data.res_is_closed || 0,
      data.res_checkin_by || null,
      data.res_checkout_by || null,
      data.res_observations || "",
	  data.res_state || "pending",
    ];

    db.query(sql, values, callback);
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE reservation SET 
        res_client_id = ?, res_guest_id = ?, res_room_id = ?, res_room_hotel_id = ?,  // Incluir hotel
        res_checkin = ?, res_checkout = ?, res_is_closed = ?, 
        res_checkin_by = ?, res_checkout_by = ?, res_observations = ?
      WHERE res_id = ?
    `;

    const values = [
      data.res_client_id || null,
      data.res_guest_id || null,
      data.res_room_id,
      data.res_room_hotel_id, // Incluir el hotel
      data.res_checkin,
      data.res_checkout,
      data.res_is_closed || 0,
      data.res_checkin_by || null,
      data.res_checkout_by || null,
      data.res_observations || "",
      id,
    ];

    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM reservation WHERE res_id = ?", [id], callback);
  },

  getClientReservations: (clientId, callback) => {
    const sql = `
      SELECT 
        r.res_id AS id,
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

    db.query(sql, [clientId], callback);
  },
};

module.exports = Reservation;
