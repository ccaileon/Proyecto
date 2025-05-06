const express = require("express");
const router = express.Router();
const shiftController = require("../controllers/shift.controller");

router.put("/logout/:id", shiftController.registerShiftOut);

module.exports = router;
