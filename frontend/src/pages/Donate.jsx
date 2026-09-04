import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Donate(){
 const {user}=useAuth(); const nav=useNavigate(); const [params]=useSearchParams();
 const [ngos,setNgos]=useState([]),[message,setMessage]=useState(""),[error,setError]=useState("");
 const tomorrow=new Date(Date.now()+86400000); tomorrow.setMinutes(tomorrow.getMinutes()-tomorrow.getTimezoneOffset());
 const [form,setForm]=useState({ngo:params.get("ngo")||"",itemType:"Clothes",itemName:"",quantity:1,condition:"Good",description:"",line1:user?.address?.line1||"",city:user?.address?.city||"",state:user?.address?.state||"",pincode:user?.address?.pincode||"",scheduledAt:tomorrow.toISOString().slice(0,16),donorNote:""});
 useEffect(()=>{api.get("/ngos").then(r=>setNgos(r.data.ngos))},[]);
 const update=(k,v)=>setForm({...form,[k]:v});
 const submit=async e=>{e.preventDefault();setError("");setMessage("");try{await api.post("/donations",{...form,quantity:Number(form.quantity),pickupAddress:{line1:form.line1,city:form.city,state:form.state,pincode:form.pincode}});setMessage("Donation request created successfully!");setTimeout(()=>nav("/dashboard"),700)}catch(err){setError(err.response?.data?.message||"Could not create donation")}};
 return <main className="section"><div className="container narrow"><div className="page-title"><div><div className="eyebrow">START A DONATION</div><h1>Donate useful items</h1><p>Tell us what you have and when it can be collected.</p></div></div>
 <form className="panel form" onSubmit={submit}>{error&&<div className="alert error">{error}</div>}{message&&<div className="alert success">{message}</div>}
 <div className="form-grid"><label>Item category<select value={form.itemType} onChange={e=>update("itemType",e.target.value)}>{["Clothes","Household Items","Books","Toys","Other"].map(x=><option key={x}>{x}</option>)}</select></label><label>Item name<input required value={form.itemName} placeholder="e.g. Winter jackets" onChange={e=>update("itemName",e.target.value)}/></label></div>
 <div className="form-grid"><label>Quantity<input required type="number" min="1" max="10000" value={form.quantity} onChange={e=>update("quantity",e.target.value)}/></label><label>Condition<select value={form.condition} onChange={e=>update("condition",e.target.value)}>{["New","Like New","Good","Usable"].map(x=><option key={x}>{x}</option>)}</select></label></div>
 <label>Description<textarea placeholder="Describe the items briefly..." value={form.description} onChange={e=>update("description",e.target.value)}/></label>
 <hr/><h3>Choose verified NGO</h3><label>NGO<select required value={form.ngo} onChange={e=>update("ngo",e.target.value)}><option value="">Select an organization</option>{ngos.map(n=><option value={n._id} key={n._id}>{n.organizationName||n.name} — {n.address?.city||"Multiple cities"}</option>)}</select></label>
 <hr/><h3>Doorstep pickup</h3><label>Pickup address<input required value={form.line1} onChange={e=>update("line1",e.target.value)}/></label><div className="form-grid"><label>City<input required value={form.city} onChange={e=>update("city",e.target.value)}/></label><label>State<input value={form.state} onChange={e=>update("state",e.target.value)}/></label></div><label>Pincode<input value={form.pincode} onChange={e=>update("pincode",e.target.value)}/></label>
 <label>Scheduled pickup time<input required type="datetime-local" value={form.scheduledAt} onChange={e=>update("scheduledAt",e.target.value)}/></label><label>Note to NGO<textarea value={form.donorNote} placeholder="Any pickup instructions?" onChange={e=>update("donorNote",e.target.value)}/></label>
 <button className="btn btn-primary btn-lg full">Submit collection request →</button></form></div></main>
}
