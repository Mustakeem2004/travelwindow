import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a1a",
        color: "white",
        padding: "40px 20px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Logo / About */}
        <div>
          <h2 style={{ color: "#f2f2f2" }}>HotelBooking</h2>
          <p style={{ color: "#aaa", marginTop: "10px" }}>
            Explore the best hotels in Uttarakhand. Find your stay with ease and comfort.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ marginBottom: "10px" }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/" style={{ color: "#aaa", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/hotels"
                style={{ color: "#aaa", textDecoration: "none" }}
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                style={{ color: "#aaa", textDecoration: "none" }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{ color: "#aaa", textDecoration: "none" }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ marginBottom: "10px" }}>Contact</h3>
          <p>Email: support@hotelbooking.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Dehradun, Uttarakhand</p>
        </div>
      </div>

      <hr style={{ margin: "20px 0", borderColor: "#333" }} />

      <p style={{ textAlign: "center", color: "#888" }}>
        © {new Date().getFullYear()} HotelBooking. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
