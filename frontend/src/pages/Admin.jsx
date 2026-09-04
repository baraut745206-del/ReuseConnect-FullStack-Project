import { useEffect, useState } from "react";
import api from "../api";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

export default function Admin(){
 const [stats,setStats]=useState({}),[ngos,setNgos]=useState([]),[donations,setDonations]=useState([]),[loading,setLoading]=useState(true);
 const load=async()=>{setLoading(true);try{const [s,n,d]=await Promise.all([api.get("/admin/stats"),api.get("/ngos/all"),api.get("/donations/all")]);setStats(s.data);setNgos(n.data.ngos);setDonations(d.data.donations)}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const verify=async(id,value)=>{await api.patch(`/ngos/${id}/verify`,{verified:value});load()};
 return <main className="section"><div className="container"><div className="page-title"><div><div className="eyebrow">ADMIN CONTROL CENTER</div><h1>Platform overview</h1><p>Verify organizations, monitor donations and measure impact.</p></div></div>
 <div className="stats"><StatCard icon="👥" label="Registered donors" value={stats.donors||0}/><StatCard icon="🤝" label="Verified NGOs" value={stats.ngos||0}/><StatCard icon="🎁" label="Total donations" value={stats.donations||0}/><StatCard icon="♻" label="Items collected" value={stats.quantity||0}/></div>
 {loading?<div className="loader">Loading admin data…</div>:<div className="admin-grid"><section className="panel"><div className="panel-head"><h2>NGO onboarding & verification</h2></div><div className="table-wrap"><table><thead><tr><th>Organization</th><th>Location</th><th>Status</th><th>Action</th></tr></thead><tbody>{ngos.map(n=><tr key={n._id}><td><b>{n.organizationName||n.name}</b><small>{n.email}</small></td><td>{n.address?.city||"—"}</td><td>{n.verified?<span className="verified">✓ Verified</span>:<span className="status status-pending">Pending</span>}</td><td><button className="btn btn-small btn-primary" onClick={()=>verify(n._id,!n.verified)}>{n.verified?"Unverify":"Verify"}</button></td></tr>)}</tbody></table></div></section>
 <section className="panel"><div className="panel-head"><h2>Recent donations</h2></div><div className="table-wrap"><table><thead><tr><th>Item</th><th>Donor</th><th>NGO</th><th>Status</th></tr></thead><tbody>{donations.slice(0,12).map(d=><tr key={d._id}><td>{d.itemName}<small>{d.itemType} · {d.quantity}</small></td><td>{d.donor?.name}</td><td>{d.ngo?.organizationName||d.ngo?.name}</td><td><StatusBadge status={d.status}/></td></tr>)}</tbody></table></div></section></div>}
 </div></main>
}
