const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const { registerUser, loginUser, currentUser } = require("../controllers/userController");

// Route handler for registering a new user
router.post("/register", registerUser);

// Route handler for user login
router.post("/login", loginUser);

// Private route to get the current logged-in user
router.get("/current", validateToken, currentUser);

module.exports = router;
