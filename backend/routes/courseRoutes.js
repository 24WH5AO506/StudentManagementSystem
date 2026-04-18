const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/roleMiddleware");
const {
  addCourse,
  getCourses,
  updateCourse,
  assignStudent,
  deleteCourse,
} = require("../controllers/courseController");

router.post("/", auth, requireAdmin, addCourse);
router.get("/", auth, requireAdmin, getCourses);
router.put("/:id", auth, requireAdmin, updateCourse);
router.put("/:id/assign-student", auth, requireAdmin, assignStudent);
router.delete("/:id", auth, requireAdmin, deleteCourse);

module.exports = router;
