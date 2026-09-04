import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function NGOs(){
 const [ngos,setNgos]=useState([]),[search,setSearch]=useState(""),[city,setCity]=useState(""),[loading,setLoading]=useState(true);
 const load=async()=>{setLoading(true);try{const {data}=await api.get("/ngos",{params:{search,city}});setNgos(data.ngos)}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 return <main className="section"><div className="container"><div className="page-title"><div><div className="eyebrow">VERIFIED ORGANIZATIONS</div><h1>Connect with NGOs & Beneficiaries</h1><p>Choose a verified organization for your donation.</p></div><Link className="btn btn-primary" to="/donate">Donate an item</Link></div>
 <div className="searchbar"><input placeholder="Search organization..." value={search} onChange={e=>setSearch(e.target.value)}/><input placeholder="City" value={city} onChange={e=>setCity(e.target.value)}/><button className="btn btn-dark" onClick={load}>Search</button></div>
 {loading?<div className="loader">Loading verified organizations…</div>:<div className="ngo-grid">{ngos.map(n=><article className="ngo-card" key={n._id}><div className="ngo-logo">{(n.organizationName||n.name).slice(0,1)}</div><div className="verified">✓ VERIFIED</div><h3>{n.organizationName||n.name}</h3><p>{n.description||"Community organization accepting reusable donations."}</p><div className="ngo-meta">📍 {n.address?.city||"Multiple locations"}</div><div className="ngo-meta">☎ {n.phone||"Contact after request"}</div><Link className="text-link" to={`/donate?ngo=${n._id}`}>Choose this NGO →</Link></article>)}</div>}
 {!loading&&!ngos.length&&<div className="empty">No verified NGOs found. Try another city or search term.</div>}
 </div></main>
}
