import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: ""
  });

  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách sinh viên
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Xử lý nhập dữ liệu
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Thêm sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/students", form);

      setForm({
        studentId: "",
        name: "",
        email: ""
      });

      loadStudents();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Chọn sinh viên để sửa
  const handleEdit = (student) => {
    setEditingId(student._id);

    setForm({
      studentId: student.studentId,
      name: student.name,
      email: student.email
    });
  };

  // Cập nhật sinh viên
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/students/${editingId}`, form);

      setEditingId(null);

      setForm({
        studentId: "",
        name: "",
        email: ""
      });

      loadStudents();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Xóa sinh viên
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
      return;
    }

    try {
      await axios.delete(`/api/students/${id}`);

      loadStudents();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Hủy sửa
  const handleCancel = () => {
    setEditingId(null);

    setForm({
      studentId: "",
      name: "",
      email: ""
    });
  };

  return (
    <div>
      <h1>Quản lý sinh viên</h1>

      <h2>{editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}</h2>

      <input
        name="studentId"
        placeholder="Mã sinh viên"
        value={form.studentId}
        onChange={handleChange}
      />

      <input
        name="name"
        placeholder="Họ tên"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      {editingId ? (
        <>
          <button onClick={handleUpdate}>
            Cập nhật sinh viên
          </button>

          <button onClick={handleCancel}>
            Hủy
          </button>
        </>
      ) : (
        <button onClick={handleSubmit}>
          Thêm sinh viên
        </button>
      )}

      <h2>Danh sách sinh viên</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>Mã SV: {student.studentId}</p>
          <p>Họ tên: {student.name}</p>
          <p>Email: {student.email}</p>

          <button onClick={() => handleEdit(student)}>
            Sửa
          </button>

          <button onClick={() => handleDelete(student._id)}>
            Xóa
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
