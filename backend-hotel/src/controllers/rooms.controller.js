const Room = require("../models/room.model");

function formatDateToSQL(fecha) {
  if (!fecha) return null;
  const partes = fecha.split("/");
  if (partes.length !== 3) {
    console.error("❌ Error: Formato de fecha inválido", fecha);
    return null;
  }
  const [day, month, year] = partes;
  return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
}

const searchRooms = (req, res) => {
  const { checkIn, checkOut, adults, children } = req.query;

  console.log("🔎 Parámetros recibidos:", req.query);

  // Convertir fechas al formato correcto
  const checkInFormatted = formatDateToSQL(checkIn);
  const checkOutFormatted = formatDateToSQL(checkOut);

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

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  searchRooms,
};
