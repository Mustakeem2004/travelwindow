


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import GoogleLogo from "../../assets/signupLoginLogo/google.png";
import FacebookLogo from "../../assets/signupLoginLogo/facebook.png";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext); // Refresh context after login

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://travelwindow-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
        credentials: "include", // Important for httpOnly cookie
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to login");

      await fetchUser(); // Refresh user context
      navigate('/');


      alert("Login successful!");
  
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.message || "Something went wrong, please try again.");
    }
  };

  return (
    <form 
            style={{
        border: "1px solid #e0e0e0",
        height: "750px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "500px",
        margin: "auto",
        gap: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        marginTop: "15px",
        paddingTop: "20px",
        borderRadius: "7px",
      }}
    onSubmit={handleSubmit} >
      <h1>Login to your account</h1>

      <div className="input-group">
        <label>Email</label>
        <input className="formInput" type="email" name="email" value={formdata.email} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input className="formInput" type="password" name="password" value={formdata.password} onChange={handleChange} required />
      </div>

      <div className="options">
        <label ><input type="checkbox" /> Remember me</label>
        <p className="forgot">Forgot Password?</p>
      </div>

      <button type="submit" className="signUpBtn">Login</button>

      <p>---------------- or With -----------------</p>

      <button
        type="button"
        className="googleBtn"
        onClick={() => {
        window.location.href = "https://travelwindow-backend.onrender.com/api/auth/google";
        }}
      >
      <img src={GoogleLogo} alt="Google" /> Login with Google
      </button>

      {/* <button type="button" className="facebookBtn">
        <img src={FacebookLogo} alt="Facebook" /> Login with Facebook
      </button> */}
    </form>
  );
};

export default Login;
