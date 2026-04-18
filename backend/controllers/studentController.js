const Student = require("../models/Student")
const bcrypt = require("bcryptjs")

// Add Student
exports.addStudent = async (req, res) => {
  try {
    const { password, ...rest } = req.body

    if (!password) {
      return res.status(400).json({ message: "Password is required" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const student = new Student({
      ...rest,
      password: hashedPassword
    })

    await student.save()
    res.status(201).json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get All Students + Search + Filter
exports.getStudents = async (req, res) => {
  try {
    const { search, course } = req.query

    let query = {}

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    }

    // Filter by Course
    if (course) {
      query.course = course
    }

    const students = await Student.find(query).select("-password").populate("course")

    res.json(students)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get Single Student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password").populate("course")
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const updates = { ...req.body }

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10)
    } else {
      delete updates.password
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    )
    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getMyProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password").populate("course")

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id)
    res.json({ message: "Student deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
