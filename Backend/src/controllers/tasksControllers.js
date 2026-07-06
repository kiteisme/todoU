const Task = require("../models/Task.js");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // Sắp xếp theo createdAt giảm dần

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Loi khi goi getAllTasks:", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title} = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Loi khi tao task:", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Khong tim thay task" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Loi khi cap nhat task:", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Khong tim thay task" });
    }
    res.status(200).json({ message: "Da xoa task" });
  } catch (error) {
    console.error("Loi khi xoa task:", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };