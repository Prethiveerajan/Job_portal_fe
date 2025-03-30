


// import React, { useState } from "react";
// import { Button, TextField, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../App.css";

// const Signup = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {

//     await axios.post("http://localhost:5000/api/auth/signup", formData);
//       navigate("/login"); // Redirect to login page after successful signup
//     } catch (err) {
//       setError("Error signing up. Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//       <img src="/img/logo.png" alt="Logo" className="auth-logo" />
//         <Typography component="h1" variant="h5">Sign Up</Typography>
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleInputChange} required />
//           <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleInputChange} required />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>Sign Up</Button>
//           {error && <Typography color="error">{error}</Typography>}
//           <Button fullWidth onClick={() => navigate("/login")}>Already have an account? Log in</Button>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Fallback to localhost if undefined
        await axios.post(`${apiUrl}/api/auth/signup`, formData);
    } catch (err) {
      setError("Error signing up. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/img/logo.png" alt="Logo" className="auth-logo" />
        <Typography component="h1" variant="h5">Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleInputChange} required />
          <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleInputChange} required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>Sign Up</Button>
          {error && <Typography color="error">{error}</Typography>}
          <Button fullWidth onClick={() => navigate("/login")}>Already have an account? Log in</Button>
        </Box>
      </div>
    </div>
  );
};

export default Signup;
