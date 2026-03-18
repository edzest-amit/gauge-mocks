import Link from "next/link";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Admin</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <Link href="/dashboard/users">Users</Link>
        <Link href="/dashboard/knowledge">Knowledge</Link>
        
        <Link href="/dashboard/questions">Question Bank</Link>
        <Link href="/dashboard/exams">Exam Builder</Link>
        <Link href="/dashboard/analytics">Analytics</Link>
      </nav>
    </div>
  );
}