import { useEffect, useState } from "react";
import API from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch {
      alert("Error fetching courses");
    }
  };

  useEffect(() => {
    const loadCourses = async () => {
      await fetchCourses();
    };

    loadCourses();
  }, []);

  const saveCourse = async () => {
    try {
      if (editId) {
        await API.put(`/courses/${editId}`, form);
      } else {
        await API.post("/courses", form);
      }

      await fetchCourses();
      setForm({ name: "", description: "" });
      setEditId(null);
    } catch {
      alert("Error saving course");
    }
  };

  const editCourse = (course) => {
    setForm({
      name: course.name,
      description: course.description || "",
    });
    setEditId(course._id);
  };

  // Delete course
  const deleteCourse = async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      fetchCourses();
    } catch {
      alert("Error deleting course");
    }
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <span className="badge">Catalog</span>
          <h2>Courses</h2>
          <p>
            Keep course records in one place with a dedicated form and a
            separate listing table.
          </p>
        </div>
      </div>

      <div className="panel-grid">
        <div className="surface-card">
          <h3 className="section-title">
            {editId ? "Edit Course" : "Create Course"}
          </h3>
          <p className="section-text">
            Add or update a clean course title and a short description for
            students and admin records.
          </p>

          <div className="form-grid">
            <div className="field full-width">
              <label>Course Name</label>
              <input
                placeholder="Enter course name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="field full-width">
              <label>Description</label>
              <textarea
                placeholder="Write a short description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="actions-row">
            <button onClick={saveCourse} className="button-primary">
              {editId ? "Update Course" : "Add Course"}
            </button>
            {editId ? (
              <button
                onClick={() => {
                  setEditId(null);
                  setForm({ name: "", description: "" });
                }}
                className="button-secondary"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>

        <div className="surface-card table-card">
          <h3 className="section-title">Course List</h3>
          <p className="section-text">
            Existing courses are shown here in a clean aligned table.
          </p>

          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.name}</td>
                    <td>{course.description || "No description added"}</td>
                    <td>
                      <div className="actions-row" style={{ marginTop: 0 }}>
                        <button
                          onClick={() => editCourse(course)}
                          className="button-warn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCourse(course._id)}
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
