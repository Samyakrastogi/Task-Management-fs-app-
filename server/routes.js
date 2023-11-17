const express = require("express");
const taskService = require("./service");

const router = express.Router();

// API Endpoints

// Create new task
router.post("/", taskService.createTask);

// Get list of all tasks
router.get("/", taskService.getTasks);

// Get a task by its ID
router.get("/:id", taskService.getTaskById);

// Update a existing task using ID
router.put("/:id", taskService.updateTask);

// Delete a task using ID
router.delete("/:id", taskService.deleteTask);

module.exports = router;
