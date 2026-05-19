import { Navbar } from "@/src/components/dashboard/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}