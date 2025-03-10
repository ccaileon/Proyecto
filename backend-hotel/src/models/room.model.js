const connection = require("../config/db");

const Room = {
  searchRooms: (checkIn, checkOut, totalGuests, callback) => {
    const sql = `
      SELECT r.room_id, r.room_hotel_id, r.room_type, r.room_capacity,
             t.room_mts_square, t.room_has_views, t.room_has_jacuzzi,
             t.room_has_balcony, t.room_has_service
      FROM room r
      JOIN type_room t ON r.room_type = t.room_type
      WHERE r.room_capacity >= ? 
      AND r.room_id NOT IN (
          SELECT DISTINCT res_room_id FROM reservation 
          WHERE (? <= res_checkout AND ? >= res_checkin)
      )
    `;

    console.log("📌 Ejecutando consulta SQL con valores:", [
      totalGuests,
      checkOut,
      checkIn,
    ]);

    connection.query(sql, [totalGuests, checkOut, checkIn], callback);
  },

  getAll: (callback) => {
    const sql = `
      SELECT r.room_id, r.room_hotel_id, r.room_type, r.room_capacity,
             t.room_mts_square, t.room_has_views, t.room_has_jacuzzi,
             t.room_has_balcony, t.room_has_service
      FROM room r
      JOIN type_room t ON r.room_type = t.room_type
    `;
    connection.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `
      SELECT r.room_id, r.room_hotel_id, r.room_type, r.room_capacity,
             t.room_mts_square, t.room_has_views, t.room_has_jacuzzi,
             t.room_has_balcony, t.room_has_service
      FROM room r
      JOIN type_room t ON r.room_type = t.room_type
      WHERE r.room_id = ?
    `;
    connection.query(sql, [id], callback);
  },

  create: (roomData, callback) => {
    const { room_hotel_id, room_type, room_capacity } = roomData;
    if (!room_hotel_id || !room_type || !room_capacity) {
      return callback(new Error("All fields are required"), null);
    }

    const sql = `
      INSERT INTO room (room_hotel_id, room_type, room_capacity)
      VALUES (?, ?, ?)
    `;
    connection.query(sql, [room_hotel_id, room_type, room_capacity], callback);
  },

  update: (id, roomData, callback) => {
    const { room_hotel_id, room_type, room_capacity } = roomData;
    if (!room_hotel_id || !room_type || !room_capacity) {
      return callback(new Error("All fields are required"), null);
    }

    const sql = `
      UPDATE room 
      SET room_hotel_id = ?, room_type = ?, room_capacity = ?
      WHERE room_id = ?
    `;
    connection.query(
      sql,
      [room_hotel_id, room_type, room_capacity, id],
      callback
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM room WHERE room_id = ?";
    connection.query(sql, [id], callback);
  },
};

module.exports = Room;
