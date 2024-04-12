import { createContext, useContext, useState, useEffect } from "react";
import { setAuthToken, getCurrentUser, loginUser, updateUser } from "./Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setAuthToken(currentUser.token);
    setloggedIn(true);
  };

  const updateSettings = async (userData) => {
    const user = await updateUser(userData);
    setUser(user);
    setAuthToken(user.token);
    setloggedIn(true);
  };

  const login = async (email, password) => {
    const user = await loginUser(email, password);
    setUser(user);
    setAuthToken(user.token);
    setloggedIn(true);
    return user;
  };

  const logout = () => {
    setUser(null);
    setloggedIn(null);
    setAuthToken(null);
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
