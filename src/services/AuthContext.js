import { createContext, useContext, useState, useEffect } from "react";
import { setAuthToken, getCurrentUser, loginUser, updateUser } from "./Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setAuthToken(currentUser.token);
      setloggedIn(true);
    };

    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchCurrentUser();
    }
  }, []);

  const updateSettings = async (userData) => {
    const response = await updateUser(userData);
    setUser(response);
    setAuthToken(response.token);
    localStorage.setItem("token", response.token);
    setloggedIn(true);
  };

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    setUser(response);
    setAuthToken(response.token);
    localStorage.setItem("token", response.token);
    setloggedIn(true);
    return response;
  };

  const logout = () => {
    setUser(null);
    setloggedIn(false);
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, loggedIn, login, logout, updateSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
