

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auto-login if token exists
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem("token"); // ✅ Get token
//         if (!token) throw new Error("No token found");

       
//         const res = await axiosInstance.get('/api/auth/me', {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ Correct token format
//           },
//           withCredentials: true,
//         });

//         setUser(res.data);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error("Authentication error:", error);
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     };

//     checkAuth();
//   }, []);
const checkAuth = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      console.error("No token found!");
      return null;
    }
  
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Authentication error:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
