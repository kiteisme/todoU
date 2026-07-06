require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
const path = require("path");

const tasksRoutes = require("./routes/tasksRoutes.js");
const connectDB = require("./config/db.js");

// Fix DNS (optional nhưng tốt khi dùng Mongo Atlas)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// CORS (dev only)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// API routes
app.use("/api/tasks", tasksRoutes);

// Production build (React/Vite)
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});