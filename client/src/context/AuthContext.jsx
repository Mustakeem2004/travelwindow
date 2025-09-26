import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
        credentials: "include", // httpOnly cookie
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        
        
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
