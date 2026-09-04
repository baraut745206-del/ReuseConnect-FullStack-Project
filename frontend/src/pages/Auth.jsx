import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login } = useAuth(); const nav = useNavigate();
  const [form,setForm]=useState({email:"",password:""}); const [error,setError]=useState("");
  const [showPassword, setShowPassword] = useState(false);
  const submit=async e=>{e.preventDefault();setError("");try{await login(form.email,form.password);nav("/dashboard")}catch(err){setError(err.response?.data?.message||"Login failed")}};
  return <AuthLayout title="Welcome back" sub="Login to manage your donations."><form onSubmit={submit} className="form">
    {error&&<div className="alert error">{error}</div>}<label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label>
  Password
  <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
    <input
      required
      type={showPassword ? "text" : "password"}
      value={form.password}
      onChange={e => setForm({...form, password:e.target.value})}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
</label>
    <button className="btn btn-primary full">Login</button><p className="form-foot">New here? <Link to="/register">Create an account</Link></p>
  </form></AuthLayout>;
}

export function Register() {
  const { register } = useAuth(); const nav=useNavigate(); const [role,setRole]=useState("donor"); const [error,setError]=useState("");
  const [form,setForm]=useState({name:"",email:"",password:"",phone:"",organizationName:"",description:"",city:"",line1:"",pincode:""});
  const update=(k,v)=>setForm({...form,[k]:v});
  const submit=async e=>{e.preventDefault();setError("");try{await register({...form,role,address:{line1:form.line1,city:form.city,pincode:form.pincode}});nav("/dashboard")}catch(err){setError(err.response?.data?.message||"Registration failed")}};
  return <AuthLayout title="Create your account" sub="Join a community turning unused items into useful resources."><form onSubmit={submit} className="form">
    {error&&<div className="alert error">{error}</div>}
    <div className="role-tabs"><button type="button" className={role==="donor"?"active":""} onClick={()=>setRole("donor")}>I want to donate</button><button type="button" className={role==="ngo"?"active":""} onClick={()=>setRole("ngo")}>I represent an NGO</button></div>
    <div className="form-grid"><label>Full name<input required value={form.name} onChange={e=>update("name",e.target.value)}/></label><label>Phone<input value={form.phone} onChange={e=>update("phone",e.target.value)}/></label></div>
    {role==="ngo"&&<><label>Organization name<input required value={form.organizationName} onChange={e=>update("organizationName",e.target.value)}/></label><label>About organization<textarea value={form.description} onChange={e=>update("description",e.target.value)}/></label></>}
    <label>Email<input required type="email" value={form.email} onChange={e=>update("email",e.target.value)}/></label><label>Password<input required minLength="8" type="password" value={form.password} onChange={e=>update("password",e.target.value)}/></label>
    <label>Address<input required value={form.line1} onChange={e=>update("line1",e.target.value)}/></label><div className="form-grid"><label>City<input required value={form.city} onChange={e=>update("city",e.target.value)}/></label><label>Pincode<input value={form.pincode} onChange={e=>update("pincode",e.target.value)}/></label></div>
    <button className="btn btn-primary full">Create account</button><p className="form-foot">Already registered? <Link to="/login">Login</Link></p>
  </form></AuthLayout>;
}
function AuthLayout({title,sub,children}){return <main className="auth-page"><div className="auth-card"><div className="brand center">♥ Reuse<span>Connect</span></div><h1>{title}</h1><p className="muted center">{sub}</p>{children}</div></main>}
