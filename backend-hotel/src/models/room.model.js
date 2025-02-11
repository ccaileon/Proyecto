const connection = require("../config/db"); // Agregar esta línea

const Room = {
  getAll: (callback) => {
    connection.query("SELECT * FROM room", callback);
  },
  getById: (id, callback) => {
    connection.query("SELECT * FROM room WHERE room_id = ?", [id], callback);
  },
  create: (roomData, callback) => {
    connection.query("INSERT INTO room SET ?", roomData, callback);
  },
  update: (id, roomData, callback) => {
    connection.query(
      "UPDATE room SET ? WHERE room_id = ?",
      [roomData, id],
      callback
    );
  },
  delete: (id, callback) => {
    connection.query("DELETE FROM room WHERE room_id = ?", [id], callback);
  },
};

module.exports = Room;
