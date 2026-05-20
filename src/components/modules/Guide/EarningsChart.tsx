/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import type { GuideEarnings } from '@/types/guide';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      // Switched to bg-popover and text-foreground variables
      <div className="bg-popover border-border rounded-lg border px-3 py-2 shadow-xl">
        <p className="text-muted-foreground mb-1 text-xs">{label}</p>
        <p className="text-foreground text-sm font-semibold">
          ৳{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

type EarningsChartProps = {
  earnings?: GuideEarnings;
  isLoading?: boolean;
};

export function EarningsChart({ earnings, isLoading = false }: EarningsChartProps) {
  const [range, setRange] = useState('6m');
  const rangeLength = Number(range.replace('m', ''));
  const data = (earnings?.monthlyEarnings ?? []).slice(-rangeLength);

  return (
    <Card className="bg-card border-border flex h-full justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-foreground text-base font-semibold">Monthly Earnings</CardTitle>
        <Select value={range} onValueChange={setRange}>
          {/* Replaced hardcoded backgrounds with bg-muted and bg-popover */}
          <SelectTrigger className="bg-muted border-border text-foreground h-8 w-36 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border text-foreground">
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-muted-foreground text-sm">Loading earnings...</p>}
        {!isLoading && data.length === 0 && (
          <div className="text-muted-foreground flex h-[220px] items-center justify-center text-sm">
            No paid completed bookings yet.
          </div>
        )}
        {!isLoading && data.length > 0 && (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                width={40}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'var(--muted)', fillOpacity: 0.4 }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={entry.month} fill={`var(--chart-${(index % 5) + 1})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
