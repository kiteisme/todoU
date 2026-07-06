const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING,
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // dừng app nếu không kết nối được DB, tránh chạy server "ma"
  }
};

module.exports = connectDB;