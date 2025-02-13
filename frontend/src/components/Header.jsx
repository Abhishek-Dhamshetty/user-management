import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function toggleSidebar() {
    setCollapsed(!collapsed);
  }

  function handleMouseEnter() {
    setDarkMode(true);
  }

  function handleMouseLeave() {
    setDarkMode(false);
  }

  return (
    <>
      {/* ☰ Menu Button (Only When Sidebar is Collapsed) */}
      {!collapsed && (
        <button
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            left: "10px",
            top: "60px",
            background: darkMode ? "black" : "white",
            color: darkMode ? "white" : "black",
            border: "none",
            fontSize: "1.5rem",
            padding: "8px",
            cursor: "pointer",
            zIndex: 1000,
            transition: "background 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = darkMode ? "white" : "black";
            e.target.style.color = darkMode ? "black" : "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = darkMode ? "black" : "white";
            e.target.style.color = darkMode ? "white" : "black";
          }}
        >
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          left: "0",
          top: "56px",
          height: "100vh",
          width: "250px",
          background: darkMode ? "white" : "#343a40",
          color: darkMode ? "black" : "white",
          padding: "15px",
          transition: "transform 0.3s ease-in-out, background 0.3s ease",
          transform: collapsed ? "translateX(0)" : "translateX(-100%)",
          boxShadow: "2px 0px 10px rgba(0,0,0,0.2)",
          zIndex: 999,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ✖ Close Button (Only When Sidebar is Open) */}
        {collapsed && (
          <button
            onClick={toggleSidebar}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: darkMode ? "black" : "white",
              color: darkMode ? "white" : "black",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = darkMode ? "white" : "black";
              e.target.style.color = darkMode ? "black" : "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = darkMode ? "black" : "white";
              e.target.style.color = darkMode ? "white" : "black";
            }}
          >
            <FaTimes />
          </button>
        )}

        {/* Navigation Links */}
        <nav>
          <ul style={{ listStyle: "none", padding: "20px 10px" }}>
            {[
              { to: "", text: "Home" },
              { to: "userlist", text: "Users List" },
              { to: "removed-users", text: "Removed Users" },
              { to: "adduser", text: "Add User" }, // Added "Add User" link
            ].map(({ to, text }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  style={({ isActive }) => ({
                    display: "block",
                    padding: "10px",
                    color: isActive ? (darkMode ? "white" : "black") : darkMode ? "black" : "white",
                    background: isActive ? (darkMode ? "black" : "white") : "transparent",
                    textDecoration: "none",
                    fontWeight: "bold",
                    transition: "background 0.3s ease, color 0.3s ease",
                  })}
                  onMouseEnter={(e) => {
                    e.target.style.background = darkMode ? "black" : "white";
                    e.target.style.color = darkMode ? "white" : "black";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = darkMode ? "black" : "white";
                  }}
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
