import { useState } from "react";
import "./ResultTable.css";

/**
 * Component ResultTable - Hiển thị danh sách người dùng và xử lý chức năng sửa, xóa
 * Nhận props: users (danh sách), onDeleteUser, onEditUser (callback functions)
 */
function ResultTable({ users, onDeleteUser, onEditUser }) {
  // State lưu ID của user đang được chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  // State lưu dữ liệu form khi đang chỉnh sửa
  const [editFormData, setEditFormData] = useState({});

  // Kích hoạt chế độ chỉnh sửa - Sao chép dữ liệu user vào form
  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditFormData(user); // Deep copy để tránh thay đổi dữ liệu gốc
  };

  // Xử lý thay đổi input khi đang chỉnh sửa
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Lưu thay đổi - Gọi callback function từ component cha
  const handleSaveClick = (id) => {
    onEditUser(id, editFormData);
    setEditingId(null); // Thoát chế độ chỉnh sửa
  };

  // Hủy chỉnh sửa - Quay về chế độ hiển thị bình thường
  const handleCancelClick = () => {
    setEditingId(null);
  };

  return (
    <div className="table-container">
      <h2>Danh sách người dùng ({users.length})</h2>
      {users.length === 0 ? (
        <p className="no-results">Không tìm thấy kết quả</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Username</th>
              <th>Email</th>
              <th>Thành phố</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {/* Render danh sách users bằng map */}
            {users.map((user) => (
              <tr key={user.id}>
                {/* Hiển thị form input nếu đang ở chế độ chỉnh sửa */}
                {editingId === user.id ? (
                  <>
                    <td>{user.id}</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="username"
                        value={editFormData.username}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="city"
                        value={editFormData.address?.city || ""}
                        onChange={(e) => {
                          setEditFormData({
                            ...editFormData,
                            address: {
                              ...editFormData.address,
                              city: e.target.value,
                            },
                          });
                        }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-save"
                        onClick={() => handleSaveClick(user.id)}
                      >
                        Lưu
                      </button>
                      <button
                        className="btn btn-cancel"
                        onClick={handleCancelClick}
                      >
                        Hủy
                      </button>
                    </td>
                  </>
                ) : (
                  /* Hiển thị dữ liệu bình thường nếu không ở chế độ chỉnh sửa */
                  <>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address?.city || "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditClick(user)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          if (window.confirm("Bạn có chắc muốn xóa?")) {
                            onDeleteUser(user.id);
                          }
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ResultTable;
