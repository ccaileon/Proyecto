const Room = require("../models/room.model");
const connection = require("../config/db");

const searchRooms = (req, res) => {
  const { checkIn, checkOut, adults, children } = req.query;

  console.log("🔎 Parámetros recibidos:", req.query);

  // ✅ Convertir a fechas JS válidas directamente
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (isNaN(checkInDate) || isNaN(checkOutDate)) {
    console.error("❌ Error: Formato de fecha inválido", checkIn, checkOut);
    return res.status(400).json({ error: "Formato de fecha inválido" });
  }

  const checkInFormatted = checkInDate.toISOString().split("T")[0];
  const checkOutFormatted = checkOutDate.toISOString().split("T")[0];

  console.log("📌 Fechas convertidas a SQL:", {
    checkInFormatted,
    checkOutFormatted,
  });

  // Convertir a número y validar
  const totalGuests =
    (parseInt(adults, 10) || 0) + (parseInt(children, 10) || 0);

  if (!checkInFormatted || !checkOutFormatted || isNaN(totalGuests)) {
    return res.status(400).json({ error: "Invalid search parameters" });
  }

  Room.searchRooms(
    checkInFormatted,
    checkOutFormatted,
    totalGuests,
    (err, results) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ error: "Database error", details: err });
      }

      console.log("📌 Resultados obtenidos:", results);

      res.json(results);
    }
  );
};

const getRooms = (req, res) => {
  Room.getAll((err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json(results);
  });
};

const getRoomById = (req, res) => {
  let roomId = parseInt(req.params.id, 10);

  if (isNaN(roomId)) {
    return res.status(400).json({ error: "Invalid room ID" });
  }

  Room.getById(roomId, (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(results[0]);
  });
};

const createRoom = (req, res) => {
  Room.create(req.body, (err, results) => {
    if (err) {
      console.error("❌ Error creating room:", err);
      return res.status(400).json({ error: "Database error", details: err });
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

const updateRoom = (req, res) => {
  const roomId = parseInt(req.params.id, 10);
  if (isNaN(roomId)) {
    return res.status(400).json({ error: "Invalid room ID" });
  }

  Room.update(roomId, req.body, (err, result) => {
    if (err) {
      console.error("❌ Error updating room:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room updated successfully" });
  });
};

const deleteRoom = (req, res) => {
  const roomId = parseInt(req.params.id, 10);
  if (isNaN(roomId)) {
    return res.status(400).json({ error: "Invalid room ID" });
  }

  Room.delete(roomId, (err, result) => {
    if (err) {
      console.error("❌ Error deleting room:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted successfully" });
  });
};

const enableRoom = (req, res) => {
  const roomId = parseInt(req.params.id, 10);
  if (isNaN(roomId)) return res.status(400).json({ error: "Invalid room ID" });

  Room.enableRoom(roomId, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "✅ Habitación habilitada correctamente" });
  });
};

const disableRoom = (req, res) => {
  const roomId = parseInt(req.params.id, 10);
  if (isNaN(roomId)) return res.status(400).json({ error: "Invalid room ID" });

  Room.disableRoom(roomId, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "🚫 Habitación deshabilitada correctamente" });
  });
};
const getEnabledRooms = (req, res) => {
  Room.getEnabledRooms((err, results) => {
    if (err) {
      console.error("❌ Error obteniendo habitaciones habilitadas:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

const getDisabledRooms = (req, res) => {
  Room.getDisabledRooms((err, results) => {
    if (err) {
      console.error("❌ Error obteniendo habitaciones deshabilitadas:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};
const getRoomTypes = (req, res) => {
  const sql = "SELECT * FROM type_room";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener tipos de habitación:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
};
const updateRoomPrice = (req, res) => {
  const { type } = req.params;
  const { price } = req.body;

  if (!price || isNaN(price)) {
    return res.status(400).json({ error: "Invalid price value" });
  }

  const sql = "UPDATE type_room SET room_price = ? WHERE room_type = ?";

  connection.query(sql, [price, type], (err, result) => {
    if (err) {
      console.error("❌ Error updating room price:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Room type not found" });
    }

    res.json({ message: "✅ Room price updated successfully" });
  });
};

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  searchRooms,
  enableRoom,
  disableRoom,
  getEnabledRooms,
  getDisabledRooms,
  updateRoomPrice,
  getRoomTypes,
};
