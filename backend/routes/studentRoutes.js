const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { requireAdmin, requireStudent } = require("../middleware/roleMiddleware");
const {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getMyProfile,
} = require("../controllers/studentController");

router.get("/me", auth, requireStudent, getMyProfile);
router.post("/", auth, requireAdmin, addStudent);
router.get("/", auth, requireAdmin, getStudents);
router.get("/:id", auth, requireAdmin, getStudent);
router.put("/:id", auth, requireAdmin, updateStudent);
router.delete("/:id", auth, requireAdmin, deleteStudent);

module.exports = router;
