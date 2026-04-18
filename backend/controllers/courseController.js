const Course = require("../models/Course")

// Add Course
exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.status(201).json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("students")
    res.json(courses)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Assign Student to Course
exports.assignStudent = async (req, res) => {
  try {
    const { studentId } = req.body

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $push: { students: studentId } },
      { new: true }
    )

    res.json(course)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.json({ message: "Course deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
