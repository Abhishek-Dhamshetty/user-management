import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate=useNavigate();

  // Image slider data
  const slides = [
    {
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
      text: "Manage Users Efficiently",
    },
    {
      image: "https://images.pexels.com/photos/3747206/pexels-photo-3747206.jpeg",
      text: "Secure & Scalable Platform",
    },
    {
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      text: "Optimize User Experience",
    },
  ];

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
    document.body.style.backgroundColor = darkMode ? "white" : "black";
    document.body.style.color = darkMode ? "black" : "white";
  }
  function getStarted(){
    navigate('/adduser');
  }

  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg px-3"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: darkMode ? "black" : "white",
          color: darkMode ? "white" : "black",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <a
          className="navbar-brand fw-bold"
          href="/"
          style={{
            color: darkMode ? "white" : "black",
            fontSize: "1.5rem",
            transition: "color 0.3s ease",
          }}
        >
          User Management
        </a>

        <button
          className="btn ms-auto"
          onClick={toggleDarkMode}
          style={{
            fontSize: "1rem",
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: darkMode ? "white" : "black",
            color: darkMode ? "black" : "white",
            border: "none",
            transition: "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
        </button>
      </nav>

      {/* Space below navbar */}
      <div style={{ marginTop: "60px" }}>
        {/* Hero Section with Image Slider */}
        <div
          className="container-fluid d-flex align-items-center justify-content-center"
          style={{
            height: "80vh",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Background Image */}
          <div
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
              filter: "brightness(80%)",
              transition: "background-image 1s ease-in-out",
            }}
          ></div>

          {/* Content */}
          <div
            style={{
              position: "relative",
              color: "white",
              textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
              maxWidth: "80%",
            }}
          >
            <h1 className="display-4 fw-bold">{slides[currentSlide].text}</h1>
            <p className="lead">The best way to manage your users with efficiency and security.</p>
            <button onClick={getStarted}
              className="btn btn-lg mt-3"
              style={{
                backgroundColor: darkMode ? "white" : "#007bff",
                color: darkMode ? "black" : "white",
                padding: "12px 24px",
                borderRadius: "8px",
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Get Started
            </button>
          </div>

          {/* Navigation Buttons */}
          <button
            className="btn"
            style={{
              position: "absolute",
              left: "5%",
              fontSize: "2rem",
              color: "white",
              background: "transparent",
              border: "none",
            }}
            onClick={() =>
              setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
            }
          >
            ❮
          </button>
          <button
            className="btn"
            style={{
              position: "absolute",
              right: "5%",
              fontSize: "2rem",
              color: "white",
              background: "transparent",
              border: "none",
            }}
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
