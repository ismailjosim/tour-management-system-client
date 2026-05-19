import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Cell } from 'recharts';

interface BarChartCardProps {
  title: string;
  data: { name: string; value: number }[];
  dataKey?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  horizontal?: boolean;
}

// Bright colors that work on both dark & light themes
const barColors = [
  '#f43f5e', // pink
  '#22d3ee', // cyan
  '#10b981', // green
  '#6366f1', // indigo
  '#f59e0b', // amber
  '#84cc16', // lime
  '#ec4899', // rose
];

const BarChartCard: React.FC<BarChartCardProps> = ({
  title,
  data,
  dataKey = 'value',
  icon: Icon,
  horizontal = false,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-[#202E3C]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        {Icon && <Icon className="h-5 w-5 text-gray-400 dark:text-gray-300" />}
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout={horizontal ? 'vertical' : 'horizontal'}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />

            {horizontal ? (
              <>
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="text-gray-800 dark:text-gray-200"
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="text-gray-800 dark:text-gray-200"
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="text-gray-800 dark:text-gray-200"
                />
                <YAxis
                  type="number"
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  className="text-gray-800 dark:text-gray-200"
                />
              </>
            )}

            <Bar dataKey={dataKey} radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;
