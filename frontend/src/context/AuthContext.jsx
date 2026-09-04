import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("reuseconnect_token");
    if (!token) return setLoading(false);
    api.get("/auth/me").then(r => setUser(r.data.user)).catch(() => localStorage.removeItem("reuseconnect_token")).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("reuseconnect_token", data.token); setUser(data.user); return data.user;
  };
  const register = async payload => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("reuseconnect_token", data.token); setUser(data.user); return data.user;
  };
  const logout = () => { localStorage.removeItem("reuseconnect_token"); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
