const Student = require("../models/Student")
const Course = require("../models/Course")

exports.getDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments()
    const totalCourses = await Course.countDocuments()

    res.json({
      totalStudents,
      totalCourses
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
