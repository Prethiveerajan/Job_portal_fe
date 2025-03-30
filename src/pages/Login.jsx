

// import React, { useState, useContext } from "react";
// import { Button, TextField, Typography, Box } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";  // Import AuthContext
// import "../App.css"; // Import CSS file

// const Login = () => {
//   const { setUser, setIsAuthenticated } = useContext(AuthContext); // ✅ Use AuthContext
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [err, setErr] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErr("");
//     setMessage("");
  
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData,
//         { withCredentials: true }
//       );
  
//       if (response.status === 200) {
//         setUser(response.data.user); // ✅ Store user in context
//         setIsAuthenticated(true); // ✅ Set authentication to true
  
//         // ✅ Save Token in localStorage
//         localStorage.setItem("token", response.data.token);  
//         localStorage.setItem("emailData", formData.email);
  
//         setMessage("Login successful!");
//         navigate("/"); // ✅ Redirect to home page
//       }
//     } catch (error) {
//       setErr(
//         error.response?.data?.message || "An error occurred during login."
//       );
//     }
//   };
  

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         {/* Logo Image */}
//         <img src="/img/logo.png" alt="Logo" className="auth-logo" />

//         <Typography component="h1" variant="h5">
//           Log In
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             onChange={handleInputChange}
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             onChange={handleInputChange}
//           />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
//             Log In
//           </Button>
//           {err && <Typography color="error">{err}</Typography>}
//           {message && <Typography color="success.main">{message}</Typography>}
//           <Button fullWidth onClick={() => navigate("/signup")}>
//             Don't have an account? Sign up
//           </Button>
//           <Button fullWidth onClick={() => navigate("/forgot-password")}>
//             Forgot Password?
//           </Button>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";  // Import AuthContext
import "../App.css"; // Import CSS file

const Login = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext); // ✅ Use AuthContext
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiUrl = process.env.REACT_APP_API_URL //|| "http://localhost:5000"; // Fallback to localhost in case it's not defined

  // Example: Login Component
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErr("");
    setMessage("");
  
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`, // Use the dynamic API URL
        formData,
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful!");
        navigate("/");
      }
    } catch (error) {
      setErr(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Logo Image */}
        <img src="/img/logo.png" alt="Logo" className="auth-logo" />

        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handleInputChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
            Log In
          </Button>
          {err && <Typography color="error">{err}</Typography>}
          {message && <Typography color="success.main">{message}</Typography>}
          <Button fullWidth onClick={() => navigate("/signup")}>
            Don't have an account? Sign up
          </Button>
          <Button fullWidth onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
