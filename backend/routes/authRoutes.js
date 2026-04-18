const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  registerStudent,
  loginAdmin,
  loginStudent,
} = require("../controllers/authController");

router.post("/register", registerAdmin);
router.post("/student/register", registerStudent);
router.post("/admin/login", loginAdmin);
router.post("/student/login", loginStudent);

module.exports = router;
