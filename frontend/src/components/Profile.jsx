import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoSave } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from "axios";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(location.state || null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        description: user.description,
      });
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/${user.username}`,
        formData
      );

      if (res.data.message === "User Modified") {
        setUser(res.data.payload);
        setIsEditing(false);
        alert("Profile updated successfully");
      }
    } catch (err) {
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/${user.username}`
      );

      if (res.data.message === "User deleted") {
        alert("User deleted successfully");
        navigate("/");
      }
    } catch (err) {
      setError("Error deleting user");
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      {error && <div className="alert alert-danger">{error}</div>}

      <div
        className="card shadow-lg p-4"
        style={{
          width: "450px",
          background: "var(--card-bg)",
          color: "var(--text-color)",
          borderRadius: "12px",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="card-body text-center">
          {/* Profile Image */}
          <img
              src={user.profileImageUrl || ""}
              alt="User profile"
              className="rounded-circle mb-3"
              width="100"
              height="100"
              style={{ objectFit: "cover", border: "3px solid #ddd" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml;base64," +
                  btoa(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="gray" d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-7 16c0-3.5 3.5-6 7-6s7 2.5 7 6v2H5v-2z"/></svg>'
                  );
              }}
            />

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success me-2"
                disabled={loading}
                style={{ transition: "transform 0.2s ease" }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                <IoSave className="me-2" /> Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h5 className="fw-bold" >{user.username}</h5>
              <p className="fw-bold">{user.email}</p>
              <span className="badge bg-primary">{user.role}</span>
              <p className="mt-3">{user.description}</p>

              {/* Buttons */}
              <div className="mt-3">
                <button
                  className="btn btn-primary me-2"
                  onClick={handleEdit}
                  disabled={loading}
                  style={{ transition: "transform 0.2s ease" }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  <FaEdit className="me-2" /> Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={loading}
                  style={{ transition: "transform 0.2s ease" }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  <MdDelete className="me-2" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
