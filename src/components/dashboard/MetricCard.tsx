
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  unit: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export const MetricCard = ({ title, value, change, unit, trend, icon: Icon }: MetricCardProps) => {
  const formatValue = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
    if (val >= 1000) return (val / 1000).toFixed(1) + "K";
    return val.toFixed(unit === "%" || unit === "min" ? 1 : 0);
  };

  const trendColor = trend === "up" ? "text-green-400" : "text-red-400";
  const trendBg = trend === "up" ? "bg-green-500/10" : "bg-red-500/10";
  const changeSymbol = change >= 0 ? "+" : "";

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-300">{title}</h3>
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold text-white">
            {unit === "$" && unit}{formatValue(value)}{unit !== "$" && unit}
          </div>
          
          <div className={`flex items-center text-sm ${trendColor}`}>
            <span className={`px-2 py-1 rounded-full text-xs ${trendBg} ${trendColor}`}>
              {changeSymbol}{change.toFixed(1)}%
            </span>
            <span className="ml-2 text-slate-400">vs last period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
