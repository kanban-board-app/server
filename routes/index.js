const express = require("express");
const router = express.Router();

const user = require("./user.js");
const board = require("./board.js");
const group = require("./group.js");
const task = require("./task.js");

router.use(user);
router.use(board);
router.use(group);
router.use(task);

module.exports = router;
