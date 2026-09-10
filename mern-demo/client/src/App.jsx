import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: ""
  });

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

      // Xóa dữ liệu trong ô nhập
      setForm({
        studentId: "",
        name: "",
        email: ""
      });

      // Tải lại danh sách
      loadStudents();
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div>
      <h1>Quản lý sinh viên</h1>

      <h2>Thêm sinh viên</h2>

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

      <button onClick={handleSubmit}>
        Thêm sinh viên
      </button>

      <h2>Danh sách sinh viên</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>Mã SV: {student.studentId}</p>
          <p>Họ tên: {student.name}</p>
          <p>Email: {student.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;