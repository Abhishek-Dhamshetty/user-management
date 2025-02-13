import { useState, useEffect } from "react";
import { MdOutlineRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RemovedUsers() {
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch deleted users
  async function getUsers() {
    try {
      let res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/del`);
      console.log("Deleted Users API Response:", res.data);

      if (res.data.message === "deleted list" && Array.isArray(res.data.payload)) {
        setUsersList(res.data.payload);
      } else {
        setUsersList([]);
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users");
    }
  }

  // Restore user function
  async function handleRestore(username) {
    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/res/${username}`);
      console.log("Restore Response:", res.data);

      if (res.data.message === "Restored Successfully") {
        // Remove the restored user from the list
        setUsersList(prevUsers => prevUsers.filter(user => user.username !== username));
        // You might want to show a success message here
      } else {
        setError("Failed to restore user");
      }
    } catch (err) {
      console.error("Error restoring user:", err);
      setError("Failed to restore user");
    }
  }

  // Fetch deleted users on mount
  useEffect(() => {
    getUsers();
  }, []);

  // Navigate to user profile
  function gotoProfile(userObj) {
    navigate(`/users/${userObj.username}`, { state: userObj });
  }

  return (
    <div className="container mt-5"> {/* Added top margin for better spacing */}
      <h2 className="text-center mb-4 fw-bold mt-5">Removed Users</h2> {/* Title Added */}

      {error && <p className="display-4 text-center mt-5 text-danger">{error}</p>}

      <div className="d-flex flex-column align-items-center">
        {usersList.length === 0 && !error ? (
          <p className="text-center lead mt-4">No removed users found.</p>
        ) : (
          usersList.map((userObj) => (
            <div
              key={userObj.username}
              className="d-flex align-items-center justify-content-between p-3 mb-3 user-card"
              style={{
                width: "60%",
                backgroundColor: "var(--card-bg)",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
              }}
            >
              <img
                  className="rounded-circle"
                  src={userObj.profileImageUrl || `${import.meta.env.VITE_REACT_APP_IMAGE_BASEURL}/default-profile.png`}
                  alt="User profile"
                  width="60"
                  height="60"
                  style={{ objectFit: "cover", border: "2px solid #ddd" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${import.meta.env.VITE_REACT_APP_IMAGE_BASEURL}/default-profile.png`; // Use fallback image if loading fails
                  }}
                />


              {/* User Details */}
              <div className="ms-3 flex-grow-1">
                <h5 className="fw-bold mb-1">{userObj.username}</h5>
                <p className="text-muted mb-1">{userObj.email}</p>
                <span className="badge bg-danger">{userObj.role}</span>
              </div>

              {/* Read More Button */}
              <button
                className="btn btn-success ms-3"
                onClick={() => gotoProfile(userObj)}
                style={{
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                Read More
              </button>

              {/* Restore Button */}
              <button
                className="btn btn-info ms-3"
                onClick={() => handleRestore(userObj.username)}
                title="Restore User"
                style={{
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                <MdOutlineRestore className="fs-1" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RemovedUsers;
