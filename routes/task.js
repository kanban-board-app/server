const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication.js");
const Task = require("../controllers/TaskController.js");

router.post("/api/groups/:groupId/task", authentication, Task.createTask);
router.put(
  "/api/groups/:groupId/task/:taskId",
  authentication,
  Task.updateTask
);
router.delete(
  "/api/groups/:groupId/task/:taskId",
  authentication,
  Task.deleteTask
);

module.exports = router;
