const express = require("express");
const { registerStep1, registerStep2, login, resetPassword } = require("../controllers/candidatController");

const router = express.Router();

router.post("/register-step1", registerStep1);
router.post("/register-step2", registerStep2);
router.post("/login", login);
router.post("/reset-password", resetPassword);


module.exports = router;

