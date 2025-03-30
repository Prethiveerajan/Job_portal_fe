// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Auto-login if token exists
//   useEffect(() => {
//     const checkAuth = async () => {
//         try {

//           const token = localStorage.getItem("token"); // ✅ Get token
//           if (!token) throw new Error("No token found");
//             const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"
//           const res = await axios.get("`${apiUrl/api/auth/me`", {
//             headers: {
//               Authorization: `Bearer ${token}`, // ✅ Correct token format
//             },
//             withCredentials: true,
//           });
      
//           setUser(res.data);
//           setIsAuthenticated(true);
//         } catch (error) {
//           console.error("Authentication error:", error);
//           setIsAuthenticated(false);
//           setUser(null);
//         }
//       };
      
//     checkAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auto-login if token exists
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token
        if (!token) throw new Error("No token found");

        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Use default API URL or localhost
        const res = await axios.get(`${apiUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Correct token format
          },
          withCredentials: true,
        });

        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
