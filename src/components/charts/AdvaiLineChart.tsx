import React from "react";
import { LucideIcon, LineChart as LucideLineChart } from "lucide-react";
import { getMonthlyData } from "../../utils/dataUtils";
import { mockSalesData as salesData } from "../../data/mockSalesData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AdvaiLineChartProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  height?: string;
}

/* Noelle's Notes: for Monthly Sales Data
~ Data needed: Date & totalAmount (from JSON file)
~ Date: Extra month from the date
~ Find Average totalAmount per Month
~ X axis: Months (e.g. Jan, Feb etc.)
~ Y axis: Average Monthly Sales
~ Had to refactor getMonthlyData to display numbers to 2dp
*/

export const AdvaiLineChart: React.FC<AdvaiLineChartProps> = ({
  title,
  height = "h-full",
}) => {
  const salesDataPerMonth = getMonthlyData(salesData);

  return (
    <div
      className={`w-full h-[300px] sm:h-[400px] md:h-[500px] ${height} shadow-sm border-2 border border-gray-200 rounded-lg bg-white p-6`}
    >
      <div className="flex items-center gap-2 mb-6">
        <LucideLineChart className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
    
          data={salesDataPerMonth}
          margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="sales" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
