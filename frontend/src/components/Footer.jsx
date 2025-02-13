import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#343a40",
        color: "white",
        padding: "30px 0",
        textAlign: "center",
        position: "relative",
        bottom: 0,
      }}
    >
      <div className="container">
        {/* Brand Name */}
        <p style={{ marginBottom: "5px", fontSize: "1.5rem", fontWeight: "bold" }}>
          User Management System
        </p>

        {/* Navigation Links */}
        <div style={{ margin: "10px 0", display: "flex", justifyContent: "center", gap: "20px" }}>
          <a
            href="/about"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#f39c12")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            ℹ️ About Us
          </a>
          <a
            href="/contact"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#f39c12")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            📞 Contact Us
          </a>
          <a
            href="/privacy"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#f39c12")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            🔒 Privacy Policy
          </a>
        </div>

        {/* Contact Info */}
        <p style={{ fontSize: "1rem", marginTop: "10px" }}>
          <FaEnvelope /> Email: support@usermanagement.com | 📞 Phone: +91 98765 43210
        </p>

        {/* Social Media Links */}
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "15px" }}>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "white",
              fontSize: "1rem",
              transition: "color 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#f39c12")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            <FaGithub /> GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "white",
              fontSize: "1rem",
              transition: "color 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#f39c12")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "10px" }}>
          © {new Date().getFullYear()} All Rights Reserved 
        </p>
      </div>
    </footer>
  );
}

export default Footer;
