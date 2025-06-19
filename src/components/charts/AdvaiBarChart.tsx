import React from "react";
import { BarChart3 } from "lucide-react";
import { getCategoryData } from "../../utils/dataUtils";
import { mockSalesData as productData } from "../../data/mockSalesData";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AdvaiBarChartProps {
  title: string;
  height?: string;
}

export const AdvaiBarChart: React.FC<AdvaiBarChartProps> = ({
  title,
  height = "h-[300px] sm:h-[400px] md:h-[530px]",
}) => {
  const salesPerProduct = getCategoryData(productData);

  return (
    <div
      className={`w-full ${height} border-2 border border-gray-200 rounded-lg bg-white p-6`}
    >
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={salesPerProduct}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis dataKey="revenue"  />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="revenue"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
