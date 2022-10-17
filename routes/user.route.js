const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", userController.signup);
router.get("/login", userController.login);
router.get("/me", verifyToken, userController.getme);

module.exports = router;
