import React from "react";
import { PieChart as LucidePieChart } from "lucide-react";
import { getRegionData } from "../../utils/dataUtils";
import { mockSalesData as regionData } from "../../data/mockSalesData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface AdvaiPieChartProps {
  title: string;
  height?: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${payload.name}`}
    </text>
  );
};

export const AdvaiPieChart: React.FC<AdvaiPieChartProps> = ({ title, height = "h-[300px] sm:h-[400px] md:h-[530px]" }) => {
  const revenuePerRegion = getRegionData(regionData);
  return (
    <div
      className={`w-full ${height} border-2 border-dashed border-gray-200 rounded-lg bg-white p-6`}
    >
      <div className="flex items-center gap-2 mb-6">
        <LucidePieChart className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie
            data={revenuePerRegion}
            cx="50%"
            cy="40%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="70%"
            fill="#8884d8"
            dataKey="percentage"
          >
            {revenuePerRegion.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(percentage: number, region: string) => {
              const percent = percentage.toFixed(0);
              return [`${percent}%`, region];
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
