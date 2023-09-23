const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const Group = require("../controllers/GroupController");

router.post("/api/boards/:boardId/group", authentication, Group.createGroup);
router.put(
  "/api/boards/:boardId/group/:groupId",
  authentication,
  Group.updateGroup
);
router.delete(
  "/api/boards/:boardId/group/:groupId",
  authentication,
  Group.deleteGroup
);

module.exports = router;
