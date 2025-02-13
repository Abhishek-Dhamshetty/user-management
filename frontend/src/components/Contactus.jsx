import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function ContactUs() {
  return (
    <div className="container" style={{ marginTop: "100px" }}> {/* Increased top space */}
      <h2 className="text-center fw-bold mb-4">📞 Contact Us</h2>

      <div className="row">
        {/* Contact Form */}
        <div className="col-md-6">
          <form
            style={{
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Enter your name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="4" placeholder="Your message"></textarea>
            </div>
            <button className="btn btn-dark w-100">Send Message</button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <p className="fs-5">
            <FaEnvelope /> Email: support@usermanagement.com
          </p>
          <p className="fs-5">
            📞 Phone: +91 98765 43210
          </p>
          <p className="fs-5">
            <FaMapMarkerAlt /> Location: Hyderabad, India
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
