import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';


function RootLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    
      <div>
        {/* Navbar containing Title (as a clickable link) and Dark Mode Toggle */}
        <nav
          className="navbar navbar-expand-lg px-3"
          style={{
            background: darkMode ? "#111" : "#222",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            position: "fixed",
            width: "100%",
            top: "0",
            zIndex: "1000",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
          }}
        >
          {/* Clickable NavLink to Home Page */}
          <NavLink 
            to="/" 
            className="fw-bold"
            style={{ 
              fontSize: "1.5rem", 
              textDecoration: "none", 
              color: "white", 
              transition: "color 0.3s ease" 
            }}
            onMouseEnter={(e) => (e.target.style.color = "#bbb")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            User Management
          </NavLink>

          {/* Dark Mode Toggle Button */}
          <button
            className="btn btn-outline-light"
            onClick={toggleDarkMode}
            style={{
              fontSize: "1rem",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "transform 0.3s ease",
              background: darkMode ? "white" : "black",
              color: darkMode ? "black" : "white",
              borderColor: darkMode ? "black" : "white"
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
          </button>
        </nav>

        {/* Space below navbar to prevent content from being hidden */}
        <div style={{ marginTop: "60px", minHeight: "100vh" }}>
          <Header />
          <Outlet />
        </div>

        <Footer />
      </div>
    
  );
}

export default RootLayout;
