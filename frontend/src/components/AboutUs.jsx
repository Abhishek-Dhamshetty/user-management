import React from "react";

function AboutUs() {
  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">ℹ️ About Us</h2>
      <p className="text-center fs-5">
        Welcome to <b>User Management System</b>, your go-to platform for seamless user management and administration. 
        Our mission is to provide an efficient, user-friendly, and secure platform for handling users effortlessly.
      </p>

      {/* Features Section */}
      <div className="row mt-4">
        <div className="col-md-4 text-center">
          <h4>🚀 Fast & Efficient</h4>
          <p>Experience seamless user management with high performance.</p>
        </div>
        <div className="col-md-4 text-center">
          <h4>🔐 Secure & Reliable</h4>
          <p>Top-notch security for protecting user data and authentication.</p>
        </div>
        <div className="col-md-4 text-center">
          <h4>🎨 User-Friendly UI</h4>
          <p>Our clean and intuitive design ensures a great user experience.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
