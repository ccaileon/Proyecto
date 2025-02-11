const Room = require("../models/room.model");

const getRooms = (req, res) => {
  Room.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const getRoomById = (req, res) => {
  Room.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0] || {});
  });
};

const createRoom = (req, res) => {
  Room.create(req.body, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

const updateRoom = (req, res) => {
  Room.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Habitación actualizada" });
  });
};

const deleteRoom = (req, res) => {
  Room.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Habitación eliminada" });
  });
};

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
