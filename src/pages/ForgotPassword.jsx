
import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import axiosInstance from "../utils/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        
        await axiosInstance.post(`${apiUrl}/api/auth/forgot-password`, { email });

        console.log("Response:", response.data);
        setMessage("Password reset instructions sent to your email.");
    } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        setMessage(err.response?.data?.message || "Error sending password reset email.");
    }
};


  return (
    <div className="auth-container">
      <div className="auth-box">
      <img src="/img/logo.png" alt="Logo" className="auth-logo" />
        <Typography component="h1" variant="h5">Forgot Password?</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email Address" name="email" onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>Reset Password</Button>
          {message && <Typography color="success.main">{message}</Typography>}
          <Button fullWidth onClick={() => navigate("/login")}>Back to Login</Button>
        </Box>
      </div>
    </div>
  );
};

export default ForgotPassword;
