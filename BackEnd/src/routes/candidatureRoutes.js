const express = require("express");
const candidatureController = require("../controllers/candidatureController");
const authMiddleware = require("../middlewares/authMiddleware");
const { uploadCandidatureFiles } = require("../uploads/multerConfig");
const router = express.Router();

router.post(
  "/postuler", 
  authMiddleware, 
  uploadCandidatureFiles, 
  candidatureController.postuler
);

router.get("/mes-candidatures", authMiddleware, candidatureController.getMesCandidatures);
router.get("/statut/:status", authMiddleware, candidatureController.getCandidaturesByStatus);
router.get("/poste/:jobId", authMiddleware, candidatureController.getCandidatsByJob);
router.put("/:candidatureId/valider", authMiddleware, candidatureController.validerCandidature)



module.exports = router;


