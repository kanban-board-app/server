const express = require("express");
const router = express.Router();
const User = require("../controllers/UserController");

router.post("/api/register", User.register);
router.post("/api/login", User.login);

module.exports = router;
