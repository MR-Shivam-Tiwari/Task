const express = require("express");
const router = express.Router();
const Task = require("../Model/Task");

router.post("/tasks", async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    const taskData = {
      title,
      description,
      dueDate,
      user: req.user ? req.user._id : null,
      priority,
      category,
    };

    const task = await Task.create(taskData);
    // Send the task data back in the response, including priority and category
    const responseData = {
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      user: task.user,
      completed: task.completed,
      priority: task.priority,
      category: task.category,
      __v: task.__v
    };
    res.status(201).json(responseData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/taskscompleted/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: req.body.completed },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/tasks/:taskId", async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.taskId },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).send("Task not found.");
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.taskId,
    });

    if (!deletedTask) {
      return res.status(404).send("Task not found.");
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
