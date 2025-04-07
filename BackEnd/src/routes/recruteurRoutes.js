const express = require("express");
const {
  registerRecruteur,
  loginRecruteur,
  resetPassword
} = require("../controllers/recruteurController");

const router = express.Router();

router.post("/register", registerRecruteur);
router.post("/login", loginRecruteur);
router.post("/reset-password", resetPassword);

module.exports = router;


