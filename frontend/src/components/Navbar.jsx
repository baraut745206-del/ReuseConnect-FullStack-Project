import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const goLogout = () => { logout(); nav("/"); };
  return <header className="nav">
    <Link className="brand" to="/"><span className="brand-mark">♥</span> Reuse<span>Connect</span></Link>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/donate">Donate</NavLink>
      <NavLink to="/ngos">NGOs</NavLink>
      {user && <NavLink to="/dashboard">Dashboard</NavLink>}
      {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
    </nav>
    <div className="nav-actions">
      {user ? <><span className="user-chip">{user.name}</span><button className="btn btn-ghost" onClick={goLogout}>Logout</button></>
      : <><Link className="btn btn-ghost" to="/login">Login</Link><Link className="btn btn-primary" to="/register">Get Started</Link></>}
    </div>
  </header>;
}
