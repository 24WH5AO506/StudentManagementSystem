const Admin = require("../models/Admin")
const Student = require("../models/Student")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Register Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = new Admin({
      email,
      password: hashedPassword
    })

    await admin.save()

    res.status(201).json({ message: "Admin registered successfully" })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    const existingStudent = await Student.findOne({ email })

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const student = new Student({
      name,
      email,
      phone,
      password: hashedPassword,
      course: null
    })

    await student.save()

    res.status(201).json({ message: "Student registered successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// Login Admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body

    const student = await Student.findOne({ email }).select("+password").populate("course")

    if (!student) {
      return res.status(400).json({ message: "Student not found" })
    }

    const isMatch = await bcrypt.compare(password, student.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    )

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        course: student.course
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
