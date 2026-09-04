export default function StatCard({ icon, label, value, note }) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div><div className="muted">{label}</div><strong>{value}</strong>{note && <small>{note}</small>}</div></div>;
}
