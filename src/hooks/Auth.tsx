import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");

    if (token && rawUser) {
      try {
        const userData = JSON.parse(rawUser);
        setUser(userData);
      } catch (err) {
        console.error("Invalid JSON in localStorage user:", rawUser);
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const isLoggedIn = () => !!localStorage.getItem("token");

  const login = (userData: any) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));
    setUser(userData.user);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return { user, loading, login, logout, isLoggedIn };
}
