
import { useState, useEffect } from "react";
import { MetricCard } from "./MetricCard";
import { Gauge } from "lucide-react";

interface MetricsGridProps {
  selectedDashboard: string;
}

export const MetricsGrid = ({ selectedDashboard }: MetricsGridProps) => {
  const [metrics, setMetrics] = useState({
    overview: [
      { title: "Total Users", value: 12543, change: 5.2, unit: "", trend: "up" },
      { title: "Revenue", value: 89234, change: -2.1, unit: "$", trend: "down" },
      { title: "Active Sessions", value: 1834, change: 12.5, unit: "", trend: "up" },
      { title: "Conversion Rate", value: 3.24, change: 0.8, unit: "%", trend: "up" }
    ],
    performance: [
      { title: "Response Time", value: 245, change: -8.2, unit: "ms", trend: "up" },
      { title: "CPU Usage", value: 67, change: 3.1, unit: "%", trend: "down" },
      { title: "Memory Usage", value: 82, change: -1.5, unit: "%", trend: "up" },
      { title: "Disk I/O", value: 156, change: 12.3, unit: "MB/s", trend: "down" }
    ],
    analytics: [
      { title: "Page Views", value: 45621, change: 15.7, unit: "", trend: "up" },
      { title: "Bounce Rate", value: 34.2, change: -4.3, unit: "%", trend: "up" },
      { title: "Avg. Session", value: 4.32, change: 8.9, unit: "min", trend: "up" },
      { title: "New Visitors", value: 2847, change: 23.1, unit: "", trend: "up" }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        [selectedDashboard]: prev[selectedDashboard as keyof typeof prev].map(metric => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * (metric.value * 0.02),
          change: (Math.random() - 0.5) * 20
        }))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedDashboard]);

  const currentMetrics = metrics[selectedDashboard as keyof typeof metrics] || metrics.overview;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {currentMetrics.map((metric, index) => (
        <MetricCard
          key={`${selectedDashboard}-${index}`}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          unit={metric.unit}
          trend={metric.trend as "up" | "down"}
          icon={Gauge}
        />
      ))}
    </div>
  );
};
