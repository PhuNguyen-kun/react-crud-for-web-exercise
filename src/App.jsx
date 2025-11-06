import { useState } from "react";
import SearchForm from "./components/SearchForm";
import AddUser from "./components/AddUser";
import ResultTable from "./components/ResultTable";
import { initialUsers } from "./data/users";
import "./App.css";

/**
 * Component App - Component cha quản lý toàn bộ state và logic CRUD
 * Áp dụng nguyên tắc State Lifting: state được lưu ở component cha
 * và truyền xuống các component con qua props
 */
function App() {
  // State chính lưu trữ toàn bộ danh sách users
  const [users, setUsers] = useState(initialUsers);
  // State lưu danh sách users đã được lọc theo từ khóa tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);

  // Hàm xử lý tìm kiếm - Lọc users theo name, email hoặc phone
  const handleSearch = (searchTerm) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  // Hàm thêm user mới (CREATE)
  const handleAddUser = (newUser) => {
    // Tự động tạo ID mới bằng cách tìm ID lớn nhất và cộng 1
    const userWithId = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    };
    // Cập nhật cả 2 state: users và filteredUsers
    const updatedUsers = [...users, userWithId];
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  // Hàm xóa user (DELETE) - Sử dụng filter để loại bỏ user có id trùng khớp
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  // Hàm sửa user (UPDATE) - Sử dụng map để cập nhật user có id trùng khớp
  const handleEditUser = (id, updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  // Render các component con và truyền props (hàm callback và dữ liệu)
  return (
    <div className="app-container">
      <h1>Quản lý Người dùng</h1>
      <SearchForm onSearch={handleSearch} />
      <AddUser onAddUser={handleAddUser} />
      <ResultTable
        users={filteredUsers}
        onDeleteUser={handleDeleteUser}
        onEditUser={handleEditUser}
      />
    </div>
  );
}

export default App;
