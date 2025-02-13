import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Added email state
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email); // Added email to formData
    formData.append("profileImage", profileImage);
    formData.append("role", role);
    formData.append("description", description);

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/userlist"); // Redirect after submission
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="container mx-auto w-50">
      <h2 className="text-center" style={{ marginTop: "100px" }}>Register User</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label>Username:</label>
        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Email:</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Profile Image:</label>
        <input type="file" className="form-control" accept=".jpg,.jpeg,.png" onChange={handleImageChange} required />

        <label>Role:</label>
        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="employee">Employee</option>
          <option value="teacher">Teacher</option>
        </select>

        <label>Description:</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
