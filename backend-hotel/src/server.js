const express = require("express");
const cors = require("cors");
const hotelRoutes = require("./routes/hotels.routes");
const roomRoutes = require("./routes/rooms.routes");
const employeesRoutes = require("./routes/employees.routes");
const reservationRoutes = require("./routes/reservations.routes");
const clientsRoutes = require("./routes/clients.routes");
const authRoutes = require("./routes/auth.routes");
const employeeRoutes = require("./routes/employees.routes");
const db = require("./config/db");
const net = require("net");
const app = express();

app.use("/api/employee", employeeRoutes);
app.use(cors());
app.use(express.json()); // Allows JSON requests

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Hotel API. Use the endpoints under /api");
});

// API routes
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/auth", authRoutes);

// API main route to avoid "Cannot GET /api" error
app.get("/api", (req, res) => {
  res.send(
    "🚀 Welcome to the API. Use endpoints like /api/rooms, /api/hotels, etc."
  );
});

// Function to find an available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      server.once("close", () => resolve(startPort));
      server.close();
    });

    server.on("error", () => {
      console.log(`⚠️ Port ${startPort} is in use. Trying ${startPort + 1}...`);
      resolve(findAvailablePort(startPort + 1));
    });
  });
};

// Start the server on an available port
(async () => {
  const PORT = await findAvailablePort(process.env.PORT || 3000);
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})();
