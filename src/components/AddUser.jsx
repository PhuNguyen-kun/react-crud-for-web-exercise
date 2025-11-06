import { useState } from "react";
import "./AddUser.css";

/**
 * Component AddUser - Xử lý chức năng thêm người dùng mới
 * Sử dụng Controlled Components để quản lý form
 */
function AddUser({ onAddUser }) {
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // State điều khiển hiển thị/ẩn form
  const [showForm, setShowForm] = useState(false);

  // Xử lý thay đổi input - Cập nhật state theo tên trường
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý submit form - Validate và gọi callback từ component cha
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      onAddUser(formData); // Truyền dữ liệu lên component cha
      setFormData({ name: "", email: "", phone: "" }); // Reset form
      setShowForm(false); // Ẩn form sau khi thêm thành công
    }
  };

  return (
    <div className="add-user-container">
      <button
        className="btn btn-add-toggle"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Ẩn Form" : "Thêm Người Dùng Mới"}
      </button>

      {/* Hiển thị form khi showForm = true */}
      {showForm && (
        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ tên:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-submit">
            Thêm
          </button>
        </form>
      )}
    </div>
  );
}

export default AddUser;
