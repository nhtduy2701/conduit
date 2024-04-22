import { createContext, useContext, useState, useEffect } from "react";
import {
  setAuthToken,
  getCurrentUser,
  loginUser,
  updateUser,
  registerUser,
} from "./Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    if (token) {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoggedIn(true);
    }
  };

  const updateSettings = async (userData) => {
    const response = await updateUser(userData);
    setUser(response);
    setAuthToken(response.token);
    setLoggedIn(true);
    localStorage.setItem("token", response.token);
  };

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    setUser(response);
    setAuthToken(response.token);
    setLoggedIn(true);
    localStorage.setItem("token", response.token);
    return response;
  };

  const register = async (username, email, password) => {
    const response = await registerUser(username, email, password);
    if (response.token) {
      setUser(response);
      setAuthToken(response.token);
      setLoggedIn(true);
      localStorage.setItem("token", response.token);
    }
    return response;
  };

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, loggedIn, login, register, logout, updateSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
