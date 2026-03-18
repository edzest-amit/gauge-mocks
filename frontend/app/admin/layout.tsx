import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <Sidebar />

      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>

    </div>
  );
}