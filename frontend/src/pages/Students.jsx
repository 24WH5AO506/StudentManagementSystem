import { useEffect, useState } from "react";
import API from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error fetching students");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error fetching courses");
    }
  };

  useEffect(() => {
    const loadPageData = async () => {
      await Promise.all([fetchStudents(), fetchCourses()]);
    };

    loadPageData();
  }, []);

  const saveStudent = async () => {
    try {
      const payload = {
        ...form,
        course: form.course || null,
      };

      if (editId) {
        await API.put(`/students/${editId}`, payload);
      } else {
        await API.post("/students", payload);
      }

      setEditId(null);
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        password: "",
      });

      await fetchStudents();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Error saving student"
      );
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      await fetchStudents();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Error deleting student");
    }
  };

  const editStudent = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone || "",
      course: student.course?._id || student.course || "",
      password: "",
    });
    setEditId(student._id);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="page-header">
        <div>
          <span className="badge">Accounts</span>
          <h2>Students</h2>
          <p>
            This page is only for student accounts. Create or update login
            details on the left, and review student records on the right.
          </p>
        </div>
      </div>

      <div className="panel-grid">
        <div className="surface-card">
          <h3 className="section-title">
            {editId ? "Edit Student" : "Create Student"}
          </h3>
          <p className="section-text">
            Students use this email and password to access their profile page.
          </p>

          <div className="form-grid">
            <div className="field">
              <label>Name</label>
              <input
                placeholder="Student name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                placeholder="Student email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Phone</label>
              <input
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder={editId ? "New password (optional)" : "Password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="field full-width">
              <label>Course</label>
              <select
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="actions-row">
            <button onClick={saveStudent} className="button-primary">
              {editId ? "Update Student" : "Create Student"}
            </button>
          </div>
        </div>

        <div className="surface-card table-card">
          <h3 className="section-title">Student Directory</h3>
          <p className="section-text">
            Search students by name or email and use the actions column to edit
            or remove them.
          </p>

          <div className="search-bar">
            <input
              className="search-input"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone || "-"}</td>
                    <td>
                      {student.course ? (
                        <span className="pill">
                          {student.course.name || student.course}
                        </span>
                      ) : (
                        <span className="muted-text">No Course</span>
                      )}
                    </td>
                    <td>
                      <div className="actions-row">
                        <button
                          onClick={() => editStudent(student)}
                          className="button-warn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStudent(student._id)}
                          className="button-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
