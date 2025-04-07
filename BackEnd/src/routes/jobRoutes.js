const express = require("express");
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, jobController.createJob);
router.patch("/:jobId", authMiddleware, jobController.updateJobStatus);
router.get("/open", jobController.getOpenJobs);
router.get("/closed", jobController.getClosedJobs);
router.get("/recommended", authMiddleware, jobController.getRecommendedJobs);


module.exports = router;



