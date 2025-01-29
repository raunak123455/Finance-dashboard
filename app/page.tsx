import { NavBar } from "@/components/nav-bar";
import { PortfolioGrowth } from "@/components/portfolio-growth";
import { AssetAllocation } from "@/components/asset-allocation";
import { MetricsOverview } from "@/components/metrics-overview";
import { Footer } from "@/components/footer";
import { KeyMetricsOverview } from "@/components/key-metrics-overview";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#171a1f] mb-6">
            Investment Performance Charts
          </h1>
          <div className="grid grid-cols-2 gap-6">
            <PortfolioGrowth />
            <AssetAllocation />
          </div>
        </div>
        <MetricsOverview />
        {/* <KeyMetricsOverview /> */}
      </main>
      <Footer />
    </div>
  );
}
