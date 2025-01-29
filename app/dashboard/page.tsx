import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold text-[#171a1f] mb-6">
          Dashboard
        </h1>
        {/* Add your dashboard content here */}
      </main>
      <Footer />
    </div>
  );
}
