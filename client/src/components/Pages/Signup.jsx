
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';
import GoogleLogo from "../../assets/signupLoginLogo/google.png";
import FacebookLogo from "../../assets/signupLoginLogo/facebook.png";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext); // Refresh user state after signup

  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        credentials: "include", // important for httpOnly cookie
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to register");

      await fetchUser(); // Refresh user context

      alert("Registration successful!");
      navigate("/login"); // Redirect to home
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.message || "Something went wrong, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
        border: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "500px",
        margin: "auto",
        gap: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        marginTop: "50px",
        marginBottom:"50px",
        paddingTop: "20px",
        borderRadius: "7px",
      }}>
      <h1>Create an account</h1>

      <div className="input-group">
        <label>Name</label>
        <input className="formInput" type="text" name="name" value={formdata.name} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input className="formInput" type="email" name="email" value={formdata.email} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input className="formInput" type="password" name="password" value={formdata.password} onChange={handleChange} required />
      </div>

      <button type="submit" className="signUpBtn">Sign up</button>

      <p>---------------- or With -----------------</p>

      <button type="button" className="googleBtn" onClick={() => {
        window.location.href = "http://localhost:8000/api/auth/google";
        }}>
        <img src={GoogleLogo} alt="Google" /> Continue with Google
      </button>

      {/* <button type="button" className="facebookBtn">
        <img src={FacebookLogo} alt="Facebook" /> Continue with Facebook
      </button> */}

      <p style={{ marginTop: "15px" }}>
        Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
      </p>
    </form>
  );
};

export default Signup;


