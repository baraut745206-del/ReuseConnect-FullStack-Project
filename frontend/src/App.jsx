import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { Login, Register } from "./pages/Auth";
import NGOs from "./pages/NGOs";
import Donate from "./pages/Donate";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

export default function App(){return <><Navbar/><Routes>
<Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/ngos" element={<NGOs/>}/>
<Route path="/donate" element={<ProtectedRoute roles={["donor"]}><Donate/></ProtectedRoute>}/>
<Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
<Route path="/admin" element={<ProtectedRoute roles={["admin"]}><Admin/></ProtectedRoute>}/>
</Routes><footer><div className="container footer-inner"><b>ReuseConnect</b><span>Donation & Reuse Platform for Clothes and Household Items</span><span>© 2026 ReuseConnect</span></div></footer></>}
