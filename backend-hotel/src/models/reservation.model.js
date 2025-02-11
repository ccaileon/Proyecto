const db = require("../config/db");

const Reservation = {
  getAll: (callback) => {
    db.query("SELECT * FROM reservation", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM reservation WHERE res_id = ?", [id], callback);
  },

  create: (data, callback) => {
    const sql = `INSERT INTO reservation (res_client_id, res_room_id, res_checkin, res_checkout, res_is_closed) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      data.res_client_id,
      data.res_room_id,
      data.res_checkin,
      data.res_checkout,
      data.res_is_closed,
    ];
    db.query(sql, values, callback);
  },

  update: (id, data, callback) => {
    const sql = `UPDATE reservation SET res_client_id = ?, res_room_id = ?, res_checkin = ?, res_checkout = ?, res_is_closed = ? WHERE res_id = ?`;
    const values = [
      data.res_client_id,
      data.res_room_id,
      data.res_checkin,
      data.res_checkout,
      data.res_is_closed,
      id,
    ];
    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM reservation WHERE res_id = ?", [id], callback);
  },
};

module.exports = Reservation;
