const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/roleMiddleware");
const { getDashboard } = require("../controllers/dashboardController");

router.get("/", auth, requireAdmin, getDashboard);

module.exports = router;
