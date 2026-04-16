const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/pcosController");

router.post("/test", controller.submitPCOSTest);
router.get("/dashboard", auth, controller.getDashboardInsights);

module.exports = router;
