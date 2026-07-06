require("dotenv").config();
const express = require("express");
const cors = require("cors");           
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const tasksRoutes = require("./routes/tasksRoutes.js");
const connectDB = require("./config/db.js");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});