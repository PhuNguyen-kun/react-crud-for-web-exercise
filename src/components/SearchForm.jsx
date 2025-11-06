import { useState } from "react";
import "./SearchForm.css";

/**
 * Component SearchForm - Xử lý chức năng tìm kiếm
 * Nhận hàm onSearch từ component cha để truyền dữ liệu lên (State Lifting)
 */
function SearchForm({ onSearch }) {
  // State lưu từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // Xử lý sự kiện submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Gọi callback function từ component cha
  };

  // Xử lý reset - Xóa từ khóa và hiển thị lại toàn bộ danh sách
  const handleReset = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, username, email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-search">
          Tìm kiếm
        </button>
        <button type="button" onClick={handleReset} className="btn btn-reset">
          Reset
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
