import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function UserList() {
  const [usersList, setUsersList] = useState([]); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function getUsers() {
    try {
      let res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users`);
      if (res.data.message === 'usersList') {
        setUsersList(res.data.payload);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Failed to fetch users');
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  function gotoProfile(userObj) {
    navigate(`/users/${userObj.username}`, { state: userObj });
  }

  return (
    <div className="container mt-5"> {/* Added top margin */}
      <h2 className="text-center mb-4 fw-bold " style={{ marginTop: "100px" }}>Users List</h2> {/* Title Added */}
      
      {error && <p className="display-4 text-center text-danger">{error}</p>}
      
      <div className="d-flex flex-column align-items-center">
        {usersList.map((userObj) => (
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
            {/* Profile Image */}
            <img
                className="rounded-circle"
                src={userObj.profileImageUrl?.startsWith("http") ? userObj.profileImageUrl : `${import.meta.env.VITE_REACT_APP_IMAGE_BASEURL}${userObj.profileImageUrl}`}
                alt="User profile"
              width="60"
              height="60"
              style={{ objectFit: "cover", border: "2px solid #ddd" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml;base64," +
                  btoa(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="gray" d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-7 16c0-3.5 3.5-6 7-6s7 2.5 7 6v2H5v-2z"/></svg>'
                  );
              }}
            />

            {/* User Details */}
            <div className="ms-3 flex-grow-1">
              <h5 className="fw-bold mb-1">{userObj.username}</h5>
              <p className="text-info mb-1">{userObj.email}</p>
              <span className="badge bg-primary">{userObj.role}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
