const express = require("express");
const router = express.Router();
const Board = require("../controllers/BoardController.js");
const authentication = require("../middlewares/authentication.js");

router.get("/api/boards", authentication, Board.findBoards);
router.get("/api/boards/:boardId", authentication, Board.findBoard);
router.post("/api/boards", authentication, Board.createBoard);
router.put("/api/boards/:boardId", authentication, Board.updateBoard);
router.delete("/api/boards/:boardId", authentication, Board.deleteBoard);

module.exports = router;
