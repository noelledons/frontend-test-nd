// src/App.tsx - WORKING SIMPLIFIED VERSION
import { useMemo } from "react";
import { TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react";
import { formatCurrency } from "./utils/dataUtils";
import { useFilters } from "./hooks/useFilters";
// Import your data and types
import { mockSalesData } from "./data/mockSalesData";
import { calculateMetrics } from "./utils/dataUtils";
//components
import { AdvaiLineChart } from "./components/charts/AdvaiLineChart";
import { AdvaiBarChart } from "./components/charts/AdvaiBarChart";
import { AdvaiPieChart } from "./components/charts/AdvaiPieChart";
import { SalesRecordTable } from "./components/dashboard/SalesRecordTable";
import { MetricCard } from "./components/dashboard/MetricCard";
import { FilterPanel } from "./components/filters/FilterPanel";

function App() {
  const { filters, setFilters, filteredData, hasActiveFilters, clearFilters } =
    useFilters(mockSalesData);

  const metrics = useMemo(() => calculateMetrics(filteredData), [filteredData]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sales Analytics Dashboard
            </h1>
          </div>
          <p className="text-gray-600 ml-11">
            Monitor your sales performance with interactive charts and real-time
            data
          </p>
        </header>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            value={formatCurrency(metrics.totalSales)}
            icon={DollarSign}
            iconColor={"w-6 h-6 text-green-600"}
            title={"Total Sales"}
          />
          <MetricCard
            value={metrics.totalOrders}
            icon={ShoppingCart}
            title={"Total Orders"}
          />
          <MetricCard
            value={formatCurrency(metrics.averageOrderValue)}
            icon={Package}
            iconColor={"w-6 h-6 text-purple-600"}
            title={"Avg Order Value"}
          />
          <MetricCard
            value={metrics.topPerformingMonth}
            icon={TrendingUp}
            iconColor={"w-6 h-6 text-red-600"}
            title={"Top Month"}
          />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              hasActiveFilters={hasActiveFilters}
              resultCount={filteredData.length}
              totalCount={mockSalesData.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Monthly Sales Chart */}
              <AdvaiLineChart title="Monthly Sales Trend" />
              {/* Secondary Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdvaiBarChart title="Sales by Category" />
                <AdvaiPieChart title="Revenue by Region" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-8">
          <SalesRecordTable
            title="Sales Records"
            filteredData={filteredData}
            hasActiveFilters={hasActiveFilters}
            handleClearFilters={clearFilters}
            mockSalesData={mockSalesData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
