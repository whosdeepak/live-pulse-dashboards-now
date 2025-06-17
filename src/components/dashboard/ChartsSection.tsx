
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ChartsSectionProps {
  selectedDashboard: string;
}

export const ChartsSection = ({ selectedDashboard }: ChartsSectionProps) => {
  const [chartData, setChartData] = useState({
    timeSeries: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 100) + 50,
      secondary: Math.floor(Math.random() * 80) + 30
    })),
    barData: [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 300 },
      { name: "Mar", value: 600 },
      { name: "Apr", value: 800 },
      { name: "May", value: 500 },
      { name: "Jun", value: 700 }
    ],
    pieData: [
      { name: "Desktop", value: 45, color: "#3b82f6" },
      { name: "Mobile", value: 35, color: "#10b981" },
      { name: "Tablet", value: 20, color: "#f59e0b" }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => ({
        ...prev,
        timeSeries: prev.timeSeries.map(point => ({
          ...point,
          value: Math.max(20, Math.min(150, point.value + (Math.random() - 0.5) * 20)),
          secondary: Math.max(10, Math.min(120, point.secondary + (Math.random() - 0.5) * 15))
        }))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Real-time Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1f2937", 
                  border: "1px solid #374151",
                  color: "#fff"
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#3b82f6" }}
              />
              <Line 
                type="monotone" 
                dataKey="secondary" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1f2937", 
                  border: "1px solid #374151",
                  color: "#fff"
                }} 
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {chartData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1f2937", 
                  border: "1px solid #374151",
                  color: "#fff"
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {chartData.pieData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-slate-300">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "CPU Usage", value: 67, color: "bg-blue-500" },
            { label: "Memory", value: 82, color: "bg-green-500" },
            { label: "Disk", value: 45, color: "bg-yellow-500" },
            { label: "Network", value: 78, color: "bg-purple-500" }
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{item.label}</span>
                <span className="text-white">{item.value}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${item.color}`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
