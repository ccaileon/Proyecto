const db = require("../config/db");

const Reservation = {
  getAll: (callback) => {
    db.query("SELECT * FROM reservation", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM reservation WHERE res_id = ?", [id], callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO reservation (
        res_client_id, res_guest_id, res_room_id, res_room_hotel_id,
        res_checkin, res_checkout, res_is_closed,
        res_checkin_by, res_checkout_by, res_observations
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.res_client_id || null,
      data.res_guest_id || null,
      data.res_room_id,
      data.res_room_hotel_id,
      data.res_checkin,
      data.res_checkout,
      data.res_is_closed || 0,
      data.res_checkin_by || null,
      data.res_checkout_by || null,
      data.res_observations || "",
    ];

    db.query(sql, values, callback);
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE reservation SET 
        res_client_id = ?, res_guest_id = ?, res_room_id = ?, res_room_hotel_id = ?,
        res_checkin = ?, res_checkout = ?, res_is_closed = ?, 
        res_checkin_by = ?, res_checkout_by = ?, res_observations = ?
      WHERE res_id = ?
    `;

    const values = [
      data.res_client_id || null,
      data.res_guest_id || null,
      data.res_room_id,
      data.res_room_hotel_id,
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
};

module.exports = Reservation;
