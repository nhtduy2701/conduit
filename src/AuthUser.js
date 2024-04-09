import { useState, useEffect } from "react";
import axios from "axios";

const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`https://api.realworld.io/api/user`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data.user;
    }
  } catch (error) {
    console.error("Failed to get current user", error);
    return null;
  }
};

const AuthUser = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setLoggedIn(true);
      }
    };
    fetchCurrentUser();
  }, []);

  return { loggedIn, user, setLoggedIn, setUser };
};

export default AuthUser;
