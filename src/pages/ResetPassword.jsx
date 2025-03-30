// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button, TextField, Typography, Box } from "@mui/material";
// import axios from "axios";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//         await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword });
//         setMessage("Password reset successful! Redirecting to login...");
//         setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//         setMessage("Error resetting password. Try again.");
//     }
// };


//   return (
//     <Box className="auth-container">
//       <Box className="auth-box">
//         <Typography component="h1" variant="h5">Reset Password</Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             type="password"
//             label="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//             margin="normal"
//           />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Reset Password</Button>
//           {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default ResetPassword;


import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      
      await axiosInstance.post('/api/auth/reset-password/${token}', { newPassword });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Error resetting password. Try again.");
    }
  };

  return (
    <Box className="auth-container">
      <Box className="auth-box">
        <Typography component="h1" variant="h5">Reset Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            margin="normal"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Reset Password</Button>
          {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
